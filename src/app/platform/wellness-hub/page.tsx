import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BenefitsGrid from "@/components/shared/BenefitsGrid";
import PageTestimonial from "@/components/shared/PageTestimonial";
import BottomCTA from "@/components/shared/BottomCTA";
import { LayoutDashboard, Plug, Sliders, Code2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wellness Hub | MixCare Health",
  description:
    "One hub connecting every wellness solution. Integrate with insurance policies, HR systems, and wellness programs without friction.",
};

const benefits = [
  {
    icon: LayoutDashboard,
    title: "Connected Ecosystem",
    desc: "Bring together a diverse ecosystem of health, medical, and wellness solutions in one centralised platform. Employees access everything — GP visits, FSA, marketplace, mental health — from a single login.",
  },
  {
    icon: Plug,
    title: "Seamless Integration",
    desc: "Integrate with insurance policies, wellness programs, or employee benefits portals without friction. Pre-built connectors for major HR platforms, plus a full REST API for custom integrations.",
  },
  {
    icon: Sliders,
    title: "Industry Customisation",
    desc: "Customise offerings for brokers, enterprises, wellness providers, and small businesses with tailored experiences. Every stakeholder gets the view and features most relevant to them.",
  },
];

const integrations = [
  "Workday", "SAP SuccessFactors", "Oracle HCM", "BambooHR",
  "AXA Portal", "Manulife Connect", "Blue Cross", "FWD Direct",
];

export default function WellnessHubPage() {
  return (
    <main>
      <AppNavbar />

      <PageHero
        badge="Wellness Hub"
        headline="One Hub. Every Wellness Solution."
        headlineHighlight="Fully Integrated."
        subheadline="Connect health, medical, and wellness in a single digital platform. Integrate with insurance policies, HR systems, and wellness programs without friction."
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
        iconColor="#0891b2"
        bgGradient="linear-gradient(135deg, #ecfeff 0%, #f0fdfa 50%, #eff6ff 100%)"
      />

      <BenefitsGrid
        headline="The hub that connects everything"
        benefits={benefits}
        accentColor="#0891b2"
      />

      {/* Ecosystem diagram */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            The MixCare Ecosystem
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-xl mx-auto">
            Every stakeholder connected. Every service accessible. One intelligent platform.
          </p>

          {/* Hub diagram */}
          <div className="relative">
            {/* Center hub */}
            <div
              className="w-28 h-28 rounded-3xl flex items-center justify-center mx-auto shadow-2xl mb-8 relative z-10"
              style={{ background: "linear-gradient(135deg, #0891b2 0%, #0d9488 100%)" }}
            >
              <div className="text-center">
                <LayoutDashboard size={28} className="text-white mx-auto" />
                <p className="text-white text-xs font-bold mt-1">Wellness Hub</p>
              </div>
            </div>

            {/* Connected nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
              {[
                { label: "Insurers", color: "#0d9488" },
                { label: "Employers", color: "#1e3a5f" },
                { label: "Providers", color: "#f97316" },
                { label: "Employees", color: "#7c3aed" },
                { label: "Brokers", color: "#0891b2" },
              ].map((node) => (
                <div
                  key={node.label}
                  className="rounded-2xl p-4 text-center border-2 font-bold text-sm"
                  style={{ borderColor: node.color, color: node.color, backgroundColor: node.color + "10" }}
                >
                  {node.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-5">
            Pre-built integrations
          </h2>
          <p className="text-lg text-slate-600 text-center mb-10 max-w-xl mx-auto">
            Connect to your existing HR, payroll, and insurance systems in days — not months.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {integrations.map((name) => (
              <div
                key={name}
                className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 bg-slate-50 hover:border-cyan-400 hover:text-cyan-700 transition-colors"
              >
                {name}
              </div>
            ))}
          </div>

          {/* API callout */}
          <div
            className="rounded-2xl p-8 border text-center max-w-3xl mx-auto"
            style={{ borderColor: "#0891b230", backgroundColor: "#ecfeff" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#0891b2" }}
            >
              <Code2 size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Open API for custom integrations</h3>
            <p className="text-slate-600 mb-4">
              Our REST API and webhooks let you build any custom integration. Comprehensive
              documentation, sandbox environment, and dedicated developer support included.
            </p>
            <a
              href="/get-a-demo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white"
              style={{ backgroundColor: "#0891b2" }}
            >
              Request API Access →
            </a>
          </div>
        </div>
      </section>

      <PageTestimonial
        quote="Wellness Hub is the backbone of our entire benefit stack. Everything is connected — our insurance policies, FSA wallets, and 200 wellness providers — in one place our employees actually use."
        name="Kevin Tam"
        title="Group Head of Benefits"
        company="HSBC Life Hong Kong"
        accentColor="#0891b2"
      />

      <BottomCTA
        headline="Connect your entire wellness ecosystem"
        sub="See how Wellness Hub can unify your health, insurance, and wellness infrastructure in a single platform."
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
      />

      <Footer />
    </main>
  );
}
