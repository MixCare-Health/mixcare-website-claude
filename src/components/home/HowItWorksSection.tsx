"use client";

import { Settings2, Smartphone, Cpu, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/locale";
import type { SanityHomeHowItWorks } from "@/lib/sanity.queries";

const P = "#10AF97";

const stepMeta = [
  { icon: Settings2, color: P },
  { icon: Smartphone, color: "#0A3D59" },
  { icon: Cpu, color: "#f97316" },
  { icon: BarChart3, color: "#7c3aed" },
];

interface HowItWorksSectionProps {
  data?: SanityHomeHowItWorks;
}

export default function HowItWorksSection({ data }: HowItWorksSectionProps = {}) {
  const { t, locale } = useLanguage();
  const p = t.home.howItWorks;
  const hiw = {
    badge:     data?.badge     ?? p.badge,
    headline:  data?.headline  ?? p.headline,
    sub:       data?.sub       ?? p.sub,
    stepLabel: data?.stepLabel ?? p.stepLabel,
    cta:       data?.cta       ?? p.cta,
    footnote:  data?.footnote  ?? p.footnote,
    steps:     data?.steps     ?? p.steps,
  };

  return (
    <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
            {hiw.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {hiw.headline}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {hiw.sub}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-gradient-to-r from-teal-200 via-slate-200 to-purple-200 z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {hiw.steps.map((step, i) => {
              const meta = stepMeta[i];
              const Icon = meta.icon;
              const num = String(i + 1).padStart(2, "0");
              return (
                <div key={num} className="flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg relative z-10 bg-white border-2"
                    style={{ borderColor: meta.color }}
                  >
                    <Icon size={28} style={{ color: meta.color }} />
                  </div>
                  <span
                    className="text-xs font-black uppercase tracking-widest mb-2"
                    style={{ color: meta.color }}
                  >
                    {hiw.stepLabel} {num}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA row */}
        <div className="text-center mt-14">
          <a
            href={localePath(locale, "/get-a-demo")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: "#f97316" }}
          >
            {hiw.cta}
          </a>
          <p className="text-sm text-slate-500 mt-3">{hiw.footnote}</p>
        </div>
      </div>
    </section>
  );
}
