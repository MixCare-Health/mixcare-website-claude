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
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/locale";

const P = "#10AF97";
const S = "#0A3D59";

const featureMeta = [
  { id: "outpatient", icon: Stethoscope, color: P,        bg: P + "10",        href: "/platform/self-funded-outpatient",    comingSoon: false },
  { id: "fsa",        icon: Wallet,       color: S,        bg: S + "10",        href: "/platform/flexible-spending-account", comingSoon: false },
  { id: "marketplace",icon: ShoppingBag,  color: "#f97316",bg: "#f9731610",     href: "/platform/wellness-marketplace",      comingSoon: false },
  { id: "events",     icon: CalendarDays, color: "#0891b2",bg: "#0891b210",     href: "/platform/wellness-event",            comingSoon: false },
  { id: "flexible",   icon: Sliders,      color: "#7c3aed",bg: "#7c3aed10",     href: "/platform/flexible-benefits",         comingSoon: true  },
  { id: "hub",        icon: LayoutDashboard,color: P,      bg: P + "10",        href: "/platform/wellness-hub",              comingSoon: true  },
];

export default function PlatformFeaturesSectionV2() {
  const { t, locale } = useLanguage();
  const pf = t.home.platformFeatures;
  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const current = featureMeta[activeIdx];
  const currentContent = pf.features[activeIdx];
  const CurrentIcon = current.icon;

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

        {/* Mobile: dropdown selector */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-full flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl border-2 shadow-sm"
            style={{ borderColor: current.color }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: current.color }}>
              <CurrentIcon size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-800 flex-1 text-left">{t.nav.platformLinks[activeIdx].label}</span>
            {current.comingSoon && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{pf.soon}</span>
            )}
            <ChevronDown size={18} className={`text-slate-400 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileOpen && (
            <div className="mt-1 bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden">
              {t.nav.platformLinks.map((link, i) => {
                const meta = featureMeta[i];
                const Icon = meta.icon;
                return (
                  <button
                    key={meta.id}
                    onClick={() => { setActiveIdx(i); setMobileOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeIdx === i ? "text-white" : "text-slate-700 hover:bg-slate-50"
                    }`}
                    style={activeIdx === i ? { backgroundColor: meta.color } : {}}
                  >
                    <Icon size={16} className="flex-shrink-0" />
                    <span className="font-semibold text-sm">{link.label}</span>
                    {meta.comingSoon && (
                      <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        activeIdx === i ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700"
                      }`}>{pf.soon}</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop: vertical tab + content panel */}
        <div className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-0 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[520px]">

          {/* Left: vertical tab list */}
          <div className="border-r border-slate-100 py-4 flex flex-col">
            {t.nav.platformLinks.map((link, i) => {
              const meta = featureMeta[i];
              const Icon = meta.icon;
              const isActive = activeIdx === i;
              return (
                <button
                  key={meta.id}
                  onClick={() => setActiveIdx(i)}
                  className={`group relative flex items-start gap-3 px-6 py-4 text-left transition-all ${
                    isActive ? "bg-slate-50" : "hover:bg-slate-50/60"
                  }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full"
                      style={{ backgroundColor: meta.color }}
                    />
                  )}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                    style={{
                      backgroundColor: isActive ? meta.color : meta.bg,
                    }}
                  >
                    <Icon
                      size={17}
                      style={{ color: isActive ? "#fff" : meta.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-bold leading-tight ${isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-800"}`}>
                        {link.label}
                      </span>
                      {meta.comingSoon && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                          {pf.soon}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 leading-snug">
                      {pf.features[i].desc.slice(0, 55)}…
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: content panel */}
          <div className="grid md:grid-cols-[1fr_260px] gap-0">
            {/* Detail */}
            <div className="p-10 xl:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: current.color }}
                >
                  <CurrentIcon size={24} className="text-white" />
                </div>
                {current.comingSoon && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                    {pf.comingSoon}
                  </span>
                )}
              </div>
              <h3 className="text-2xl xl:text-3xl font-extrabold text-black mb-4">
                {currentContent.headline}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-7">{currentContent.desc}</p>
              <ul className="space-y-3 mb-8">
                {currentContent.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: current.color }} />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={localePath(locale, current.href)}
                className="inline-flex items-center gap-2 font-bold text-sm hover:gap-3 transition-all"
                style={{ color: current.color }}
              >
                {current.comingSoon ? pf.learnMore : `${pf.explore} ${t.nav.platformLinks[activeIdx].label}`}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Visual panel */}
            <div
              className="flex items-center justify-center p-8"
              style={{ backgroundColor: current.bg }}
            >
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  style={{ backgroundColor: current.color }}
                >
                  <CurrentIcon size={40} className="text-white" />
                </div>
                <p className="font-bold text-slate-700">{t.nav.platformLinks[activeIdx].label}</p>
                {current.comingSoon ? (
                  <span className="inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                    {pf.comingSoon}
                  </span>
                ) : (
                  <p className="text-xs text-slate-500 mt-1">{pf.available}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: content panel (shown below dropdown) */}
        <div className="lg:hidden bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-7">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: current.color }}
              >
                <CurrentIcon size={22} className="text-white" />
              </div>
              {current.comingSoon && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                  {pf.comingSoon}
                </span>
              )}
            </div>
            <h3 className="text-xl font-extrabold text-black mb-3">{currentContent.headline}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-5">{currentContent.desc}</p>
            <ul className="space-y-2.5 mb-6">
              {currentContent.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: current.color }} />
                  {b}
                </li>
              ))}
            </ul>
            {!current.comingSoon && (
              <Link
                href={localePath(locale, current.href)}
                className="inline-flex items-center gap-2 font-bold text-sm"
                style={{ color: current.color }}
              >
                {pf.explore} {t.nav.platformLinks[activeIdx].label}
                <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
