import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lqvzhffsqspwmahiajfm.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdnpoZmZzcXNwd21haGlhamZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0Njg5MjIsImV4cCI6MjEwNTA0NDkyMn0.BOjbq_tp3OxqMR2tKhmRcmofjpnoU741u85B8poMHK0";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawEmail = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const source = typeof body?.source === "string" ? body.source.trim() : "website";

    if (!rawEmail || !EMAIL_REGEX.test(rawEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Insert into Supabase early_access_signups table
    const response = await fetch(`${SUPABASE_URL}/rest/v1/early_access_signups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "resolution=ignore-duplicates,return=representation",
      },
      body: JSON.stringify({
        email: rawEmail,
        source: source,
        status: "PENDING",
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Supabase early access insert error:", errText);
      return NextResponse.json(
        { error: "Unable to save your request right now. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      email: rawEmail,
      message: "You're on the early access list.",
    });
  } catch (error) {
    console.error("Early access handler error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
