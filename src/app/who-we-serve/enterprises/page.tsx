import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Large Enterprises | MixCare Health",
  description:
    "Customisable employee benefit programs with analytics, compliance, and seamless HR integration at enterprise scale.",
};

export default function EnterprisesPage() {
  return (
    <main>
      <AppNavbar />
      <AudiencePageTemplate
        badge="For Large Enterprises"
        badgeIcon={Building2}
        headline="Enterprise Benefits,"
        headlineHighlight="Individually Personalised"
        subheadline="Customisable employee benefit programs with analytics, compliance, and seamless HR integration. Designed for 500+ employee organisations across Asia-Pacific."
        accentColor="#7c3aed"
        bgGradient="linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #f0fdfa 100%)"
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
        challenges={[
          {
            title: "One-size-fits-all doesn't work",
            desc: "With hundreds or thousands of employees across different generations, roles, and life stages, rigid benefit plans satisfy no one — and cost the company more than they deliver.",
          },
          {
            title: "Low benefit utilisation and satisfaction",
            desc: "Traditional benefits are opaque and inconvenient. Low utilisation means poor return on investment and little impact on employee engagement or retention.",
          },
          {
            title: "HR administration complexity",
            desc: "Managing benefits for large populations — enrolments, changes, claims, reporting — requires significant HR headcount and still produces errors and delays.",
          },
        ]}
        solutions={[
          {
            challenge: "Rigid group plans that don't meet individual needs",
            solution: "MixCare's flexible benefits engine lets each employee personalise their own plan within your defined budget and rules",
          },
          {
            challenge: "Low engagement and poor ROI on benefit spend",
            solution: "The Wellness Hub and Marketplace drive monthly touchpoints — average utilisation jumps from 42% to 88% within two quarters",
          },
          {
            challenge: "HR team overwhelmed by benefits administration",
            solution: "Automated enrolment, AI claims processing, and real-time analytics reduce HR benefits admin time by 70%",
          },
        ]}
        featuredSolutions={[
          {
            label: "Flexible Benefits Solution",
            href: "/platform/flexible-benefits",
            desc: "Employee self-selection portal with top-up/top-down budget structures — scales to any number of employees.",
          },
          {
            label: "Flexible Spending Account",
            href: "/platform/flexible-spending-account",
            desc: "Multi-wallet FSA management with 30+ spending categories and real-time utilisation tracking.",
          },
          {
            label: "Wellness Hub",
            href: "/platform/wellness-hub",
            desc: "Integrate with your existing HRIS, payroll, and insurance systems through pre-built connectors or open API.",
          },
        ]}
        metrics={[
          { value: "88%", label: "Avg. benefit utilisation" },
          { value: "70%", label: "HR admin time reduction" },
          { value: "35%", label: "Improvement in retention" },
          { value: "2x", label: "Employee satisfaction uplift" },
        ]}
        testimonialQuote="MixCare transformed our benefits from a cost centre into a retention tool. Employees across all 12 of our offices now have personalised benefit plans and our annual satisfaction scores hit an all-time high."
        testimonialName="Marcus Chen"
        testimonialTitle="Head of HR"
        testimonialCompany="Jardine Matheson"
      />
      <Footer />
    </main>
  );
}
