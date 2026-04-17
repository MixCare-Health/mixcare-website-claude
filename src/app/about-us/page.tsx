import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamPhoto from "@/components/shared/TeamPhoto";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/about-us");

export const metadata: Metadata = {
  title: "About Us — MixCare Health | Our Mission, Team & Story",
  description:
    "MixCare Health is a data-driven health and wellness platform improving access to thousands of health and wellness services through an AI-powered healthcare platform.",
  keywords: [
    "about MixCare Health", "digital health company Hong Kong", "health tech startup",
    "MixCare team", "health benefits mission", "AI health platform Asia",
    "MixCare leadership", "health innovation Hong Kong",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `About Us — MixCare Health | ${SITE_NAME}`,
    description:
      "Next generation of wellness — AI-powered, flexible, and human-first health benefits across Asia-Pacific.",
    url: canonical,
    images: ogImage("About MixCare Health"),
  },
  twitter: {
    title: `About Us | ${SITE_NAME}`,
    description: "AI-powered, flexible, and human-first health benefits across Asia-Pacific.",
    images: ["/opengraph-image.png"],
  },
};

// ── Static data ───────────────────────────────────────────────────────────────

const TEAM = [
  { name: "Alex Wong",   role: "CEO",              photo: "/team/Alex-wong-photo.png" },
  { name: "Kelvin Chu",  role: "CPO",              photo: "/team/kelvin-chu-photo.png" },
  { name: "Jason Ang",   role: "CBO",              photo: "/team/Jason-ang-photo.png" },
  { name: "Alfred Ho",   role: "Head of Finance",  photo: "/team/alfred-ho-mixcare-150x150.png" },
];

const AWARDS = [
  "HR Vendor of the Year 2025 - Best Corporate Health and Wellness Provider",
  "HR Vendor of the Year 2024 - Best Corporate Health and Wellness Provider",
  "HR Vendor of the Year 2024 - Silver Winner",
  "InsureTech Connect Asia - 2024 Hong Kong Winner",
  "Insurtech Insights - People Choice Award Asia 2023",
  "HKSTP X PwC Tech Raiser 2022",
  "Startup Express Top 10 by HKTDC 2022",
  "K-Startup Grand Challenge 2022 (out of 2653 teams)",
  "Zurich Innovation Championship 2022 (HK) Top 5",
  "Jumpstarter by Alibaba 2022 Top 100 Finalist",
  "HKAI Lab Accelerator (by Sense Time and Alibaba)",
  "Cyberport Incubation Program 2021",
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AboutUsPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const a = t.about;

  return (
    <main>
      <JsonLd data={[
        webPageSchema("About Us — MixCare Health", "Next generation of wellness — AI-powered health benefits across Asia-Pacific.", "/about-us"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About Us", path: "/about-us" }]),
      ]} />
      <AppNavbar />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="pt-28 pb-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl" style={{ background: "radial-gradient(circle, #0d9488, transparent)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: "#ccfbf1", color: "#0f766e" }}
          >
            {a.hero.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            {a.hero.headline}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {a.hero.headlineHighlight}
            </span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            {a.hero.sub}
          </p>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">{a.story.headline}</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-5">
            {a.story.p1}
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            {a.story.p2}
          </p>
        </div>
      </section>

      {/* ── Management Team ──────────────────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">
            {a.team.headline}
          </h2>
          <p className="text-slate-500 text-center mb-10 max-w-2xl mx-auto">
            {a.team.sub}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-all text-center"
              >
                {/* Photo */}
                <TeamPhoto
                  src={member.photo}
                  name={member.name}
                  className="object-cover object-top mx-auto rounded-full"
                  style={member.name === "Alfred Ho"
                    ? { width: 120, height: 120, marginTop: 55 }
                    : { width: 160, height: 160, marginTop: 20 }
                  }
                />
                {/* Info */}
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
                  <p className="text-sm font-semibold mt-1" style={{ color: "#0d9488" }}>
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rewards & Recognitions ────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — award photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/team/reward-photo.f0b0efc2.png"
              alt="MixCare Health award ceremony — Start-Up Express by HKTDC"
              className="rounded-2xl shadow-lg w-full h-80 lg:h-full min-h-[360px] object-cover object-center"
            />

            {/* Right — award list */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                {a.recognitions.headline}
              </h2>
              <ul className="space-y-3">
                {AWARDS.map((award) => (
                  <li key={award} className="flex items-start gap-3 text-slate-700">
                    <span className="text-lg leading-none mt-0.5 flex-shrink-0">🏆</span>
                    <span className="text-base">{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Careers ──────────────────────────────────────────────────────────── */}
      <section id="careers" className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{a.careers.headline}</h2>
          <p className="text-lg text-slate-600 mb-8">{a.careers.sub}</p>
          <a
            href="/careers"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-lg"
            style={{ backgroundColor: "#0d9488" }}
          >
            {a.careers.cta}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
