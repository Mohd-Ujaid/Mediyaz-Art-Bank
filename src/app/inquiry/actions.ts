"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { DonorInquiry } from "@/models/DonorInquiry";
import { triggerWorkflowNotifications } from "@/features/notifications/notification.service";
import { inquirySchema } from "@/features/inquiry/inquiry.schema";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limiter";

export async function submitInquiryAction(formData: FormData) {
  try {
    // Resolve client IP for rate limiting
    let ipAddress = "127.0.0.1";
    try {
      const headerList = await headers();
      ipAddress = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "127.0.0.1";
    } catch {
      // Headers may not be available in all contexts
    }

    // Rate Limit: Max 5 inquiries per 10 minutes per IP
    const rateCheck = checkRateLimit(`inquiry_${ipAddress}`, 5, 10 * 60 * 1000);
    if (!rateCheck.success) {
      const waitMinutes = Math.ceil((rateCheck.resetTime - Date.now()) / (60 * 1000));
      return {
        success: false,
        error: `Too many pre-screening inquiries from this network. Please wait ${waitMinutes} minute${waitMinutes > 1 ? "s" : ""} before submitting again.`,
      };
    }

    await connectToDatabase();

    const data = Object.fromEntries(formData.entries());
    
    // Parse boolean for consent
    if (data.consent === "on" || data.consent === "true") {
      data.consent = "true";
    }

    // Validate using Zod
    const validatedData = inquirySchema.safeParse({
      ...data,
      consent: data.consent === "true",
    });

    if (!validatedData.success) {
      return { 
        success: false, 
        error: "Validation failed", 
        fieldErrors: validatedData.error.flatten().fieldErrors 
      };
    }

    const {
      fullName,
      mobileNumber,
      emailAddress,
      gender,
      dateOfBirth,
      age,
      donationInterest,
      height,
      weight,
      hairColor,
      eyeColor,
      skinTone,
      city,
      state,
      country,
      preferredContactTime,
      message,
      consent,
    } = validatedData.data;

    const inquiry = await DonorInquiry.create({
      fullName,
      mobileNumber,
      emailAddress,
      gender,
      dateOfBirth,
      age: age ? Number(age) : undefined,
      donationInterest,
      height: height ? Number(height) : undefined,
      weight: weight ? Number(weight) : undefined,
      hairColor,
      eyeColor,
      skinTone,
      city,
      state,
      country: country || "India",
      preferredContactTime,
      message,
      consent,
      status: "New Inquiry",
      statusHistory: [
        {
          status: "New Inquiry",
          notes: "Inquiry submitted by visitor via Server Action",
          updatedAt: new Date(),
        },
      ],
    });

    // Trigger workflow notification (SMS/WhatsApp)
    try {
      await triggerWorkflowNotifications("inquiry_submitted", fullName, mobileNumber, {
        interest: donationInterest,
        email: emailAddress,
        city: city || "N/A",
        state: state || "N/A",
        country: country || "India",
        preferredContactTime: preferredContactTime || "Anytime",
        message: message || ""
      });
    } catch (notifErr) {
      console.error("Workflow notification trigger error:", notifErr);
    }

    // Dispatch Email Notifications (Admin alert + User acknowledgment)
    try {
      const { sendInquiryAdminNotificationEmail, sendInquiryAcknowledgmentEmail } = await import(
        "@/features/email/services/email.service"
      );
      await Promise.allSettled([
        sendInquiryAdminNotificationEmail(inquiry),
        sendInquiryAcknowledgmentEmail(emailAddress, fullName, donationInterest),
      ]);
    } catch (emailErr) {
      console.error("[Inquiry email dispatch error]", emailErr);
    }

    return { success: true, message: "Inquiry submitted successfully!" };
  } catch (error: any) {
    console.error("Donor inquiry action error:", error);
    return { success: false, error: "An unexpected error occurred while submitting your inquiry." };
  }
}
