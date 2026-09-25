import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Agent } from "@/models/Agent";
import bcrypt from "bcryptjs";
import { signPartnerToken } from "@/lib/partner-auth";

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier?.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your Refer Name or 10-digit Mobile Number." },
        { status: 400 }
      );
    }

    const cleanInput = identifier.trim();
    const cleanPhone = cleanInput.replace(/[^0-9]/g, "").slice(-10);
    const escapedInput = escapeRegex(cleanInput);

    const query: any = {
      $or: [
        { referName: cleanInput.toUpperCase() },
        { agentCode: cleanInput.toUpperCase() },
        { referName: new RegExp(`^${escapedInput}$`, "i") },
        { agentCode: new RegExp(`^${escapedInput}$`, "i") },
        { fullName: new RegExp(`^${escapedInput}$`, "i") },
        ...(cleanPhone && cleanPhone.length === 10
          ? [
              { mobileNumber: cleanPhone },
              { mobileNumber: `+91${cleanPhone}` }
            ]
          : [])
      ]
    };

    const agent = await Agent.findOne(query);

    if (!agent) {
      return NextResponse.json(
        { success: false, error: "No Refer Partner account found for this Refer Name or Mobile Number." },
        { status: 404 }
      );
    }

    if (agent.status === "SUSPENDED") {
      return NextResponse.json(
        { success: false, error: "This Refer Partner account is currently suspended. Please contact clinic support." },
        { status: 403 }
      );
    }

    // Check password if set on account
    if (agent.password) {
      if (!password?.trim()) {
        return NextResponse.json(
          { success: false, error: "Please enter your password to sign in." },
          { status: 400 }
        );
      }

      const isMatch = await bcrypt.compare(password.trim(), agent.password);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, error: "Incorrect password. Please verify and try again." },
          { status: 401 }
        );
      }
    } else {
      // Legacy account without password: if password supplied now, set it for future logins
      if (password && password.trim().length >= 6) {
        agent.password = await bcrypt.hash(password.trim(), 10);
        await agent.save();
      }
    }

    const sanitizedAgent = agent.toObject ? agent.toObject() : { ...agent };
    delete sanitizedAgent.password;

    // Generate cryptographically signed partner token
    const token = signPartnerToken(agent.agentCode);

    const response = NextResponse.json({
      success: true,
      message: `Welcome back, ${agent.fullName}!`,
      agent: sanitizedAgent,
      token,
    });

    // Set signed, secure httpOnly session cookie
    response.cookies.set("mediyaz_partner_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/"
    });

    // Also set non-sensitive partner code for UI display
    response.cookies.set("mediyaz_partner_code", agent.agentCode, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/"
    });

    return response;
  } catch (error: any) {
    console.error("[PARTNER LOGIN API ERROR]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
