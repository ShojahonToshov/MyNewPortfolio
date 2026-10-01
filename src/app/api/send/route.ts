import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ error: "Email and message are required" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      // УКАЖИТЕ ЗДЕСЬ СВОЙ EMAIL, НА КОТОРЫЙ РЕГИСТРИРОВАЛИ RESEND
      to: ["vash_email@example.com"], 
      subject: `New Portfolio Message from ${email}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
