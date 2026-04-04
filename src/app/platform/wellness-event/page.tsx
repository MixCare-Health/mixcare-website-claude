import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BenefitsGrid from "@/components/shared/BenefitsGrid";
import BottomCTA from "@/components/shared/BottomCTA";
import { CalendarDays, BookOpen, Monitor, BarChart2 } from "lucide-react";
import PainPointsCarousel from "@/components/platform/PainPointsCarousel";
import HowWeSolveSection from "@/components/platform/HowWeSolveSection";
import WellnessEventCarousel from "@/components/platform/WellnessEventCarousel";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { platformPageByIdQuery, type SanityPlatformPage } from "@/lib/sanity.queries";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/platform/wellness-event");

export const metadata: Metadata = {
  title: "Corporate Wellness Events — Yoga, Mindfulness & More",
  description:
    "Book curated corporate wellness events — yoga, mindfulness, nutrition workshops, mental health first aid, and health screenings. Managed end-to-end through MixCare for Hong Kong and Singapore companies.",
  keywords: [
    "corporate wellness events", "employee wellness activities", "corporate yoga Hong Kong",
    "workplace mindfulness", "health screening corporate", "mental health workplace events",
    "wellness event booking", "corporate wellness Singapore", "MixCare wellness events",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Corporate Wellness Events | ${SITE_NAME}`,
    description:
      "Curated corporate wellness events — yoga, mindfulness, nutrition, mental health, health screenings. End-to-end managed for HK & SG companies.",
    url: canonical,
    images: ogImage("MixCare Corporate Wellness Events"),
  },
  twitter: {
    title: `Corporate Wellness Events | ${SITE_NAME}`,
    description:
      "Yoga, mindfulness, nutrition, mental health events for your team. Managed end-to-end by MixCare.",
    images: ["/opengraph-image.png"],
  },
};

const P = "#0891b2";
const benefitIcons = [CalendarDays, BookOpen, Monitor, BarChart2];

export default async function WellnessEventPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.wellnessEvent;

  const sanityLocale = toSanityLocale(locale);
  const sp: SanityPlatformPage | null = isSanityConfigured
    ? await sanityClient.fetch(platformPageByIdQuery, { pageId: "wellness-event", locale: sanityLocale })
    : null;

  const benefitItems = sp?.benefits?.items ?? p.benefits.items;
  const benefits = benefitItems.map((item, i) => ({
    icon: benefitIcons[i],
    title: item.title,
    desc: item.desc,
  }));

  return (
    <main>
      <JsonLd data={[
        webPageSchema("Corporate Wellness Events — Yoga, Mindfulness & More", "Book curated corporate wellness events — yoga, mindfulness, nutrition workshops, mental health first aid, and health screenings. Managed end-to-end.", "/platform/wellness-event"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Platform", path: "/platform/self-funded-outpatient" }, { name: "Wellness Events", path: "/platform/wellness-event" }]),
      ]} />
      <AppNavbar />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <PageHero
        badge={sp?.hero?.badge ?? p.hero.badge}
        headline={sp?.hero?.headline ?? p.hero.headline}
        headlineHighlight={sp?.hero?.headlineHighlight ?? p.hero.headlineHighlight}
        subheadline={sp?.hero?.sub ?? p.hero.sub}
        ctaLabel={sp?.hero?.ctaLabel ?? p.hero.cta}
        ctaHref={"https://meetings-na2.hubspot.com/alex-wong9/mixcare-exploration-meeting-"}
        iconColor={P}
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"
      />

      <PainPointsCarousel
        headline={p.painPoints.headline}
        sub={p.painPoints.sub}
        items={p.painPoints.items}
      />

      <HowWeSolveSection
        badge={p.howWeSolve.badge}
        headline={p.howWeSolve.headline}
        sub={p.howWeSolve.sub}
        items={p.howWeSolve.items}
      />

      <BenefitsGrid
        headline={p.benefits.headline}
        benefits={benefits}
        accentColor={P}
        columns={4}
      />

      {/* ── TOP 5 FEATURED EVENTS — Photo Carousel ───────────────────── */}
      <WellnessEventCarousel
        badge={p.featuredEvents.badge}
        headline={p.featuredEvents.headline}
        sub={p.featuredEvents.sub}
        items={p.featuredEvents.items}
      />

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <BottomCTA
        headline={sp?.cta?.heading ?? p.cta.headline}
        sub={sp?.cta?.sub ?? p.cta.sub}
        ctaLabel={sp?.cta?.ctaLabel ?? p.cta.label}
        ctaHref={"https://meetings-na2.hubspot.com/alex-wong9/mixcare-exploration-meeting-"}
      />

      <Footer />
    </main>
  );
}
