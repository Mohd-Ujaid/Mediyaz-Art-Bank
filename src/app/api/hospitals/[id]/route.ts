import { NextResponse } from "next/server";

export async function PUT() {
  return NextResponse.json({ success: false, error: "Unauthorized. Hospital management is in admin portal." }, { status: 403 });
}

export async function DELETE() {
  return NextResponse.json({ success: false, error: "Unauthorized. Hospital management is in admin portal." }, { status: 403 });
}
