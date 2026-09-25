"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { EggDonorRegistration } from "@/models/EggDonorRegistration";
import { SpermDonorRegistration } from "@/models/SpermDonorRegistration";

import { Notification } from "@/models/Notification";

function generateEggRegistrationId(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  const ts = Date.now().toString().slice(-4);
  return `MED-ED-${year}-${rand}${ts}`;
}

export async function createDraftEggRegistrationAction(bodyData: any) {
  try {
    await connectToDatabase();

    const { personalInfo, contactInfo, referral, agentCode } = bodyData;

    const aadhaar = personalInfo?.aadhaarNumber?.toString().trim();
    const phone = contactInfo?.mobileNumber?.toString().trim();
    const email = contactInfo?.emailAddress?.toString().trim().toLowerCase();

    if (aadhaar || phone || email) {
      const orQuery: any[] = [];
      if (aadhaar) orQuery.push({ "personalInfo.aadhaarNumber": aadhaar });
      if (phone) orQuery.push({ "contactInfo.mobileNumber": phone });
      if (email) orQuery.push({ "contactInfo.emailAddress": email });

      // 1. Strict Duplicate Check: If already registered across any registry, reject
      const registries = [
        { name: "Egg Donor Registry", model: EggDonorRegistration },
        { name: "Sperm Donor Registry", model: SpermDonorRegistration },
      ];

      for (const reg of registries) {
        const alreadySubmitted = await reg.model.findOne({
          $or: orQuery,
          status: { $nin: ["DRAFT", "REJECTED"] },
        });

        if (alreadySubmitted) {
          let fieldName = "details";
          if (alreadySubmitted.personalInfo?.aadhaarNumber === aadhaar) fieldName = "Aadhaar number";
          else if (alreadySubmitted.contactInfo?.mobileNumber === phone) fieldName = "Mobile number";
          else if (alreadySubmitted.contactInfo?.emailAddress?.toLowerCase() === email) fieldName = "Email address";
          return {
            success: false,
            isSubmitted: true,
            error: `An application with this ${fieldName} has already been registered (${reg.name}, Application ID: ${alreadySubmitted.registrationId}). Under ART Act regulations, repeat registrations are not permitted.`,
            registrationId: alreadySubmitted.registrationId,
          };
        }
      }

      // 2. Draft Resume: If incomplete draft exists, load and resume it automatically
      let existingDraft = null;
      if (aadhaar) {
        existingDraft = await EggDonorRegistration.findOne({
          "personalInfo.aadhaarNumber": aadhaar,
          status: "DRAFT",
        }).sort({ updatedAt: -1 });
      }
      if (!existingDraft && (phone || email)) {
        existingDraft = await EggDonorRegistration.findOne({
          $or: [
            ...(phone ? [{ "contactInfo.mobileNumber": phone }] : []),
            ...(email ? [{ "contactInfo.emailAddress": email }] : []),
          ],
          status: "DRAFT",
        }).sort({ updatedAt: -1 });
      }

      if (existingDraft) {
        let modified = false;
        if (email && !existingDraft.contactInfo?.emailAddress) {
          existingDraft.contactInfo = { ...(existingDraft.contactInfo || {}), emailAddress: email };
          modified = true;
        }
        if (phone && !existingDraft.contactInfo?.mobileNumber) {
          existingDraft.contactInfo = { ...(existingDraft.contactInfo || {}), mobileNumber: phone };
          modified = true;
        }
        if (modified) {
          await existingDraft.save();
        }
        return {
          success: true,
          registrationId: existingDraft.registrationId,
          isExisting: true,
          registration: JSON.parse(JSON.stringify(existingDraft)),
        };
      }
    }

    const registrationId = generateEggRegistrationId();

    const rawAgentCode = (bodyData.agentCode || (referral?.sourceReferralType === "Refer" ? referral?.patientOrDonorId : null) || "").trim().toUpperCase();
    let linkedAgentId = null;
    if (rawAgentCode) {
      try {
        const { Agent } = await import("@/models/Agent");
        const ag = await Agent.findOne({
          $or: [
            { referName: rawAgentCode },
            { agentCode: rawAgentCode },
            { referName: new RegExp(`^${rawAgentCode}$`, "i") },
            { agentCode: new RegExp(`^${rawAgentCode}$`, "i") },
            { fullName: new RegExp(`^${rawAgentCode}$`, "i") }
          ]
        });
        if (ag) linkedAgentId = ag._id;
      } catch {}
    }

    const newRecord = await EggDonorRegistration.create({
      registrationId,
      donorType: "egg",
      agentCode: rawAgentCode || undefined,
      agentId: linkedAgentId || undefined,
      status: "DRAFT",
      currentStep: 1,
      personalInfo: {
        ...personalInfo,
        gender: "Female",
      },
      contactInfo: {
        ...(contactInfo || {}),
        emailAddress: email || contactInfo?.emailAddress || "",
        mobileNumber: phone || contactInfo?.mobileNumber || "",
      },
      referral: referral || {},
    });

    return {
      success: true,
      registrationId,
      isExisting: false,
      registration: JSON.parse(JSON.stringify(newRecord)),
    };
  } catch (error: any) {
    console.error("Create draft egg registration error:", error);
    return { success: false, error: error.message };
  }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function findEggDraftAction(identifier: string) {
  try {
    await connectToDatabase();
    const clean = identifier.trim();
    if (!clean) {
      return { success: false, error: "Please enter your Registration ID, Mobile Number, or Aadhaar." };
    }

    const cleanDigits = clean.replace(/[^0-9]/g, "");

    const orClauses: any[] = [
      { registrationId: clean },
      { registrationId: new RegExp(`^${escapeRegex(clean)}$`, "i") },
      { registrationId: new RegExp(escapeRegex(clean), "i") },
    ];

    if (cleanDigits.length >= 10) {
      orClauses.push({ "contactInfo.mobileNumber": cleanDigits });
      orClauses.push({ "contactInfo.mobileNumber": new RegExp(cleanDigits) });
    }

    if (cleanDigits.length === 12) {
      orClauses.push({ "personalInfo.aadhaarNumber": cleanDigits });
    }

    // 1. Look for an active DRAFT
    const draft = await EggDonorRegistration.findOne({
      $or: orClauses,
      status: "DRAFT",
    }).sort({ updatedAt: -1 });

    if (draft) {
      return {
        success: true,
        registration: JSON.parse(JSON.stringify(draft)),
      };
    }

    // 2. Check if a record exists but was already SUBMITTED or APPROVED
    const submitted = await EggDonorRegistration.findOne({
      $or: orClauses,
      status: { $ne: "DRAFT" },
    }).sort({ updatedAt: -1 });

    if (submitted) {
      return {
        success: false,
        error: `Registration ${submitted.registrationId} was already submitted (Status: ${submitted.status}). You do not need to resume it.`,
      };
    }

    return {
      success: false,
      error: "No incomplete draft found with this Registration ID, Mobile, or Aadhaar.",
    };
  } catch (error: any) {
    console.error("Find egg draft error:", error);
    return { success: false, error: error.message };
  }
}

export async function getEggRegistrationAction(id: string) {
  try {
    await connectToDatabase();
    const cleanId = String(id || "").trim();
    if (!cleanId) {
      return { success: false, error: "Egg donor registration ID is required." };
    }

    const orClauses: any[] = [
      { registrationId: cleanId },
      { registrationId: new RegExp(`^${escapeRegex(cleanId)}$`, "i") },
    ];
    if (/^[0-9a-fA-F]{24}$/.test(cleanId)) {
      orClauses.push({ _id: cleanId });
    }

    const registration = await EggDonorRegistration.findOne({ $or: orClauses });
    if (!registration) {
      return { success: false, error: "Egg donor registration not found." };
    }

    // If registration is not DRAFT (i.e. already submitted), sanitize PII for public tracking
    if (registration.status !== "DRAFT") {
      const rawName = registration.personalInfo?.fullName || "Candidate Donor";
      const nameParts = rawName.trim().split(" ");
      const maskedName = nameParts.length > 1 
        ? `${nameParts[0]} ${nameParts[nameParts.length - 1][0]}.` 
        : nameParts[0];

      const sanitized = {
        registrationId: registration.registrationId,
        donorType: registration.donorType,
        status: registration.status,
        currentStep: registration.currentStep,
        createdAt: registration.createdAt,
        updatedAt: registration.updatedAt,
        personalInfo: {
          fullName: maskedName,
          bloodGroup: registration.personalInfo?.bloodGroup || "—",
          gender: registration.personalInfo?.gender || "Female",
        },
        contactInfo: {
          city: registration.contactInfo?.city || "—",
          state: registration.contactInfo?.state || "—",
        },
      };
      return {
        success: true,
        registration: sanitized,
      };
    }

    return {
      success: true,
      registration: JSON.parse(JSON.stringify(registration)),
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateEggRegistrationStepAction(id: string, stepData: any) {
  try {
    await connectToDatabase();

    const update: any = {};
    const allowedKeys = [
      "personalInfo", "contactInfo", "medicalInfo", "donorInfo",
      "labReports", "documents",
      "emergencyContact", "consent", "referral", "agentCode", "currentStep",
    ];

    for (const key of allowedKeys) {
      if (stepData[key] !== undefined) {
        if (typeof stepData[key] === "object" && !Array.isArray(stepData[key]) && stepData[key] !== null) {
          for (const [subKey, subVal] of Object.entries(stepData[key])) {
            if (subVal !== undefined) {
              update[`${key}.${subKey}`] = subVal;
            }
          }
        } else {
          update[key] = stepData[key];
        }
      }
    }

    // Auto-link Refer partner if Refer Name or code provided
    const referIdToLink = update.agentCode || (stepData.referral?.sourceReferralType === "Refer" ? stepData.referral?.patientOrDonorId : null);
    if (referIdToLink) {
      const cleanCode = String(referIdToLink).trim().toUpperCase();
      const escapedCode = escapeRegex(cleanCode);
      update.agentCode = cleanCode;
      try {
        const { Agent } = await import("@/models/Agent");
        const ag = await Agent.findOne({
          $or: [
            { referName: cleanCode },
            { agentCode: cleanCode },
            { referName: new RegExp(`^${escapedCode}$`, "i") },
            { agentCode: new RegExp(`^${escapedCode}$`, "i") },
            { fullName: new RegExp(`^${escapedCode}$`, "i") }
          ]
        });
        if (ag) {
          update.agentId = ag._id;
          update.agentCode = ag.referName || ag.agentCode;
          if (!update["referral.referrerName"]) {
            update["referral.referrerName"] = ag.fullName;
          }
        }
      } catch (err) {
        console.warn("Agent lookup error:", err);
      }
    }

    // Enforce female gender for egg donor
    if (update["personalInfo.gender"]) {
      update["personalInfo.gender"] = "Female";
    }

    // Enforce update only on DRAFT status (locked post-submission)
    const updated = await EggDonorRegistration.findOneAndUpdate(
      { registrationId: id, status: "DRAFT" },
      { $set: update },
      { returnDocument: 'after' }
    );

    if (!updated) {
      return { success: false, error: "Registration record not found or has already been submitted for review." };
    }

    return {
      success: true,
      registration: JSON.parse(JSON.stringify(updated)),
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function submitEggRegistrationAction(id: string, bodyData: any) {
  try {
    await connectToDatabase();

    const registration = await EggDonorRegistration.findOne({ registrationId: id });
    if (!registration) {
      return { success: false, error: "Egg donor registration not found." };
    }

    // Prevent duplicate submission and multiple agent stats increments
    if (registration.status !== "DRAFT") {
      return { success: false, error: "This registration has already been submitted and is currently under review." };
    }

    const allowedKeys = [
      "personalInfo", "contactInfo", "medicalInfo", "donorInfo",
      "labReports", "documents",
      "emergencyContact", "consent", "referral", "agentCode",
    ];

    for (const key of allowedKeys) {
      if (bodyData[key]) {
        (registration as any)[key] = {
          ...((registration as any)[key]?.toObject?.() || (registration as any)[key] || {}),
          ...bodyData[key],
        };
      }
    }

    const finalAgentCode = bodyData.agentCode || (bodyData.referral?.sourceReferralType === "Refer" ? bodyData.referral?.patientOrDonorId : null);
    if (finalAgentCode) {
      const cleanCode = String(finalAgentCode).trim().toUpperCase();
      registration.agentCode = cleanCode;
      try {
        const { Agent } = await import("@/models/Agent");
        const ag = await Agent.findOneAndUpdate(
          {
            $or: [
              { referName: cleanCode },
              { agentCode: cleanCode },
              { referName: new RegExp(`^${cleanCode}$`, "i") },
              { agentCode: new RegExp(`^${cleanCode}$`, "i") },
              { fullName: new RegExp(`^${cleanCode}$`, "i") }
            ]
          },
          { $inc: { "stats.totalEggDonors": 1 } },
          { returnDocument: 'after' }
        );
        if (ag) {
          registration.agentId = ag._id;
          registration.agentCode = ag.referName || ag.agentCode;
        }
      } catch (agErr) {
        console.warn("Agent stats update warning:", agErr);
      }
    }

    registration.personalInfo.gender = "Female";
    registration.status = "SUBMITTED";
    registration.currentStep = 9;
    await registration.save();

    // Create system notification
    try {
      const notif = await Notification.create({
        title: "New Egg Donor Registration",
        message: `A new female oocyte donor registration (${registration.registrationId}) has been submitted by ${registration.personalInfo?.fullName || "Donor"}.`,
        type: "REGISTRATION",
        referenceId: registration.registrationId,
      });

      const { pusherServer } = await import("@/lib/pusher");
      await pusherServer.trigger("notifications", "new_notification", notif);
    } catch (e) {
      console.warn("Notification error:", e);
    }

    // Process referral if applicable
    if (bodyData.referral?.sourceReferralType) {
      try {
        const { Referral } = await import("@/models/Referral");
        await Referral.findOneAndUpdate(
          { referredRegistrationId: id },
          {
            $set: {
              sourceReferralType: bodyData.referral.sourceReferralType,
              referrerName: bodyData.referral.referrerName || "Anonymous",
              patientOrDonorId: bodyData.referral.patientOrDonorId,
              mobileNumber: bodyData.referral.mobileNumber,
              relationship: bodyData.referral.relationship,
              clinicName: bodyData.referral.clinicName,
              department: bodyData.referral.department,
              employeeId: bodyData.referral.employeeId,
              otherSourceDetails: bodyData.referral.otherSourceDetails,
              referredDonorName: registration.personalInfo?.fullName || "Altruistic Donor",
              rewardEligible: ["Existing Patient", "Existing Donor", "Staff Member", "Doctor / Clinic"].includes(bodyData.referral.sourceReferralType),
              rewardAmount: ["Existing Patient", "Existing Donor", "Staff Member"].includes(bodyData.referral.sourceReferralType) ? 5000 : 2500,
              rewardStatus: "Pending",
            },
          },
          { upsert: true, returnDocument: 'after' }
        );
      } catch (refErr) {
        console.warn("Referral processing error:", refErr);
      }
    }

    return {
      success: true,
      registration: JSON.parse(JSON.stringify(registration)),
    };
  } catch (error: any) {
    console.error("Submit egg registration error:", error);
    return { success: false, error: error.message };
  }
}
