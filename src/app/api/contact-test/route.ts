/**
 * Temporary diagnostic endpoint — DELETE after confirming email works.
 * Only accessible if RESEND_API_KEY is set (safe to leave in production temporarily).
 * Hit GET /api/contact-test to verify Resend and env vars are wired up correctly.
 */
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  const results: Record<string, string> = {};

  // 1. Check env vars are present
  results.RESEND_API_KEY    = process.env.RESEND_API_KEY    ? "✅ set" : "❌ MISSING";
  results.RECAPTCHA_SECRET  = process.env.RECAPTCHA_SECRET_KEY ? "✅ set" : "❌ MISSING";
  results.RECAPTCHA_SITE    = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? "✅ set" : "❌ MISSING";

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ results, error: "RESEND_API_KEY is missing — redeploy Vercel after adding env vars." }, { status: 500 });
  }

  // 2. Try sending a real test email
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: "MixCare Health Website <noreply@mixcarehealth.com>",
    to: ["kelvin.chu@mixcarehealth.com"],
    subject: "✅ MixCare Contact Form — Resend Test",
    html: "<p>If you received this, Resend is wired up correctly on production.</p>",
  });

  if (error) {
    results.resend = `❌ ${JSON.stringify(error)}`;
    return NextResponse.json({ results, error }, { status: 500 });
  }

  results.resend = `✅ Email sent — id: ${data?.id}`;
  return NextResponse.json({ results, message: "All good! Check kelvin.chu@mixcarehealth.com for the test email." });
}
