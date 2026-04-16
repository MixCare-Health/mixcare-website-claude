import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── POST /api/partners ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, email, company, type, website, message } = await req.json();

    if (!name || !email || !company || !type) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const now = new Date().toLocaleString("en-HK", {
      timeZone: "Asia/Hong_Kong",
      dateStyle: "full",
      timeStyle: "short",
    });

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0d9488, #1e3a5f); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">New Partner Application</h1>
          <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px;">MixCare Health Website · ${now} HKT</p>
        </div>
        <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; width: 140px;">
                <strong style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Name</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                <strong style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                <a href="mailto:${email}" style="color: #0d9488; font-size: 15px;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                <strong style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Company</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 15px;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                <strong style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Partner Type</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 15px;">${type}</td>
            </tr>
            ${website ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                <strong style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Website</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 15px;">
                <a href="${website}" style="color: #0d9488;">${website}</a>
              </td>
            </tr>` : ""}
            <tr>
              <td style="padding: 14px 0 6px; vertical-align: top;">
                <strong style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</strong>
              </td>
              <td style="padding: 14px 0 6px; color: #0f172a; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message || "—"}</td>
            </tr>
          </table>
          <div style="margin-top: 28px; padding: 16px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 13px; color: #64748b;">
              Reply directly to this email to respond to <strong>${name}</strong> at <a href="mailto:${email}" style="color: #0d9488;">${email}</a>.
            </p>
          </div>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "MixCare Health Website <noreply@mixcarehealth.com>",
      to: ["sales@mixcarehealth.com"],
      cc: ["alex@mixcarehealth.com", "kelvin.chu@mixcarehealth.com"],
      replyTo: email,
      subject: `New Partner Application: ${name} — ${company} (${type})`,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error (partners):", JSON.stringify(error));
      return NextResponse.json(
        { error: `Email error: ${(error as { message?: string }).message ?? JSON.stringify(error)}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Partners API error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
