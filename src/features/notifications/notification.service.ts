import { sendTwilioWhatsApp } from "@/lib/twilio";

export interface NotificationPayload {
  recipientName: string;
  recipientContact: string;
  type: "email" | "whatsapp";
  event: "inquiry_submitted" | "registration_completed" | "donor_request_received";
  message: string;
}

export async function triggerWorkflowNotifications(
  event: NotificationPayload["event"],
  name: string,
  contact: string,
  additionalInfo: Record<string, string> = {}
) {
  const phone = contact;

  try {
    switch (event) {
      case "inquiry_submitted":
        if (phone) {
          await sendTwilioWhatsApp(
            phone,
            `Dear ${name}, thank you for submitting your donor pre-screening query to the Mediyaz registry. Program: ${additionalInfo.interest || "sperm"} donor.`
          );
        }
        break;

      case "registration_completed":
        if (phone) {
          await sendTwilioWhatsApp(
            phone,
            `Hello ${name}, your detailed donor registration has been received and is under clinical review.`
          );
        }
        break;

      case "donor_request_received":
        if (phone) {
          await sendTwilioWhatsApp(
            phone,
            `Dear ${name}, your donor requisition (${additionalInfo.requisitionNumber || ""}) for ${additionalInfo.donorCode || "matching"} has been received. Our clinical match desk will coordinate with ${additionalInfo.treatingClinic || "your clinic"}.`
          );
        }
        break;
    }
  } catch (err) {
    console.error(`[WORKFLOW NOTIFICATION ERROR] Event: ${event}`, err);
  }
}

