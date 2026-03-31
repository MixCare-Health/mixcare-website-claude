"use client";

import Link from "next/link";
import { ShieldCheck, Lock, Eye, Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/locale";

const P = "#10AF97";
const S = "#0A3D59";

const badges = [
  { label: "PDPO (HK)", desc: "HK privacy ordinance" },
  { label: "ISO 27001", desc: "Information security" },
  { label: "Annual Security Test", desc: "Independent penetration testing" },
];

const pillarIcons = [ShieldCheck, Lock, Eye, Server];
const pillarColors = [P, S, "#f97316", "#7c3aed"];

export default function ComplianceSection() {
  const { t, locale } = useLanguage();
  const comp = t.home.compliance;

  return (
    <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
              {comp.badge}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-5">
              {comp.headline}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {comp.sub}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {comp.pillars.map((pillar, i) => {
                const Icon = pillarIcons[i];
                const color = pillarColors[i];
                return (
                  <div key={pillar.title} className="bg-white rounded-xl p-4 border border-slate-100">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: color + "15" }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <p className="text-sm font-bold text-black mb-1">{pillar.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right: compliance badges */}
          <div
            className="rounded-3xl p-10"
            style={{ background: `linear-gradient(135deg, ${P} 0%, ${S} 100%)` }}
          >
            <p className="text-white font-bold text-xl mb-2">{comp.certTitle}</p>
            <p className="text-white/70 text-sm mb-8">{comp.certSub}</p>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => (
                <div key={badge.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-white font-bold text-sm">{badge.label}</p>
                  <p className="text-white/60 text-xs mt-0.5">{badge.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-xs mt-6">{comp.certFootnote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
