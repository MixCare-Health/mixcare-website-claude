"use client";

import Link from "next/link";
import { Stethoscope, Wallet, ShoppingBag, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/locale";
import type { SanityHomeCorePlatform } from "@/lib/sanity.queries";

const P = "#10AF97";
const S = "#0A3D59";

const pillarMeta = [
  { icon: Stethoscope, color: P, bg: "#f0fdfa", href: "/platform/self-funded-outpatient" },
  { icon: Wallet, color: S, bg: "#eff6ff", href: "/platform/flexible-spending-account" },
  { icon: ShoppingBag, color: "#f97316", bg: "#fff7ed", href: "/platform/wellness-marketplace" },
];

interface CorePlatformSectionProps {
  data?: SanityHomeCorePlatform;
}

export default function CorePlatformSection({ data }: CorePlatformSectionProps = {}) {
  const { t, locale } = useLanguage();
  const p = t.home.corePlatform;
  const cp = {
    badge:             data?.badge             ?? p.badge,
    headline:          data?.headline          ?? p.headline,
    headlineHighlight: data?.headlineHighlight ?? p.headlineHighlight,
    sub:               data?.sub               ?? p.sub,
    learnMore:         data?.learnMore         ?? p.learnMore,
    pillars:           data?.pillars           ?? p.pillars,
    counters:          data?.counters          ?? p.counters,
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
            {cp.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {cp.headline}{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${P} 0%, ${S} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {cp.headlineHighlight}
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {cp.sub}
          </p>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          {cp.pillars.map((pillar, i) => {
            const meta = pillarMeta[i];
            const Icon = meta.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl border border-slate-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                style={{ backgroundColor: meta.bg }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: meta.color }}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                  style={{ backgroundColor: meta.color + "20", color: meta.color }}
                >
                  {pillar.stats}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{pillar.desc}</p>
                <Link
                  href={localePath(locale, meta.href)}
                  className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                  style={{ color: meta.color }}
                >
                  {cp.learnMore} <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Counter row */}
        <div
          className="mt-12 rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ background: `linear-gradient(135deg, ${P} 0%, ${S} 100%)` }}
        >
          {cp.counters.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-white">{stat.value}</p>
              <p className="text-sm text-teal-100 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
