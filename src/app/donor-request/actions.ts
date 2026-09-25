"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { DonorRequest } from "@/models/DonorRequest";
import { donorRequestSchema } from "@/features/donor-request/donor-request.schema";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limiter";
import { triggerWorkflowNotifications } from "@/features/notifications/notification.service";

export async function submitDonorRequestAction(formData: FormData) {
  try {
    // Resolve client IP for rate limiting
    let ipAddress = "127.0.0.1";
    try {
      const headerList = await headers();
      ipAddress =
        headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        headerList.get("x-real-ip") ||
        "127.0.0.1";
    } catch {
      // Headers fallback
    }

    // Rate Limit: Max 6 requests per 10 minutes per IP
    const rateCheck = checkRateLimit(`donor_request_${ipAddress}`, 6, 10 * 60 * 1000);
    if (!rateCheck.success) {
      const waitMinutes = Math.ceil((rateCheck.resetTime - Date.now()) / (60 * 1000));
      return {
        success: false,
        error: `Too many requests from this network. Please wait ${waitMinutes} minute${
          waitMinutes > 1 ? "s" : ""
        } before submitting again.`,
      };
    }

    await connectToDatabase();

    const data = Object.fromEntries(formData.entries());

    // Parse boolean for statutory consent
    const statutoryConsent = data.statutoryConsent === "on" || data.statutoryConsent === "true";

    // Validate with Zod
    const validated = donorRequestSchema.safeParse({
      ...data,
      statutoryConsent,
    });

    if (!validated.success) {
      return {
        success: false,
        error: "Please complete all mandatory fields correctly.",
        fieldErrors: validated.error.flatten().fieldErrors,
      };
    }

    const {
      donorCode,
      gameteType,
      requestorType,
      primaryContactName,
      partnerName,
      phone,
      email,
      city,
      state,
      country,
      preferredBloodGroup,
      treatingClinicName,
      treatingDoctorName,
      clinicCity,
      clinicArtRegNumber,
      gameteQuantity,
      tentativeCycleDate,
      specialRequirements,
    } = validated.data;

    // Generate unique requisition token
    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const requisitionNumber = `REQ-${year}-MED-${uniqueSuffix}`;

    const newRequest = await DonorRequest.create({
      requisitionNumber,
      donorCode: donorCode || "General Match Request",
      gameteType,
      requestorType,
      primaryContactName,
      partnerName: partnerName || undefined,
      phone,
      email,
      city,
      state,
      country: country || "India",
      preferredBloodGroup: preferredBloodGroup || undefined,
      treatingClinicName,
      treatingDoctorName: treatingDoctorName || undefined,
      clinicCity,
      clinicArtRegNumber: clinicArtRegNumber || undefined,
      gameteQuantity: gameteQuantity || undefined,
      tentativeCycleDate: tentativeCycleDate || undefined,
      specialRequirements: specialRequirements || undefined,
      statutoryConsent: true,
      status: "Pending Clinical Review",
    });

    // Send workflow notification (SMS/WhatsApp) if configured
    try {
      await triggerWorkflowNotifications("donor_request_received", primaryContactName, phone, {
        requisitionNumber,
        donorCode: donorCode || "Matching Requested",
        gameteType,
        treatingClinic: treatingClinicName,
        email,
      });
    } catch (notifErr) {
      console.warn("Workflow notification error:", notifErr);
    }

    return {
      success: true,
      requisitionNumber,
      donorCode: donorCode || "General Match Request",
      gameteType,
      primaryContactName,
    };
  } catch (error: any) {
    console.error("Donor requisition action error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while processing your donor request. Please try again or call our match desk directly.",
    };
  }
}
