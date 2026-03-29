import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Store } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Small Businesses | MixCare Health",
  description:
    "Affordable, high-impact employee benefits for small businesses. Setup in minutes, no HR team required.",
};

export default function SmallBusinessPage() {
  return (
    <main>
      <AppNavbar />
      <AudiencePageTemplate
        badge="For Small Businesses"
        badgeIcon={Store}
        headline="Enterprise-Grade Benefits,"
        headlineHighlight="SMB-Friendly Pricing"
        subheadline="Attract and retain top talent with benefits that rival large corporations — affordable, simple to set up, and running in less than a day. No HR team needed."
        accentColor="#f97316"
        bgGradient="linear-gradient(135deg, #fff7ed 0%, #f0fdfa 50%, #eff6ff 100%)"
        ctaLabel="Start Now — Free Setup"
        ctaHref="/start-now"
        secondaryCtaLabel="Get a Demo"
        secondaryCtaHref="/get-a-demo"
        challenges={[
          {
            title: "Can't compete with large company benefits",
            desc: "Top candidates compare offers across companies of all sizes. Without compelling benefits, small businesses lose talent to larger competitors — even when the role and culture are a better fit.",
          },
          {
            title: "Traditional benefits are too expensive or complex",
            desc: "Group medical insurance requires minimum headcounts, long commitments, and HR expertise to manage. Most small businesses don't have the resources to set it up properly.",
          },
          {
            title: "No visibility on what employees actually value",
            desc: "Without data on benefit utilisation, small business owners are spending money on benefits employees don't use — while missing the things they actually want.",
          },
        ]}
        solutions={[
          {
            challenge: "Can't afford or access enterprise-grade benefits",
            solution: "MixCare's SMB plan starts from HK$180/employee/month — full access to FSA, wellness marketplace, and panel doctors with no minimum headcount",
          },
          {
            challenge: "Setup is too complex without an HR team",
            solution: "Self-service onboarding takes under 60 minutes — just add your employees, set a budget, and you're live with benefits your team will actually use",
          },
          {
            challenge: "No idea which benefits employees actually use",
            solution: "Real-time utilisation dashboard shows exactly what employees spend on — adjust your benefit mix monthly based on actual data",
          },
        ]}
        featuredSolutions={[
          {
            label: "Flexible Spending Account",
            href: "/platform/flexible-spending-account",
            desc: "Simple wellness wallets for healthcare, fitness, and mental health — employees love the flexibility.",
          },
          {
            label: "Wellness Marketplace",
            href: "/platform/wellness-marketplace",
            desc: "Give employees access to 500+ wellness services — yoga, gym, nutrition, mental health and more.",
          },
          {
            label: "Flexible Benefits Solution",
            href: "/platform/flexible-benefits",
            desc: "Let employees choose what matters to them — punch above your weight class in the talent market.",
          },
        ]}
        metrics={[
          { value: "HK$180", label: "Starting price per employee/month" },
          { value: "<60min", label: "Setup time" },
          { value: "0", label: "Minimum headcount" },
          { value: "88%", label: "Avg. employee utilisation" },
        ]}
        testimonialQuote="We're a 25-person startup. Setting up MixCare took one afternoon and now we offer benefits that rival large corporations. It's helped us attract senior talent we couldn't compete for before."
        testimonialName="Ryan Lau"
        testimonialTitle="CEO & Co-Founder"
        testimonialCompany="TechBridge HK"
      />
      <Footer />
    </main>
  );
}
