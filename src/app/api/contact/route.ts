import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: "SilvrStns <orders@silvrstns.com>",
      to: "silvrstns@gmail.com",
      replyTo: email,
      subject: `Contact Form — ${name}`,
      html: `
        <div style="max-width:520px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#222;">
          <h2 style="font-size:18px;font-weight:300;letter-spacing:0.08em;margin-bottom:24px;">New Contact Message</h2>
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;">Name</p>
          <p style="margin:0 0 16px;font-size:14px;">${name}</p>
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;">Email</p>
          <p style="margin:0 0 16px;font-size:14px;">${email}</p>
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;">Message</p>
          <p style="margin:0;font-size:14px;white-space:pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend contact form error:", result.error);
      return NextResponse.json(
        { error: `Failed to send message: ${result.error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
