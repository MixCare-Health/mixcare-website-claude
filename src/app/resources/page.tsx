import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomCTA from "@/components/shared/BottomCTA";
import { BookOpen, FileText, Download, HelpCircle, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | MixCare Health",
  description:
    "Blog posts, case studies, whitepapers, and FAQs on AI-powered health benefits for insurers, enterprises, and SMBs.",
};

const blogPosts = [
  {
    category: "AI & Claims",
    title: "How AI is Cutting Claims Processing Time by 70% in Group Insurance",
    desc: "Explore the machine learning models behind MixCare's claims engine and what it means for insurers and self-funded schemes.",
    date: "Mar 2025",
    readTime: "8 min read",
  },
  {
    category: "Employee Benefits",
    title: "Why Flexible Benefits Outperform Traditional Group Plans — Every Time",
    desc: "Data from 200+ corporate clients shows employees with flexible benefit choice use 2x more of their benefit budget.",
    date: "Feb 2025",
    readTime: "6 min read",
  },
  {
    category: "SMB Guide",
    title: "The Small Business Guide to Employee Benefits in Hong Kong",
    desc: "A practical walkthrough of benefit options, pricing, regulatory requirements, and how to get started — for teams of 2 to 500.",
    date: "Feb 2025",
    readTime: "12 min read",
  },
  {
    category: "Wellness",
    title: "Mental Health Benefits: What Employees in Asia Actually Want in 2025",
    desc: "Survey data from 5,000 employees across HK, SG, and MO reveals the wellness benefits that drive satisfaction and retention.",
    date: "Jan 2025",
    readTime: "10 min read",
  },
  {
    category: "Compliance",
    title: "PDPO 2024 Updates: What HR and Benefit Managers Need to Know",
    desc: "A plain-language summary of the 2024 amendments to Hong Kong's Personal Data Privacy Ordinance and their benefit implications.",
    date: "Dec 2024",
    readTime: "7 min read",
  },
  {
    category: "Insurers",
    title: "Building a Digital-First Outpatient Product in Asia: Lessons from the Field",
    desc: "Three insurer case studies on deploying AI-powered self-funded outpatient schemes — what worked and what didn't.",
    date: "Nov 2024",
    readTime: "15 min read",
  },
];

const caseStudies = [
  {
    company: "AXA Hong Kong",
    segment: "Insurer",
    headline: "70% reduction in claims processing cost with AI-powered self-funded outpatient",
    result: "Claims resolved in <18 hours, fraud down 60%",
    color: "#0d9488",
  },
  {
    company: "Jardine Matheson",
    segment: "Enterprise",
    headline: "Benefit utilisation jumped from 40% to 92% after switching to flexible benefits",
    result: "Employee satisfaction +45%, admin time down 70%",
    color: "#1e3a5f",
  },
  {
    company: "TechBridge HK",
    segment: "SMB (25 employees)",
    headline: "How a 25-person startup attracted senior talent with enterprise-grade benefits",
    result: "2 senior hires retained vs. larger competitors, setup in 1 day",
    color: "#f97316",
  },
];

const whitepapers = [
  {
    title: "The State of Employee Benefits in Asia-Pacific 2025",
    desc: "Annual survey of 500 HR leaders and 5,000 employees across HK, SG, and MO.",
    pages: "42 pages",
  },
  {
    title: "AI in Health Insurance Claims: A Technical Overview",
    desc: "Deep dive into the machine learning models powering modern claims processing.",
    pages: "28 pages",
  },
  {
    title: "Building a Flexible Benefits Programme: A Step-by-Step Guide",
    desc: "Practical guide for HR teams moving from traditional group plans to flexible benefits.",
    pages: "18 pages",
  },
];

