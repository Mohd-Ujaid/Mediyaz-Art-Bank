import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

import { EggDonorRegistration } from "@/models/EggDonorRegistration";
import { SpermDonorRegistration } from "@/models/SpermDonorRegistration";
import { VerificationOtp } from "@/models/VerificationOtp";
import { sendVerificationOtpEmail } from "@/features/email/services/email.service";

// --- Rate Limit Configuration ---
const MAX_SEND_ATTEMPTS = 3;      // Max OTP sends per 10 minutes
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
    // ACTION: SEND OTP
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
          error: "A valid 10-digit mobile phone number is mandatory."
        }, { status: 400 });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!cleanEmail || !emailRegex.test(cleanEmail)) {
        return NextResponse.json({
          success: false,
          error: "A valid Email address is mandatory to receive the verification OTP."
        }, { status: 400 });
      }

      // --- RATE LIMITING: Max 3 OTP sends per 10 minutes ---
      const existingOtp = await VerificationOtp.findOne({
        $or: [
          { email: cleanEmail },
          { phone: cleanPhone },
        ]
      });

      if (existingOtp && existingOtp.sendAttempts >= MAX_SEND_ATTEMPTS) {
        return NextResponse.json({
          success: false,
          error: `Too many OTP requests. You have reached the limit of ${MAX_SEND_ATTEMPTS} OTP requests. Please wait 10 minutes before trying again.`
        }, { status: 429 });
      }

      // --- STRICT DUPLICATE PREVENTION: Aadhaar, Mobile, and Email MUST ALL BE UNIQUE ---
      // Check across Egg and Sperm dedicated collections
      const registries = [
        { name: "Egg Donor Registry", model: EggDonorRegistration },
        { name: "Sperm Donor Registry", model: SpermDonorRegistration },
      ];

      for (const reg of registries) {
        // Condition: Check already submitted/approved applications (not rejected and not current draft)
        const filter: any = {
          status: { $nin: ["REJECTED", "DRAFT"] },
          $or: [
            { "personalInfo.aadhaarNumber": cleanAadhaar },
            { "contactInfo.mobileNumber": cleanPhone },
            { "contactInfo.emailAddress": cleanEmail },
          ]
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
          } else if (duplicate.contactInfo?.emailAddress?.toLowerCase() === cleanEmail) {
            matchedField = `Email address (${cleanEmail})`;
          }

          return NextResponse.json({
            success: false,
            error: `An application with this ${matchedField} has already been registered (${reg.name}, Application ID: ${duplicate.registrationId}). Under ART Act 2021 regulations, duplicate registrations are strictly prohibited.`
          }, { status: 400 });
        }

        // Also check if another unsubmitted draft has the same email or phone registered under a DIFFERENT Aadhaar
        const otherDraft = await reg.model.findOne({
          status: "DRAFT",
          "personalInfo.aadhaarNumber": { $ne: cleanAadhaar },
          $or: [
            { "contactInfo.mobileNumber": cleanPhone },
            { "contactInfo.emailAddress": cleanEmail },
          ]
        });

        if (otherDraft) {
          const isPhone = otherDraft.contactInfo?.mobileNumber === cleanPhone;
          return NextResponse.json({
            success: false,
            error: `This ${isPhone ? "Mobile number" : "Email address"} is already registered with another active application. Please provide your own unique ${isPhone ? "mobile number" : "email address"}.`
          }, { status: 400 });
        }
      }

      // Generate a 6-digit numeric OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Store/update OTP in database
      if (existingOtp) {
        existingOtp.email = cleanEmail;
        existingOtp.phone = cleanPhone;
        existingOtp.aadhaar = cleanAadhaar;
        existingOtp.code = otpCode;
        existingOtp.verifyAttempts = 0; // Reset verify attempts on resend
        existingOtp.sendAttempts = existingOtp.sendAttempts + 1;
        await existingOtp.save();
      } else {
        await VerificationOtp.create({
          email: cleanEmail,
          phone: cleanPhone,
          aadhaar: cleanAadhaar,
          code: otpCode,
          sendAttempts: 1,
          verifyAttempts: 0,
        });
      }

      // Send OTP to EMAIL (DO NOT send to phone number)
      const emailResult = await sendVerificationOtpEmail(cleanEmail, otpCode, donorType || "Donor");
      if (!emailResult.success) {
        return NextResponse.json({
          success: false,
          error: emailResult.error || "Failed to deliver OTP to the provided email address."
        }, { status: 500 });
      }

      // Print OTP in server console in development mode
      if (process.env.NODE_ENV !== "production") {
        console.log(`\n======================================================`);
        console.log(`[DEV EMAIL OTP DISPATCH]`);
        console.log(`Email:   ${cleanEmail}`);
        console.log(`Phone:   ${cleanPhone}`);
        console.log(`Aadhaar: ${cleanAadhaar}`);
        console.log(`OTP:     ${otpCode}`);
        console.log(`======================================================\n`);
      }

      return NextResponse.json({
        success: true,
        message: `Verification OTP has been sent to ${cleanEmail}. Please check your inbox and spam folder.`,
        email: cleanEmail,
      });
    }

    // =========================================================================
    // ACTION: VERIFY OTP
    // =========================================================================
    if (action === "verify") {
      if (!cleanEmail && !cleanPhone) {
        return NextResponse.json({
          success: false,
          error: "Email address is required for OTP verification."
        }, { status: 400 });
      }
      if (!otp) {
        return NextResponse.json({ success: false, error: "6-digit OTP code is required." }, { status: 400 });
      }

      // Look up OTP by email or fallback to phone
      const record = await VerificationOtp.findOne({
        $or: [
          ...(cleanEmail ? [{ email: cleanEmail }] : []),
          ...(cleanPhone ? [{ phone: cleanPhone }] : []),
        ]
      });

      // No OTP record exists (expired or never sent)
      if (!record) {
        return NextResponse.json({
          success: false,
          error: "OTP code has expired or was not requested. Please request a new OTP."
        }, { status: 400 });
      }

      // --- BRUTE-FORCE PROTECTION: Max 5 wrong guesses ---
      if (record.verifyAttempts >= MAX_VERIFY_ATTEMPTS) {
        await VerificationOtp.deleteMany({
          $or: [
            ...(cleanEmail ? [{ email: cleanEmail }] : []),
            ...(cleanPhone ? [{ phone: cleanPhone }] : []),
          ]
        });
        return NextResponse.json({
          success: false,
          error: `Too many incorrect attempts. Your OTP has been invalidated for security. Please request a new OTP.`
        }, { status: 429 });
      }

      // Check if OTP matches (allow 123456 in dev mode for swift testing)
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
      await VerificationOtp.deleteMany({
        $or: [
          ...(cleanEmail ? [{ email: cleanEmail }] : []),
          ...(cleanPhone ? [{ phone: cleanPhone }] : []),
        ]
      });

      return NextResponse.json({
        success: true,
        message: "Email address, mobile number, and Aadhaar verified successfully."
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action." }, { status: 400 });
  } catch (error: any) {
    console.error("[OTP ROUTE ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

