"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Briefcase,
  Building2,
  Store,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/locale";
import type { SanityHomeAudience } from "@/lib/sanity.queries";

const P = "#10AF97";
const S = "#0A3D59";

const audienceMeta = [
  { id: "insurer", icon: Shield, color: P, bg: P + "10", href: "/who-we-serve/insurers" },
  { id: "broker", icon: Briefcase, color: S, bg: S + "10", href: "/who-we-serve/brokers" },
  { id: "enterprise", icon: Building2, color: "#7c3aed", bg: "#7c3aed10", href: "/who-we-serve/enterprises" },
  { id: "sme", icon: Store, color: "#f97316", bg: "#f9731610", href: "/who-we-serve/small-business" },
  { id: "provider", icon: Stethoscope, color: "#0891b2", bg: "#0891b210", href: "/who-we-serve/providers" },
];

interface AudienceSectionProps {
  data?: SanityHomeAudience;
}

export default function AudienceSection({ data }: AudienceSectionProps = {}) {
  const { t, locale } = useLanguage();
  const p = t.home.audience;
  const aud = {
    badge:     data?.badge     ?? p.badge,
    headline:  data?.headline  ?? p.headline,
    sub:       data?.sub       ?? p.sub,
    howWeHelp: data?.howWeHelp ?? p.howWeHelp,
    learnMore: data?.learnMore ?? p.learnMore,
    audiences: data?.audiences ?? p.audiences,
  };
  const [activeIdx, setActiveIdx] = useState(0);

  const current = audienceMeta[activeIdx];
  const currentContent = aud.audiences[activeIdx];
  const CurrentIcon = current.icon;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
            {aud.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
            {aud.headline}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {aud.sub}
          </p>
        </div>

        {/* Audience tab pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {aud.audiences.map((a, i) => {
            const meta = audienceMeta[i];
            const Icon = meta.icon;
            return (
              <button
                key={meta.id}
                onClick={() => setActiveIdx(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeIdx === i
                    ? "text-white shadow-md"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
                style={activeIdx === i ? { backgroundColor: meta.color } : {}}
              >
                <Icon size={15} />
                {a.label}
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div
          className="rounded-3xl border overflow-hidden shadow-sm"
          style={{ borderColor: current.color + "30" }}
        >
          <div className="grid md:grid-cols-5 gap-0">
            {/* Left accent */}
            <div
              className="md:col-span-2 p-10 flex flex-col justify-between"
              style={{ backgroundColor: current.bg }}
            >
              <div>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow"
                  style={{ backgroundColor: current.color }}
                >
                  <CurrentIcon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-black mb-2">{currentContent.label}</h3>
                <p className="text-slate-600 leading-relaxed mb-8">{currentContent.tagline}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={localePath(locale, currentContent.ctaHref)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: current.color }}
                >
                  {currentContent.cta} <ArrowRight size={14} />
                </Link>
                <Link
                  href={localePath(locale, current.href)}
                  aria-label={`${aud.learnMore} — ${currentContent.label}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white border text-slate-600 hover:text-slate-800 transition-colors"
                  style={{ borderColor: current.color + "40" }}
                >
                  {aud.learnMore}
                </Link>
              </div>
            </div>

            {/* Right: bullets */}
            <div className="md:col-span-3 p-10 bg-white">
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: current.color }}>
                {aud.howWeHelp}
              </p>
              <ul className="space-y-4">
                {currentContent.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" style={{ color: current.color }} />
                    <span className="text-slate-700 leading-relaxed text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
