import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HelpCircle, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import Link from "next/link";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { allFaqItemsQuery, type SanityFaqItem } from "@/lib/sanity.queries";
import ResourcesTabs from "@/components/resources/ResourcesTabs";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/resources/faq");

export const metadata: Metadata = {
  title: "Health Benefits FAQ | MixCare Health",
  description:
    "Frequently asked questions about AI-powered health benefits, flexible spending accounts, digital claims processing, and employee wellness programmes across Hong Kong, Macau, and Singapore.",
  keywords: [
    "health benefits FAQ", "employee benefits questions", "AI claims FAQ",
    "flexible spending account FAQ", "FSA Hong Kong questions", "group insurance FAQ Asia",
    "MixCare FAQ", "digital health benefits help", "corporate wellness FAQ",
    "employee wellness Hong Kong FAQ",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Health Benefits FAQ | ${SITE_NAME}`,
    description:
      "Answers to your most common questions about AI-powered health benefits and employee wellness.",
    url: canonical,
    type: "website",
    images: ogImage("MixCare Health FAQ"),
  },
  twitter: {
    card: "summary_large_image",
    title: `FAQ | ${SITE_NAME}`,
    description: "Frequently asked questions about AI-powered health benefits across Asia-Pacific.",
    images: ["/opengraph-image.png"],
  },
};

export default async function FaqPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const r = t.resources;

  const faqItems: SanityFaqItem[] = isSanityConfigured
    ? await sanityClient.fetch<SanityFaqItem[]>(allFaqItemsQuery, {
        locale: toSanityLocale(locale),
      })
    : [];

  const faqData =
    faqItems.length > 0
      ? faqItems.map((item) => ({ q: item.question, a: item.answer }))
      : r.faq.items;

  return (
    <main>
      <JsonLd
        data={[
          webPageSchema(
            "Health Benefits FAQ",
            "Frequently asked questions about AI-powered health benefits, flexible spending accounts, and employee wellness.",
            "/resources/faq"
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources/articles" },
            { name: "FAQ", path: "/resources/faq" },
          ]),
          faqSchema(faqData.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <AppNavbar />
      <ResourcesTabs active="faq" locale={locale} />

      {/* Page header */}
      <div className="pt-10 pb-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#fff7ed" }}
            >
              <HelpCircle size={20} style={{ color: "#f97316" }} aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              {r.faq.heading}
            </h1>
          </div>
          <p className="text-slate-500 max-w-2xl">{r.faq.sub}</p>
        </div>
      </div>

      {/* FAQ accordion */}
      <section
        className="py-16"
        style={{ backgroundColor: "#f8fafc" }}
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqData.map((faq, idx) => (
              <details
                key={`${idx}-${faq.q.slice(0, 20)}`}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden group"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-slate-900 hover:text-teal-700 transition-colors list-none gap-4">
                  <span>{faq.q}</span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center group-open:bg-teal-50 group-open:border-teal-300 transition-colors"
                    aria-hidden="true"
                  >
                    <ArrowRight
                      size={12}
                      className="text-slate-400 group-open:rotate-90 group-open:text-teal-600 transition-all"
                    />
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white" aria-label="Call to action">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl px-10 py-14 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 80%, white 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
              aria-hidden="true"
            />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">
              {r.cta.headline}
            </h2>
            <p className="text-teal-100 text-lg max-w-xl mx-auto mb-8 relative z-10">
              {r.cta.sub}
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <Link
                href={localePath(locale, "/get-a-demo")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "#f97316", color: "#fff" }}
              >
                {r.cta.ctaLabel} <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link
                href={localePath(locale, "/start-now")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 text-white hover:bg-white/10 transition-all"
              >
                {r.cta.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
