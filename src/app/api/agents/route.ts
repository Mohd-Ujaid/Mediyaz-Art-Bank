import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Agent } from "@/models/Agent";
import bcrypt from "bcryptjs";

// Helper to generate unique Refer Name based on partner's name
async function generateUniqueReferName(fullName: string, customReferName?: string): Promise<string> {
  if (customReferName && customReferName.trim()) {
    const sanitized = customReferName.trim().replace(/[^a-zA-Z0-9_-]/g, "").toUpperCase();
    if (sanitized.length >= 2) {
      const existing = await Agent.findOne({
        $or: [{ referName: sanitized }, { agentCode: sanitized }]
      }).lean();
      if (!existing) return sanitized;
    }
  }

  // Generate clean name based on fullName, e.g. "Priya Sharma" -> "PRIYASHARMA"
  const cleanBase = fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .join("")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();

  const baseName = cleanBase.length >= 3 ? cleanBase : `REF${cleanBase || "PARTNER"}`;

  // Check if baseName is available
  const existing = await Agent.findOne({
    $or: [{ referName: baseName }, { agentCode: baseName }]
  }).lean();

  if (!existing) return baseName;

  // Try appending a number: PRIYASHARMA1, PRIYASHARMA2, ...
  for (let i = 1; i <= 99; i++) {
    const candidate = `${baseName}${i}`;
    const found = await Agent.findOne({
      $or: [{ referName: candidate }, { agentCode: candidate }]
    }).lean();
    if (!found) return candidate;
  }

  return `${baseName}${Date.now().toString().slice(-4)}`;
}

// GET: Lookup or verify an agent by Refer Name, code, or phone
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code")?.trim().toUpperCase();
    const phone = searchParams.get("phone")?.trim();

    if (code) {
      const agent = await Agent.findOne({
        $or: [
          { referName: code },
          { agentCode: code },
          { referName: new RegExp(`^${code}$`, "i") },
          { agentCode: new RegExp(`^${code}$`, "i") },
          { fullName: new RegExp(`^${code}$`, "i") }
        ],
        status: "ACTIVE"
      })
        .select("agentCode referName fullName agencyName city status")
        .lean();

      if (!agent) {
        return NextResponse.json({ success: false, error: "Refer Name not found or inactive." }, { status: 404 });
      }
      return NextResponse.json({ success: true, agent });
    }

    if (phone) {
      const cleanPhone = phone.replace(/[^0-9]/g, "").slice(-10);
      if (cleanPhone.length < 10) {
        return NextResponse.json({ success: false, error: "Valid 10-digit mobile number required." }, { status: 400 });
      }

      const agent = await Agent.findOne({
        $or: [
          { mobileNumber: cleanPhone },
          { mobileNumber: `+91${cleanPhone}` },
          { mobileNumber: cleanPhone.slice(-10) }
        ],
        status: "ACTIVE"
      })
        .select("agentCode referName fullName agencyName city status")
        .lean();

      if (!agent) {
        return NextResponse.json({ success: false, error: "No partner account found with this mobile number." }, { status: 404 });
      }
      return NextResponse.json({ success: true, agent });
    }

    return NextResponse.json({ success: false, error: "Refer Name or phone is required." }, { status: 400 });
  } catch (error: any) {
    console.error("[AGENTS API GET ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Register a new refer partner and assign unique Refer Name
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { fullName, mobileNumber, email, agencyName, city, state, password, bankDetails, referName: customReferName } = body;

    if (!fullName?.trim()) {
      return NextResponse.json({ success: false, error: "Full Name is required." }, { status: 400 });
    }
    if (!mobileNumber?.trim() || mobileNumber.replace(/[^0-9]/g, "").length < 10) {
      return NextResponse.json({ success: false, error: "A valid 10-digit mobile number is required." }, { status: 400 });
    }

    const cleanPhone = mobileNumber.replace(/[^0-9]/g, "").slice(-10);

    // Check if agent already exists
    const existing = await Agent.findOne({
      $or: [
        { mobileNumber: cleanPhone },
        { mobileNumber: `+91${cleanPhone}` }
      ]
    });

    if (existing) {
      const sanitizedExisting = existing.toObject ? existing.toObject() : { ...existing };
      delete sanitizedExisting.password;
      const refName = existing.referName || existing.agentCode;
      return NextResponse.json({
        success: true,
        alreadyRegistered: true,
        message: `You are already registered with Refer Name: ${refName}. Please sign in to access your partner dashboard.`,
        agent: sanitizedExisting
      });
    }

    const assignedReferName = await generateUniqueReferName(fullName, customReferName);

    let hashedPassword = "";
    if (password && password.trim()) {
      hashedPassword = await bcrypt.hash(password.trim(), 10);
    }

    const newAgent = await Agent.create({
      agentCode: assignedReferName,
      referName: assignedReferName,
      fullName: fullName.trim(),
      mobileNumber: cleanPhone,
      email: email?.trim().toLowerCase() || "",
      agencyName: agencyName?.trim() || "",
      city: city?.trim() || "",
      state: state?.trim() || "",
      password: hashedPassword,
      status: "ACTIVE",
      commissionRates: {
        eggDonorCommission: 5000,
        spermDonorCommission: 0, // Clinic only rewards for egg donor referrals
      },
      bankDetails: {
        accountHolderName: bankDetails?.accountHolderName?.trim() || fullName.trim(),
        bankName: bankDetails?.bankName?.trim() || "",
        accountNumber: bankDetails?.accountNumber?.trim() || "",
        ifscCode: bankDetails?.ifscCode?.trim().toUpperCase() || "",
        upiId: bankDetails?.upiId?.trim() || "",
      },
      stats: {
        totalEggDonors: 0,
        totalSpermDonors: 0,
        approvedDonors: 0,
        totalEarnings: 0,
        pendingPayout: 0,
        paidPayout: 0,
      }
    });

    const sanitizedNewAgent = newAgent.toObject ? newAgent.toObject() : { ...newAgent };
    delete sanitizedNewAgent.password;

    return NextResponse.json({
      success: true,
      message: `Refer Partner registered successfully. Your Refer Name is ${assignedReferName}`,
      agent: sanitizedNewAgent
    }, { status: 201 });
  } catch (error: any) {
    console.error("[AGENTS API POST ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
