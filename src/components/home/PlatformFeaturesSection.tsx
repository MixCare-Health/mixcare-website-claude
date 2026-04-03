"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Wallet,
  ShoppingBag,
  Sliders,
  CalendarDays,
  LayoutDashboard,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Lock,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/locale";
import type { SanityHomePlatformFeatures } from "@/lib/sanity.queries";

const P = "#10AF97";
const S = "#0A3D59";

const featureMeta = [
  { id: "outpatient",  icon: Stethoscope,     color: P,         bg: P + "12",        href: "/platform/self-funded-outpatient",    comingSoon: false },
  { id: "fsa",         icon: Wallet,           color: S,         bg: S + "12",        href: "/platform/flexible-spending-account", comingSoon: false },
  { id: "marketplace", icon: ShoppingBag,      color: "#f97316", bg: "#f9731612",     href: "/platform/wellness-marketplace",      comingSoon: false },
  { id: "events",      icon: CalendarDays,     color: "#0891b2", bg: "#0891b212",     href: "/platform/wellness-event",            comingSoon: false },
  { id: "flexible",    icon: Sliders,          color: "#7c3aed", bg: "#7c3aed12",     href: "/platform/flexible-benefits",         comingSoon: true  },
  { id: "hub",         icon: LayoutDashboard,  color: P,         bg: P + "12",        href: "/platform/wellness-hub",              comingSoon: true  },
];

const mockupStats: [string, string][][] = [
  [["98%", "Claims AI"], ["2,000+", "Panel Clinics"], ["<24h", "Processing"]],
  [["30+", "Categories"], ["100%", "Flexible"], ["Instant", "Balance"]],
  [["3,000+", "Services"], ["30%", "Savings"], ["15", "Categories"]],
  [["50+", "Events/yr"], ["95%", "Satisfaction"], ["Hybrid", "Format"]],
  [["100%", "Custom"], ["5", "Pkg Options"], ["Self-Serve", "Portal"]],
  [["360°", "Wellbeing"], ["10+", "Integrations"], ["1", "Login"]],
];

const chartBars = [45, 68, 52, 83, 61, 94, 72];

interface MockupItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  label: string;
  bullets: string[];
  statIdx: number;
}

