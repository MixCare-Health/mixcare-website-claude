"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/locale";

const P = "#10AF97";
const S = "#0A3D59";

export default function CTASection() {
  const { t, locale } = useLanguage();
  const cta = t.home.cta;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl px-10 py-16 text-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${P} 0%, ${S} 100%)` }}
        >
          {/* Decorative */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #fff, transparent)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #f97316, transparent)" }}
          />

          <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-4 relative z-10">
            {cta.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 relative z-10">
            {cta.headline}
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 relative z-10">
            {cta.sub}
          </p>

          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <Link
              href={localePath(locale, "/get-a-demo")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "#f97316", color: "#fff" }}
            >
              {cta.ctaPrimary} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
