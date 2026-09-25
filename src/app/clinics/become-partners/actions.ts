"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { ContactMessage } from "@/models/ContactMessage";
import { Notification } from "@/models/Notification";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limiter";
import { sanitizeString } from "@/lib/sanitize";

export interface ClinicPartnershipData {
  clinicName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  artRegistrationNumber?: string;
  message?: string;
}

export async function submitClinicPartnershipAction(
  data: ClinicPartnershipData
) {
  try {
    // Resolve client IP for rate limiting
    let ipAddress = "127.0.0.1";
    try {
      const headerList = await headers();
      ipAddress = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "127.0.0.1";
    } catch {
      // Headers may not be available in all execution contexts
    }

    // Rate Limit: Max 5 partnership submissions per 10 minutes per IP
    const rateCheck = checkRateLimit(`clinic_${ipAddress}`, 5, 10 * 60 * 1000);
    if (!rateCheck.success) {
      const waitMinutes = Math.ceil((rateCheck.resetTime - Date.now()) / (60 * 1000));
      return {
        success: false,
        error: `Too many submissions from this connection. Please wait ${waitMinutes} minute${waitMinutes > 1 ? "s" : ""} before submitting again or reach our clinic desk directly.`,
      };
    }

    await connectToDatabase();

    const clinicName = sanitizeString(data.clinicName);
    const contactName = sanitizeString(data.contactName);
    const email = sanitizeString(data.email);
    const phone = sanitizeString(data.phone);
    const city = sanitizeString(data.city);
    const state = sanitizeString(data.state);
    const artRegistrationNumber = sanitizeString(data.artRegistrationNumber);
    const message = sanitizeString(data.message);

    if (!clinicName || !contactName || !email || !phone) {
      return { success: false, error: "Please fill in all mandatory clinical contact details." };
    }

    const cleanPhone = phone.replace(/\D/g, "");
    const formattedMessage = [
      `[Clinic Partnership Application]`,
      `Clinic Name: ${clinicName.trim()}`,
      `Contact Person: ${contactName.trim()}`,
      `City & State: ${city.trim()}, ${state.trim()}`,
      artRegistrationNumber ? `National ART Registry ID: ${artRegistrationNumber.trim()}` : null,
      message ? `Clinical Message: ${message.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const newInquiry = await ContactMessage.create({
      name: `${contactName.trim()} (${clinicName.trim()})`,
      firstName: contactName.trim(),
      lastName: clinicName.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      userType: "clinic",
      message: formattedMessage,
      status: "NEW",
    });

    try {
      const notif = await Notification.create({
        title: "New ART Clinic Partnership Inquiry",
        message: `${clinicName.trim()} (${contactName.trim()}, +91 ${cleanPhone}) requested affiliate partnership onboarding.`,
        type: "INQUIRY",
        referenceId: newInquiry._id.toString(),
      });

      try {
        const { pusherServer } = await import("@/lib/pusher");
        await pusherServer.trigger("notifications", "new_notification", notif);
      } catch {
        // Optional real-time notification
      }
    } catch (nErr) {
      console.error("[Clinic notification error]", nErr);
    }

    // Dispatch Email Notification to Admin
    try {
      const { sendClinicPartnershipAdminNotification } = await import(
        "@/features/email/services/email.service"
      );
      await sendClinicPartnershipAdminNotification({
        clinicName: clinicName.trim(),
        contactName: contactName.trim(),
        email: email.trim().toLowerCase(),
        phone: cleanPhone,
        city: city.trim(),
        state: state.trim(),
        artRegistrationNumber: artRegistrationNumber?.trim() || "",
        message: message?.trim() || "",
      });
    } catch (eErr) {
      console.error("[Clinic email dispatch error]", eErr);
    }

    return {
      success: true,
      message: "Your clinic partnership inquiry has been received. Our clinical directorate will contact your coordinator shortly.",
      inquiryId: newInquiry._id.toString(),
    };
  } catch (err: any) {
    console.error("[Clinic partnership action error]:", err);
    return {
      success: false,
      error: "An unexpected error occurred while saving your partnership inquiry. Please try again.",
    };
  }
}
