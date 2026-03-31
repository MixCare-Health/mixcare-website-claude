import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomCTA from "@/components/shared/BottomCTA";
import { Heart, Globe, Lightbulb, ShieldCheck, Users, Target } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";

export const metadata: Metadata = {
  title: "About Us | MixCare Health",
  description:
    "MixCare Health was founded to transform how health benefits are delivered across Asia-Pacific — AI-powered, flexible, and human-first.",
};

const valueIcons = [Heart, Lightbulb, ShieldCheck, Globe, Users, Target];

export default async function AboutPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const a = t.about;

  return (
    <main>
      <AppNavbar />

      {/* Hero */}
      <section
        className="pt-28 pb-20"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: "#ccfbf1", color: "#0f766e" }}
          >
            {a.hero.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            {a.hero.headline}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {a.hero.headlineHighlight}
            </span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {a.hero.sub}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-slate-700">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-5">{a.story.headline}</h2>
            <p className="leading-relaxed mb-5">{a.story.p1}</p>
            <p className="leading-relaxed mb-5">{a.story.p2}</p>
            <p className="leading-relaxed mb-8">{a.story.p3}</p>
          </div>

          {/* Stats */}
          <div
            className="rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
          >
            {a.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-teal-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            {a.values.headline}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {a.values.items.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <div key={v.title} className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-md transition-all">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#ccfbf1" }}
                  >
                    <Icon size={20} style={{ color: "#0d9488" }} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">
            {a.team.headline}
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
            {a.team.sub}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {a.team.members.map((member) => (
              <div key={member.name} className="rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl mb-4"
                  style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
                >
                  {member.name[0]}
                </div>
                <h3 className="font-bold text-slate-900">{member.name}</h3>
                <p className="text-sm font-semibold mb-2" style={{ color: "#0d9488" }}>
                  {member.title}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{a.careers.headline}</h2>
          <p className="text-lg text-slate-600 mb-8">{a.careers.sub}</p>
          <a
            href="mailto:careers@mixcarehealth.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-lg"
            style={{ backgroundColor: "#0d9488" }}
          >
            {a.careers.cta}
          </a>
        </div>
      </section>

      {/* Press */}
      <section id="press" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            {a.press.headline}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {a.press.items.map((press) => (
              <div key={press.headline} className="rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#0d9488" }}>
                  {press.outlet} · {press.date}
                </p>
                <p className="font-semibold text-slate-800 leading-snug">{press.headline}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <a
              href="mailto:press@mixcarehealth.com"
              className="text-sm font-semibold hover:underline"
              style={{ color: "#0d9488" }}
            >
              {a.press.mediaEnquiry}
            </a>
          </p>
        </div>
      </section>

      <BottomCTA
        headline={a.cta.headline}
        sub={a.cta.sub}
        ctaLabel={a.cta.ctaLabel}
        ctaHref={localePath(locale, "/get-a-demo")}
        secondaryLabel={a.cta.secondaryLabel}
        secondaryHref="mailto:careers@mixcarehealth.com"
      />

      <Footer />
    </main>
  );
}
