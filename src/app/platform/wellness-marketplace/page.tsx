import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BenefitsGrid from "@/components/shared/BenefitsGrid";
import PageTestimonial from "@/components/shared/PageTestimonial";
import BottomCTA from "@/components/shared/BottomCTA";
import Link from "next/link";
import { ShoppingBag, RefreshCw, Layers, Star, Dumbbell, Brain, Apple, Leaf, Stethoscope, Users } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Wellness Marketplace | MixCare Health",
  description:
    "A curated marketplace for employee wellness — 500+ services redeemable with FSA wallets. White-label options for insurers, brokers, and enterprises.",
};

const benefitIcons = [RefreshCw, Layers, ShoppingBag];
const categoryIcons = [Dumbbell, Brain, Apple, Leaf, Stethoscope, Users];
const categoryColors = ["#f97316", "#7c3aed", "#16a34a", "#0d9488", "#0891b2", "#d97706"];

export default async function WellnessMarketplacePage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.wellnessMarketplace;

  const benefits = p.benefits.items.map((item, i) => ({
    icon: benefitIcons[i],
    title: item.title,
    desc: item.desc,
  }));

  const categories = p.categories.items.map((item, i) => ({
    icon: categoryIcons[i],
    label: item.label,
    count: item.count,
    color: categoryColors[i],
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
        iconColor="#f97316"
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"
      />

      <BenefitsGrid
        headline={p.benefits.headline}
        benefits={benefits}
        accentColor="#f97316"
      />

      {/* Service categories */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              {p.categories.headline}
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              {p.categories.sub}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: cat.color }}
                >
                  <cat.icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{cat.label}</h3>
                <p className="text-sm font-semibold" style={{ color: cat.color }}>
                  {cat.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* White-label feature */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#f97316" }}>
                {p.whiteLabelSection.badge}
              </p>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-5">
                {p.whiteLabelSection.headline}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {p.whiteLabelSection.sub}
              </p>
              <ul className="space-y-3 mb-8">
                {p.whiteLabelSection.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#f97316" }}
                    >
                      <Star size={10} className="text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-3xl p-10"
              style={{ background: "linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)" }}
            >
              {/* Mockup marketplace UI */}
              <div className="bg-white rounded-2xl shadow-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-md" style={{ backgroundColor: "#f97316" }} />
                  <p className="font-bold text-slate-800 text-sm">AXA Wellness Hub</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {["Yoga Classes", "Mental Health", "Nutrition", "Gym Access"].map((s) => (
                    <div
                      key={s}
                      className="rounded-xl p-3 text-center"
                      style={{ backgroundColor: "#fff7ed" }}
                    >
                      <p className="text-xs font-semibold text-slate-700">{s}</p>
                      <p className="text-xs text-slate-400 mt-0.5">FSA eligible</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="py-12" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 border text-center"
            style={{ borderColor: "#f9731630", backgroundColor: "#fff7ed" }}
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {p.providerCta.headline}
            </h3>
            <p className="text-slate-600 mb-5">
              {p.providerCta.sub}
            </p>
            <Link
              href={localePath(locale, "/partners")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
              style={{ backgroundColor: "#f97316" }}
            >
              {p.providerCta.label}
            </Link>
          </div>
        </div>
      </section>

      <PageTestimonial
        quote={p.testimonial.quote}
        name={p.testimonial.name}
        title={p.testimonial.title}
        company={p.testimonial.company}
        accentColor="#f97316"
      />

      <BottomCTA
        headline={p.cta.headline}
        sub={p.cta.sub}
        ctaLabel={p.cta.label}
        ctaHref={localePath(locale, "/get-a-demo")}
        secondaryLabel={p.cta.secondaryLabel}
        secondaryHref={localePath(locale, "/partners")}
      />

      <Footer />
    </main>
  );
}
