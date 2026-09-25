const fs = require('fs');
const path = require('path');

const mediyazRoot = path.resolve(__dirname, '../../../../mediyaz');

// 1. Update egg route.ts
const eggRoutePath = path.join(mediyazRoot, 'src/app/api/donor-registrations/egg/route.ts');
const eggRouteCode = `import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { EggDonorRegistration } from "@/models/EggDonorRegistration";
import { DonorRegistration } from "@/models/DonorRegistration";
import { Agent } from "@/models/Agent";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { Hospital } from "@/models/Hospital";

export async function GET(req: Request) {
  try {
    const reqHeaders = await headers();
    const session = await auth.api.getSession({ headers: reqHeaders });

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const role = (session.user as any)?.role;
    const permissions = (session.user as any)?.permissions || [];
    const isAllowed =
      ["ADMIN", "SUPER_ADMIN"].includes(role) ||
      permissions.includes("VIEW_REGISTRATIONS") ||
      permissions.includes("VIEW_REG_CHECKS");

    if (!isAllowed) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    await connectToDatabase();
    const _forceRegister = Hospital.modelName;
    const _forceRegisterAgent = Agent.modelName;

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const bloodGroup = searchParams.get("bloodGroup") || "";
    const state = searchParams.get("state") || "";
    const city = searchParams.get("city") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const query: any = {};
    if (status) query.status = status;
    if (bloodGroup && bloodGroup !== "all") query["personalInfo.bloodGroup"] = bloodGroup;
    if (state && state !== "all") query["contactInfo.state"] = { $regex: state, $options: "i" };
    if (city && city !== "all") query["contactInfo.city"] = { $regex: city, $options: "i" };

    if (search) {
      query.$or = [
        { registrationId: { $regex: search, $options: "i" } },
        { "personalInfo.fullName": { $regex: search, $options: "i" } },
        { "personalInfo.husbandName": { $regex: search, $options: "i" } },
        { "personalInfo.spouseName": { $regex: search, $options: "i" } },
        { "contactInfo.emailAddress": { $regex: search, $options: "i" } },
        { "contactInfo.mobileNumber": { $regex: search, $options: "i" } },
        { agentCode: { $regex: search, $options: "i" } },
      ];
    }

    const total = await EggDonorRegistration.countDocuments(query);
    const rawRegistrations = await EggDonorRegistration.find(query)
      .populate("assignedHospital")
      .populate("agentId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const agentCodesToLookup = rawRegistrations
      .filter((r: any) => r.agentCode && (!r.agentId || !r.agentId.fullName))
      .map((r: any) => r.agentCode);

    const agentMap: Record<string, any> = {};
    if (agentCodesToLookup.length > 0) {
      const agents = await Agent.find({ agentCode: { $in: agentCodesToLookup } }).lean();
      for (const ag of agents) {
        agentMap[ag.agentCode] = ag;
      }
    }

    const registrations = rawRegistrations.map((r: any) => {
      const ag = (r.agentId && r.agentId.fullName) ? r.agentId : (r.agentCode ? agentMap[r.agentCode] : null);
      return {
        ...r,
        agentName: ag?.fullName || (r.agentCode ? \`Agent (\${r.agentCode})\` : null),
        agentDetails: ag || null,
      };
    });

    return NextResponse.json({
      success: true,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      page,
      registrations,
    });
  } catch (error: any) {
    console.error("Error fetching egg donor registrations:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const reqHeaders = await headers();
    const session = await auth.api.getSession({ headers: reqHeaders });

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    const registrationId = \`MED-ED-\${new Date().getFullYear()}-\${timestamp}\${random}\`;

    const eggData = {
      ...body,
      registrationId,
      donorType: "egg",
      personalInfo: {
        ...body.personalInfo,
        gender: "Female",
        husbandName: body.personalInfo?.husbandName || body.personalInfo?.spouseName || "",
        husbandOccupation: body.personalInfo?.husbandOccupation || body.personalInfo?.spouseOccupation || "",
      },
    };

    const registration = await EggDonorRegistration.create(eggData);

    try {
      await DonorRegistration.create(eggData);
    } catch (syncErr) {
      console.warn("Legacy sync error (non-fatal):", syncErr);
    }

    return NextResponse.json({ success: true, registration }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating egg donor registration:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
`;
fs.writeFileSync(eggRoutePath, eggRouteCode, 'utf8');
console.log('Updated egg route.ts');

