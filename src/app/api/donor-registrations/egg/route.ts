import { NextResponse } from "next/server";
import { createDraftEggRegistrationAction } from "@/features/egg-registration/actions/egg-registration.actions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createDraftEggRegistrationAction(body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
