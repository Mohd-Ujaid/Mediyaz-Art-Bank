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
      return NextResponse.json({
        exists: true,
        eligible: false,
        message: "An existing donor registration under these statutory credentials already exists in the records. Under the ART (Regulation) Act, 2021, duplicate registrations are not permitted.",
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
        eligible: false,
        message: "An existing registration is already active in the ART Registry. Under statutory guidelines, duplicate registrations cannot be initiated.",
      });
    }

    const spermMatch = await SpermDonorRegistration.findOne({
      "personalInfo.aadhaarNumber": cleanAadhaar,
      status: { $nin: ["REJECTED", "DRAFT"] },
    });
    if (spermMatch) {
      return NextResponse.json({
        exists: true,
        eligible: false,
        message: "An existing registration is already active in the ART Registry. Under statutory guidelines, duplicate registrations cannot be initiated.",
      });
    }

    return NextResponse.json({ exists: false, eligible: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to check Aadhaar" }, { status: 500 });
  }
}
