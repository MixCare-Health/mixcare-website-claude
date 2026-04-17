"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { SanityHomeLogoBar } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";

// Fallback logos — real client brand assets
const defaultLogos = [
  { name: "AXA",       src: "/logos/mixcare-health-client-axa.png" },
  { name: "PwC",       src: "/logos/mixcare-health-client-pwc.png" },
  { name: "Blue",      src: "/logos/mixcare-health-client-blue.png" },
  { name: "Chubb",     src: "/logos/mixcare-health-client-chubblife.png" },
  { name: "Chinalife", src: "/logos/chinalife.svg" },
  { name: "Mercer",    src: "/logos/mixcare-health-client-mercer.png" },
  { name: "PP",        src: "/logos/mixcare-health-client-pp.png" },
  { name: "Nova",      src: "/logos/mixcare-health-client-nova.png" },
  { name: "HKBN",      src: "/logos/mixcare-health-client-hkbn.png" },
  { name: "Cyberport", src: "/logos/mixcare-health-client-cyberport.png" },
];

interface LogoBarProps {
  data?: SanityHomeLogoBar;
}

export default function LogoBar({ data }: LogoBarProps = {}) {
  const { t } = useLanguage();
  const label = data?.label ?? t.home.logoBar.label;

  // Use Sanity logos if uploaded, otherwise fall back to local assets
  const sanityLogos = data?.logos ?? [];
  const displayLogos =
    sanityLogos.length > 0
      ? sanityLogos.map((l) => ({
          name: l.name,
          src: urlFor(l.image).height(160).fit("max").url(),
          href: l.href,
        }))
      : defaultLogos;

  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
          {label}
        </p>
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll-logos" style={{ width: "max-content" }}>
            {[...displayLogos, ...displayLogos].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex items-center justify-center px-4 opacity-60 hover:opacity-100 transition-all duration-300 cursor-default"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.name}
                  width={160}
                  height={80}
                  style={{ height: "80px", width: "auto", maxWidth: "160px", objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
