import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BottomCTA from "@/components/shared/BottomCTA";
import {
  Stethoscope, ShieldCheck, Building2, Globe,
  Users, TrendingUp, TrendingDown, MapPin, Layers, Rocket,
  CheckCircle2, ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

const { canonical, languages } = buildAlternates("/platform/self-funded-outpatient");

export const metadata: Metadata = {
  title: "Self-Funded Outpatient Benefits",
  description:
    "AI-powered self-funded outpatient claims processing with a 2,000+ panel doctor network across Hong Kong, Macau, and Singapore. Reduce costs by 30% vs traditional group insurance.",
  keywords: [
    "self-funded outpatient", "outpatient benefits Hong Kong", "panel doctor network",
    "outpatient claims processing", "corporate health insurance", "SMB health benefits",
    "outpatient plan Singapore", "MixCare outpatient",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Self-Funded Outpatient Benefits | ${SITE_NAME}`,
    description:
      "AI-powered outpatient claims processing with a 2,000+ panel doctor network. Reduce costs by 30% vs traditional group insurance.",
    url: canonical,
    images: ogImage("MixCare Self-Funded Outpatient Platform"),
  },
  twitter: {
    title: `Self-Funded Outpatient Benefits | ${SITE_NAME}`,
    description:
      "AI-powered outpatient claims with 2,000+ panel doctors. Cut costs vs traditional group insurance.",
    images: ["/opengraph-image.png"],
  },
};

const P = "#0d9488";

const useCaseIcons  = [ShieldCheck, Stethoscope, Building2, Globe];
const useCaseColors = [P, "#1e3a5f", "#f97316", "#7c3aed"];

const suitableIcons  = [TrendingUp, Users, TrendingDown, MapPin, Layers, Rocket];
const suitableColors = ["#f97316", P, "#0891b2", "#7c3aed", "#10b981", "#1e3a5f"];

export default async function SelfFundedOutpatientPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.selfFundedOutpatient;

  return (
    <main>
      <JsonLd data={[
        webPageSchema("Self-Funded Outpatient Benefits", "AI-powered outpatient claims processing with a 2,000+ panel doctor network across Hong Kong, Macau, and Singapore.", "/platform/self-funded-outpatient"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Platform", path: "/platform/self-funded-outpatient" }, { name: "Self-Funded Outpatient", path: "/platform/self-funded-outpatient" }]),
      ]} />
      <AppNavbar />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <PageHero
        badge={p.hero.badge}
        headline={p.hero.headline}
        headlineHighlight={p.hero.headlineHighlight}
        subheadline={p.hero.sub}
        ctaLabel={p.hero.cta}
        ctaHref={localePath(locale, "/get-a-demo")}
        secondaryCtaLabel={p.hero.calculatorCta}
        secondaryCtaHref="https://flexhealth.mixcarehealth.com/"
        secondaryCtaAnnotation={p.hero.calculatorAnnotation}
        secondaryCtaAnnotationIndent={locale !== "en" ? "20%" : undefined}
        iconColor={P}
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"
      />

      {/* ── PAIN POINTS: Dark numbered rows ───────────────────────────── */}
      <section className="py-24 bg-[#08111f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
              Why MixCare
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
              {p.painPoints.headline}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {p.painPoints.sub}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {p.painPoints.items.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.08] p-7 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: P + "20" }}
                  >
                    <span className="text-xs font-black" style={{ color: P }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUITABLE FOR: Light gradient checklist ────────────────────── */}
      <section
        className="py-24"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fdf4ff 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
              {p.suitableFor.badge}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {p.suitableFor.headline}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {p.suitableFor.sub}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {p.suitableFor.items.map((item, i) => {
              const Icon = suitableIcons[i];
              const color = suitableColors[i];
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm"
                    style={{ backgroundColor: color }}
                  >
                    <Icon size={19} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 mb-1.5 leading-snug">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3">{item.desc}</p>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: color + "18", color }}
                    >
                      <CheckCircle2 size={10} />
                      {item.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── USE CASES: Colored side-panel rows ───────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
              Who It Serves
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {p.useCases.headline}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {p.useCases.sub}
            </p>
          </div>

          <div className="space-y-4">
            {p.useCases.items.map((uc, i) => {
              const Icon = useCaseIcons[i];
              const color = useCaseColors[i];
              return (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {/* Colored audience block */}
                  <div
                    className="sm:w-48 flex-shrink-0 flex sm:flex-col items-center justify-start sm:justify-center gap-3 py-5 sm:py-8 px-6"
                    style={{ backgroundColor: color }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-white" />
                    </div>
                    <p className="text-white font-extrabold text-sm sm:text-base sm:text-center leading-tight">
                      {uc.audience}
                    </p>
                  </div>

                  {/* Scenario + outcome */}
                  <div
                    className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 p-6"
                    style={{ backgroundColor: color + "07" }}
                  >
                    <p className="flex-1 text-slate-700 text-sm leading-relaxed">{uc.scenario}</p>
                    <div className="sm:w-56 flex-shrink-0">
                      <div
                        className="inline-flex items-start gap-2 text-sm font-bold px-4 py-3 rounded-xl leading-snug"
                        style={{ backgroundColor: color + "18", color }}
                      >
                        <ArrowRight size={14} className="flex-shrink-0 mt-0.5" />
                        {uc.outcome}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS: Dark gradient band ──────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #0a3d59 55%, #0f172a 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-white text-3xl font-extrabold mb-16 opacity-90">
            {p.stats.headline}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {p.stats.items.map((stat, i) => (
              <div
                key={i}
                className={`text-center py-10 px-8 ${
                  i < p.stats.items.length - 1
                    ? "border-b sm:border-b-0 sm:border-r border-white/10"
                    : ""
                }`}
              >
                <p className="text-5xl sm:text-6xl font-black mb-4" style={{ color: P }}>
                  {stat.value}
                </p>
                <p className="text-slate-300 text-sm font-medium uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <BottomCTA
        headline={p.cta.headline}
        sub={p.cta.sub}
        ctaLabel={p.cta.label}
        ctaHref={localePath(locale, "/get-a-demo")}
      />

      <Footer />
    </main>
  );
}
