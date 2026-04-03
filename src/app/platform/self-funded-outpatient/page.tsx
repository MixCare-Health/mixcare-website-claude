import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BottomCTA from "@/components/shared/BottomCTA";
import Link from "next/link";
import {
  Users, TrendingUp, TrendingDown, MapPin, Layers, Rocket,
  CheckCircle2, AlertTriangle, BarChart3, Shield, Zap, ArrowRight,
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

const P = "#0d9488";   // brand teal
const N = "#1e3a5f";   // brand navy
const DT = "#0891b2";  // dark teal

/* ── Unified brand color palettes ─────────────────────────────────── */
const suitableIcons  = [TrendingUp, Users, TrendingDown, MapPin, Layers, Rocket];
const suitableColors = [P, N, DT, P, N, DT];

const painPointIcons = [AlertTriangle, BarChart3, Shield, Zap];

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

      {/* ── HERO ──────────────────────────────────────────────────── */}
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
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #ecfeff 50%, #f0f9ff 100%)"
      />

      {/* ── STATS — Floating trust band ───────────────────────────── */}
      <section className="relative -mt-8 z-10 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl border border-white/20 shadow-xl backdrop-blur-md overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0f172a 0%, #0a3d59 55%, #0f172a 100%)" }}
          >
            <div className="px-6 py-4 text-center border-b border-white/10">
              <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-80">
                {p.stats.headline}
              </h2>
            </div>
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {p.stats.items.map((stat, i) => (
                <div key={i} className="text-center py-6 sm:py-8 px-3 sm:px-8">
                  <p className="text-3xl sm:text-5xl font-black mb-2" style={{ color: P }}>
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS — Dark section with icon cards ─────────────── */}
      <section className="py-20 sm:py-24" style={{ background: "linear-gradient(180deg, #08111f 0%, #0c1a2e 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
              Why MixCare
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
              {p.painPoints.headline}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
              {p.painPoints.sub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {p.painPoints.items.map((item, i) => {
              const Icon = painPointIcons[i];
              return (
                <div
                  key={i}
                  className="group rounded-2xl p-6 sm:p-7 border border-white/[0.06] hover:border-teal-400/20 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(13,148,136,0.04) 100%)" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: P + "15" }}
                    >
                      <Icon size={18} style={{ color: P }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-base leading-snug mb-2.5">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW WE SOLVE — Light section, modern cards ──────────── */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
              {p.howWeSolve.badge}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {p.howWeSolve.headline}
            </h2>
            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
              {p.howWeSolve.sub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {p.howWeSolve.items.map((item) => (
              <div
                key={item.step}
                className="relative group rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="h-1" style={{ background: `linear-gradient(90deg, ${P}, ${DT})` }} />

                <div className="p-6 sm:p-7">
                  {/* Ghost number */}
                  <span
                    className="absolute top-4 right-5 text-7xl font-black select-none pointer-events-none"
                    style={{ color: P + "08", lineHeight: 1 }}
                  >
                    {item.step}
                  </span>

                  <h3 className="text-slate-900 font-extrabold text-lg leading-snug mb-3 pr-8">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {item.desc}
                  </p>

                  {/* Highlight pill */}
                  <div
                    className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: P + "10", color: P }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: P }} />
                    {item.highlight}
                  </div>

                  {/* Know More button — only on the medical network card */}
                  {item.step === "04" && (
                    <Link
                      href={localePath(locale, "/get-a-demo")}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
                      style={{ color: P }}
                    >
                      {locale === "en" ? "Know More" : locale === "zh-TW" ? "了解更多" : "了解更多"}
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUITABLE FOR — Soft gradient grid ─────────────────────── */}
      <section
        className="py-20 sm:py-24"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #f0f9ff 50%, #f5f3ff08 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
              {p.suitableFor.badge}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {p.suitableFor.headline}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              {p.suitableFor.sub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {p.suitableFor.items.map((item, i) => {
              const Icon = suitableIcons[i];
              const color = suitableColors[i];
              return (
                <div
                  key={i}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-start gap-3.5 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: color }}
                    >
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 leading-snug pt-2">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{item.desc}</p>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: color + "12", color }}
                  >
                    <CheckCircle2 size={10} />
                    {item.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW TO ADOPT — Refined timeline ───────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
              {p.howToAdopt.badge}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {p.howToAdopt.headline}
            </h2>
            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
              {p.howToAdopt.sub}
            </p>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="hidden sm:block absolute left-7 sm:left-[2.375rem] top-10 bottom-10 w-px"
              style={{ backgroundColor: P + "20" }}
            />

            <div className="space-y-5 sm:space-y-6">
              {p.howToAdopt.items.map((item) => (
                <div key={item.step} className="flex gap-4 sm:gap-6 items-start">
                  {/* Step circle — smaller on mobile */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className="w-14 h-14 sm:w-[4.75rem] sm:h-[4.75rem] rounded-full flex flex-col items-center justify-center shadow-lg border-2"
                      style={{ backgroundColor: P, borderColor: P + "40" }}
                    >
                      <span className="text-white/60 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest leading-none">
                        Step
                      </span>
                      <span className="text-white text-lg sm:text-xl font-black leading-none mt-0.5">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className="flex-1 rounded-2xl p-5 sm:p-6 border hover:shadow-md transition-all duration-200 mt-1"
                    style={{ borderColor: P + "15", backgroundColor: P + "03" }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3">
                      <h3 className="text-slate-900 font-extrabold text-base leading-snug">
                        {item.title}
                      </h3>
                      <span
                        className="flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full self-start whitespace-nowrap"
                        style={{ backgroundColor: P + "12", color: P }}
                      >
                        {item.duration}
                      </span>
                    </div>
                    <p
                      className="text-slate-500 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
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
