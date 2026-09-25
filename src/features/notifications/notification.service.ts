import { sendTwilioWhatsApp, sendTwilioSMS } from "@/lib/twilio";

export interface NotificationPayload {
  recipientName: string;
  recipientContact: string;
  type: "email" | "sms" | "whatsapp";
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
          await sendTwilioSMS(
            phone,
            `Dear ${name}, your donor inquiry has been received at Mediyaz Art Bank.`
          );
        }
        break;

      case "registration_completed":
        if (phone) {
          await sendTwilioWhatsApp(
            phone,
            `Hello ${name}, your detailed donor registration has been received and is under clinical review.`
          );
          await sendTwilioSMS(
            phone,
            `Hello ${name}, your registration at Mediyaz Art Bank is successful.`
          );
        }
        break;

      case "donor_request_received":
        if (phone) {
          await sendTwilioWhatsApp(
            phone,
            `Dear ${name}, your donor requisition (${additionalInfo.requisitionNumber || ""}) for ${additionalInfo.donorCode || "matching"} has been received. Our clinical match desk will coordinate with ${additionalInfo.treatingClinic || "your clinic"}.`
          );
          await sendTwilioSMS(
            phone,
            `Dear ${name}, donor requisition ${additionalInfo.requisitionNumber || ""} received at Mediyaz ART Bank.`
          );
        }
        break;
    }
  } catch (err) {
    console.error(`[WORKFLOW NOTIFICATION ERROR] Event: ${event}`, err);
  }
}
