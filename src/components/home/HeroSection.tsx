"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowRight, TrendingUp, ShieldCheck, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/locale";
import type { SanityHomeHero } from "@/lib/sanity.queries";

const P = "#10AF97";
const S = "#0A3D59";

interface HeroSectionProps {
  data?: SanityHomeHero;
}

export default function HeroSection({ data }: HeroSectionProps = {}) {
  const { t, locale } = useLanguage();
  const p = t.home.hero;
  const h = {
    badge:            data?.badge            ?? p.badge,
    headline1:        data?.headline1        ?? p.headline1,
    headline2:        data?.headline2        ?? p.headline2,
    headline3:        data?.headline3        ?? p.headline3,
    sub:              data?.sub              ?? p.sub,
    ctaPrimary:       data?.ctaPrimary       ?? p.ctaPrimary,
    ctaSecondary:     data?.ctaSecondary     ?? p.ctaSecondary,
    dashboardTitle:   data?.dashboardTitle   ?? p.dashboardTitle,
    dashboardCompany: data?.dashboardCompany ?? p.dashboardCompany,
    dashboardLive:    data?.dashboardLive    ?? p.dashboardLive,
    statLabels:       data?.statLabels       ?? p.statLabels,
    statValues:       data?.statValues       ?? p.statValues,
    claimLabels:      data?.claimLabels      ?? p.claimLabels,
    recentClaims:     data?.recentClaims     ?? p.recentClaims,
    approved:         data?.approved         ?? p.approved,
    processing:       data?.processing       ?? p.processing,
    costSaved:        data?.costSaved        ?? p.costSaved,
    costSavedSub:     data?.costSavedSub     ?? p.costSavedSub,
    compliance:       data?.compliance       ?? p.compliance,
    services:         data?.services         ?? p.services,
    servicesSub:      data?.servicesSub      ?? p.servicesSub,
  };

  const stats = [
    { value: h.statValues[0], label: h.statLabels[0] },
    { value: h.statValues[1], label: h.statLabels[1] },
    { value: h.statValues[2], label: h.statLabels[2] },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(135deg, #edfbf8 0%, #eff6ff 50%, #fff7ed 100%)" }}
      />
      {/* Decorative blobs */}
      <div
        className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl"
        style={{ background: `radial-gradient(circle, ${P}, transparent)` }}
      />
      <div
        className="absolute bottom-10 left-0 w-80 h-80 rounded-full opacity-15 -z-10 blur-3xl"
        style={{ background: `radial-gradient(circle, ${S}, transparent)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-tight mb-7">
              {h.headline1}
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${P} 0%, ${S} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {h.headline2}
              </span>
              {h.headline3 && (
                <>
                  <br />
                  {h.headline3}
                </>
              )}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl">
              {h.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                as={Link}
                href={localePath(locale, "/get-a-demo")}
                size="lg"
                className="text-white font-bold px-8 rounded-xl shadow-lg"
                style={{ backgroundColor: "#f97316" }}
                endContent={<ArrowRight size={18} />}
              >
                {h.ctaPrimary}
              </Button>
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-100">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-500 font-medium">{h.dashboardTitle}</p>
                  <p className="text-lg font-bold text-black">{h.dashboardCompany}</p>
                </div>
                <div className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: P }}>
                  {h.dashboardLive}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: P + "15" }}>
                    <p className="text-base font-extrabold leading-tight" style={{ color: P }}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Progress bars */}
              <div className="space-y-3">
                {[
                  { label: h.claimLabels[0], pct: 72, color: P },
                  { label: h.claimLabels[1], pct: 85, color: S },
                  { label: h.claimLabels[2], pct: 58, color: "#f97316" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs text-slate-600 mb-1 font-medium">
                      <span>{item.label}</span>
                      <span>{item.pct}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-500 mb-3">{h.recentClaims}</p>
                <div className="space-y-2">
                  {[
                    { name: "Sarah L.", type: "GP Visit", amount: "HK$320", status: h.approved },
                    { name: "David K.", type: "Dental", amount: "HK$850", status: h.processing },
                  ].map((claim) => (
                    <div key={claim.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: P }}
                        >
                          {claim.name[0]}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-black">{claim.name}</p>
                          <p className="text-xs text-slate-400">{claim.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-black">{claim.amount}</p>
                        <span
                          className="text-xs font-medium"
                          style={claim.status === h.approved ? { color: P } : { color: "#f97316" }}
                        >
                          {claim.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-3 border border-slate-100 flex items-center gap-2">
              <TrendingUp size={18} style={{ color: P }} />
              <div>
                <p className="text-xs font-bold text-black">{h.costSaved}</p>
                <p className="text-xs text-slate-400">{h.costSavedSub}</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 border border-slate-100 flex items-center gap-2">
              <ShieldCheck size={18} style={{ color: S }} />
              <p className="text-xs font-bold text-black">{h.compliance}</p>
            </div>
            <div className="absolute top-1/2 -left-8 bg-white rounded-2xl shadow-lg px-4 py-3 border border-slate-100 flex items-center gap-2">
              <Users size={18} style={{ color: "#f97316" }} />
              <div>
                <p className="text-xs font-bold text-black">{h.services}</p>
                <p className="text-xs text-slate-400">{h.servicesSub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
