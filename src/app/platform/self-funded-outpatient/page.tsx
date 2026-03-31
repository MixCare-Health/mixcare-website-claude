import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BenefitsGrid from "@/components/shared/BenefitsGrid";
import PageTestimonial from "@/components/shared/PageTestimonial";
import BottomCTA from "@/components/shared/BottomCTA";
import { Stethoscope, ShieldCheck, Cpu, Building2, TrendingUp, Sliders, BarChart2, Globe, Banknote, Activity, Brain } from "lucide-react";
import PainPointsCarousel from "@/components/platform/PainPointsCarousel";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Self-Funded Outpatient Services | MixCare Health",
  description:
    "AI-powered outpatient claims processing with a 2,000+ panel doctor network across Hong Kong, Macau, and Singapore.",
};

const benefitIcons = [ShieldCheck, Stethoscope, Cpu, Banknote, Activity, Brain];

const useCaseIcons = [ShieldCheck, Stethoscope, Building2, Globe];
const useCaseColors = ["#0d9488", "#1e3a5f", "#f97316", "#7c3aed"];

export default async function SelfFundedOutpatientPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.selfFundedOutpatient;

  const benefits = p.benefits.items.map((item, i) => ({
    icon: benefitIcons[i],
    title: item.title,
    desc: item.desc,
  }));

  return (
    <main>
      <AppNavbar />

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
        iconColor="#0d9488"
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 50%, #f0f4ff 100%)"
      />

      <PainPointsCarousel
        headline={p.painPoints.headline}
        sub={p.painPoints.sub}
        items={p.painPoints.items}
      />

      <BenefitsGrid
        headline={p.benefits.headline}
        benefits={benefits}
        accentColor="#0d9488"
        columns={3}
      />

      {/* Use cases */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">
            {p.useCases.headline}
          </h2>
          <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
            {p.useCases.sub}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {p.useCases.items.map((uc, i) => {
              const Icon = useCaseIcons[i];
              const color = useCaseColors[i];
              return (
                <div
                  key={uc.audience}
                  className="rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all"
                  style={{ backgroundColor: color + "08" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: color }}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ color }}
                  >
                    {uc.audience}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">{uc.scenario}</p>
                  <div
                    className="text-xs font-bold px-3 py-1.5 rounded-lg inline-block"
                    style={{ backgroundColor: color + "20", color }}
                  >
                    {uc.outcome}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            {p.stats.headline}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {p.stats.items.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm"
              >
                <p className="text-3xl font-extrabold mb-2" style={{ color: "#0d9488" }}>
                  {stat.value}
                </p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
