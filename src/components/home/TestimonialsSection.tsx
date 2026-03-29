"use client";

import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const P = "#10AF97";

const testimonials = [
  {
    quote:
      "MixCare transformed how we deliver health benefits to our policyholders. The AI claims processing cut our resolution time by 70% and fraud incidents dropped significantly.",
    name: "Jennifer Wong",
    title: "VP, Group Benefits",
    company: "AXA Hong Kong",
    audienceKey: "Insurer" as const,
    color: P,
  },
  {
    quote:
      "Our employees finally use their benefits. The wellness marketplace is genuinely loved — utilisation jumped from 40% to 92% in the first quarter after switching to MixCare.",
    name: "Marcus Chen",
    title: "Head of HR",
    company: "Jardine Matheson",
    audienceKey: "Enterprise" as const,
    color: "#0A3D59",
  },
  {
    quote:
      "As a broker, MixCare gives me the most flexible, competitive packages to offer clients. I've retained 3 large accounts this year purely because of the FSA and marketplace features.",
    name: "Diana Leung",
    title: "Senior Benefits Advisor",
    company: "Pacific Benefits Group",
    audienceKey: "Broker" as const,
    color: "#f97316",
  },
  {
    quote:
      "We're a 25-person startup. Setting up MixCare took one afternoon and now we offer benefits that rival large corporations. It's helped us attract senior talent we couldn't before.",
    name: "Ryan Lau",
    title: "CEO & Co-Founder",
    company: "TechBridge HK",
    audienceKey: "Small Business" as const,
    color: "#7c3aed",
  },
  {
    quote:
      "The Wellness Hub connected us directly to 8 corporate clients within the first month. Digital booking, cashless payments, and outcome tracking — everything we needed.",
    name: "Dr. Emily Fok",
    title: "Clinical Director",
    company: "Mindful Wellness Centre",
    audienceKey: "Provider" as const,
    color: "#0891b2",
  },
  {
    quote:
      "Compliance was our biggest concern when evaluating platforms. MixCare's PDPO and SOC 2 certifications, plus their dedicated compliance team, gave us full confidence.",
    name: "Thomas Ng",
    title: "Chief Risk Officer",
    company: "Manulife (HK)",
    audienceKey: "Insurer" as const,
    color: P,
  },
];

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const ts = t.home.testimonials;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
            {ts.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {ts.headline}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {ts.sub}
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="#f97316" color="#f97316" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed flex-1 mb-5">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  {item.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">
                    {item.title} · {item.company}
                  </p>
                </div>
                <span
                  className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: item.color + "15", color: item.color }}
                >
                  {ts.audienceLabels[item.audienceKey]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats banner */}
        <div
          className="rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ background: "linear-gradient(135deg, #0f1e38 0%, #0A3D59 100%)" }}
        >
          {ts.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-white">{stat.value}</p>
              <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
