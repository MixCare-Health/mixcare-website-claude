import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BottomCTA from "@/components/shared/BottomCTA";
import FSAAdminEmployeePanels from "@/components/platform/FSAAdminEmployeePanels";
import {
  Wallet, Settings, BarChart3, Heart, Dumbbell, Brain, Eye, Pill, Apple,
  Stethoscope, Activity, Shield, TrendingUp, CheckCircle2,
  ShoppingBag, LayoutDashboard, Users, Zap, ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

const { canonical, languages } = buildAlternates("/platform/flexible-spending-account");

export const metadata: Metadata = {
  title: "Flexible Spending Account (FSA) Platform",
  description:
    "Create and manage FSA wallets for healthcare, wellness, and lifestyle expenses. 91% employee utilisation rate. Fully customisable for any company size across Hong Kong and Singapore.",
  keywords: [
    "flexible spending account", "FSA wallet", "employee benefits Hong Kong",
    "healthcare FSA", "wellness spending account", "benefits management platform",
    "FSA Singapore", "corporate wellness wallet", "MixCare FSA",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Flexible Spending Account (FSA) Platform | ${SITE_NAME}`,
    description:
      "Create and manage FSA wallets for healthcare, wellness, and lifestyle. 91% utilisation rate. Fully customisable for any company size.",
    url: canonical,
    images: ogImage("MixCare FSA Platform — Flexible Spending Account"),
  },
  twitter: {
    title: `FSA Platform | ${SITE_NAME}`,
    description:
      "Create FSA wallets for healthcare, wellness, and lifestyle. 91% employee utilisation. Customisable for any company.",
    images: ["/opengraph-image.png"],
  },
};

const P = "#1e3a5f";
const T = "#0d9488";

const categoryIcons = [Heart, Brain, Dumbbell, Apple, Eye, Pill, Wallet, BarChart3];
const categoryColors = [T, "#7c3aed", "#f97316", "#16a34a", "#0891b2", "#dc2626", "#d97706", P];

const useCaseColors = [T, "#f97316", "#7c3aed", "#0891b2"];
const useCaseIcons  = [Stethoscope, Activity, Brain, Shield];

const ecosystemIcons  = [ShoppingBag, LayoutDashboard, Users, Zap];
const ecosystemColors = [T, "#f97316", "#0891b2", "#7c3aed"];

export default async function FSAPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.flexibleSpendingAccount;

  return (
    <main>
      <JsonLd data={[
        webPageSchema("Flexible Spending Account (FSA) Platform", "Create and manage FSA wallets for healthcare, wellness, and lifestyle expenses. 91% employee utilisation rate. Fully customisable for any company.", "/platform/flexible-spending-account"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Platform", path: "/platform/self-funded-outpatient" }, { name: "Flexible Spending Account", path: "/platform/flexible-spending-account" }]),
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
        iconColor={P}
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"
      />

      {/* ── WHY FSA: Stats band ────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: `linear-gradient(135deg, #0f172a 0%, #0a3d59 55%, #0f172a 100%)` }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: T }}>
              {p.whyFSA.badge}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {p.whyFSA.headline}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {p.whyFSA.sub}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {p.whyFSA.stats.map((stat, i) => (
              <div
                key={i}
                className={`text-center py-8 px-6 ${
                  i < p.whyFSA.stats.length - 1
                    ? "border-b sm:border-b-0 sm:border-r border-white/10"
                    : ""
                }`}
              >
                <p className="text-4xl sm:text-5xl font-black mb-2" style={{ color: T }}>
                  {stat.value}
                </p>
                <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS GRID ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
              Platform Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {p.benefits.headline}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {p.benefits.items.map((item, i) => {
              const icons = [Wallet, Heart, Settings];
              const colors = [P, T, "#f97316"];
              const Icon = icons[i];
              const color = colors[i];
              return (
                <div
                  key={i}
                  className="rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  style={{ backgroundColor: color + "08" }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                    style={{ backgroundColor: color }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SPENDING CATEGORIES ──────────────────────────────────────── */}
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
          </div>
        </div>
      </section>

      {/* ── USE CASES ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: T }}>
              {p.useCases.badge}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {p.useCases.headline}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {p.useCases.sub}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {p.useCases.items.map((item, i) => {
              const Icon  = useCaseIcons[i];
              const color = useCaseColors[i];
              return (
                <div
                  key={i}
                  className="rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 bg-white"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: color }}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-slate-900 mb-2 leading-snug">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-3">{item.desc}</p>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: color + "18", color }}
                      >
                        <CheckCircle2 size={10} />
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ADMIN + EMPLOYEE PANELS WITH MOCKUPS ─────────────────────── */}
      <FSAAdminEmployeePanels
        headline={p.adminEmployee.headline}
        adminTitle={p.adminEmployee.adminTitle}
        adminItems={p.adminEmployee.adminItems}
        employeeTitle={p.adminEmployee.employeeTitle}
        employeeItems={p.adminEmployee.employeeItems}
      />

      {/* ── HOW TO IMPLEMENT ──────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fdf4ff 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: T }}>
              {p.howToImplement.badge}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {p.howToImplement.headline}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {p.howToImplement.sub}
            </p>
          </div>
          <div className="space-y-4">
            {p.howToImplement.steps.map((step, i) => (
              <div
                key={i}
                className="flex gap-6 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: P }}
                  >
                    <span className="text-white text-xs font-black">{step.step}</span>
                  </div>
                  {i < p.howToImplement.steps.length - 1 && (
                    <div className="w-px flex-1 mt-3" style={{ backgroundColor: P + "20" }} />
                  )}
                </div>
                <div className="flex-1 min-w-0 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">{step.title}</h3>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: T + "18", color: T }}
                    >
                      {step.time}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM: Connected visual ───────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
              Ecosystem
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {p.ecosystem.headline}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {p.ecosystem.sub}
            </p>
          </div>

          {/* Hub + spokes */}
          <div className="flex flex-col items-center gap-6">
            {/* Central hub */}
            <div
              className="rounded-2xl px-10 py-5 text-center shadow-xl border-2"
              style={{ backgroundColor: P, borderColor: P }}
            >
              <p className="text-white font-black text-lg tracking-tight">MixCare FSA Platform</p>
              <p className="text-blue-200 text-xs mt-1 font-medium">Central Benefits Hub</p>
            </div>

            {/* Connector */}
            <div className="flex flex-col items-center gap-0">
              <div className="w-px h-5" style={{ backgroundColor: P + "40" }} />
              <ArrowRight size={14} className="rotate-90" style={{ color: P + "60" }} />
            </div>

            {/* 4 nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {p.ecosystem.tags.map((tag: string, i: number) => {
                const Icon = ecosystemIcons[i];
                const color = ecosystemColors[i];
                return (
                  <div
                    key={tag}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center"
                    style={{ borderTopColor: color, borderTopWidth: 3 }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: color + "18" }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <p className="text-sm font-bold text-slate-800 mb-1.5 leading-snug">{tag}</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {p.ecosystem.connectionDescs[i]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
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
