"use client";

import Link from "next/link";
import { Linkedin, Facebook, Instagram, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { LOCALES, LOCALE_LABELS, LOCALE_URL, localePath, parseLocalePath } from "@/lib/locale";
import type { Locale } from "@/lib/locale";
import type { SanitySiteSettings } from "@/lib/sanity.queries";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

interface FooterProps {
  footerData?: SanitySiteSettings["footer"] | null;
}

const P = "#10AF97";

// Pages that are not yet live — rendered as plain text + "Coming Soon" badge
const COMING_SOON_HREFS = new Set([
  "/platform/flexible-benefits",
  "/platform/wellness-hub",
]);

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/mixcarehealth/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/mixcarehealth/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/MixCareHealth", label: "Facebook" },
];

export default function Footer({ footerData: footerDataProp }: FooterProps = {}) {
  const { t, locale } = useLanguage();
  const siteSettings = useSiteSettings();
  // Prop takes precedence, then context, then fall back to translation strings.
  const footerData = footerDataProp ?? siteSettings?.footer ?? null;

  // Resolved footer link columns — use Sanity data when available, else translation fallback.
  const f = t.footer;
  const footerColumns = [
    {
      key: "Platform" as const,
      links: footerData?.platformLinks ?? f.platform,
    },
    {
      key: "Who We Serve" as const,
      links: footerData?.whoWeServeLinks ?? f.whoWeServe,
    },
    {
      key: "Resources" as const,
      links: footerData?.resourceLinks ?? f.resources,
    },
    {
      key: "Company" as const,
      links: footerData?.companyLinks ?? f.company,
    },
  ];

  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (l: Locale) => {
    setLangOpen(false);
    const { basePath } = parseLocalePath(pathname);
    // Full navigation so the server re-renders with the new locale cookie,
    // bypassing the Next.js Router Cache.
    window.location.href = `/${LOCALE_URL[l]}${basePath === "/" ? "" : basePath}`;
  };

  return (
    <footer style={{ backgroundColor: "#0f1e38" }} className="text-slate-300">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href={localePath(locale, "/")} className="flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://m.mixcarehealth.com/wp-content/uploads/2024/05/mixcare-logo.257ebb39.png"
                alt="MixCare Health"
                className="h-7 w-auto brightness-0 invert"
              />
            </Link>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-teal-600 transition-colors"
                >
                  <item.icon size={16} />
                </a>
              ))}
            </div>

            {/* Language dropdown */}
            <div className="mt-5" ref={langRef}>
              <p className="text-xs text-slate-400 mb-2">{t.footer.language}</p>
              <div className="relative inline-block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 text-sm font-semibold text-slate-300 hover:border-white/40 hover:text-white transition-colors"
                >
                  <Globe size={14} />
                  {LOCALE_LABELS[locale]}
                  <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
                </button>
                {langOpen && (
                  <div className="absolute bottom-full mb-1.5 left-0 bg-white rounded-xl shadow-xl border border-slate-100 py-1 min-w-[90px] z-50">
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
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map(({ key, links }) => (
            <div key={key}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {t.footer.categories[key as keyof typeof t.footer.categories]}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    {COMING_SOON_HREFS.has(link.href) ? (
                      <span className="flex items-center gap-2">
                        <span className="text-sm text-slate-600 cursor-default select-none">
                          {link.label}
                        </span>
                        <span
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                          style={{ backgroundColor: "rgba(249,115,22,0.15)", color: "#f97316" }}
                        >
                          Soon
                        </span>
                      </span>
                    ) : (
                      <Link
                        href={localePath(locale, link.href)}
                        className="text-sm text-slate-400 hover:text-teal-300 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance badges */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">{t.footer.certifiedCompliant}</p>
          <div className="flex flex-wrap gap-3 mb-8">
            {["PDPO (HK)", "ISO 27001", "Annual Security Test"].map(
              (badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border"
                  style={{ borderColor: "rgba(45,212,191,0.3)", color: "#2dd4bf", backgroundColor: "rgba(13,148,136,0.1)" }}
                >
                  {badge}
                </span>
              )
            )}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              {t.footer.copyright(new Date().getFullYear())}
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: t.footer.privacy, href: "/privacy-policy" },
                { label: t.footer.terms, href: "/terms-and-conditions" },
                { label: t.footer.cookie, href: "/cookies-policy" },
                { label: t.footer.sitemap, href: "/sitemap.xml" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={localePath(locale, item.href)}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
