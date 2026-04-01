import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BenefitsGrid from "@/components/shared/BenefitsGrid";
import BottomCTA from "@/components/shared/BottomCTA";
import { CalendarDays, BookOpen, Monitor, BarChart2, CheckCircle2 } from "lucide-react";
import PainPointsCarousel from "@/components/platform/PainPointsCarousel";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Wellness Events | MixCare Health",
  description:
    "Book curated corporate wellness events — yoga, mindfulness, health talks, and more — all managed through MixCare.",
};

const P = "#0891b2";
const benefitIcons = [CalendarDays, BookOpen, Monitor, BarChart2];

const eventCardColors = [
  "#7c3aed", // Mindfulness
  "#16a34a", // Nutrition
  "#f97316", // Yoga
  "#0d9488", // Mental Health First Aid
  "#0891b2", // Health Screening
];

export default async function WellnessEventPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.wellnessEvent;

  const benefits = p.benefits.items.map((item, i) => ({
    icon: benefitIcons[i],
    title: item.title,
    desc: item.desc,
  }));

  return (
    <main>
      <AppNavbar />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <PageHero
        badge={p.hero.badge}
        headline={p.hero.headline}
        headlineHighlight={p.hero.headlineHighlight}
        subheadline={p.hero.sub}
        ctaLabel={p.hero.cta}
        ctaHref={localePath(locale, "/get-a-demo")}
        iconColor={P}
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"
      />

      <PainPointsCarousel
        headline={p.painPoints.headline}
        sub={p.painPoints.sub}
        items={p.painPoints.items}
      />

      <BenefitsGrid
        headline={p.benefits.headline}
        benefits={benefits}
        accentColor={P}
        columns={4}
      />

      {/* ── TOP 5 FEATURED EVENTS ─────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fdf4ff 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
              {p.featuredEvents.badge}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {p.featuredEvents.headline}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {p.featuredEvents.sub}
            </p>
          </div>

          <div className="space-y-5">
            {p.featuredEvents.items.map((event, i) => {
              const color = eventCardColors[i];
              return (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  {/* Photo/Visual panel */}
                  <div
                    className="sm:w-56 flex-shrink-0 flex flex-col items-center justify-center py-10 sm:py-12 px-6 gap-3"
                    style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)` }}
                  >
                    <div className="text-5xl mb-1">{event.emoji}</div>
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/25 text-white"
                    >
                      {event.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-7 flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{event.desc}</p>
                    </div>
                    {/* Stat badge */}
                    <div className="sm:w-44 flex-shrink-0">
                      <div
                        className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold leading-snug"
                        style={{ backgroundColor: color + "15", color }}
                      >
                        <CheckCircle2 size={15} className="flex-shrink-0" />
                        {event.stat}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
