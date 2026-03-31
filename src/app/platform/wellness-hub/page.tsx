import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BenefitsGrid from "@/components/shared/BenefitsGrid";
import PageTestimonial from "@/components/shared/PageTestimonial";
import BottomCTA from "@/components/shared/BottomCTA";
import { LayoutDashboard, Plug, Sliders, Code2 } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Wellness Hub | MixCare Health",
  description:
    "One hub connecting every wellness solution. Integrate with insurance policies, HR systems, and wellness programs without friction.",
};

const benefitIcons = [LayoutDashboard, Plug, Sliders];
const nodeColors = ["#0d9488", "#1e3a5f", "#f97316", "#7c3aed", "#0891b2"];

export default async function WellnessHubPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.wellnessHub;

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
        iconColor="#0891b2"
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"
      />

      <BenefitsGrid
        headline={p.benefits.headline}
        benefits={benefits}
        accentColor="#0891b2"
      />

      {/* Ecosystem diagram */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            {p.ecosystem.headline}
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-xl mx-auto">
            {p.ecosystem.sub}
          </p>

          {/* Hub diagram */}
          <div className="relative">
            {/* Center hub */}
            <div
              className="w-28 h-28 rounded-3xl flex items-center justify-center mx-auto shadow-2xl mb-8 relative z-10"
              style={{ background: "linear-gradient(135deg, #0891b2 0%, #0d9488 100%)" }}
            >
              <div className="text-center">
                <LayoutDashboard size={28} className="text-white mx-auto" />
                <p className="text-white text-xs font-bold mt-1">Wellness Hub</p>
              </div>
            </div>

            {/* Connected nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
              {p.ecosystem.nodes.map((label, i) => {
                const color = nodeColors[i];
                return (
                  <div
                    key={label}
                    className="rounded-2xl p-4 text-center border-2 font-bold text-sm"
                    style={{ borderColor: color, color: color, backgroundColor: color + "10" }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Integration partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-5">
            {p.integrations.headline}
          </h2>
          <p className="text-lg text-slate-600 text-center mb-10 max-w-xl mx-auto">
            {p.integrations.sub}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {p.integrations.items.map((name) => (
              <div
                key={name}
                className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 bg-slate-50 hover:border-cyan-400 hover:text-cyan-700 transition-colors"
              >
                {name}
              </div>
            ))}
          </div>

          {/* API callout */}
          <div
            className="rounded-2xl p-8 border text-center max-w-3xl mx-auto"
            style={{ borderColor: "#0891b230", backgroundColor: "#ecfeff" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#0891b2" }}
            >
              <Code2 size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{p.integrations.apiHeadline}</h3>
            <p className="text-slate-600 mb-4">
              {p.integrations.apiSub}
            </p>
            <a
              href={localePath(locale, "/get-a-demo")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white"
              style={{ backgroundColor: "#0891b2" }}
            >
              {p.integrations.apiCta}
            </a>
          </div>
        </div>
      </section>

      <PageTestimonial
        quote={p.testimonial.quote}
        name={p.testimonial.name}
        title={p.testimonial.title}
        company={p.testimonial.company}
        accentColor="#0891b2"
      />

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
