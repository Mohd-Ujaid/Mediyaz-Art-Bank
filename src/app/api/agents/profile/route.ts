import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Agent } from "@/models/Agent";
import { getVerifiedPartner } from "@/lib/partner-auth";

export async function PATCH(req: Request) {
  try {
    // 1. Verify partner session
    const verifiedAgentCode = await getVerifiedPartner(req);
    if (!verifiedAgentCode) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Please sign in to update payout details." },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const body = await req.json();
    const { agentCode, bankDetails, email, agencyName, city, state } = body;

    // 2. Ensure partner can only update their own account
    const targetCode = (agentCode || verifiedAgentCode).trim().toUpperCase();
    if (targetCode !== verifiedAgentCode) {
      return NextResponse.json(
        { success: false, error: "Forbidden: You cannot modify another partner's banking details." },
        { status: 403 }
      );
    }

    const agent = await Agent.findOne({ agentCode: verifiedAgentCode });
    if (!agent) {
      return NextResponse.json({ success: false, error: "Refer Partner not found." }, { status: 404 });
    }

    if (bankDetails) {
      // Validate inputs
      const cleanAcc = bankDetails.accountNumber ? String(bankDetails.accountNumber).replace(/[^0-9]/g, "") : "";
      const cleanIfsc = bankDetails.ifscCode ? String(bankDetails.ifscCode).trim().toUpperCase() : "";

      agent.bankDetails = {
        accountHolderName: bankDetails.accountHolderName?.trim() || agent.bankDetails?.accountHolderName || agent.fullName,
        bankName: bankDetails.bankName?.trim() || agent.bankDetails?.bankName || "",
        accountNumber: cleanAcc || agent.bankDetails?.accountNumber || "",
        ifscCode: cleanIfsc || agent.bankDetails?.ifscCode || "",
        upiId: bankDetails.upiId?.trim() || agent.bankDetails?.upiId || "",
      };
    }

    if (email !== undefined) agent.email = email.trim().toLowerCase();
    if (agencyName !== undefined) agent.agencyName = agencyName.trim();
    if (city !== undefined) agent.city = city.trim();
    if (state !== undefined) agent.state = state.trim();

    await agent.save();

    const sanitizedAgent = agent.toObject ? agent.toObject() : { ...agent };
    delete sanitizedAgent.password;

    return NextResponse.json({
      success: true,
      message: "Payout and partner details updated successfully.",
      agent: sanitizedAgent
    });
  } catch (error: any) {
    console.error("[PARTNER PROFILE UPDATE ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
