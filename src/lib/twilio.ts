import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let twilioClient: twilio.Twilio | null = null;

if (accountSid && authToken && accountSid !== 'AC_dummy_account_sid') {
  twilioClient = twilio(accountSid, authToken);
}

export async function sendTwilioWhatsApp(to: string, message: string) {
  if (!twilioClient) {
    console.log(`[SIMULATED WHATSAPP] To: ${to} | Message: ${message}`);
    return;
  }

  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || '';
  if (!fromNumber) {
    console.warn('TWILIO_WHATSAPP_NUMBER is not set');
    return;
  }

  // Ensure number format for whatsapp: whatsapp:+1234567890
  const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to.startsWith('+') ? to : '+' + to}`;
  const formattedFrom = fromNumber.startsWith('whatsapp:') ? fromNumber : `whatsapp:${fromNumber}`;

  try {
    const response = await twilioClient.messages.create({
      body: message,
      from: formattedFrom,
      to: formattedTo,
    });
    console.log(`WhatsApp sent successfully. SID: ${response.sid}`);
    return response;
  } catch (error: any) {
    console.warn('[TWILIO WHATSAPP WARNING] (Non-fatal):', error?.message || error);
    return null;
  }
}

export async function sendTwilioSMS(to: string, message: string) {
  if (!twilioClient) {
    console.log(`[SIMULATED SMS] To: ${to} | Message: ${message}`);
    return;
  }

  const fromNumber = process.env.TWILIO_SMS_NUMBER || '';
  if (!fromNumber) {
    console.warn('TWILIO_SMS_NUMBER is not set');
    return;
  }

  const formattedTo = to.startsWith('+') ? to : '+' + to;

  try {
    const response = await twilioClient.messages.create({
      body: message,
      from: fromNumber,
      to: formattedTo,
    });
    console.log(`SMS sent successfully. SID: ${response.sid}`);
    return response;
  } catch (error: any) {
    console.warn('[TWILIO SMS WARNING] (Non-fatal):', error?.message || error);
    return null;
  }
}
