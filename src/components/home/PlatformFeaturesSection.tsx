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
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/locale";

const P = "#10AF97";
const S = "#0A3D59";

const featureMeta = [
  { id: "outpatient", icon: Stethoscope, color: P, bg: P + "12", href: "/platform/self-funded-outpatient", comingSoon: false },
  { id: "fsa", icon: Wallet, color: S, bg: S + "12", href: "/platform/flexible-spending-account", comingSoon: false },
  { id: "marketplace", icon: ShoppingBag, color: "#f97316", bg: "#f9731612", href: "/platform/wellness-marketplace", comingSoon: false },
  { id: "events", icon: CalendarDays, color: "#0891b2", bg: "#0891b212", href: "/platform/wellness-marketplace", comingSoon: false },
  { id: "flexible", icon: Sliders, color: "#7c3aed", bg: "#7c3aed12", href: "/platform/flexible-benefits", comingSoon: true },
  { id: "hub", icon: LayoutDashboard, color: P, bg: P + "12", href: "/platform/wellness-hub", comingSoon: true },
];

export default function PlatformFeaturesSection() {
  const { t, locale } = useLanguage();
  const pf = t.home.platformFeatures;
  const [activeIdx, setActiveIdx] = useState(0);

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

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {t.nav.platformLinks.map((link, i) => {
            const meta = featureMeta[i];
            const Icon = meta.icon;
            return (
              <button
                key={meta.id}
                onClick={() => setActiveIdx(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeIdx === i
                    ? "text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
                style={activeIdx === i ? { backgroundColor: meta.color } : {}}
              >
                <Icon size={15} />
                {link.label}
                {meta.comingSoon && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={
                      activeIdx === i
                        ? { backgroundColor: "rgba(255,255,255,0.25)", color: "#fff" }
                        : { backgroundColor: "#fef9c3", color: "#92400e" }
                    }
                  >
                    {pf.soon}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feature detail panel */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: content */}
            <div className="p-10 lg:p-14">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: current.color }}
                >
                  <CurrentIcon size={24} className="text-white" />
                </div>
                {current.comingSoon && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: "#fef9c3", color: "#92400e" }}>
                    {pf.comingSoon}
                  </span>
                )}
              </div>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-black mb-4">
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
                {current.comingSoon ? pf.learnMore : `${pf.explore} ${t.nav.platformLinks[activeIdx].label}`}{" "}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: visual */}
            <div
              className="flex items-center justify-center p-10 min-h-[320px]"
              style={{ backgroundColor: current.bg }}
            >
              <div className="text-center">
                <div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg"
                  style={{ backgroundColor: current.color }}
                >
                  <CurrentIcon size={48} className="text-white" />
                </div>
                <p className="font-bold text-slate-700 text-lg">{t.nav.platformLinks[activeIdx].label}</p>
                {current.comingSoon ? (
                  <span className="inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: "#fef9c3", color: "#92400e" }}>
                    {pf.comingSoon}
                  </span>
                ) : (
                  <p className="text-sm text-slate-500 mt-1">{pf.available}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
