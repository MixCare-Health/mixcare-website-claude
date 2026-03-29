import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomCTA from "@/components/shared/BottomCTA";
import { Heart, Globe, Lightbulb, ShieldCheck, Users, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | MixCare Health",
  description:
    "MixCare Health was founded to transform how health benefits are delivered across Asia-Pacific — AI-powered, flexible, and human-first.",
};

const values = [
  { icon: Heart, title: "Human-First", desc: "Every product decision starts with a simple question: does this make life better for the people using it?" },
  { icon: Lightbulb, title: "Boldly Innovative", desc: "We use AI and modern technology to solve old, stubborn problems in healthcare — with urgency and imagination." },
  { icon: ShieldCheck, title: "Uncompromisingly Trusted", desc: "Healthcare and financial data demand the highest standards. We hold ourselves to them without exception." },
  { icon: Globe, title: "Asia-Pacific Focused", desc: "We're built for this region — its languages, regulations, healthcare systems, and cultural context." },
  { icon: Users, title: "Partner Obsessed", desc: "Our success is measured by our partners' success. We win when our clients, brokers, and providers win." },
  { icon: Target, title: "Outcome Driven", desc: "We measure everything — claims processed, costs saved, benefits used. Data shapes every decision." },
];

const team = [
  { name: "Dr. Michael Yuen", title: "CEO & Co-Founder", bio: "Former Head of Digital Health at AXA Asia. 15 years in insurtech and healthcare innovation across HK and SG.", initial: "M" },
  { name: "Sarah Zhang", title: "CTO & Co-Founder", bio: "Ex-Google and Ant Financial. Built AI claims processing systems handling over HK$10B annually.", initial: "S" },
  { name: "James Lam", title: "Chief Revenue Officer", bio: "20 years building distribution across Asia-Pacific for Manulife, Prudential, and MetLife.", initial: "J" },
  { name: "Dr. Emily Fong", title: "Chief Medical Officer", bio: "Practising physician and health economist. PhD from Johns Hopkins. Advisor to Hong Kong's DHSC.", initial: "E" },
  { name: "Kevin Ho", title: "Chief Compliance Officer", bio: "Former regulator at the HKMA. Expert in PDPO, MAS TRM, and healthcare data privacy frameworks.", initial: "K" },
  { name: "Linda Chan", title: "Chief People Officer", bio: "Built people-first cultures at Cathay Pacific and HSBC. Passionate about flexible, inclusive workplaces.", initial: "L" },
];

export default function AboutPage() {
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
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Transforming health benefits{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              across Asia-Pacific
            </span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            MixCare Health was founded with a single conviction: the way health benefits are
            delivered in Asia is broken — and AI can fix it.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-slate-700">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-5">Our founding story</h2>
            <p className="leading-relaxed mb-5">
              In 2019, our founders spent months watching the same story play out: employees
              across Hong Kong and Singapore had health benefit packages that looked impressive
              on paper but were a frustrating experience in practice. Complex reimbursement
              forms, three-week claim windows, and rigid plan structures that reflected actuarial
              models rather than how people actually live.
            </p>
            <p className="leading-relaxed mb-5">
              Meanwhile, the technology to fix this existed. AI could process claims in minutes,
              not weeks. Marketplace platforms could connect employees to exactly the wellness
              services they needed. Flexible spending accounts could let individuals decide what
              mattered most to them — not a committee.
            </p>
            <p className="leading-relaxed mb-8">
              MixCare Health was built to bridge that gap. We&apos;ve served over 200 corporate
              clients across Hong Kong, Macau, and Singapore — from 5-person startups to
              multinationals with 10,000 employees — and we&apos;re just getting started.
            </p>
          </div>

          {/* Stats */}
          <div
            className="rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
          >
            {[
              { value: "2019", label: "Founded in Hong Kong" },
              { value: "200+", label: "Corporate clients" },
              { value: "3", label: "Markets: HK, SG, MO" },
              { value: "50K+", label: "Employees benefiting" },
            ].map((stat) => (
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
            What we believe
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-md transition-all">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#ccfbf1" }}
                >
                  <v.icon size={20} style={{ color: "#0d9488" }} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">
            Our leadership team
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
            Built by operators who have lived on both sides of the healthcare benefits equation —
            as providers, payers, and employers.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl mb-4"
                  style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
                >
                  {member.initial}
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
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Join our team</h2>
          <p className="text-lg text-slate-600 mb-8">
            We&apos;re growing fast and looking for people who want to transform healthcare in
            Asia-Pacific. Remote-friendly, equity-based compensation, and a team that genuinely
            cares about the work.
          </p>
          <a
            href="mailto:careers@mixcarehealth.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-lg"
            style={{ backgroundColor: "#0d9488" }}
          >
            See Open Roles →
          </a>
        </div>
      </section>

      {/* Press */}
      <section id="press" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            In the press
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                outlet: "South China Morning Post",
                date: "Jan 2025",
                headline: "MixCare Health raises Series B to expand AI-powered wellness platform across Asia",
              },
              {
                outlet: "The Business Times (SG)",
                date: "Nov 2024",
                headline: "How AI is transforming employee health benefits in Southeast Asia",
              },
              {
                outlet: "Forbes Asia",
                date: "Sep 2024",
                headline: "MixCare Health named among 2024 Asia-Pacific HealthTech companies to watch",
              },
            ].map((press) => (
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
              Media enquiries: press@mixcarehealth.com →
            </a>
          </p>
        </div>
      </section>

      <BottomCTA
        headline="Want to transform health benefits with us?"
        sub="Whether as a client, partner, or team member — we'd love to connect."
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
        secondaryLabel="View Open Roles"
        secondaryHref="mailto:careers@mixcarehealth.com"
      />

      <Footer />
    </main>
  );
}
