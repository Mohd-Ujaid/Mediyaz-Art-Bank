import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Recipient } from "@/models/Recipient";
import { Donor } from "@/models/Donor";
import { Employee } from "@/models/Employee";

function escapeRegex(str: string): string {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function maskPhone(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.length <= 4) return "****";
  return cleaned.slice(0, 2) + "******" + cleaned.slice(-4);
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type") || ""; // patient, donor, doctor, staff
    const rawQuery = (searchParams.get("query") || "").trim();

    // Prevent full dump or short prefix enumeration attacks
    if (!type || rawQuery.length < 3) {
      return NextResponse.json({ success: true, results: [] });
    }

    const safeRegex = new RegExp(escapeRegex(rawQuery), "i");
    let results: any[] = [];

    if (type === "patient") {
      const recipients = await Recipient.find()
        .populate({
          path: "user",
          select: "name phone",
          match: {
            $or: [
              { name: { $regex: safeRegex } },
              { phone: { $regex: safeRegex } },
            ],
          },
        })
        .limit(10);

      results = recipients
        .filter((r) => r.user !== null && r.user !== undefined)
        .map((r: any) => {
          const masked = maskPhone(r.user.phone || "");
          return {
            id: r._id.toString(),
            name: r.user.name,
            mobile: masked,
            label: `${r.user.name} (Mobile: ${masked})`,
          };
        });
    } else if (type === "donor") {
      const donors = await Donor.find({
        donorId: { $regex: safeRegex },
      })
        .populate({
          path: "user",
          select: "name phone",
        })
        .limit(10);

      results = donors.map((d: any) => {
        const masked = maskPhone(d.user?.phone || "");
        return {
          id: d.donorId,
          name: d.user?.name || "Altruistic Donor",
          mobile: masked,
          label: `${d.user?.name || "Donor"} (ID: ${d.donorId})`,
        };
      });
    } else if (type === "doctor") {
      const doctors = await Employee.find({
        designation: "Doctor",
        $or: [
          { name: { $regex: safeRegex } },
          { department: { $regex: safeRegex } },
        ],
      }).limit(10);

      results = doctors.map((d) => ({
        id: d.employeeId,
        name: d.name,
        clinicName: d.department || "Fertility Clinic",
        mobile: maskPhone(d.phone || ""),
        label: `Dr. ${d.name} (${d.department || "Fertility Clinic"})`,
      }));
    } else if (type === "staff") {
      const staff = await Employee.find({
        designation: { $ne: "Doctor" },
        name: { $regex: safeRegex },
      }).limit(10);

      results = staff.map((s) => ({
        id: s.employeeId,
        name: s.name,
        department: s.department,
        label: `${s.name} (${s.department})`,
      }));
    }

    return NextResponse.json({ success: true, results: results.slice(0, 10) });
  } catch (error: any) {
    console.error("Referral search error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
