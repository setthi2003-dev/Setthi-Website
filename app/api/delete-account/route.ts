import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lqvzhffsqspwmahiajfm.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdnpoZmZzcXNwd21haGlhamZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0Njg5MjIsImV4cCI6MjEwNTA0NDkyMn0.BOjbq_tp3OxqMR2tKhmRcmofjpnoU741u85B8poMHK0";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateConfirmationCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SETTHI-DEL-${random}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawEmail = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const reason = typeof body?.reason === "string" ? body.reason.trim().slice(0, 500) : "";
    const confirmConsent = Boolean(body?.confirmConsent);

    if (!rawEmail || !EMAIL_REGEX.test(rawEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid registered email address." },
        { status: 400 }
      );
    }

    if (!confirmConsent) {
      return NextResponse.json(
        { error: "Please check the confirmation box acknowledging permanent data deletion." },
        { status: 400 }
      );
    }

    const confirmationCode = generateConfirmationCode();

    // Insert into Supabase account_deletion_requests table
    const response = await fetch(`${SUPABASE_URL}/rest/v1/account_deletion_requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        email: rawEmail,
        reason: reason || null,
        confirmation_code: confirmationCode,
        status: "PENDING",
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Supabase account deletion insert error:", errText);
      return NextResponse.json(
        { error: "Unable to submit your deletion request right now. Please try again or email setthi2003@gmail.com directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      email: rawEmail,
      confirmationCode: confirmationCode,
      message: "Account deletion request received and queued for processing.",
      retentionDays: 30,
    });
  } catch (error) {
    console.error("Account deletion route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or contact setthi2003@gmail.com." },
      { status: 500 }
    );
  }
}
