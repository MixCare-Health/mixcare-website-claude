"use client";

import { ShieldCheck, Lock, Eye, Server, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { SanityHomeCompliance } from "@/lib/sanity.queries";

const P = "#10AF97";
const S = "#0A3D59";

const certs = [
  { label: "PDPO (HK)", desc: "HK privacy ordinance", icon: ShieldCheck, color: P, bg: "#f0fdfa" },
  { label: "ISO 27001", desc: "Information security management", icon: Lock, color: "#4f46e5", bg: "#eef2ff" },
  { label: "Annual Security Test", desc: "Independent penetration testing", icon: Server, color: "#f97316", bg: "#fff7ed" },
];

const pillarIcons = [ShieldCheck, Lock, Eye, Server];
const pillarColors = [P, "#4f46e5", "#f97316", "#7c3aed"];

interface ComplianceSectionProps {
  data?: SanityHomeCompliance;
}

export default function ComplianceSection({ data }: ComplianceSectionProps = {}) {
  const { t } = useLanguage();
  const p = t.home.compliance;
  const comp = {
    badge:        data?.badge        ?? p.badge,
    headline:     data?.headline     ?? p.headline,
    sub:          data?.sub          ?? p.sub,
    certFootnote: data?.certFootnote ?? p.certFootnote,
    pillars:      data?.pillars      ?? p.pillars,
    // These fields are not in Sanity schema, use translation fallbacks
    viewTrust:  p.viewTrust,
    certTitle:  p.certTitle,
    certSub:    p.certSub,
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
            {comp.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {comp.headline}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {comp.sub}
          </p>
        </div>

        {/* Cert badges */}
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {certs.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.label}
                className="rounded-2xl border border-slate-100 p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-all"
                style={{ backgroundColor: cert.bg }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: cert.color }}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-slate-900">{cert.label}</p>
                    <CheckCircle2 size={15} style={{ color: cert.color }} />
                  </div>
                  <p className="text-sm text-slate-500">{cert.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {comp.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i];
            const color = pillarColors[i];
            return (
              <div
                key={pillar.title}
                className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-slate-200 transition-all"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: color + "18" }}
                >
                  <Icon size={16} style={{ color }} />
                </div>
                <p className="text-sm font-bold text-slate-800 mb-1">{pillar.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-slate-400 mt-8">{comp.certFootnote}</p>
      </div>
    </section>
  );
}
