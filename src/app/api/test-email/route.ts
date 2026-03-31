import { NextResponse } from "next/server";
import { sendOrderConfirmation } from "@/lib/email";

export async function GET() {
  try {
    console.log("RESEND_API_KEY present:", !!process.env.RESEND_API_KEY);
    console.log("RESEND_API_KEY prefix:", process.env.RESEND_API_KEY?.slice(0, 6));

    await sendOrderConfirmation({
      to: "silvrstns@gmail.com",
      orderNumber: "SS-TEST",
      items: "Test Item: One Size",
      totalAmount: "$0.00",
      trackingNumber: "TEST123",
      carrier: "USPS",
    });

    return NextResponse.json({ success: true, message: "Test email sent!" });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Test email error:", err);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
