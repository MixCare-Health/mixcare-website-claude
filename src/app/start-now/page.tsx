import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartNowForm from "@/components/forms/StartNowForm";
import { CheckCircle2, Zap, Users, BarChart3, Star } from "lucide-react";
import Link from "next/link";

import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import {
  startNowPageQuery,
  type SanityStartNowPage,
} from "@/lib/sanity.queries";

export const revalidate = 60;

const stepIcons = [Users, BarChart3, Zap];
const stepColors = ["#0d9488", "#f97316", "#1e3a5f"];

const testimonials = [
  {
    quote: "Setup took one afternoon. Now we look like a company 10x our size to candidates.",
    name: "Ryan L.",
    company: "TechBridge HK",
    employees: "25 employees",
  },
  {
    quote: "Our team actually uses their benefits now. FSA wallets were a game-changer.",
    name: "Amy C.",
    company: "Creative Studio SG",
    employees: "18 employees",
  },
  {
    quote: "We retained two key hires who had offers from larger companies. Worth every cent.",
    name: "James T.",
    company: "FinTech Startup HK",
    employees: "40 employees",
  },
];

const planColors = ["#0d9488", "#f97316", "#1e3a5f"];

export default async function StartNowPage() {
  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);
  const t = getTranslations(locale);
  const tSN = t.startNow;

  const sp: SanityStartNowPage | null = isSanityConfigured
    ? await sanityClient.fetch(startNowPageQuery, { locale: sanityLocale })
    : null;

  // Resolve content — Sanity first, translation fallback
  const badge             = sp?.badge             ?? tSN.badge;
  const headline          = sp?.headline          ?? tSN.headline;
  const headlineHighlight = sp?.headlineHighlight ?? tSN.headlineHighlight;
  const sub               = sp?.sub               ?? tSN.sub;
  const stepsTitle        = sp?.stepsTitle        ?? tSN.stepsTitle;
  const steps             = sp?.steps             ?? tSN.steps;
  const pricingTitle      = sp?.pricingTitle      ?? tSN.pricingTitle;
  const pricingSub        = sp?.pricingSub        ?? tSN.pricingSub;
  const plans             = sp?.plans             ?? tSN.plans;
  const popularLabel      = sp?.popularLabel      ?? tSN.popularLabel;
  const testimonialsTitle = sp?.testimonialsTitle ?? tSN.testimonialsTitle;

  const formContent = {
    formTitle: sp?.formTitle ?? tSN.formTitle,
    fields:    sp?.fields    ?? tSN.fields,
    success:   sp?.success   ?? tSN.success,
  };

  return (
    <main>
      <AppNavbar />

      {/* Hero */}
      <section
        className="pt-28 pb-16 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #f97316, transparent)" }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: "#fed7aa", color: "#c2410c" }}
          >
            <Zap size={14} />
            {badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
            {headline}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f97316 0%, #0d9488 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {headlineHighlight}
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">{sub}</p>

          {/* Quick signup form (client component) */}
          <StartNowForm content={formContent} />
        </div>
      </section>

      {/* Setup timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-10">
            {stepsTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, idx) => {
              const Icon = stepIcons[idx] ?? Zap;
              const color = stepColors[idx] ?? "#0d9488";
              return (
                <div key={idx} className="text-center">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: color }}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {s.time}
                  </span>
                  <h3 className="font-bold text-slate-900 mt-1 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">
            {pricingTitle}
          </h2>
          <p className="text-slate-600 text-center mb-10">{pricingSub}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, idx) => {
              const color = planColors[idx] ?? "#0d9488";
              const isEnterprise = plan.price === "Custom" || plan.price === "按需定價" || plan.price === "按需定价";
              return (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-8 border ${
                    plan.popular ? "shadow-xl scale-105" : "border-slate-100 bg-white"
                  }`}
                  style={
                    plan.popular
                      ? { background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)", border: "none" }
                      : {}
                  }
                >
                  {plan.popular && (
                    <div className="text-xs font-bold uppercase tracking-wider text-teal-200 mb-3">
                      {popularLabel}
                    </div>
                  )}
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      plan.popular ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-xs mb-4 ${
                      plan.popular ? "text-teal-200" : "text-slate-500"
                    }`}
                  >
                    {plan.desc}
                  </p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span
                      className={`text-4xl font-extrabold ${
                        plan.popular ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {!isEnterprise && (
                      <span
                        className={`text-xs ${
                          plan.popular ? "text-teal-200" : "text-slate-500"
                        }`}
                      >
                        {plan.per}
                      </span>
                    )}
                  </div>
                  {isEnterprise ? (
                    <Link
                      href="/get-a-demo"
                      className="block w-full text-center py-3 rounded-xl font-bold text-sm"
                      style={{ backgroundColor: "#f97316", color: "#fff" }}
                    >
                      {plan.cta}
                    </Link>
                  ) : (
                    <button
                      className="w-full py-3 rounded-xl font-bold text-sm text-white"
                      style={
                        plan.popular
                          ? { backgroundColor: "#f97316" }
                          : { backgroundColor: color }
                      }
                    >
                      {plan.cta}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SMB testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
            {testimonialsTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="#f97316" color="#f97316" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="text-sm font-bold text-slate-900">{testimonial.name}</p>
                <p className="text-xs text-slate-500">
                  {testimonial.company} · {testimonial.employees}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
