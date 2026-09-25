import { NextResponse } from "next/server";
import { createDraftSpermRegistrationAction } from "@/features/sperm-registration/actions/sperm-registration.actions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createDraftSpermRegistrationAction(body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
