import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Medical & Wellness Providers | MixCare Health",
  description:
    "Connect with thousands of corporate employees across Asia-Pacific. Digital tools for bookings, payments, and client management.",
};

export default function ProvidersPage() {
  return (
    <main>
      <AppNavbar />
      <AudiencePageTemplate
        badge="For Medical & Wellness Providers"
        badgeIcon={Users}
        headline="Grow Your Practice with"
        headlineHighlight="Corporate Clients"
        subheadline="Connect with thousands of corporate employees and policyholders across Asia-Pacific. Digital booking, cashless payments, and outcome tracking — all in one platform."
        accentColor="#0891b2"
        bgGradient="linear-gradient(135deg, #ecfeff 0%, #f0fdfa 50%, #eff6ff 100%)"
        ctaLabel="Become a Partner"
        ctaHref="/partners"
        challenges={[
          {
            title: "Inconsistent corporate client acquisition",
            desc: "Reaching corporate clients typically requires lengthy sales cycles, broker relationships, and individual contract negotiations — making growth slow and unpredictable.",
          },
          {
            title: "Manual booking and payment processes",
            desc: "Phone bookings, paper receipts, and manual billing create overhead and errors. Reimbursement claims take weeks and create friction for both provider and client.",
          },
          {
            title: "No visibility on outcomes and performance",
            desc: "Without data on client engagement, session outcomes, and repeat bookings, it's hard to demonstrate value, optimise services, or grow corporate accounts.",
          },
        ]}
        solutions={[
          {
            challenge: "Slow, expensive B2B sales to reach corporate clients",
            solution: "Get listed on MixCare's marketplace and reach 200+ corporate clients and their employees instantly — no sales team required",
          },
          {
            challenge: "Manual booking and cash payment management",
            solution: "Digital booking via the MixCare app, cashless FSA payments, and automated invoicing — receive payments within 3 business days",
          },
          {
            challenge: "No data to demonstrate impact to corporate clients",
            solution: "Provider analytics dashboard shows booking trends, client retention, and outcomes — data you can use to grow accounts and renew contracts",
          },
        ]}
        featuredSolutions={[
          {
            label: "Wellness Marketplace",
            href: "/platform/wellness-marketplace",
            desc: "Get listed among 500+ verified wellness services accessible to thousands of corporate employees.",
          },
          {
            label: "Wellness Hub",
            href: "/platform/wellness-hub",
            desc: "Integrate your services into a connected ecosystem of health and wellness — insurers, employers, and employees in one network.",
          },
        ]}
        metrics={[
          { value: "200+", label: "Corporate clients on platform" },
          { value: "50,000+", label: "Employees with marketplace access" },
          { value: "3 days", label: "Payment settlement time" },
          { value: "40%", label: "Avg. revenue uplift for providers" },
        ]}
        testimonialQuote="The Wellness Hub connected us directly to 8 corporate clients within the first month. Digital booking, cashless payments, and outcome tracking — everything we needed to scale our corporate business without adding sales headcount."
        testimonialName="Dr. Emily Fok"
        testimonialTitle="Clinical Director"
        testimonialCompany="Mindful Wellness Centre"
      />
      <Footer />
    </main>
  );
}