// 2. Update sperm route.ts
const spermRoutePath = path.join(mediyazRoot, 'src/app/api/donor-registrations/sperm/route.ts');
const spermRouteCode = `import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SpermDonorRegistration } from "@/models/SpermDonorRegistration";
import { DonorRegistration } from "@/models/DonorRegistration";
import { Agent } from "@/models/Agent";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { Hospital } from "@/models/Hospital";

export async function GET(req: Request) {
  try {
    const reqHeaders = await headers();
    const session = await auth.api.getSession({ headers: reqHeaders });

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const role = (session.user as any)?.role;
    const permissions = (session.user as any)?.permissions || [];
    const isAllowed =
      ["ADMIN", "SUPER_ADMIN"].includes(role) ||
      permissions.includes("VIEW_REGISTRATIONS") ||
      permissions.includes("VIEW_REG_CHECKS");

    if (!isAllowed) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    await connectToDatabase();
    const _forceRegister = Hospital.modelName;
    const _forceRegisterAgent = Agent.modelName;

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const bloodGroup = searchParams.get("bloodGroup") || "";
    const state = searchParams.get("state") || "";
    const city = searchParams.get("city") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const query: any = {};
    if (status) query.status = status;
    if (bloodGroup && bloodGroup !== "all") query["personalInfo.bloodGroup"] = bloodGroup;
    if (state && state !== "all") query["contactInfo.state"] = { $regex: state, $options: "i" };
    if (city && city !== "all") query["contactInfo.city"] = { $regex: city, $options: "i" };

    if (search) {
      query.$or = [
        { registrationId: { $regex: search, $options: "i" } },
        { "personalInfo.fullName": { $regex: search, $options: "i" } },
        { "personalInfo.fatherName": { $regex: search, $options: "i" } },
        { "personalInfo.motherName": { $regex: search, $options: "i" } },
        { "contactInfo.emailAddress": { $regex: search, $options: "i" } },
        { "contactInfo.mobileNumber": { $regex: search, $options: "i" } },
        { agentCode: { $regex: search, $options: "i" } },
      ];
    }

    const total = await SpermDonorRegistration.countDocuments(query);
    const rawRegistrations = await SpermDonorRegistration.find(query)
      .populate("assignedHospital")
      .populate("agentId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const agentCodesToLookup = rawRegistrations
      .filter((r: any) => r.agentCode && (!r.agentId || !r.agentId.fullName))
      .map((r: any) => r.agentCode);

    const agentMap: Record<string, any> = {};
    if (agentCodesToLookup.length > 0) {
      const agents = await Agent.find({ agentCode: { $in: agentCodesToLookup } }).lean();
      for (const ag of agents) {
        agentMap[ag.agentCode] = ag;
      }
    }

    const registrations = rawRegistrations.map((r: any) => {
      const ag = (r.agentId && r.agentId.fullName) ? r.agentId : (r.agentCode ? agentMap[r.agentCode] : null);
      return {
        ...r,
        agentName: ag?.fullName || (r.agentCode ? \`Agent (\${r.agentCode})\` : null),
        agentDetails: ag || null,
      };
    });

    return NextResponse.json({
      success: true,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      page,
      registrations,
    });
  } catch (error: any) {
    console.error("Error fetching sperm donor registrations:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const reqHeaders = await headers();
    const session = await auth.api.getSession({ headers: reqHeaders });

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    const registrationId = \`MED-SD-\${new Date().getFullYear()}-\${timestamp}\${random}\`;

    const spermData = {
      ...body,
      registrationId,
      donorType: "sperm",
      personalInfo: {
        ...body.personalInfo,
        gender: "Male",
      },
    };

    const registration = await SpermDonorRegistration.create(spermData);

    try {
      await DonorRegistration.create(spermData);
    } catch (syncErr) {
      console.warn("Legacy sync error (non-fatal):", syncErr);
    }

    return NextResponse.json({ success: true, registration }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating sperm donor registration:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
`;
fs.writeFileSync(spermRoutePath, spermRouteCode, 'utf8');
console.log('Updated sperm route.ts');
