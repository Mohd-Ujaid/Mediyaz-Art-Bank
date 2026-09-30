import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

import { EggDonorRegistration } from "@/models/EggDonorRegistration";
import { SpermDonorRegistration } from "@/models/SpermDonorRegistration";
import { VerificationOtp } from "@/models/VerificationOtp";
import { sendTwilioWhatsApp } from "@/features/twilio/services/twilio.service";

// --- Rate Limit Configuration (Handled directly by Next.js) ---
const MAX_SEND_ATTEMPTS = 3;      // Max OTP sends per 10 minutes per phone number
const MAX_VERIFY_ATTEMPTS = 5;    // Max wrong guesses before OTP is invalidated

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { action, phone, aadhaar, email, otp, registrationId, donorType } = body;

    if (!action) {
      return NextResponse.json({ success: false, error: "Action is required." }, { status: 400 });
    }

    // Clean input parameters
    const cleanPhone = phone ? phone.toString().replace(/[^0-9]/g, "").slice(-10) : "";
    const cleanAadhaar = aadhaar ? aadhaar.toString().replace(/[^0-9]/g, "").trim() : "";
    const cleanEmail = email ? email.toString().trim().toLowerCase() : "";

    // =========================================================================
    // ACTION: SEND OTP VIA WHATSAPP (Twilio used strictly as transport)
    // =========================================================================
    if (action === "send") {
      // 1. Mandatory format validations
      if (!cleanAadhaar || cleanAadhaar.length !== 12) {
        return NextResponse.json({
          success: false,
          error: "A valid 12-digit Aadhaar number is mandatory."
        }, { status: 400 });
      }

      if (!cleanPhone || cleanPhone.length !== 10) {
        return NextResponse.json({
          success: false,
          error: "A valid 10-digit mobile phone number is mandatory to receive WhatsApp OTP."
        }, { status: 400 });
      }

      // --- NEXT.JS RATE LIMITING: Max 3 OTP sends per phone per 10 minutes ---
      const existingOtp = await VerificationOtp.findOne({ phone: cleanPhone });

      if (existingOtp && existingOtp.sendAttempts >= MAX_SEND_ATTEMPTS) {
        return NextResponse.json({
          success: false,
          error: `Too many OTP requests. You have reached the limit of ${MAX_SEND_ATTEMPTS} OTP requests. Please wait 10 minutes before trying again.`
        }, { status: 429 });
      }

      // --- STRICT DUPLICATE PREVENTION: Aadhaar & Phone check across registries ---
      const registries = [
        { name: "Egg Donor Registry", model: EggDonorRegistration },
        { name: "Sperm Donor Registry", model: SpermDonorRegistration },
      ];

      for (const reg of registries) {
        const orConditions: any[] = [
          { "personalInfo.aadhaarNumber": cleanAadhaar },
          { "contactInfo.mobileNumber": cleanPhone },
        ];
        if (cleanEmail) {
          orConditions.push({ "contactInfo.emailAddress": cleanEmail });
        }

        const filter: any = {
          status: { $nin: ["REJECTED", "DRAFT"] },
          $or: orConditions
        };

        if (registrationId) {
          filter.registrationId = { $ne: registrationId };
        }

        const duplicate = await reg.model.findOne(filter);
        if (duplicate) {
          let matchedField = "credentials";
          if (duplicate.personalInfo?.aadhaarNumber === cleanAadhaar) {
            matchedField = `Aadhaar number (${cleanAadhaar})`;
          } else if (duplicate.contactInfo?.mobileNumber === cleanPhone) {
            matchedField = `Mobile number (+91 ${cleanPhone})`;
          } else if (cleanEmail && duplicate.contactInfo?.emailAddress?.toLowerCase() === cleanEmail) {
            matchedField = `Email address (${cleanEmail})`;
          }

          return NextResponse.json({
            success: false,
            error: `An application with this ${matchedField} has already been registered (${reg.name}, Application ID: ${duplicate.registrationId}). Under ART Act 2021 regulations, duplicate registrations are strictly prohibited.`
          }, { status: 400 });
        }

        // Also check if another unsubmitted draft has the same phone registered under a DIFFERENT Aadhaar
        const otherDraft = await reg.model.findOne({
          status: "DRAFT",
          "personalInfo.aadhaarNumber": { $ne: cleanAadhaar },
          "contactInfo.mobileNumber": cleanPhone,
        });

        if (otherDraft) {
          return NextResponse.json({
            success: false,
            error: "This Mobile number is already registered with another active draft. Please provide your own unique mobile number."
          }, { status: 400 });
        }
      }

      // --- NEXT.JS OTP GENERATION: 6-digit numeric OTP ---
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Store/update OTP in database with Next.js tracking
      if (existingOtp) {
        existingOtp.phone = cleanPhone;
        existingOtp.aadhaar = cleanAadhaar;
        if (cleanEmail) existingOtp.email = cleanEmail;
        existingOtp.code = otpCode;
        existingOtp.verifyAttempts = 0; // Reset verify attempts on resend
        existingOtp.sendAttempts = existingOtp.sendAttempts + 1;
        await existingOtp.save();
      } else {
        await VerificationOtp.create({
          phone: cleanPhone,
          aadhaar: cleanAadhaar,
          email: cleanEmail || "",
          code: otpCode,
          sendAttempts: 1,
          verifyAttempts: 0,
        });
      }

      // Send OTP via Twilio WhatsApp API using Authentication Template SID HX79fc8e0faf226129d2cf3ef80ce9e712
      const messageBody = `Your Mediyaz verification OTP is: *${otpCode}*. This OTP is valid for 10 minutes. Please do not share this code with anyone.`;
      const waResult = await sendTwilioWhatsApp(cleanPhone, messageBody, {
        otpCode,
        contentSid: process.env.TWILIO_WHATSAPP_AUTH_TEMPLATE_SID || "HX79fc8e0faf226129d2cf3ef80ce9e712",
        contentVariables: { "1": otpCode },
      });

      // If WhatsApp failed to send, DO NOT advance to OTP step — return an error immediately
      if (!waResult.success) {
        if (existingOtp) {
          existingOtp.sendAttempts = Math.max(0, existingOtp.sendAttempts - 1);
          await existingOtp.save();
        } else {
          await VerificationOtp.deleteOne({ phone: cleanPhone });
        }

        console.error(`[WHATSAPP OTP DISPATCH FAILED] Phone: +91 ${cleanPhone} | Error: ${waResult.error}`);

        return NextResponse.json({
          success: false,
          error: `There is an error sending OTP to your WhatsApp number (+91 ${cleanPhone}). Please try again in some time.`
        }, { status: 500 });
      }

      // Print OTP in server console in development mode
      if (process.env.NODE_ENV !== "production") {
        console.log(`\n======================================================`);
        console.log(`[NEXT.JS WHATSAPP OTP DISPATCH SUCCESS]`);
        console.log(`Phone:      +91 ${cleanPhone}`);
        console.log(`Aadhaar:    ${cleanAadhaar}`);
        console.log(`OTP Code:   ${otpCode}`);
        console.log(`Attempts:   ${existingOtp ? existingOtp.sendAttempts : 1}/${MAX_SEND_ATTEMPTS}`);
        console.log(`Twilio SID: ${waResult.messageSid}`);
        console.log(`======================================================\n`);
      }

      return NextResponse.json({
        success: true,
        message: `Verification OTP has been sent via WhatsApp to +91 ${cleanPhone}.`,
        phone: cleanPhone,
      });
    }

    // =========================================================================
    // ACTION: VERIFY OTP (Handled completely by Next.js & MongoDB)
    // =========================================================================
    if (action === "verify") {
      if (!cleanPhone) {
        return NextResponse.json({
          success: false,
          error: "Mobile phone number is required for OTP verification."
        }, { status: 400 });
      }
      if (!otp) {
        return NextResponse.json({ success: false, error: "6-digit OTP code is required." }, { status: 400 });
      }

      // Look up OTP by phone number
      const record = await VerificationOtp.findOne({ phone: cleanPhone });

      // No OTP record exists (expired or never sent)
      if (!record) {
        return NextResponse.json({
          success: false,
          error: "OTP code has expired or was not requested. Please request a new OTP."
        }, { status: 400 });
      }

      // --- NEXT.JS BRUTE-FORCE PROTECTION: Max 5 wrong guesses ---
      if (record.verifyAttempts >= MAX_VERIFY_ATTEMPTS) {
        await VerificationOtp.deleteMany({ phone: cleanPhone });
        return NextResponse.json({
          success: false,
          error: `Too many incorrect attempts. Your OTP has been invalidated for security. Please request a new OTP.`
        }, { status: 429 });
      }

      // Check if OTP matches (allow 123456 in dev mode for testing)
      const isDevMock = process.env.NODE_ENV !== "production" && otp === "123456";
      if (record.code !== otp && !isDevMock) {
        record.verifyAttempts = record.verifyAttempts + 1;
        await record.save();

        const attemptsLeft = MAX_VERIFY_ATTEMPTS - record.verifyAttempts;
        return NextResponse.json({
          success: false,
          error: `Invalid OTP code. ${attemptsLeft} attempt${attemptsLeft !== 1 ? "s" : ""} remaining before this OTP is invalidated.`
        }, { status: 400 });
      }

      // OTP matched — delete the record (one-time use)
      await VerificationOtp.deleteMany({ phone: cleanPhone });

      return NextResponse.json({
        success: true,
        message: "Mobile number and Aadhaar verified successfully via WhatsApp OTP."
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action." }, { status: 400 });
  } catch (error: any) {
    console.error("[OTP ROUTE ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
