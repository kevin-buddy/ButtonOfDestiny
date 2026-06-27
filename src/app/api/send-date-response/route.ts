import { NextRequest, NextResponse } from "next/server";
import { sendDateResponseViaTelegram } from "@/lib/telegram";
import type { TelegramPayload } from "@/types/date-form";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.receiverName || !body.formData) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const payload: TelegramPayload = {
      receiverName: String(body.receiverName).slice(0, 100),
      formData: body.formData,
      submittedAt: new Date().toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      }),
    };

    await sendDateResponseViaTelegram(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[send-date-response] Error:", error);

    // Return a generic error to the client — never expose internals
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}