"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { SpermDonorRegistration } from "@/models/SpermDonorRegistration";
import { EggDonorRegistration } from "@/models/EggDonorRegistration";

import { Notification } from "@/models/Notification";

function generateSpermRegistrationId(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  const ts = Date.now().toString().slice(-4);
  return `MED-SD-${year}-${rand}${ts}`;
}

export async function createDraftSpermRegistrationAction(bodyData: any) {
  try {
    await connectToDatabase();

    const { personalInfo, contactInfo, referral } = bodyData;

    // Check if an existing draft or submission exists for Aadhaar, Phone, or Email
    const aadhaar = personalInfo?.aadhaarNumber?.toString().trim();
    const phone = contactInfo?.mobileNumber?.toString().trim();
    const email = contactInfo?.emailAddress?.toString().trim().toLowerCase();

    if (aadhaar || phone || email) {
      const orQuery: any[] = [];
      if (aadhaar) orQuery.push({ "personalInfo.aadhaarNumber": aadhaar });
      if (phone) orQuery.push({ "contactInfo.mobileNumber": phone });
      if (email) orQuery.push({ "contactInfo.emailAddress": email });

      // 1. Strict Duplicate Check: If already registered in any registry, reject
      const registries = [
        { name: "Sperm Donor Registry", model: SpermDonorRegistration },
        { name: "Egg Donor Registry", model: EggDonorRegistration },
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
        existingDraft = await SpermDonorRegistration.findOne({
          "personalInfo.aadhaarNumber": aadhaar,
          status: "DRAFT",
        }).sort({ updatedAt: -1 });
      }
      if (!existingDraft && (phone || email)) {
        existingDraft = await SpermDonorRegistration.findOne({
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

    const registrationId = generateSpermRegistrationId();

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

    const newRecord = await SpermDonorRegistration.create({
      registrationId,
      donorType: "sperm",
      registrationSource: bodyData.registrationSource || "online_inquiry",
      status: "DRAFT",
      currentStep: 1,
      personalInfo: {
        ...personalInfo,
        gender: "Male",
      },
      contactInfo: {
        ...(contactInfo || {}),
        emailAddress: email || contactInfo?.emailAddress || "",
        mobileNumber: phone || contactInfo?.mobileNumber || "",
      },
      referral: referral || {},
      agentCode: rawAgentCode || undefined,
      agentId: linkedAgentId || undefined,
    });

    return {
      success: true,
      registrationId,
      isExisting: false,
      registration: JSON.parse(JSON.stringify(newRecord)),
    };
  } catch (error: any) {
    console.error("Create draft sperm registration error:", error);
    return { success: false, error: error.message };
  }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function getSpermRegistrationAction(id: string) {
  try {
    await connectToDatabase();
    const registration = await SpermDonorRegistration.findOne({ registrationId: id });
    if (!registration) {
      return { success: false, error: "Sperm donor registration not found." };
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
          gender: registration.personalInfo?.gender || "Male",
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

export async function updateSpermRegistrationStepAction(id: string, stepData: any) {
  try {
    await connectToDatabase();

    const update: any = {};
    const allowedKeys = [
      "personalInfo", "contactInfo", "medicalInfo", "donorInfo",
      "investigations", "physicalExamination", "labReports", "documents",
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

    // Enforce male gender for sperm donor
    if (update["personalInfo.gender"]) {
      update["personalInfo.gender"] = "Male";
    }

    // Enforce update only on DRAFT status (locked post-submission)
    const updated = await SpermDonorRegistration.findOneAndUpdate(
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

export async function submitSpermRegistrationAction(id: string, bodyData: any) {
  try {
    await connectToDatabase();

    const registration = await SpermDonorRegistration.findOne({ registrationId: id });
    if (!registration) {
      return { success: false, error: "Sperm donor registration not found." };
    }

    // Prevent duplicate submission and multiple agent stats increments
    if (registration.status !== "DRAFT") {
      return { success: false, error: "This registration has already been submitted and is currently under review." };
    }

    const allowedKeys = [
      "personalInfo", "contactInfo", "medicalInfo", "donorInfo",
      "investigations", "physicalExamination", "labReports", "documents",
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
          { $inc: { "stats.totalSpermDonors": 1 } },
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

    registration.personalInfo.gender = "Male";
    registration.status = "SUBMITTED";
    registration.currentStep = 9;
    await registration.save();

    // Create system notification
    try {
      const notif = await Notification.create({
        title: "New Sperm Donor Registration",
        message: `A new male semen donor registration (${registration.registrationId}) has been submitted by ${registration.personalInfo?.fullName || "Donor"}.`,
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
    console.error("Submit sperm registration error:", error);
    return { success: false, error: error.message };
  }
}
