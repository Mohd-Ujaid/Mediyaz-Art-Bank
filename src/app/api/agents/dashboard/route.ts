import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Agent } from "@/models/Agent";
import { EggDonorRegistration } from "@/models/EggDonorRegistration";
import { DonorRegistration } from "@/models/DonorRegistration";
import { getVerifiedPartner } from "@/lib/partner-auth";

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req: Request) {
  try {
    // 1. Enforce partner authentication session
    const verifiedAgentCode = await getVerifiedPartner(req);
    if (!verifiedAgentCode) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Please sign in to your Refer Partner account." },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code")?.trim().toUpperCase() || verifiedAgentCode;

    // Verify authorized access to requested account
    if (code && code !== verifiedAgentCode) {
      // Check if code matches referName of the authenticated agent
      const authAgent = await Agent.findOne({ agentCode: verifiedAgentCode }).lean();
      if (!authAgent || (authAgent.referName?.toUpperCase() !== code && authAgent.agentCode !== code)) {
        return NextResponse.json(
          { success: false, error: "Forbidden: You cannot access another partner's dashboard." },
          { status: 403 }
        );
      }
    }

    const agent = await Agent.findOne({ agentCode: verifiedAgentCode }).lean();
    if (!agent) {
      return NextResponse.json({ success: false, error: "Refer Partner account not found." }, { status: 404 });
    }

    const agentFilter = {
      $or: [
        { agentCode: new RegExp(`^${agent.agentCode}$`, "i") },
        ...(agent.referName ? [{ agentCode: new RegExp(`^${agent.referName}$`, "i") }] : []),
        { agentId: agent._id },
        { "referral.patientOrDonorId": new RegExp(`^${agent.agentCode}$`, "i") },
        ...(agent.referName ? [{ "referral.patientOrDonorId": new RegExp(`^${agent.referName}$`, "i") }] : []),
        { "referral.otherSourceDetails": new RegExp(agent.agentCode, "i") },
        ...(agent.fullName ? [{ "referral.patientOrDonorId": new RegExp(`^${agent.fullName}$`, "i") }] : []),
      ]
    };

    const selectFields = "registrationId donorType status personalInfo.fullName personalInfo.bloodGroup contactInfo.city createdAt updatedAt agentPayout";

    // Query both EggDonorRegistration and legacy DonorRegistration (egg only)
    const [eggDonors, legacyDonors] = await Promise.all([
      EggDonorRegistration.find(agentFilter).sort({ createdAt: -1 }).select(selectFields).lean(),
      DonorRegistration.find({ ...agentFilter, donorType: "egg" }).sort({ createdAt: -1 }).select(selectFields).lean(),
    ]);

    // Deduplicate by registrationId
    const donorMap = new Map<string, any>();
    [...eggDonors, ...legacyDonors].forEach((d: any) => {
      const key = d.registrationId || String(d._id);
      if (!donorMap.has(key)) {
        donorMap.set(key, d);
      } else {
        const existing = donorMap.get(key);
        const existingSt = (existing.agentPayout?.status || "PENDING").toUpperCase();
        const newSt = (d.agentPayout?.status || "PENDING").toUpperCase();
        if (newSt === "PAID" && existingSt !== "PAID") {
          donorMap.set(key, { ...existing, ...d });
        }
      }
    });

    const allEggDonors = Array.from(donorMap.values());
    allEggDonors.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Calculate real-time clinic statistics
    let approvedCount = 0;
    let submittedCount = 0;
    let inReviewCount = 0;
    let draftCount = 0;
    let totalEarnings = 0;
    let paidPayout = 0;
    let pendingPayout = 0;

    const commissionPerEgg = agent.commissionRates?.eggDonorCommission || 5000;

    const formattedDonors = allEggDonors.map((d: any) => {
      const statusUpper = (d.status || "SUBMITTED").toUpperCase();
      if (statusUpper === "APPROVED") {
        approvedCount++;
      } else if (statusUpper === "UNDER_REVIEW") {
        inReviewCount++;
      } else if (statusUpper === "DRAFT") {
        draftCount++;
      } else {
        submittedCount++;
      }

      const payout = d.agentPayout || {};
      const amount = Number(payout.amount) || commissionPerEgg;
      const payoutStatus = (payout.status || "PENDING").toUpperCase();

      totalEarnings += amount;
      if (payoutStatus === "PAID") {
        paidPayout += amount;
      } else if (payoutStatus !== "CANCELLED") {
        pendingPayout += amount;
      }

      // Privacy-safe masking for candidate donor name (e.g. "Priya S.")
      const rawName = d.personalInfo?.fullName || "Candidate Donor";
      const parts = rawName.trim().split(" ");
      const maskedName = parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : parts[0];

      return {
        registrationId: d.registrationId,
        donorType: "egg",
        maskedName,
        bloodGroup: d.personalInfo?.bloodGroup || "—",
        city: d.contactInfo?.city || "—",
        registrationStatus: statusUpper,
        createdAt: d.createdAt,
        payoutAmount: amount,
        payoutStatus,
        paidAt: payout.paidAt || null,
        paymentReference: payout.paymentReference || "",
        paymentNotes: payout.notes || ""
      };
    });

    const stats = {
      totalDonors: allEggDonors.length,
      totalEggDonors: allEggDonors.length,
      approvedDonors: approvedCount,
      underReviewDonors: inReviewCount,
      submittedDonors: submittedCount,
      draftDonors: draftCount,
      totalEarnings,
      paidPayout,
      pendingPayout,
      eggDonorCommission: commissionPerEgg,
    };

    const sanitizedAgent = {
      agentCode: agent.agentCode,
      fullName: agent.fullName,
      agencyName: agent.agencyName,
      mobileNumber: agent.mobileNumber,
      email: agent.email,
      city: agent.city,
      state: agent.state,
      status: agent.status,
      commissionRates: {
        eggDonorCommission: commissionPerEgg,
      },
      bankDetails: agent.bankDetails || {},
    };

    return NextResponse.json({
      success: true,
      agent: sanitizedAgent,
      stats,
      donors: formattedDonors
    });
  } catch (error: any) {
    console.error("[PARTNER DASHBOARD API ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
