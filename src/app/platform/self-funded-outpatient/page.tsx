import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BenefitsGrid from "@/components/shared/BenefitsGrid";
import PageTestimonial from "@/components/shared/PageTestimonial";
import BottomCTA from "@/components/shared/BottomCTA";
import { Stethoscope, ShieldCheck, Cpu, BarChart3, Users, Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Self-Funded Outpatient Services | MixCare Health",
  description:
    "AI-powered outpatient claims processing with a 2,000+ panel doctor network across Hong Kong, Macau, and Singapore.",
};

const benefits = [
  {
    icon: ShieldCheck,
    title: "Customisable Benefit Plans",
    desc: "Help employers implement stop-loss mechanisms and better control medical spending with tailored plan configurations. Define coverage limits, co-pay structures, and eligible categories to match your exact needs.",
  },
  {
    icon: Users,
    title: "Panel Doctor Network",
    desc: "2,000+ panel doctors across Hong Kong, Macau, and Singapore offering cashless consultation experiences. Employees simply show their digital card and receive care — no upfront payment, no reimbursement hassle.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Claims Processing",
    desc: "Streamline claims with advanced AI — ensuring accurate, speedy payouts while minimising fraud risk. Our engine processes 98% of claims within 24 hours with automated anomaly detection.",
  },
];

const useCases = [
  {
    audience: "Insurers",
    icon: ShieldCheck,
    color: "#0d9488",
    scenario:
      "Add a self-funded outpatient layer to group insurance policies without the overhead of traditional claims teams. MixCare's AI engine handles end-to-end processing.",
    outcome: "70% reduction in claims processing cost",
  },
  {
    audience: "Brokers",
    icon: Stethoscope,
    color: "#1e3a5f",
    scenario:
      "Offer clients a self-funded scheme with stop-loss protection. The panel doctor network and cashless experience give your clients a competitive edge in talent retention.",
    outcome: "Higher client retention and satisfaction scores",
  },
  {
    audience: "Large Enterprises",
    icon: Building2,
    color: "#f97316",
    scenario:
      "Replace traditional group medical insurance with a self-funded scheme. Control costs through stop-loss thresholds while providing employees with richer, more flexible outpatient care.",
    outcome: "Average 30% reduction in total benefit spend",
  },
];

export default function SelfFundedOutpatientPage() {
  return (
    <main>
      <AppNavbar />

      <PageHero
        badge="Self-Funded Outpatient Services"
        headline="Take Control of Outpatient"
        headlineHighlight="Healthcare Costs"
        subheadline="AI-powered claims processing, cashless panel doctor access, and customisable stop-loss plans — giving you full visibility and control over outpatient spending."
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
        iconColor="#0d9488"
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 50%, #f0f4ff 100%)"
      />

      <BenefitsGrid
        headline="Three capabilities. Infinite configurations."
        benefits={benefits}
        accentColor="#0d9488"
      />

      {/* Feature deep-dive */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              How the platform works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From plan configuration to real-time analytics — MixCare handles the full
              outpatient benefits lifecycle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Stop-Loss Configuration",
                desc: "Set individual and aggregate stop-loss thresholds. Once a limit is reached, claims automatically route to your reinsurer or insurer layer — giving you predictable cost control.",
                metric: "Reduce budget variance by up to 40%",
              },
              {
                title: "Cashless Doctor Experience",
                desc: "Employees locate and book panel doctors via the MixCare app. Consultations are cashless — the doctor submits directly to our system, eliminating manual reimbursement entirely.",
                metric: "2,000+ doctors across HK, MO, SG",
              },
              {
                title: "AI Fraud Detection",
                desc: "Our AI model analyses every claim against a library of fraud patterns, duplicate indicators, and anomalous billing codes. Suspicious claims are flagged for review before payout.",
                metric: "Fraud detection rate >95%",
              },
              {
                title: "Real-Time Claims Dashboard",
                desc: "Track all claims in real time — approvals, pending reviews, rejections, and trends. Export reports for finance, HR, or your insurer with one click.",
                metric: "98% claims satisfaction rate",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div
                  className="inline-block px-3 py-1.5 rounded-lg text-sm font-bold"
                  style={{ backgroundColor: "#ccfbf1", color: "#0f766e" }}
                >
                  {item.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">
            Built for every stakeholder
          </h2>
          <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
            See how insurers, brokers, and enterprises deploy self-funded outpatient with MixCare.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {useCases.map((uc) => (
              <div
                key={uc.audience}
                className="rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all"
                style={{ backgroundColor: uc.color + "08" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: uc.color }}
                >
                  <uc.icon size={20} className="text-white" />
                </div>
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: uc.color }}
                >
                  {uc.audience}
                </p>
                <p className="text-sm text-slate-700 leading-relaxed mb-4">{uc.scenario}</p>
                <div
                  className="text-xs font-bold px-3 py-1.5 rounded-lg inline-block"
                  style={{ backgroundColor: uc.color + "20", color: uc.color }}
                >
                  {uc.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI section */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            Measurable impact from day one
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { value: "<24h", label: "Average claims resolution" },
              { value: "95%+", label: "Fraud detection accuracy" },
              { value: "30%", label: "Average cost reduction" },
              { value: "2,000+", label: "Panel doctors available" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm"
              >
                <p
                  className="text-3xl font-extrabold mb-2"
                  style={{ color: "#0d9488" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageTestimonial
        quote="MixCare's AI claims engine transformed our outpatient scheme. Fraud incidents dropped by 60% and our average resolution time went from 5 days to less than 18 hours."
        name="Jennifer Wong"
        title="VP, Group Benefits"
        company="AXA Hong Kong"
        accentColor="#0d9488"
      />

      <BottomCTA
        headline="See it in action — Get a Demo"
        sub="Discover how MixCare's self-funded outpatient platform can reduce your medical costs and delight your employees."
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
      />

      <Footer />
    </main>
  );
}
