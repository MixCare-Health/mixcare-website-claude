import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import Link from "next/link";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/careers");

export const metadata: Metadata = {
  title: "Careers — MixCare Health | Join Our Team",
  description:
    "Explore career opportunities at MixCare Health. We're building the next generation of AI-powered health and wellness benefits across Asia-Pacific.",
  keywords: [
    "MixCare Health careers", "health tech jobs Hong Kong", "digital health jobs",
    "insurtech careers Asia", "wellness platform jobs", "MixCare jobs",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Careers | ${SITE_NAME}`,
    description: "Join MixCare Health — building the next generation of AI-powered health benefits across Asia-Pacific.",
    url: canonical,
    images: ogImage("Careers at MixCare Health"),
  },
  twitter: {
    title: `Careers | ${SITE_NAME}`,
    description: "Join MixCare Health — building the next generation of AI-powered health benefits.",
    images: ["/opengraph-image.png"],
  },
};

export default async function CareersPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const a = t.about;

  return (
    <main>
      <JsonLd data={[
        webPageSchema("Careers — MixCare Health", "Join our team building the next generation of health benefits.", "/careers"),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about-us" },
          { name: "Careers", path: "/careers" },
        ]),
      ]} />
      <AppNavbar />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="pt-28 pb-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl" style={{ background: "radial-gradient(circle, #0d9488, transparent)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: "#ccfbf1", color: "#0f766e" }}
          >
            {a.careers.headline}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            {a.careers.headline}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {a.careers.sub}
          </p>
        </div>
      </section>

      {/* ── No Openings ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Illustration */}
          <div
            className="w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center text-5xl shadow-sm"
            style={{ backgroundColor: "#f0fdfa" }}
          >
            🔍
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
            {a.careers.noOpenings}
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed mb-10">
            {a.careers.noOpeningsSub}
          </p>

          {/* Email CTA */}
          <a
            href="mailto:careers@mixcarehealth.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-md hover:shadow-lg transition-all"
            style={{ backgroundColor: "#0d9488" }}
          >
            {a.careers.emailCta}
          </a>

          <p className="mt-5 text-sm text-slate-400">careers@mixcarehealth.com</p>
        </div>
      </section>

      {/* ── Why Join Us ──────────────────────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-10">
            {a.careers.whyJoin}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {a.careers.perks.map((perk) => (
              <div key={perk.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{perk.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{perk.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Back link ────────────────────────────────────────────────────────── */}
      <section className="py-10 bg-white text-center">
        <Link href="/about-us" className="text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors">
          ← {a.careers.backToAbout}
        </Link>
      </section>

      <Footer />
    </main>
  );
}
