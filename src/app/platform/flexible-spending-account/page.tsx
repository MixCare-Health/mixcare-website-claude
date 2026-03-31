import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BenefitsGrid from "@/components/shared/BenefitsGrid";
import PageTestimonial from "@/components/shared/PageTestimonial";
import BottomCTA from "@/components/shared/BottomCTA";
import { Wallet, Settings, BarChart3, Heart, Dumbbell, Brain, Eye, Pill, Apple } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Flexible Spending Account (FSA) | MixCare Health",
  description:
    "Create and manage FSA wallets for healthcare, wellness, and lifestyle expenses. Fully customisable for any company size.",
};

const categoryIcons = [Heart, Brain, Dumbbell, Apple, Eye, Pill, Wallet, BarChart3];
const categoryColors = ["#0d9488", "#7c3aed", "#f97316", "#16a34a", "#0891b2", "#dc2626", "#d97706", "#1e3a5f"];

const benefitIcons = [Wallet, Heart, Settings];

export default async function FSAPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.flexibleSpendingAccount;

  const benefits = p.benefits.items.map((item: { title: string; desc: string }, i: number) => ({
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
        iconColor="#1e3a5f"
        bgGradient="linear-gradient(135deg, #eff6ff 0%, #f0fdfa 50%, #fff7ed 100%)"
      />

      <BenefitsGrid
        headline={p.benefits.headline}
        benefits={benefits}
        accentColor="#1e3a5f"
      />

      {/* Spending categories */}
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {p.categories.items.map((label: string, i: number) => {
              const Icon = categoryIcons[i];
              const color = categoryColors[i];
              return (
                <div
                  key={label}
                  className="bg-white rounded-2xl p-6 text-center border border-slate-100 hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: color + "15" }}
                  >
                    <Icon size={24} style={{ color }} />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{label}</p>
                </div>
              );
            })}
            <div
              className="bg-white rounded-2xl p-6 text-center border border-dashed border-slate-200 hover:shadow-md transition-all flex flex-col items-center justify-center"
            >
              <p className="text-2xl font-extrabold text-slate-400">{p.categories.more}</p>
              <p className="text-sm text-slate-400 mt-1">{p.categories.moreLabel}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin vs Employee view */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            {p.adminEmployee.headline}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="rounded-2xl p-8 border border-slate-100"
              style={{ backgroundColor: "#f0fdfa" }}
            >
              <h3 className="text-xl font-bold text-slate-900 mb-5" style={{ color: "#0d9488" }}>
                {p.adminEmployee.adminTitle}
              </h3>
              <ul className="space-y-3">
                {p.adminEmployee.adminItems.map((item: string) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#0d9488" }}
                    >
                      <span className="text-white text-xs">✓</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-2xl p-8 border border-slate-100"
              style={{ backgroundColor: "#eff6ff" }}
            >
              <h3 className="text-xl font-bold text-slate-900 mb-5" style={{ color: "#1e3a5f" }}>
                {p.adminEmployee.employeeTitle}
              </h3>
              <ul className="space-y-3">
                {p.adminEmployee.employeeItems.map((item: string) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#1e3a5f" }}
                    >
                      <span className="text-white text-xs">✓</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-12" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="rounded-2xl p-8 border"
            style={{ borderColor: "#1e3a5f30", backgroundColor: "#eff6ff" }}
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {p.ecosystem.headline}
            </h3>
            <p className="text-slate-600 mb-5">
              {p.ecosystem.sub}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {p.ecosystem.tags.map((item: string) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{ backgroundColor: "#1e3a5f15", color: "#1e3a5f" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageTestimonial
        quote={p.testimonial.quote}
        name={p.testimonial.name}
        title={p.testimonial.title}
        company={p.testimonial.company}
        accentColor="#1e3a5f"
      />

      <BottomCTA
        headline={p.cta.headline}
        sub={p.cta.sub}
        ctaLabel={p.cta.label}
        ctaHref={localePath(locale, "/get-a-demo")}
        secondaryLabel={p.cta.secondaryLabel}
        secondaryHref={localePath(locale, "/start-now")}
      />

      <Footer />
    </main>
  );
}
