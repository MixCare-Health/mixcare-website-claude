import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Clock, Calendar, FileText } from "lucide-react";
import { getLocale } from "@/lib/locale.server";
import { localePath } from "@/lib/locale";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Request Received — MixCare Health",
  robots: { index: false, follow: false },
};

export default async function GetADemoSuccessPage() {
  const locale = await getLocale();

  const nextSteps = [
    {
      icon: Clock,
      title: "We'll respond within 1 business day",
      desc: "A MixCare specialist will reach out to your work email to confirm your request.",
    },
    {
      icon: Calendar,
      title: "We'll schedule a time that works for you",
      desc: "Expect a calendar invite for a 30-minute personalised walkthrough of the platform.",
    },
    {
      icon: FileText,
      title: "Tailored to your needs",
      desc: "We'll customise the demo based on the solutions you selected and your company profile.",
    },
  ];

  return (
    <main>
      <AppNavbar />

      <section
        className="pt-28 pb-20 min-h-screen relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #0d9488, transparent)" }}
        />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">

          {/* Checkmark */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
            style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
          >
            <CheckCircle2 size={48} className="text-white" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            Request Received!
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-3">
            Thank you for your interest in MixCare Health.
          </p>
          <p className="text-lg text-slate-500 leading-relaxed mb-12">
            We&apos;ve received your demo request and will get back to you{" "}
            <span className="font-semibold text-teal-700">as soon as possible</span>.
          </p>

          {/* Next steps */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 mb-10 text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-6 text-center">
              What happens next
            </p>
            <div className="space-y-6">
              {nextSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#ccfbf1" }}
                    >
                      <Icon size={18} style={{ color: "#0d9488" }} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 mb-0.5">{step.title}</p>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA links */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={localePath(locale, "/platform/self-funded-outpatient")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "#0d9488" }}
            >
              Explore our platform <ArrowRight size={18} />
            </Link>
            <Link
              href={localePath(locale, "/resources/case-studies")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold border-2 transition-all hover:-translate-y-0.5"
              style={{ borderColor: "#0d9488", color: "#0d9488" }}
            >
              Read case studies
            </Link>
          </div>

          {/* Contact note */}
          <p className="mt-10 text-sm text-slate-400">
            Have an urgent question?{" "}
            <a
              href="mailto:hello@mixcarehealth.com"
              className="text-teal-600 font-semibold hover:underline"
            >
              hello@mixcarehealth.com
            </a>
          </p>

        </div>
      </section>

      <Footer />
    </main>
  );
}
