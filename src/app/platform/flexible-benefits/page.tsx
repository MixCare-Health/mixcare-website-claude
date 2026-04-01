import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BenefitsGrid from "@/components/shared/BenefitsGrid";
import PageTestimonial from "@/components/shared/PageTestimonial";
import BottomCTA from "@/components/shared/BottomCTA";
import { Sliders, Users2, BarChart3, X, Check } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

const { canonical, languages } = buildAlternates("/platform/flexible-benefits");

export const metadata: Metadata = {
  title: "Flexible Benefits Platform — Personalised Employee Packages",
  description:
    "Personalised employee benefit packages that adapt to every individual. Scalable top-up and top-down flexible benefits structures for SMBs and enterprises in Hong Kong and Singapore.",
  keywords: [
    "flexible benefits platform", "personalised employee benefits", "flexible benefits Hong Kong",
    "top-up benefits", "cafeteria benefits plan", "employee benefits customisation",
    "flexible benefits Singapore", "SMB employee benefits", "MixCare flexible benefits",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Flexible Benefits Platform | ${SITE_NAME}`,
    description:
      "Personalised benefit packages that adapt to every individual. Top-up and top-down structures for SMBs and enterprises.",
    url: canonical,
    images: ogImage("MixCare Flexible Benefits Platform"),
  },
  twitter: {
    title: `Flexible Benefits | ${SITE_NAME}`,
    description:
      "Personalised benefit packages that adapt to every employee. Scalable for SMBs and enterprises.",
    images: ["/opengraph-image.png"],
  },
};

const benefitIcons = [Users2, Sliders, BarChart3];
const stepColors = ["#7c3aed", "#0d9488", "#f97316"];

export default async function FlexibleBenefitsPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.flexibleBenefits;

  const benefits = p.benefits.items.map((item, i) => ({
    icon: benefitIcons[i],
    title: item.title,
    desc: item.desc,
  }));

  return (
    <main>
      <JsonLd data={[
        webPageSchema("Flexible Benefits Platform — Personalised Employee Packages", "Personalised employee benefit packages that adapt to every individual. Scalable top-up and top-down flexible benefits for SMBs and enterprises.", "/platform/flexible-benefits"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Platform", path: "/platform/self-funded-outpatient" }, { name: "Flexible Benefits", path: "/platform/flexible-benefits" }]),
      ]} />
      <AppNavbar />

      <PageHero
        badge={p.hero.badge}
        headline={p.hero.headline}
        headlineHighlight={p.hero.headlineHighlight}
        subheadline={p.hero.sub}
        ctaLabel={p.hero.cta}
        ctaHref={localePath(locale, "/get-a-demo")}
        iconColor="#7c3aed"
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"
      />

      <BenefitsGrid
        headline={p.benefits.headline}
        benefits={benefits}
        accentColor="#7c3aed"
      />

      {/* Comparison */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            {p.comparison.headline}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-red-100">
              <h3 className="text-lg font-bold text-slate-700 mb-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <X size={16} className="text-red-500" />
                </div>
                {p.comparison.traditionalTitle}
              </h3>
              <ul className="space-y-3">
                {p.comparison.traditional.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <X size={16} className="text-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-2xl p-8 border"
              style={{ borderColor: "#7c3aed30", backgroundColor: "#f5f3ff" }}
            >
              <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#7c3aed20" }}
                >
                  <Check size={16} style={{ color: "#7c3aed" }} />
                </div>
                {p.comparison.flexibleTitle}
              </h3>
              <ul className="space-y-3">
                {p.comparison.flexible.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-800 font-medium">
                    <Check size={16} style={{ color: "#7c3aed", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration demo */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            {p.howItWorks.headline}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {p.howItWorks.steps.map((step, i) => (
              <div key={step.step} className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md"
                  style={{ backgroundColor: stepColors[i] }}
                >
                  <span className="text-white font-black text-lg">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #1e3a5f 100%)" }}
          >
            {p.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-sm mt-1 text-purple-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageTestimonial
        quote={p.testimonial.quote}
        name={p.testimonial.name}
        title={p.testimonial.title}
        company={p.testimonial.company}
        accentColor="#7c3aed"
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