const faqs = [
  {
    q: "What markets does MixCare operate in?",
    a: "MixCare Health operates across Hong Kong, Macau, and Singapore. Our panel doctor network covers all three markets and our platform is fully compliant with local regulatory requirements in each jurisdiction.",
  },
  {
    q: "How long does implementation take?",
    a: "For small businesses, setup can be completed in under 60 minutes via our self-service portal. Enterprise deployments typically take 2–5 business days including HRIS integration and custom configuration.",
  },
  {
    q: "What is the minimum company size?",
    a: "There is no minimum headcount requirement. Our Starter plan serves companies with as few as 2 employees. Pricing scales by the number of enrolled employees.",
  },
  {
    q: "Can MixCare integrate with our existing HR system?",
    a: "Yes. We have pre-built integrations with Workday, SAP SuccessFactors, Oracle HCM, BambooHR, and others. Custom integrations are available via our REST API.",
  },
  {
    q: "How does the panel doctor network work?",
    a: "Employees use the MixCare app to locate and book a panel doctor. Consultations are cashless — employees present their digital card and the doctor bills directly to MixCare. No out-of-pocket payment, no reimbursement forms.",
  },
  {
    q: "Is MixCare compliant with PDPO and GDPR?",
    a: "Yes. MixCare is fully compliant with Hong Kong's PDPO (Cap. 486), Singapore's PDPA, and the EU's GDPR. We are also ISO 27001 certified. Full documentation is available on request.",
  },
  {
    q: "Can we white-label the marketplace?",
    a: "Yes. Insurers and brokers can deploy a fully branded wellness marketplace under their own domain and brand identity. Setup takes 2–3 business days.",
  },
  {
    q: "What happens to unused FSA balances at year end?",
    a: "This is fully configurable. You can choose to allow rollover, forfeit unused balances back to the company, or return them to the employee. The platform enforces whichever rule you set automatically.",
  },
];

export default function ResourcesPage() {
  return (
    <main>
      <AppNavbar />

      {/* Hero */}
      <section
        className="pt-28 pb-16 text-center"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">
            Resources & Insights
          </h1>
          <p className="text-xl text-slate-600">
            Research, guides, and case studies to help you build better health benefits programmes.
          </p>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen size={22} style={{ color: "#0d9488" }} />
            <h2 className="text-2xl font-extrabold text-slate-900">Latest Articles</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.map((post) => (
              <a
                key={post.title}
                href="#"
                className="rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1 group block"
              >
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                  style={{ backgroundColor: "#ccfbf1", color: "#0f766e" }}
                >
                  {post.category}
                </span>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{post.desc}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section id="case-studies" className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <FileText size={22} style={{ color: "#0d9488" }} />
            <h2 className="text-2xl font-extrabold text-slate-900">Case Studies</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {caseStudies.map((cs) => (
              <a
                key={cs.company}
                href="#"
                className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1 group block"
              >
                <span
                  className="inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-3"
                  style={{ backgroundColor: cs.color + "15", color: cs.color }}
                >
                  {cs.segment}
                </span>
                <p className="text-xs text-slate-500 font-semibold mb-2">{cs.company}</p>
                <h3 className="font-bold text-slate-900 mb-3 leading-snug group-hover:text-teal-700 transition-colors">
                  {cs.headline}
                </h3>
                <p
                  className="text-xs font-bold px-3 py-1.5 rounded-lg inline-block"
                  style={{ backgroundColor: cs.color + "15", color: cs.color }}
                >
                  {cs.result}
                </p>
                <p className="flex items-center gap-1 text-xs font-semibold mt-4" style={{ color: "#0d9488" }}>
                  Read case study <ArrowRight size={12} />
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Whitepapers */}
      <section id="whitepapers" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Download size={22} style={{ color: "#0d9488" }} />
            <h2 className="text-2xl font-extrabold text-slate-900">Whitepapers & Guides</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {whitepapers.map((wp) => (
              <div
                key={wp.title}
                className="rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all"
                style={{ backgroundColor: "#f8fafc" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "#0d9488" }}
                >
                  <FileText size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 leading-snug">{wp.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{wp.desc}</p>
                <p className="text-xs text-slate-400 mb-4">{wp.pages}</p>
                <button
                  className="w-full py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: "#0d9488" }}
                >
                  Download Free →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <HelpCircle size={22} style={{ color: "#0d9488" }} />
            <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden group"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-slate-900 hover:text-teal-700 transition-colors list-none">
                  {faq.q}
                  <ArrowRight
                    size={16}
                    className="flex-shrink-0 text-slate-400 group-open:rotate-90 transition-transform"
                  />
                </summary>
                <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <BottomCTA
        headline="Ready to transform your health benefits?"
        sub="Talk to a MixCare specialist and get a personalised demo for your organisation."
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
        secondaryLabel="Start Now — Free"
        secondaryHref="/start-now"
      />

      <Footer />
    </main>
  );
}
