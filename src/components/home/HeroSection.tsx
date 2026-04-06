"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/locale";
import type { SanityHomeHero } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";

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

  const heroImageUrl = data?.heroImage ? urlFor(data.heroImage).width(900).height(700).fit("crop").url() : null;

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
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
                href={"https://meetings-na2.hubspot.com/alex-wong9/mixcare-exploration-meeting-"}
                size="lg"
                className="text-white font-bold px-8 rounded-xl shadow-lg"
                style={{ backgroundColor: "#f97316" }}
                endContent={<ArrowRight size={18} />}
              >
                {h.ctaPrimary}
              </Button>
            </div>
          </div>

          {/* Right: Hero image (if available) + Dashboard mockup */}
          <div className="relative">
            {heroImageUrl && (
              <div className="mb-6 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={heroImageUrl}
                  alt="MixCare Health employee benefits"
                  width={900}
                  height={500}
                  className="w-full object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
