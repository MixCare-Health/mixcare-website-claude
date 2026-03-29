import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Challenge {
  title: string;
  desc: string;
}

interface Solution {
  challenge: string;
  solution: string;
}

interface FeaturedSolution {
  label: string;
  href: string;
  desc: string;
}

interface Metric {
  value: string;
  label: string;
}

interface AudiencePageTemplateProps {
  badge: string;
  badgeIcon: LucideIcon;
  headline: string;
  headlineHighlight?: string;
  subheadline: string;
  accentColor: string;
  bgGradient: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  challenges: Challenge[];
  solutions: Solution[];
  featuredSolutions: FeaturedSolution[];
  metrics: Metric[];
  testimonialQuote: string;
  testimonialName: string;
  testimonialTitle: string;
  testimonialCompany: string;
}

export default function AudiencePageTemplate({
  badge,
  badgeIcon: BadgeIcon,
  headline,
  headlineHighlight,
  subheadline,
  accentColor,
  bgGradient,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  challenges,
  solutions,
  featuredSolutions,
  metrics,
  testimonialQuote,
  testimonialName,
  testimonialTitle,
  testimonialCompany,
}: AudiencePageTemplateProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: bgGradient }} />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
              style={{ backgroundColor: accentColor + "15", color: accentColor }}
            >
              <BadgeIcon size={16} />
              {badge}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              {headline}{" "}
              {headlineHighlight && (
                <span
                  style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, #1e3a5f 100%)`,
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
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {secondaryCtaLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">
            The challenges you face
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
            We built MixCare by listening to clients like you. Here are the pain points we solve.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {challenges.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">{c.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How MixCare solves it */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            How MixCare solves it
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {solutions.map((s, i) => (
              <div
                key={i}
                className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-100"
              >
                <div className="p-6 bg-slate-50 flex items-start gap-3">
                  <AlertCircle size={18} className="text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600">{s.challenge}</p>
                </div>
                <div
                  className="p-6 flex items-start gap-3"
                  style={{ backgroundColor: accentColor + "08" }}
                >
                  <CheckCircle2 size={18} style={{ color: accentColor }} className="flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-slate-800">{s.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured solutions */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">
            Recommended solutions for you
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
            These platform capabilities are most impactful for your use case.
          </p>
          <div className={`grid gap-5 ${featuredSolutions.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {featuredSolutions.map((sol) => (
              <Link
                key={sol.href}
                href={sol.href}
                className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {sol.label}
                  </h3>
                  <ArrowRight size={18} className="text-slate-300 group-hover:text-teal-600 transition-colors group-hover:translate-x-1" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{sol.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ROI metrics */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #1e3a5f 100%)` }}
          >
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{m.value}</p>
                <p className="text-sm mt-1 text-white/70">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl p-10 border border-slate-100 text-center"
            style={{ backgroundColor: accentColor + "06" }}
          >
            <p className="text-xl text-slate-700 leading-relaxed mb-8 font-medium italic">
              &ldquo;{testimonialQuote}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: accentColor }}
              >
                {testimonialName[0]}
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900">{testimonialName}</p>
                <p className="text-sm text-slate-500">
                  {testimonialTitle} · {testimonialCompany}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl px-10 py-14 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">
              Ready to get started?
            </h2>
            <p className="text-teal-100 text-lg max-w-xl mx-auto mb-8 relative z-10">
              Talk to our team about how MixCare can transform your health benefits program.
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "#f97316", color: "#fff" }}
              >
                {ctaLabel} <ArrowRight size={20} />
              </Link>
              {secondaryCtaLabel && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 text-white hover:bg-white/10 transition-all"
                >
                  {secondaryCtaLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
