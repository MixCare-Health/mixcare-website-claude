import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BottomCTA from "@/components/shared/BottomCTA";
import Link from "next/link";
import {
  ShoppingBag, Layers, Tag, Sliders, BarChart3,
  Dumbbell, Brain, Apple, Leaf, Stethoscope, Users,
  CheckCircle2, Star,
} from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

const { canonical, languages } = buildAlternates("/platform/wellness-marketplace");

export const metadata: Metadata = {
  title: "Employee Wellness Marketplace — 3,000+ Services",
  description:
    "Curated employee wellness marketplace with 3,000+ services redeemable via FSA wallets. Yoga, nutrition, mental health, health screenings and more. White-label for insurers and enterprises.",
  keywords: [
    "employee wellness marketplace", "corporate wellness services", "FSA redeemable services",
    "wellness benefits Hong Kong", "yoga corporate benefits", "mental health employee benefits",
    "white-label wellness platform", "3000 wellness services", "MixCare marketplace",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Employee Wellness Marketplace — 3,000+ Services | ${SITE_NAME}`,
    description:
      "3,000+ wellness services redeemable via FSA wallets. Yoga, nutrition, mental health, health screenings. White-label for insurers and enterprises.",
    url: canonical,
    images: ogImage("MixCare Wellness Marketplace — 3,000+ Employee Wellness Services"),
  },
  twitter: {
    title: `Wellness Marketplace | ${SITE_NAME}`,
    description:
      "3,000+ wellness services redeemable via FSA wallets. White-label options for insurers and enterprises.",
    images: ["/opengraph-image.png"],
  },
};

const P = "#f97316";

const benefitIcons  = [ShoppingBag, Layers, Tag, Sliders, BarChart3, BarChart3];
const benefitColors = [P, "#0d9488", "#7c3aed", "#0891b2", "#1e3a5f", "#16a34a"];

const categoryIcons  = [Dumbbell, Brain, Apple, Leaf, Stethoscope, Users];
const categoryColors = [P, "#7c3aed", "#16a34a", "#0d9488", "#0891b2", "#d97706"];

export default async function WellnessMarketplacePage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.wellnessMarketplace;

  return (
    <main>
      <JsonLd data={[
        webPageSchema("Employee Wellness Marketplace — 3,000+ Services", "Curated employee wellness marketplace with 3,000+ services redeemable via FSA wallets. Yoga, nutrition, mental health, health screenings and more.", "/platform/wellness-marketplace"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Platform", path: "/platform/self-funded-outpatient" }, { name: "Wellness Marketplace", path: "/platform/wellness-marketplace" }]),
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

      {/* ── WHY DIFFERENT: 6 selling points ───────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
              Why MixCare
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {p.benefits.headline}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.benefits.items.map((item, i) => {
              const Icon  = benefitIcons[i];
              const color = benefitColors[i];
              return (
                <div
                  key={i}
                  className="rounded-2xl p-7 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  style={{ backgroundColor: color + "08" }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                    style={{ backgroundColor: color }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-snug">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MARKETPLACE MOCKUP ────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
              {p.marketplaceMockup.badge}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {p.marketplaceMockup.headline}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {p.marketplaceMockup.sub}
            </p>
          </div>

          {/* Browser frame mockup */}
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-200 shadow-2xl">
            {/* Chrome */}
            <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-1.5 border-b border-slate-200">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-3 flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 font-mono">
                wellness.yourcompany.com
              </div>
            </div>
            {/* App header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100"
              style={{ background: `linear-gradient(135deg, ${P}15 0%, ${P}05 100%)` }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: P }}>
                  <ShoppingBag size={14} className="text-white" />
                </div>
                <span className="font-bold text-slate-800">Wellness Marketplace</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600">
                  FSA Balance: HK$2,400
                </div>
              </div>
            </div>
            {/* Content grid */}
            <div className="p-6 bg-white">
              {/* Search + filter */}
              <div className="flex gap-3 mb-6">
                <div className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-400">
                  🔍 Search for wellness services…
                </div>
                <div className="flex gap-2">
                  {["All", "Medical", "Fitness", "Mental Health"].map((f, i) => (
                    <span key={f} className="px-3 py-2 rounded-xl text-xs font-semibold"
                      style={i === 0 ? { backgroundColor: P, color: "#fff" } : { backgroundColor: "#f1f5f9", color: "#64748b" }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              {/* Service cards grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: "Pure Yoga", cat: "Fitness", price: "HK$280", tag: "Corporate Rate", color: P },
                  { name: "Mind & Me", cat: "Mental Health", price: "HK$420", tag: "FSA Eligible", color: "#7c3aed" },
                  { name: "Nutritionist", cat: "Nutrition", price: "HK$380", tag: "New", color: "#16a34a" },
                  { name: "Health Check", cat: "Medical", price: "HK$650", tag: "Most Popular", color: "#0891b2" },
                ].map((s) => (
                  <div key={s.name} className="rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-all">
                    <div className="h-16 flex items-center justify-center text-2xl"
                      style={{ background: `linear-gradient(135deg, ${s.color}20 0%, ${s.color}08 100%)` }}>
                      {s.cat === "Fitness" ? "🏋️" : s.cat === "Mental Health" ? "🧠" : s.cat === "Nutrition" ? "🥗" : "🩺"}
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-bold text-slate-800 mb-0.5">{s.name}</p>
                      <p className="text-[10px] text-slate-400 mb-2">{s.cat}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black" style={{ color: s.color }}>{s.price}</span>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                          style={{ backgroundColor: s.color + "20", color: s.color }}>{s.tag}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Bottom bar */}
              <div className="mt-5 flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100">
                <span>Showing 4 of 3,000+ services</span>
                <div className="flex gap-2">
                  <div className="w-20 h-7 rounded-lg" style={{ backgroundColor: P + "20" }} />
                  <div className="w-20 h-7 rounded-lg" style={{ backgroundColor: P }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE CATEGORIES ────────────────────────────────────────── */}
      <section className="py-16 bg-white">
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
            {p.categories.items.map((cat, i) => {
              const Icon  = categoryIcons[i];
              const color = categoryColors[i];
              return (
                <div
                  key={cat.label}
                  className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: color }}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">{cat.label}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHITE-LABEL ───────────────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
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
                    <CheckCircle2 size={16} className="flex-shrink-0" style={{ color: P }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl p-10" style={{ background: "linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)" }}>
              <div className="bg-white rounded-2xl shadow-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-md" style={{ backgroundColor: P }} />
                  <p className="font-bold text-slate-800 text-sm">AXA Wellness Hub</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {["Yoga Classes", "Mental Health", "Nutrition", "Gym Access"].map((s) => (
                    <div key={s} className="rounded-xl p-3 text-center" style={{ backgroundColor: "#fff7ed" }}>
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

      {/* ── PROVIDER CTA ──────────────────────────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 border text-center"
            style={{ borderColor: "#f9731630", backgroundColor: "#fff7ed" }}>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{p.providerCta.headline}</h3>
            <p className="text-slate-600 mb-5">{p.providerCta.sub}</p>
            <Link
              href={localePath(locale, "/partners")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
              style={{ backgroundColor: P }}
            >
              {p.providerCta.label}
            </Link>
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
        secondaryHref={localePath(locale, "/partners")}
      />

      <Footer />
    </main>
  );
}
