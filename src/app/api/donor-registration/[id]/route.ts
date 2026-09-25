import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { EggDonorRegistration } from "@/models/EggDonorRegistration";
import { SpermDonorRegistration } from "@/models/SpermDonorRegistration";
import { Notification } from "@/models/Notification";

async function findRegistration(id: string) {
  if (id.startsWith("MED-SD") || id.startsWith("SPM")) {
    const doc = await SpermDonorRegistration.findOne({ registrationId: id });
    if (doc) return { doc, model: SpermDonorRegistration };
  }
  const eggDoc = await EggDonorRegistration.findOne({ registrationId: id });
  if (eggDoc) return { doc: eggDoc, model: EggDonorRegistration };
  const spermDoc = await SpermDonorRegistration.findOne({ registrationId: id });
  if (spermDoc) return { doc: spermDoc, model: SpermDonorRegistration };
  return null;
}

// GET single registration
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const found = await findRegistration(id);

    if (!found) {
      return NextResponse.json(
        { success: false, error: "Registration not found." },
        { status: 404 }
      );
    }

    const registration = found.doc;
    const sanitized = {
      registrationId: registration.registrationId,
      donorType: registration.donorType,
      status: registration.status,
      currentStep: registration.currentStep,
      createdAt: registration.createdAt,
    };

    return NextResponse.json({ success: true, registration: sanitized });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PATCH — Update specific step data (auto-save)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    const found = await findRegistration(id);
    if (!found) {
      return NextResponse.json(
        { success: false, error: "Registration not found." },
        { status: 404 }
      );
    }

    const registration = found.doc;
    if (registration.status !== "DRAFT") {
      return NextResponse.json(
        { success: false, error: "Registration is already submitted and locked." },
        { status: 400 }
      );
    }

    // Donor/user-allowed fields (safe for registration owner to update)
    const allowedKeys = [
      "personalInfo", "contactInfo", "medicalInfo", "donorInfo",
      "labReports", "documents", "emergencyContact",
      "consent", "referral", "currentStep",
    ];

    const update: any = {};

    for (const key of allowedKeys) {
      if (body[key] !== undefined) {
        if (typeof body[key] === "object" && !Array.isArray(body[key]) && body[key] !== null) {
          for (const [subKey, subVal] of Object.entries(body[key])) {
            update[`${key}.${subKey}`] = subVal;
          }
        } else {
          update[key] = body[key];
        }
      }
    }

    const updatedRegistration = await found.model.findOneAndUpdate(
      { registrationId: id },
      { $set: update },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Registration updated successfully.",
      registration: updatedRegistration,
    });
  } catch (error: any) {
    console.error("Update donor registration error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT — Final submission
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    const found = await findRegistration(id);
    if (!found) {
      return NextResponse.json(
        { success: false, error: "Registration not found." },
        { status: 404 }
      );
    }

    const registration = found.doc;
    if (registration.status !== "DRAFT") {
      return NextResponse.json(
        { success: false, error: "Registration is already submitted and locked." },
        { status: 400 }
      );
    }

    const allowedKeys = [
      "personalInfo", "contactInfo", "medicalInfo", "donorInfo",
      "labReports", "documents", "emergencyContact", "consent", "referral"
    ];

    for (const key of allowedKeys) {
      if (body[key]) {
        (registration as any)[key] = { ...(registration as any)[key]?.toObject?.() || (registration as any)[key], ...body[key] };
      }
    }

    registration.status = "SUBMITTED";
    registration.currentStep = 3;
    await registration.save();

    const notif = await Notification.create({
      title: "New Donor Registration",
      message: `A new ${registration.donorType} donor registration (${registration.registrationId}) has been submitted.`,
      type: "REGISTRATION",
      referenceId: registration.registrationId,
    });

    try {
      const { pusherServer } = await import("@/lib/pusher");
      await pusherServer.trigger("notifications", "new_notification", notif);
    } catch (pushErr) {
      console.error("Failed to push notification via Pusher:", pushErr);
    }

    // Process referral reward if referral details are present
    if (body.referral && body.referral.sourceReferralType) {
      const { 
        sourceReferralType, 
        referrerName, 
        patientOrDonorId, 
        mobileNumber, 
        relationship, 
        clinicName, 
        department, 
        employeeId, 
        otherSourceDetails 
      } = body.referral;
      
      let rewardEligible = false;
      let rewardAmount = 0;
      let rewardStatus: "Pending" | "Approved" | "Paid" | "Cancelled" = "Pending";
      
      if (["Existing Patient", "Existing Donor", "Staff Member"].includes(sourceReferralType)) {
        rewardEligible = true;
        rewardAmount = 5000;
        rewardStatus = "Pending";
      } else if (["Doctor / Clinic", "Friend / Family"].includes(sourceReferralType)) {
        rewardEligible = true;
        rewardAmount = 2500;
        rewardStatus = "Pending";
      } else {
        rewardEligible = false;
        rewardAmount = 0;
        rewardStatus = "Cancelled";
      }

      const Referral = (await import("@/models/Referral")).Referral;
      await Referral.findOneAndUpdate(
        { referredRegistrationId: id },
        {
          $set: {
            sourceReferralType,
            referrerName: referrerName || "Anonymous",
            patientOrDonorId,
            mobileNumber,
            relationship,
            clinicName,
            department,
            employeeId,
            otherSourceDetails,
            referredDonorName: body.personalInfo?.fullName || registration.personalInfo?.fullName || "Altruistic Donor",
            rewardEligible,
            rewardAmount,
            rewardStatus,
          }
        },
        { upsert: true, new: true }
      );
    }

    try {
      const { triggerWorkflowNotifications } = await import("@/features/notifications/services/workflow-notification.service");
      await triggerWorkflowNotifications(
        "registration_completed",
        registration.personalInfo?.fullName || "Donor Candidate",
        registration.contactInfo?.mobileNumber || "",
        {
          registrationId: id,
          email: registration.contactInfo?.emailAddress || "",
          interest: registration.donorType || "sperm",
          bloodGroup: registration.personalInfo?.bloodGroup || "N/A"
        }
      );
    } catch (notifErr) {
      console.error("Failed to trigger registration completed notification:", notifErr);
    }

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully!",
      registration,
    });
  } catch (error: any) {
    console.error("Submit donor registration error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE — Delete draft (Disallowed via public REST endpoint)
export async function DELETE() {
  return NextResponse.json(
    { success: false, error: "Forbidden: Deleting registrations via public API is disallowed." },
    { status: 403 }
  );
}
