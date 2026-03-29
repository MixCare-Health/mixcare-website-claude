import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BenefitsGrid from "@/components/shared/BenefitsGrid";
import PageTestimonial from "@/components/shared/PageTestimonial";
import BottomCTA from "@/components/shared/BottomCTA";
import { Sliders, Users2, BarChart3, X, Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flexible Benefits Solution | MixCare Health",
  description:
    "Personalised benefit packages that adapt to every individual. Scalable top-up and top-down structures for SMBs and enterprises.",
};

const benefits = [
  {
    icon: Users2,
    title: "Personalised Packages",
    desc: "Employees or members select benefit packages based on their individual health, wellness, and financial priorities. No one-size-fits-all — every person builds their own ideal benefit set.",
  },
  {
    icon: Sliders,
    title: "Scalable Structures",
    desc: "Top-up or top-down benefit structures deliver scalable options for small businesses through to large enterprises. Start simple, grow complex — the platform adapts as you do.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Administration",
    desc: "Simplify benefit management with analytics-driven platforms designed for flexibility and easy administrative oversight. Make informed decisions with real-time utilisation data.",
  },
];

const comparison = {
  traditional: [
    "Same plan for all employees",
    "Rigid annual review cycle",
    "Low utilisation (avg. 42%)",
    "High admin overhead",
    "No personalisation",
    "Binary opt-in/out",
  ],
  flexible: [
    "Each employee builds their own plan",
    "Continuous, real-time adjustments",
    "High utilisation (avg. 88%)",
    "Automated administration",
    "Full personalisation engine",
    "Granular benefit selection",
  ],
};

export default function FlexibleBenefitsPage() {
  return (
    <main>
      <AppNavbar />

      <PageHero
        badge="Flexible Benefits Solution"
        headline="Benefits That Adapt to"
        headlineHighlight="Every Individual"
        subheadline="Personalised benefit packages based on health, wellness, and financial priorities. One platform for startups and Fortune 500s alike."
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
        iconColor="#7c3aed"
        bgGradient="linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #f0fdfa 100%)"
      />

      <BenefitsGrid
        headline="The future of employee benefits"
        benefits={benefits}
        accentColor="#7c3aed"
      />

      {/* Comparison */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            Traditional vs. Flexible Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-red-100">
              <h3 className="text-lg font-bold text-slate-700 mb-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <X size={16} className="text-red-500" />
                </div>
                Traditional Benefits
              </h3>
              <ul className="space-y-3">
                {comparison.traditional.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <X size={16} className="text-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-2xl p-8 border"
              style={{ borderColor: "#7c3aed30", backgroundColor: "#f5f3ff" }}
            >
              <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#7c3aed20" }}
                >
                  <Check size={16} style={{ color: "#7c3aed" }} />
                </div>
                MixCare Flexible Benefits
              </h3>
              <ul className="space-y-3">
                {comparison.flexible.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-800 font-medium">
                    <Check size={16} style={{ color: "#7c3aed", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration demo */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            How configuration works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Admin sets the budget",
                desc: "Define a total benefit budget per employee (or tier). Choose top-up (company pays base, employees add) or top-down (full budget, employees allocate).",
                color: "#7c3aed",
              },
              {
                step: "02",
                title: "Employees personalise",
                desc: "Each employee logs in and selects their benefit categories. Some want more mental health, others fitness, others dental. The platform accommodates all preferences.",
                color: "#0d9488",
              },
              {
                step: "03",
                title: "Live analytics dashboard",
                desc: "Track utilisation by benefit type, demographic, and cost centre. Identify under-used categories, rebalance budgets, and report to finance — all in real time.",
                color: "#f97316",
              },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md"
                  style={{ backgroundColor: step.color }}
                >
                  <span className="text-white font-black text-lg">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #1e3a5f 100%)" }}
          >
            {[
              { value: "88%", label: "Avg. benefit utilisation" },
              { value: "2x", label: "Employee satisfaction uplift" },
              { value: "95%", label: "Admin time reduction" },
              { value: "2→500+", label: "Scales from SMB to enterprise" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-sm mt-1 text-purple-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageTestimonial
        quote="Flexible benefits changed everything. Our employees feel genuinely valued because they choose what matters to them. Retention improved 35% in the first year."
        name="David Kwong"
        title="CHRO"
        company="HKEX Listed Financial Group"
        accentColor="#7c3aed"
      />

      <BottomCTA
        headline="Ready to personalise your benefits?"
        sub="Discover how MixCare's flexible benefits platform can increase utilisation, improve employee satisfaction, and simplify administration."
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
        secondaryLabel="Start Now — Free Setup"
        secondaryHref="/start-now"
      />

      <Footer />
    </main>
  );
}
