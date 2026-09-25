import { NextResponse } from "next/server";

// Referral rewards administration is restricted to the Admin Portal
export async function GET() {
  return NextResponse.json(
    { success: false, error: "Forbidden: Referral administration is only accessible via the Admin portal." },
    { status: 403 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { success: false, error: "Forbidden: Referral updates are only accessible via the Admin portal." },
    { status: 403 }
  );
}
