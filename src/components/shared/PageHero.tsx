import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface PageHeroProps {
  badge?: string;
  headline: string;
  headlineHighlight?: string;
  subheadline: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  icon?: LucideIcon;
  iconColor?: string;
  gradient?: string;
  bgGradient?: string;
}

export default function PageHero({
  badge,
  headline,
  headlineHighlight,
  subheadline,
  ctaLabel = "Get a Demo",
  ctaHref = "/get-a-demo",
  secondaryCtaLabel,
  secondaryCtaHref,
  icon: Icon,
  iconColor = "#0d9488",
  gradient = "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)",
  bgGradient = "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)",
}: PageHeroProps) {
  return (
    <section className="pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: bgGradient }} />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl"
        style={{ background: `radial-gradient(circle, ${iconColor}, transparent)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {badge && (
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
              style={{ backgroundColor: iconColor + "15", color: iconColor }}
            >
              {Icon && <Icon size={16} />}
              {badge}
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            {headline}{" "}
            {headlineHighlight && (
              <span
                style={{
                  background: gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {headlineHighlight}
              </span>
            )}
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-10">{subheadline}</p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "#f97316" }}
            >
              {ctaLabel} <ArrowRight size={20} />
            </Link>
            {secondaryCtaLabel && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg border-2 transition-all hover:-translate-y-0.5"
                style={{ borderColor: iconColor, color: iconColor }}
              >
                {secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
