"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import {
  ChevronDown,
  Menu,
  X,
  Shield,
  Wallet,
  ShoppingBag,
  Sliders,
  LayoutDashboard,
  Building2,
  Users,
  Briefcase,
  Store,
  Stethoscope,
  CalendarDays,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LOCALES, LOCALE_LABELS, LOCALE_URL, localePath, parseLocalePath } from "@/lib/locale";
import type { Locale } from "@/lib/locale";

const P = "#10AF97";
const S = "#0A3D59";

const platformHrefs = [
  "/platform/self-funded-outpatient",
  "/platform/flexible-spending-account",
  "/platform/wellness-marketplace",
  "/platform/wellness-marketplace",
  "/platform/flexible-benefits",
  "/platform/wellness-hub",
];
const platformIcons = [Stethoscope, Wallet, ShoppingBag, CalendarDays, Sliders, LayoutDashboard];
const platformComingSoon = [false, false, false, false, true, true];

const audienceHrefs = [
  "/who-we-serve/insurers",
  "/who-we-serve/brokers",
  "/who-we-serve/enterprises",
  "/who-we-serve/small-business",
  "/who-we-serve/providers",
];
const audienceIcons = [Shield, Briefcase, Building2, Store, Users];

export default function AppNavbar() {
  const { t, locale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [audienceOpen, setAudienceOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false);
  const [mobileAudienceOpen, setMobileAudienceOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const pathname = usePathname();
const platformRef = useRef<HTMLDivElement>(null);
  const audienceRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setPlatformOpen(false);
    setAudienceOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (platformRef.current && !platformRef.current.contains(e.target as Node)) setPlatformOpen(false);
      if (audienceRef.current && !audienceRef.current.contains(e.target as Node)) setAudienceOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (l: Locale) => {
    setLangOpen(false);
    setMobileLangOpen(false);
    const { basePath } = parseLocalePath(pathname);
    // Full navigation (not router.push) so the server always re-renders with the
    // new locale cookie — bypasses Next.js Router Cache which would serve stale content.
    window.location.href = `/${LOCALE_URL[l]}${basePath === "/" ? "" : basePath}`;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={localePath(locale, "/")} className="flex items-center flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://m.mixcarehealth.com/wp-content/uploads/2024/05/mixcare-logo.257ebb39.png"
                alt="MixCare Health"
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Platform mega-menu */}
              <div ref={platformRef} className="relative">
                <button
                  onClick={() => { setPlatformOpen(!platformOpen); setAudienceOpen(false); setLangOpen(false); }}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    platformOpen ? "bg-teal-50" : "text-slate-700 hover:bg-slate-50"
                  }`}
                  style={platformOpen ? { color: P } : {}}
                >
                  {t.nav.platform}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${platformOpen ? "rotate-180" : ""}`} />
                </button>
                {platformOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 pb-2">
                      {t.nav.platformSolutions}
                    </p>
                    <div className="space-y-0.5">
                      {t.nav.platformLinks.map((item, i) => {
                        const Icon = platformIcons[i];
                        return (
                          <Link
                            key={platformHrefs[i] + item.label}
                            href={localePath(locale, platformHrefs[i])}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 group transition-colors"
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                              style={{ backgroundColor: P + "18" }}
                            >
                              <Icon size={16} style={{ color: P }} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                                  {item.label}
                                </p>
                                {platformComingSoon[i] && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                                    {t.nav.soon}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Who We Serve mega-menu */}
              <div ref={audienceRef} className="relative">
                <button
                  onClick={() => { setAudienceOpen(!audienceOpen); setPlatformOpen(false); setLangOpen(false); }}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    audienceOpen ? "bg-teal-50" : "text-slate-700 hover:bg-slate-50"
                  }`}
                  style={audienceOpen ? { color: P } : {}}
                >
                  {t.nav.whoWeServe}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${audienceOpen ? "rotate-180" : ""}`} />
                </button>
                {audienceOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[460px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 pb-2">
                      {t.nav.byAudience}
                    </p>
                    <div className="space-y-0.5">
                      {t.nav.audienceLinks.map((item, i) => {
                        const Icon = audienceIcons[i];
                        return (
                          <Link
                            key={audienceHrefs[i]}
                            href={localePath(locale, audienceHrefs[i])}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 group transition-colors"
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: S + "15" }}
                            >
                              <Icon size={16} style={{ color: S }} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                                {item.label}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {[
                { label: t.nav.resources, href: "/resources" },
                { label: t.nav.about, href: "/about" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={localePath(locale, item.href)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs + Language dropdown */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Language dropdown */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => { setLangOpen(!langOpen); setPlatformOpen(false); setAudienceOpen(false); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  <Globe size={14} />
                  {LOCALE_LABELS[locale]}
                  <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
                </button>
                {langOpen && (
                  <div className="absolute top-full right-0 mt-1.5 bg-white rounded-xl shadow-lg border border-slate-100 py-1 min-w-[80px] z-50">
                    {LOCALES.map((l) => (
                      <button
                        key={l}
                        onClick={() => handleLocaleChange(l)}
                        className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                          locale === l ? "text-white" : "text-slate-600 hover:bg-slate-50"
                        }`}
                        style={locale === l ? { backgroundColor: P } : {}}
                      >
                        {LOCALE_LABELS[l]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button
                as={Link}
                href={localePath(locale, "/get-a-demo")}
                size="sm"
                className="text-white font-semibold px-5"
                style={{ backgroundColor: "#f97316" }}
              >
                {t.nav.getDemo}
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              {/* Mobile language dropdown */}
              <div className="pb-3 mb-2 border-b border-slate-100">
                <button
                  onClick={() => setMobileLangOpen(!mobileLangOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 w-full"
                >
                  <Globe size={15} />
                  {LOCALE_LABELS[locale]}
                  <ChevronDown size={14} className={`ml-auto transition-transform ${mobileLangOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileLangOpen && (
                  <div className="pl-4 mt-1 space-y-0.5">
                    {LOCALES.map((l) => (
                      <button
                        key={l}
                        onClick={() => handleLocaleChange(l)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          locale === l ? "text-white" : "text-slate-600 hover:bg-slate-50"
                        }`}
                        style={locale === l ? { backgroundColor: P } : {}}
                      >
                        {LOCALE_LABELS[l]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setMobilePlatformOpen(!mobilePlatformOpen)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                {t.nav.platform}
                <ChevronDown size={16} className={`transition-transform ${mobilePlatformOpen ? "rotate-180" : ""}`} />
              </button>
              {mobilePlatformOpen && (
                <div className="pl-4 space-y-1 pb-2">
                  {t.nav.platformLinks.map((item, i) => {
                    const Icon = platformIcons[i];
                    return (
                      <Link
                        key={platformHrefs[i] + item.label}
                        href={localePath(locale, platformHrefs[i])}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Icon size={16} />
                        {item.label}
                        {platformComingSoon[i] && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 ml-1">
                            {t.nav.soon}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}

              <button
                onClick={() => setMobileAudienceOpen(!mobileAudienceOpen)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                {t.nav.whoWeServe}
                <ChevronDown size={16} className={`transition-transform ${mobileAudienceOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAudienceOpen && (
                <div className="pl-4 space-y-1 pb-2">
                  {t.nav.audienceLinks.map((item, i) => {
                    const Icon = audienceIcons[i];
                    return (
                      <Link
                        key={audienceHrefs[i]}
                        href={localePath(locale, audienceHrefs[i])}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Icon size={16} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}

              {[
                { label: t.nav.resources, href: "/resources" },
                { label: t.nav.about, href: "/about" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={localePath(locale, item.href)}
                  className="block px-3 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-slate-100">
                <Button
                  as={Link}
                  href={localePath(locale, "/get-a-demo")}
                  fullWidth
                  className="text-white font-semibold"
                  style={{ backgroundColor: "#f97316" }}
                >
                  {t.nav.getDemo}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <Button
          as={Link}
          href={localePath(locale, "/get-a-demo")}
          size="lg"
          className="text-white font-bold shadow-xl rounded-full px-6"
          style={{ backgroundColor: "#f97316" }}
        >
          {t.nav.getDemo}
        </Button>
      </div>
    </>
  );
}
