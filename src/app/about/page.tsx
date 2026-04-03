import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomCTA from "@/components/shared/BottomCTA";
import { Heart, Globe, Lightbulb, ShieldCheck, Users, Target } from "lucide-react";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import {
  aboutPageQuery,
  allTeamMembersQuery,
  type SanityAboutPage,
  type SanityTeamMember,
} from "@/lib/sanity.queries";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/about");

export const metadata: Metadata = {
  title: "About MixCare Health — Our Mission, Team & Story",
  description:
    "MixCare Health was founded to transform how health benefits are delivered across Asia-Pacific — AI-powered, flexible, and human-first. Meet our leadership team and learn our story.",
  keywords: [
    "about MixCare Health", "digital health company Hong Kong", "health tech startup",
    "MixCare team", "health benefits mission", "AI health platform Asia",
    "MixCare leadership", "health innovation Hong Kong",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `About MixCare Health — Our Mission, Team & Story | ${SITE_NAME}`,
    description:
      "Founded to transform health benefits across Asia-Pacific — AI-powered, flexible, and human-first.",
    url: canonical,
    images: ogImage("About MixCare Health"),
  },
  twitter: {
    title: `About Us | ${SITE_NAME}`,
    description: "AI-powered, flexible, and human-first health benefits across Asia-Pacific.",
    images: ["/opengraph-image.png"],
  },
};

const valueIcons = [Heart, Lightbulb, ShieldCheck, Globe, Users, Target];

export default async function AboutPage() {
  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);
  const t = getTranslations(locale);
  const a = t.about;

  // Fetch from Sanity (with translation fallback)
  const [sp, teamMembers]: [SanityAboutPage | null, SanityTeamMember[]] = isSanityConfigured
    ? await Promise.all([
        sanityClient.fetch(aboutPageQuery, { locale: sanityLocale }),
        sanityClient.fetch(allTeamMembersQuery, { locale: sanityLocale }),
      ])
    : [null, []];

  // Resolved content — Sanity first, translation fallback
  const hero = {
    badge:             sp?.hero?.badge             ?? a.hero.badge,
    headline:          sp?.hero?.headline          ?? a.hero.headline,
    headlineHighlight: sp?.hero?.headlineHighlight ?? a.hero.headlineHighlight,
    sub:               sp?.hero?.sub               ?? a.hero.sub,
  };
  const story = {
    headline: sp?.story?.headline ?? a.story.headline,
    p1:       sp?.story?.p1       ?? a.story.p1,
    p2:       sp?.story?.p2       ?? a.story.p2,
    p3:       sp?.story?.p3       ?? a.story.p3,
  };
  const stats       = sp?.stats           ?? a.stats;
  const valuesHead  = sp?.values?.headline ?? a.values.headline;
  const valueItems  = sp?.values?.items    ?? a.values.items;
  const teamHead    = sp?.team?.headline   ?? a.team.headline;
  const teamSub     = sp?.team?.sub        ?? a.team.sub;
  const members     = teamMembers.length > 0
    ? teamMembers.map((m) => ({ name: m.name, title: m.role, bio: m.bio }))
    : a.team.members;
  const careers     = {
    headline: sp?.careers?.headline ?? a.careers.headline,
    sub:      sp?.careers?.sub      ?? a.careers.sub,
    cta:      sp?.careers?.cta      ?? a.careers.cta,
  };
  const press       = {
    headline:     sp?.press?.headline     ?? a.press.headline,
    mediaEnquiry: sp?.press?.mediaEnquiry ?? a.press.mediaEnquiry,
    items:        sp?.press?.items        ?? a.press.items,
  };
  const cta         = {
    headline:       sp?.cta?.headline       ?? a.cta.headline,
    sub:            sp?.cta?.sub            ?? a.cta.sub,
    ctaLabel:       sp?.cta?.ctaLabel       ?? a.cta.ctaLabel,
    secondaryLabel: sp?.cta?.secondaryLabel ?? a.cta.secondaryLabel,
  };

  return (
    <main>
      <JsonLd data={[
        webPageSchema("About MixCare Health — Our Mission, Team & Story", "MixCare Health was founded to transform how health benefits are delivered across Asia-Pacific — AI-powered, flexible, and human-first.", "/about"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }]),
      ]} />
      <AppNavbar />

      {/* Hero */}
      <section
        className="pt-28 pb-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl" style={{ background: "radial-gradient(circle, #0d9488, transparent)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: "#ccfbf1", color: "#0f766e" }}
          >
            {hero.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            {hero.headline}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {hero.headlineHighlight}
            </span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {hero.sub}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-slate-700">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-5">{story.headline}</h2>
            <p className="leading-relaxed mb-5">{story.p1}</p>
            <p className="leading-relaxed mb-5">{story.p2}</p>
            <p className="leading-relaxed mb-8">{story.p3}</p>
          </div>

          {/* Stats */}
          <div
            className="rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
          >
            {stats.map((stat) => (
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
            {valuesHead}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {valueItems.map((v, i) => {
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
            {teamHead}
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
            {teamSub}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
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
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{careers.headline}</h2>
          <p className="text-lg text-slate-600 mb-8">{careers.sub}</p>
          <a
            href="mailto:careers@mixcarehealth.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-lg"
            style={{ backgroundColor: "#0d9488" }}
          >
            {careers.cta}
          </a>
        </div>
      </section>

      {/* Press */}
      <section id="press" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            {press.headline}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {press.items.map((item) => (
              <div key={item.headline} className="rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#0d9488" }}>
                  {item.outlet} · {item.date}
                </p>
                <p className="font-semibold text-slate-800 leading-snug">{item.headline}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <a
              href="mailto:press@mixcarehealth.com"
              className="text-sm font-semibold hover:underline"
              style={{ color: "#0d9488" }}
            >
              {press.mediaEnquiry}
            </a>
          </p>
        </div>
      </section>

      <BottomCTA
        headline={cta.headline}
        sub={cta.sub}
        ctaLabel={cta.ctaLabel}
        ctaHref={localePath(locale, "/get-a-demo")}
        secondaryLabel={cta.secondaryLabel}
        secondaryHref="mailto:careers@mixcarehealth.com"
      />

      <Footer />
    </main>
  );
}
