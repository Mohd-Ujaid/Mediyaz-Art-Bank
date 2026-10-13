import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { EggDonorRegistration } from "@/models/EggDonorRegistration";
import { SpermDonorRegistration } from "@/models/SpermDonorRegistration";
import { PreviousDonor } from "@/models/PreviousDonor";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { aadhaar } = await req.json();

    const cleanAadhaar = (aadhaar || "").toString().replace(/\D/g, "").trim();
    if (!cleanAadhaar || cleanAadhaar.length !== 12) {
      return NextResponse.json({ isValid: false, message: "Aadhaar must be 12 digits" });
    }

    // 1. Check in Previous / Historical Database
    const prevMatch = await PreviousDonor.findOne({
      "personalInfo.aadhaarNumber": cleanAadhaar,
    });
    if (prevMatch) {
      const typeLabel = prevMatch.donorType === "sperm" ? "Sperm Donor" : "Egg Donor";
      const code = prevMatch.recordCode || prevMatch.legacyId || "Archived File";
      return NextResponse.json({
        exists: true,
        source: "previous",
        donorType: prevMatch.donorType,
        message: `This Aadhaar (${cleanAadhaar}) is already registered in our Previous Donor Database (${typeLabel}, Record ID: ${code}). Under ART Act regulations, repeat registrations are not permitted.`,
      });
    }

    // 2. Check in Active Registrations
    const eggMatch = await EggDonorRegistration.findOne({
      "personalInfo.aadhaarNumber": cleanAadhaar,
      status: { $nin: ["REJECTED", "DRAFT"] },
    });
    if (eggMatch) {
      return NextResponse.json({
        exists: true,
        source: "active",
        donorType: "egg",
        message: `This Aadhaar is already registered in the Egg Donor Registry (Application ID: ${eggMatch.registrationId}).`,
      });
    }

    const spermMatch = await SpermDonorRegistration.findOne({
      "personalInfo.aadhaarNumber": cleanAadhaar,
      status: { $nin: ["REJECTED", "DRAFT"] },
    });
    if (spermMatch) {
      return NextResponse.json({
        exists: true,
        source: "active",
        donorType: "sperm",
        message: `This Aadhaar is already registered in the Sperm Donor Registry (Application ID: ${spermMatch.registrationId}).`,
      });
    }

    return NextResponse.json({ exists: false });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to check Aadhaar" }, { status: 500 });
  }
}
