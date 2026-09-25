"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { ContactMessage } from "@/models/ContactMessage";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limiter";
import { sanitizeString } from "@/lib/sanitize";

export interface ContactActionResponse {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
  contactId?: string;
}

export interface ContactInputData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: string;
  message: string;
}

export async function submitContactAction(
  input: FormData | ContactInputData
): Promise<ContactActionResponse> {
  try {
    // Resolve client IP for rate limiting
    let ipAddress = "127.0.0.1";
    let userAgent: string | undefined;
    try {
      const headerList = await headers();
      ipAddress = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "127.0.0.1";
      userAgent = headerList.get("user-agent") || undefined;
    } catch {
      // Headers may not be available in all contexts
    }

    // Rate Limit: Max 5 contact submissions per 10 minutes per IP
    const rateCheck = checkRateLimit(`contact_${ipAddress}`, 5, 10 * 60 * 1000);
    if (!rateCheck.success) {
      const waitMinutes = Math.ceil((rateCheck.resetTime - Date.now()) / (60 * 1000));
      return {
        success: false,
        error: `Too many submissions from this connection. Please wait ${waitMinutes} minute${waitMinutes > 1 ? "s" : ""} before trying again or call our direct line.`,
      };
    }

    await connectToDatabase();

    let data: ContactInputData;
    if (input instanceof FormData) {
      data = {
        firstName: sanitizeString(input.get("firstName")),
        lastName: sanitizeString(input.get("lastName")),
        email: sanitizeString(input.get("email")),
        phone: sanitizeString(input.get("phone")),
        userType: sanitizeString(input.get("userType")),
        message: sanitizeString(input.get("message")),
      };
    } else {
      data = {
        firstName: sanitizeString(input.firstName),
        lastName: sanitizeString(input.lastName),
        email: sanitizeString(input.email),
        phone: sanitizeString(input.phone),
        userType: sanitizeString(input.userType),
        message: sanitizeString(input.message),
      };
    }

    const { firstName, lastName, email, phone, userType, message } = data;

    // Server-side validation
    const fieldErrors: Record<string, string> = {};
    if (!firstName) {
      fieldErrors.firstName = "First name is required";
    }
    if (!lastName) {
      fieldErrors.lastName = "Last name is required";
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      fieldErrors.email = "Please provide a valid email address";
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      fieldErrors.phone = "Please enter a valid 10-digit Indian mobile number";
    }
    if (!userType || !["parent", "egg-donor", "sperm-donor", "clinic", "other"].includes(userType)) {
      fieldErrors.userType = "Please select a valid inquiry category";
    }
    if (!message || message.trim().length < 10) {
      fieldErrors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return {
        success: false,
        error: "Validation failed. Please correct the errors and try again.",
        fieldErrors,
      };
    }

    // Save contact message to MongoDB
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const newContact = await ContactMessage.create({
      name: fullName,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      userType,
      message: message.trim(),
      status: "NEW",
      ipAddress,
      userAgent,
    });

    // Create an in-app Admin Notification
    try {
      const { Notification } = await import("@/models/Notification");
      const userTypeLabels: Record<string, string> = {
        parent: "Intending Parent",
        "egg-donor": "Prospective Egg Donor",
        "sperm-donor": "Prospective Sperm Donor",
        clinic: "ART Clinic Partner",
        other: "General ART Inquiry",
      };
      const categoryName = userTypeLabels[userType] || userType;

      const notif = await Notification.create({
        title: `New Contact Inquiry (${categoryName})`,
        message: `${firstName.trim()} ${lastName.trim()} (+91 ${cleanPhone}) sent a message: "${message.trim().slice(0, 100)}${message.length > 100 ? "..." : ""}"`,
        type: "INQUIRY",
        referenceId: newContact._id.toString(),
      });

      // Optional Pusher trigger
      try {
        const { pusherServer } = await import("@/lib/pusher");
        await pusherServer.trigger("notifications", "new_notification", notif);
      } catch {
        // Pusher may be unconfigured in dev, silent catch
      }
    } catch (notifErr) {
      console.error("[Notification creation error]", notifErr);
    }

    // Dispatch Email Notifications (Admin alert + User confirmation auto-reply)
    try {
      const { sendContactFormAdminNotification, sendContactFormUserAutoReply } = await import(
        "@/features/email/services/email.service"
      );
      await Promise.allSettled([
        sendContactFormAdminNotification({
          name: fullName,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          phone: cleanPhone,
          userType,
          message: message.trim(),
        }),
        sendContactFormUserAutoReply(email.trim().toLowerCase(), firstName.trim()),
      ]);
    } catch (emailErr) {
      console.error("[Contact email dispatch error]", emailErr);
    }

    return {
      success: true,
      message: "Your message has been received successfully. A clinical coordinator will reach out shortly.",
      contactId: newContact._id.toString(),
    };
  } catch (err: any) {
    console.error("[Submit Contact Action Error]:", err);
    return {
      success: false,
      error: "An unexpected error occurred while saving your message. Please try again or call our hotline.",
    };
  }
}
