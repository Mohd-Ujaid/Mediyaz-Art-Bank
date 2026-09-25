import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Hospital } from "@/models/Hospital";
// GET — List hospitals with pagination, filtering, search
export async function GET(req: Request) {
  try {
    const isFullAdmin = false;

    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const city = searchParams.get("city") || "";
    const state = searchParams.get("state") || "";
    const status = searchParams.get("status") || "";
    const hospitalType = searchParams.get("type") || "";
    const organ = searchParams.get("organ") || "";
    
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));

    const query: any = {};

    // Soft delete filter: default filter out ARCHIVED unless specifically queried
    if (status) {
      query.status = status;
    } else {
      query.status = { $ne: "ARCHIVED" };
    }

    const escapeRegex = (s: string) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    if (city) query.city = { $regex: escapeRegex(city), $options: "i" };
    if (state) query.state = { $regex: escapeRegex(state), $options: "i" };
    if (hospitalType) query.hospitalType = hospitalType;
    if (organ) query.organTypesSupported = organ;

    if (search) {
      const safeSearch = escapeRegex(search);
      query.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { code: { $regex: safeSearch, $options: "i" } },
        { contactPerson: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const total = await Hospital.countDocuments(query);
    const rawHospitals = await Hospital.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // RBAC Sanitization: Omit pricing fields if the user is not ADMIN or SUPER_ADMIN
    const hospitals = rawHospitals.map(h => {
      const obj: any = h.toObject();
      if (!isFullAdmin) {
        delete obj.donorDealPrice;
        delete obj.serviceCharge;
        delete obj.processingFee;
        delete obj.registrationFee;
        delete obj.commission;
        delete obj.additionalCharges;
        delete obj.currency;
        delete obj.pricingHistory;
      }
      return obj;
    });

    return NextResponse.json({
      success: true,
      hospitals,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        limit
      }
    });
  } catch (error: any) {
    console.error("Fetch hospitals error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch hospitals." },
      { status: 500 }
    );
  }
}

// POST — Create a new hospital/clinic (Admin Only)
export async function POST(req: Request) {
  return NextResponse.json({ success: false, error: "Unauthorized. Hospital management is in admin portal." }, { status: 403 });
}
