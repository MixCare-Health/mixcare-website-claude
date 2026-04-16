import type { Metadata } from "next";
import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnersForm from "@/components/forms/PartnersForm";
import { Briefcase, Users, CheckCircle2, TrendingUp, Globe, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import {
  partnersPageQuery,
  type SanityPartnersPage,
} from "@/lib/sanity.queries";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Become a Partner — Brokers & Providers",
  description:
    "Partner with MixCare Health as a broker or healthcare provider. Join our growing network and offer clients AI-powered employee benefits solutions across Hong Kong, Macau, and Singapore.",
  keywords: [
    "MixCare Health partner",
    "health benefits broker partnership",
    "healthcare provider network",
    "employee benefits distribution",
    "broker partner Hong Kong",
    "healthcare provider Singapore",
    "digital health partnership",
    "corporate wellness partner",
  ],
  alternates: buildAlternates("/partners"),
  openGraph: {
    title: `Become a Partner — ${SITE_NAME}`,
    description:
      "Join the MixCare Health partner network. Offer clients AI-powered employee benefits as a broker or healthcare provider across Asia-Pacific.",
    url: "https://www.mixcarehealth.com/en/partners",
    images: ogImage(`Become a Partner — ${SITE_NAME}`),
  },
  twitter: {
    title: `Become a Partner — ${SITE_NAME}`,
    description:
      "Join the MixCare Health partner network. Offer clients AI-powered employee benefits as a broker or healthcare provider across Asia-Pacific.",
    images: ogImage(`Become a Partner — ${SITE_NAME}`),
  },
};

export const revalidate = 60;

const partnerTypeIcons: LucideIcon[] = [Briefcase, Users];
const partnerTypeBgs = ["#eff6ff", "#f0fdfa"];
const partnerTypeColors = ["#1e3a5f", "#0d9488"];

const benefitIconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Globe,
  Zap,
  CheckCircle2,
};

export default async function PartnersPage() {
  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);
  const t = getTranslations(locale);
  const tP = t.partners;

  const sp: SanityPartnersPage | null = isSanityConfigured
    ? await sanityClient.fetch(partnersPageQuery, { locale: sanityLocale })
    : null;

  // Resolve content — Sanity first, translation fallback
  const badge             = sp?.badge             ?? tP.badge;
  const headline          = sp?.headline          ?? tP.headline;
  const headlineHighlight = sp?.headlineHighlight ?? tP.headlineHighlight;
  const sub               = sp?.sub               ?? tP.sub;
  const typesTitle        = sp?.typesTitle        ?? tP.typesTitle;
  const benefitsTitle     = sp?.benefitsTitle     ?? tP.benefitsTitle;

  // Partner types — Sanity or fallback from translation + hard-coded benefits
  const partnerTypes = sp?.types ?? [
    {
      label: tP.types[0],
      desc: "Offer MixCare's flexible benefits and FSA to your corporate clients. Differentiate your product portfolio and improve retention.",
      benefits: [
        "White-label product under your brand",
        "Revenue share on benefit premiums",
        "Dedicated partner manager",
        "Co-marketing opportunities",
      ],
    },
    {
      label: tP.types[1],
      desc: "Get listed on the MixCare Wellness Marketplace and connect with thousands of corporate employees and policyholders.",
      benefits: [
        "Instant access to 50,000+ employees",
        "Digital booking and cashless payments",
        "3-day payment settlement",
        "Provider analytics dashboard",
      ],
    },
  ];

  // Partner benefits — Sanity or hard-coded fallback
  const partnerBenefits = sp?.benefits ?? [
    { icon: "TrendingUp", title: "Revenue Share",    desc: "Earn competitive commissions on all benefits sold or redeemed through your partnership." },
    { icon: "Globe",      title: "Regional Coverage", desc: "Access MixCare's network across Hong Kong, Macau, and Singapore from day one." },
    { icon: "Zap",        title: "Fast Onboarding",   desc: "Partner portal setup in 48 hours. Your first client or service listing live within a week." },
    { icon: "CheckCircle2", title: "Full Support",    desc: "Dedicated partner manager, co-marketing resources, and technical integration support." },
  ];

  const formContent = {
    formTitle:   sp?.formTitle           ?? tP.formTitle,
    formSub:     sp?.formSub             ?? tP.formSub,
    fields:      sp?.fields              ?? tP.fields,
    typeOptions: sp?.typeOptions         ?? tP.types,
    success:     sp?.success             ?? tP.success,
  };

  return (
    <main>
      <AppNavbar />

      {/* Hero */}
      <section
        className="pt-28 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #0d9488, transparent)" }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: "#ccfbf1", color: "#0f766e" }}
          >
            {badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
            {headline}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {headlineHighlight}
            </span>
          </h1>
          <p className="text-xl text-slate-600">{sub}</p>
        </div>
      </section>

      {/* Partner types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            {typesTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {partnerTypes.map((pt, idx) => {
              const Icon = partnerTypeIcons[idx] ?? Briefcase;
              const color = partnerTypeColors[idx] ?? "#0d9488";
              const bg    = partnerTypeBgs[idx]    ?? "#f0fdfa";
              return (
                <div
                  key={pt.label}
                  className="rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all"
                  style={{ backgroundColor: bg }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: color }}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{pt.label}</h3>
                  <p className="text-slate-600 mb-5 leading-relaxed">{pt.desc}</p>
                  <ul className="space-y-2">
                    {pt.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 size={14} style={{ color, flexShrink: 0 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner benefits */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            {benefitsTitle}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnerBenefits.map((b) => {
              const Icon = benefitIconMap[b.icon] ?? CheckCircle2;
              return (
                <div
                  key={b.title}
                  className="bg-white rounded-2xl p-6 border border-slate-100 text-center"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "#ccfbf1" }}
                  >
                    <Icon size={22} style={{ color: "#0d9488" }} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sign-up form (client component) */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <PartnersForm content={formContent} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
