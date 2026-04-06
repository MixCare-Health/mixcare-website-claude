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
  href?: string;
  desc: string;
  tag?: string;
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
  challenges: ReadonlyArray<Challenge>;
  solutions: ReadonlyArray<Solution>;
  featuredSolutions: ReadonlyArray<FeaturedSolution>;
  metrics: ReadonlyArray<Metric>;
  testimonialQuote: string;
  testimonialName: string;
  testimonialTitle: string;
  testimonialCompany: string;
  // Template section headers
  challengesHeadline: string;
  challengesSub: string;
  solutionsHeadline: string;
  featuredHeadline: string;
  featuredSub: string;
  ctaHeadline: string;
  ctaSub: string;
  hideSolutions?: boolean;
  hideTestimonial?: boolean;
  hideMetrics?: boolean;
  partnerLogos?: ReadonlyArray<{ name: string; src: string }>;
  featuredLayout?: "default" | "mockup";
  featuredHeadlineOverride?: string;
  featuredSubOverride?: string;
  featuredSectionBg?: string;
  hideHeroCtaButton?: boolean;
  hideBottomCtaButton?: boolean;
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
  challengesHeadline,
  challengesSub,
  solutionsHeadline,
  featuredHeadline,
  featuredSub,
  ctaHeadline,
  ctaSub,
  hideSolutions = false,
  hideTestimonial = false,
  hideMetrics = false,
  partnerLogos,
  featuredLayout = "default",
  featuredHeadlineOverride,
  featuredSubOverride,
  featuredSectionBg,
  hideHeroCtaButton = false,
  hideBottomCtaButton = false,
}: AudiencePageTemplateProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 relative overflow-hidden" style={{ background: bgGradient }}>
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
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
              {!hideHeroCtaButton && (
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: "#f97316" }}
                >
                  {ctaLabel} <ArrowRight size={20} />
                </Link>
              )}
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

      {/* Partner logos */}
      {partnerLogos && partnerLogos.length > 0 && (
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
              Trusted by leading brokers
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {partnerLogos.map((logo) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                  style={{ height: "80px", width: "auto", objectFit: "contain" }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pain points */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">
            {challengesHeadline}
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
            {challengesSub}
          </p>
          <div className={`grid gap-5 ${challenges.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
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
      {!hideSolutions && (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            {solutionsHeadline}
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
      )}

      {/* Featured solutions */}
      <section className="py-16" style={{ backgroundColor: featuredSectionBg ?? "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">
            {featuredHeadlineOverride ?? featuredHeadline}
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
            {featuredSubOverride ?? featuredSub}
          </p>

          {featuredLayout === "mockup" ? (
            /* Mockup card layout */
            <div className="grid md:grid-cols-2 gap-6">
              {featuredSolutions.map((sol, i) => {
                const designs = [
                  {
                    gradient: "from-teal-50 to-cyan-100",
                    headerBg: "#0d9488",
                    ui: (
                      <div className="p-3 space-y-1.5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-bold text-teal-800">Claims Dashboard</span>
                          <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-teal-600 text-white">AI-Powered</span>
                        </div>
                        {[
                          { name: "John L.", amt: "HK$450", status: "Approved", dot: "bg-green-400" },
                          { name: "Sarah K.", amt: "HK$280", status: "Processing", dot: "bg-amber-400" },
                          { name: "Mike T.", amt: "HK$1,200", status: "Approved", dot: "bg-green-400" },
                          { name: "Anna W.", amt: "HK$680", status: "Approved", dot: "bg-green-400" },
                        ].map((c) => (
                          <div key={c.name} className="flex items-center gap-2 bg-white/80 rounded-lg px-2 py-1.5 shadow-sm">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                            <span className="text-[8px] font-medium text-slate-700 flex-1">{c.name}</span>
                            <span className="text-[8px] font-bold text-slate-900">{c.amt}</span>
                            <span className="text-[7px] text-slate-500">{c.status}</span>
                          </div>
                        ))}
                        <div className="mt-1.5 flex items-center gap-2 px-1">
                          <div className="flex-1 h-1 rounded-full bg-teal-200">
                            <div className="w-[78%] h-full rounded-full bg-teal-500" />
                          </div>
                          <span className="text-[7px] text-teal-700 font-bold">2,000+ Panel Doctors</span>
                        </div>
                      </div>
                    ),
                  },
                  {
                    gradient: "from-violet-50 to-indigo-100",
                    headerBg: "#7c3aed",
                    ui: (
                      <div className="p-3">
                        <div className="bg-white/80 rounded-xl p-2.5 mb-2 text-center shadow-sm">
                          <div className="text-[8px] text-slate-500 mb-0.5">Available Balance</div>
                          <div className="text-[18px] font-extrabold text-violet-700">HK$8,400</div>
                          <div className="text-[7px] text-slate-400">30+ spending categories</div>
                        </div>
                        <div className="grid grid-cols-4 gap-1 mb-2">
                          {["Medical", "Fitness", "Beauty", "Dental", "Diet", "Mental", "Vision", "+24"].map((cat) => (
                            <div key={cat} className="bg-white/70 rounded-lg p-1 text-center">
                              <span className="text-[7px] font-medium text-slate-600 leading-tight">{cat}</span>
                            </div>
                          ))}
                        </div>
                        <div className="px-1">
                          <div className="flex justify-between text-[7px] text-slate-500 mb-0.5">
                            <span>Used</span><span>62%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-violet-100">
                            <div className="w-[62%] h-full rounded-full bg-violet-500" />
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    gradient: "from-orange-50 to-amber-100",
                    headerBg: "#f97316",
                    ui: (
                      <div className="p-3">
                        <div className="flex items-center gap-1.5 bg-white/70 rounded-lg px-2 py-1 mb-2.5 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-orange-300" />
                          <span className="text-[8px] text-slate-400 flex-1">Search 3,000+ services…</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            { label: "Yoga", color: "bg-orange-100" },
                            { label: "GP Visit", color: "bg-teal-100" },
                            { label: "Massage", color: "bg-pink-100" },
                            { label: "Pilates", color: "bg-violet-100" },
                            { label: "Dental", color: "bg-blue-100" },
                            { label: "Nutrition", color: "bg-green-100" },
                          ].map((s) => (
                            <div key={s.label} className={`${s.color} rounded-lg p-2 text-center`}>
                              <div className="w-4 h-4 rounded-full bg-white/60 mx-auto mb-1" />
                              <span className="text-[7px] font-medium text-slate-700">{s.label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 text-center text-[7px] font-bold text-orange-600">3,000+ Services · White-Label Ready</div>
                      </div>
                    ),
                  },
                  {
                    gradient: "from-slate-100 to-blue-100",
                    headerBg: "#1e3a5f",
                    ui: (
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-bold text-slate-800">My Benefits 2025</span>
                          <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-navy-100 text-slate-600 border border-slate-300">Budget: HK$12,000</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-200 mb-3">
                          <div className="w-[58%] h-full rounded-full bg-slate-500" />
                        </div>
                        {[
                          { label: "Medical Coverage", val: "HK$5,000", checked: true },
                          { label: "Gym Membership", val: "HK$2,000", checked: true },
                          { label: "Dental Plan", val: "HK$1,500", checked: false },
                          { label: "Mental Wellness", val: "HK$800", checked: false },
                        ].map((b) => (
                          <div key={b.label} className="flex items-center gap-2 py-1 border-b border-slate-100 last:border-0">
                            <div className={`w-3 h-3 rounded flex items-center justify-center flex-shrink-0 ${b.checked ? "bg-slate-700" : "border border-slate-300 bg-white"}`}>
                              {b.checked && <span className="text-white text-[7px]">✓</span>}
                            </div>
                            <span className="text-[8px] text-slate-700 flex-1">{b.label}</span>
                            <span className="text-[8px] font-bold text-slate-500">{b.val}</span>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                ];
                const design = designs[i] ?? designs[0];
                return (
                  <Link
                    key={sol.href ?? sol.label}
                    href={sol.href!}
                    className="bg-white rounded-2xl border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 group overflow-hidden"
                  >
                    {/* Mockup preview */}
                    <div className={`bg-gradient-to-br ${design.gradient} relative`}>
                      {/* Browser chrome */}
                      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/60 backdrop-blur-sm border-b border-white/40">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="w-2 h-2 rounded-full bg-yellow-400" />
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        <div className="ml-2 h-3 rounded-full bg-white/60 flex-1 max-w-[100px]" />
                        <div
                          className="ml-auto h-3 w-16 rounded-full"
                          style={{ backgroundColor: design.headerBg + "30" }}
                        />
                      </div>
                      {/* UI content */}
                      <div className="min-h-[160px]">{design.ui}</div>
                    </div>
                    {/* Card footer */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                          {sol.label}
                        </h3>
                        {sol.tag ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 whitespace-nowrap">
                            {sol.tag}
                          </span>
                        ) : (
                          <ArrowRight size={18} className="text-slate-300 group-hover:text-teal-600 transition-colors group-hover:translate-x-1" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{sol.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* Default card layout */
            <div className={`grid gap-5 ${featuredSolutions.length === 2 ? "md:grid-cols-2" : featuredSolutions.length === 4 ? "grid-cols-2 md:grid-cols-4" : "md:grid-cols-3"}`}>
              {featuredSolutions.map((sol) => {
                const hasLink = !!sol.href;
                const cardContent = (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`font-bold text-slate-900 ${hasLink ? "group-hover:text-teal-700 transition-colors" : ""}`}>
                        {sol.label}
                      </h3>
                      {sol.tag ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 whitespace-nowrap">
                          {sol.tag}
                        </span>
                      ) : hasLink ? (
                        <ArrowRight size={18} className="text-slate-300 group-hover:text-teal-600 transition-colors group-hover:translate-x-1" />
                      ) : null}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{sol.desc}</p>
                  </>
                );
                return hasLink ? (
                  <Link
                    key={sol.href}
                    href={sol.href!}
                    className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1 group"
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div
                    key={sol.label}
                    className="bg-white rounded-2xl p-7 border border-slate-100 cursor-default"
                  >
                    {cardContent}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ROI metrics */}
      {!hideMetrics && <section className="py-12 bg-white">
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
      </section>}

      {/* Testimonial */}
      {!hideTestimonial && <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
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
      </section>}

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl px-10 py-14 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">
              {ctaHeadline}
            </h2>
            <p className="text-teal-100 text-lg max-w-xl mx-auto mb-8 relative z-10">
              {ctaSub}
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              {!hideBottomCtaButton && (
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: "#f97316", color: "#fff" }}
                >
                  {ctaLabel} <ArrowRight size={20} />
                </Link>
              )}
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
