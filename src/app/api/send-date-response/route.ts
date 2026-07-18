import { NextRequest, NextResponse } from "next/server";
import type { TelegramPayload } from "@/types/date-form";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const apiUrl = process.env.API_URL as string;
    const token = process.env.AUTH_TOKEN as string;
    const body = await request.json();

    // Validate required fields
    if (!body.receiverName || !body.formData || !body.uuid) {
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
      uuid: String(body.uuid),
    };
    const response = await fetch(`${apiUrl}/buttonofdestiny${body.uuid ? `/${body.uuid}` : ''}`, {
        method:  "POST",
        headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // const result = await response.json();
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