function DashboardMockup({ item }: { item: MockupItem }) {
  const Icon = item.icon;
  const stats = mockupStats[item.statIdx];

  return (
    <div className="relative">
      {/* Glow */}
      <div
        className="absolute -inset-6 rounded-3xl opacity-15 blur-3xl -z-10 pointer-events-none"
        style={{ backgroundColor: item.color }}
      />

      {/* Device frame */}
      <div className="rounded-2xl border border-slate-200 shadow-2xl overflow-hidden bg-white">

        {/* Browser chrome */}
        <div className="bg-slate-100 px-3 py-2 flex items-center gap-1.5 border-b border-slate-200">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <div className="ml-3 flex-1 bg-white rounded px-2 py-0.5 text-[9px] text-slate-400 font-mono truncate">
            app.mixcarehealth.com
          </div>
        </div>

        {/* App header */}
        <div
          className="px-4 py-3 flex items-center gap-2.5 border-b border-slate-100"
          style={{ background: `linear-gradient(135deg, ${item.color}18 0%, ${item.color}06 100%)` }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
            style={{ backgroundColor: item.color }}
          >
            <Icon size={13} className="text-white" />
          </div>
          <span className="text-xs font-bold text-slate-800 flex-1">{item.label}</span>
          <div className="flex gap-1.5">
            <div className="w-16 h-4 rounded-full bg-slate-200/70" />
            <div className="w-4 h-4 rounded bg-slate-200/70" />
          </div>
        </div>

        {/* Dashboard body */}
        <div className="p-3.5 bg-slate-50 space-y-3">

          {/* Stat chips */}
          <div className="grid grid-cols-3 gap-2">
            {stats.map(([val, label]) => (
              <div
                key={label}
                className="bg-white rounded-xl p-2.5 text-center border border-slate-100 shadow-sm"
              >
                <p className="text-xs font-extrabold leading-none" style={{ color: item.color }}>{val}</p>
                <p className="text-[9px] text-slate-400 mt-1 leading-none">{label}</p>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-slate-500">Activity Overview</p>
              <div className="flex gap-1">
                {["1W", "1M"].map((l, i) => (
                  <span
                    key={l}
                    className="text-[8px] font-semibold px-1.5 py-0.5 rounded"
                    style={
                      i === 0
                        ? { backgroundColor: item.color + "20", color: item.color }
                        : { color: "#94a3b8" }
                    }
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-1 h-10">
              {chartBars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i === 5 ? item.color : item.color + "35",
                  }}
                />
              ))}
            </div>
            <div className="flex mt-1">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="text-[8px] text-slate-300 flex-1 text-center">{d}</span>
              ))}
            </div>
          </div>

          {/* Feature list */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-3 py-2 border-b border-slate-50">
              <p className="text-[10px] font-bold text-slate-500">Key Features</p>
            </div>
            {item.bullets.slice(0, 3).map((b, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 border-b border-slate-50 last:border-0">
                <CheckCircle2 size={11} className="flex-shrink-0" style={{ color: item.color }} />
                <span className="text-[10px] text-slate-600 leading-tight truncate">{b}</span>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div
            className="rounded-xl px-3 py-2.5 flex items-center justify-between"
            style={{ backgroundColor: item.color + "15" }}
          >
            <span className="text-[10px] font-bold" style={{ color: item.color }}>View full dashboard</span>
            <ArrowRight size={11} style={{ color: item.color }} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface PlatformFeaturesSectionProps {
  data?: SanityHomePlatformFeatures;
}

export default function PlatformFeaturesSection({ data }: PlatformFeaturesSectionProps = {}) {
  const { t, locale } = useLanguage();
  const p = t.home.platformFeatures;
  const pf = {
    badge:      data?.badge      ?? p.badge,
    headline:   data?.headline   ?? p.headline,
    sub:        data?.sub        ?? p.sub,
    soon:       data?.soon       ?? p.soon,
    comingSoon: data?.comingSoon ?? p.comingSoon,
    available:  data?.available  ?? p.available,
    learnMore:  data?.learnMore  ?? p.learnMore,
    explore:    data?.explore    ?? p.explore,
    features:   data?.features   ?? p.features,
  };
  const [open, setOpen] = useState<number | null>(0);

  const activeIdx = open ?? 0;
  const activeMeta = featureMeta[activeIdx];
  const activeContent = pf.features[activeIdx];

  const mockupItem: MockupItem = {
    id: activeMeta.id,
    icon: activeMeta.icon,
    color: activeMeta.color,
    label: t.nav.platformLinks[activeIdx].label,
    bullets: activeContent.bullets,
    statIdx: activeIdx,
  };

  return (
    <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
            {pf.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
            {pf.headline}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {pf.sub}
          </p>
        </div>

        {/* Accordion + Mockup */}
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-10 lg:items-start">

          {/* Left: accordion */}
          <div className="space-y-2">
            {featureMeta.map((meta, i) => {
              const Icon = meta.icon;
              const content = pf.features[i];
              const navLabel = t.nav.platformLinks[i].label;
              const isOpen = open === i;

              return (
                <div
                  key={meta.id}
                  className={`rounded-2xl overflow-hidden border transition-all duration-200 ${
                    isOpen ? "border-slate-200 shadow-sm" : "border-slate-100 bg-white"
                  }`}
                >
                  {/* Row button */}
                  <button
                    onClick={() => !meta.comingSoon && setOpen(isOpen ? null : i)}
                    className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                      meta.comingSoon
                        ? "cursor-not-allowed bg-white"
                        : isOpen
                        ? ""
                        : "bg-white hover:bg-slate-50"
                    }`}
                    style={
                      isOpen && !meta.comingSoon
                        ? { background: `linear-gradient(135deg, ${meta.color}12 0%, ${meta.color}04 100%)` }
                        : {}
                    }
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        backgroundColor: meta.comingSoon ? "#f1f5f9" : isOpen ? meta.color : meta.bg,
                      }}
                    >
                      <Icon
                        size={18}
                        style={{ color: meta.comingSoon ? "#94a3b8" : isOpen ? "#fff" : meta.color }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-sm font-semibold ${
                            meta.comingSoon ? "text-slate-400" : "text-slate-800"
                          }`}
                        >
                          {navLabel}
                        </span>
                        {meta.comingSoon && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                            {pf.soon}
                          </span>
                        )}
                      </div>
                      {!isOpen && (
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {content.desc.slice(0, 60)}…
                        </p>
                      )}
                    </div>

                    {meta.comingSoon ? (
                      <Lock size={14} className="text-slate-300 flex-shrink-0" />
                    ) : (
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        style={isOpen ? { color: meta.color } : {}}
                      />
                    )}
                  </button>

                  {/* Expanded body */}
                  {isOpen && (
                    <div className="border-t border-slate-100 bg-white">
                      <div className="px-5 pt-5 pb-5">
                        <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                          {content.headline}
                        </h3>
                        <p className="text-sm text-slate-500 mb-4 leading-relaxed">{content.desc}</p>
                        <ul className="space-y-2.5 mb-5">
                          {content.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2.5 text-sm text-slate-600">
                              <CheckCircle2
                                size={14}
                                className="flex-shrink-0 mt-0.5"
                                style={{ color: meta.color }}
                              />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={localePath(locale, meta.href)}
                          className="inline-flex items-center gap-1.5 text-sm font-bold hover:gap-2.5 transition-all"
                          style={{ color: meta.color }}
                        >
                          {pf.explore} {navLabel} <ArrowRight size={14} />
                        </Link>
                      </div>

                      {/* Mobile-only mockup — inside expanded panel */}
                      <div className="lg:hidden px-5 pb-5">
                        <DashboardMockup
                          item={{
                            id: meta.id,
                            icon: meta.icon,
                            color: meta.color,
                            label: navLabel,
                            bullets: content.bullets,
                            statIdx: i,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: desktop-only sticky mockup */}
          <div className="hidden lg:block lg:sticky lg:top-28">
            <DashboardMockup item={mockupItem} />
          </div>
        </div>
      </div>
    </section>
  );
}
