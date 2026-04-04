import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, FileText, Download, HelpCircle, ArrowRight, Clock, Calendar } from "lucide-react";
import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import Link from "next/link";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { allArticlesQuery, type SanityArticleListItem, allFaqItemsQuery, type SanityFaqItem } from "@/lib/sanity.queries";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/resources");

export const metadata: Metadata = {
  title: "Resources — Blog, Case Studies & Whitepapers | MixCare Health",
  description:
    "Expert blog posts, client case studies, downloadable whitepapers, and FAQs on AI-powered health benefits for insurers, enterprises, and SMBs across Hong Kong, Macau, and Singapore.",
  keywords: [
    "health benefits blog", "employee wellness case studies", "FSA whitepapers",
    "health benefits resources", "corporate wellness insights", "digital health articles",
    "MixCare blog", "employee health FAQ", "HR benefits guides",
    "group insurance Asia", "flexible benefits Hong Kong",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Resources — Blog, Case Studies & Whitepapers | ${SITE_NAME}`,
    description:
      "Expert blog posts, case studies, and whitepapers on AI-powered health benefits for insurers, enterprises, and SMBs.",
    url: canonical,
    type: "website",
    images: ogImage("MixCare Health Resources"),
  },
  twitter: {
    card: "summary_large_image",
    title: `Resources | ${SITE_NAME}`,
    description: "Blog, case studies, whitepapers and FAQs on AI-powered employee health benefits.",
    images: ["/opengraph-image.png"],
  },
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  "AI & Claims":       { bg: "#ccfbf1", text: "#0f766e" },
  "AI與理賠":          { bg: "#ccfbf1", text: "#0f766e" },
  "AI与理赔":          { bg: "#ccfbf1", text: "#0f766e" },
  "Employee Benefits": { bg: "#dbeafe", text: "#1d4ed8" },
  "員工福利":          { bg: "#dbeafe", text: "#1d4ed8" },
  "员工福利":          { bg: "#dbeafe", text: "#1d4ed8" },
  "SMB Guide":         { bg: "#fff7ed", text: "#c2410c" },
  "中小企指南":        { bg: "#fff7ed", text: "#c2410c" },
  "Wellness":          { bg: "#dcfce7", text: "#15803d" },
  "健康":              { bg: "#dcfce7", text: "#15803d" },
  "Compliance":        { bg: "#f3e8ff", text: "#7e22ce" },
  "合規":              { bg: "#f3e8ff", text: "#7e22ce" },
  "合规":              { bg: "#f3e8ff", text: "#7e22ce" },
  "Insurers":          { bg: "#e0f2fe", text: "#0369a1" },
  "保險公司":          { bg: "#e0f2fe", text: "#0369a1" },
  "保险公司":          { bg: "#e0f2fe", text: "#0369a1" },
};

function getCategoryColor(cat: string) {
  return categoryColors[cat] ?? { bg: "#f1f5f9", text: "#475569" };
}

// Format "YYYY-MM-DD" → "Mar 2025"
function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default async function ResourcesPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const r = t.resources;

  const sanityLocale = toSanityLocale(locale);

  const articles: SanityArticleListItem[] = isSanityConfigured
    ? await sanityClient.fetch(allArticlesQuery, { locale: sanityLocale })
    : [];

  const faqItems: SanityFaqItem[] = isSanityConfigured
    ? await sanityClient.fetch(allFaqItemsQuery, { locale: sanityLocale })
    : [];

  const faqData = faqItems.length > 0
    ? faqItems.map((item) => ({ q: item.question, a: item.answer }))
    : t.resources.faq.items;

  return (
    <main>
      <JsonLd data={[
        webPageSchema(
          "Resources — Blog, Case Studies & Whitepapers",
          "Expert blog posts, client case studies, downloadable whitepapers, and FAQs on AI-powered health benefits.",
          "/resources"
        ),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ]),
        faqSchema(faqData.map((f) => ({ question: f.q, answer: f.a }))),
      ]} />
      <AppNavbar />

      {/* Page header */}
      <div className="pt-28 pb-12 text-center" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 mb-5">
            <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
            Resources
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight">
            Browse Resources
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-8">
            Expert insights on AI-powered health benefits, employee wellness, and digital health across Asia-Pacific.
          </p>
          {/* Quick nav tabs */}
          <nav aria-label="Resource sections" className="flex flex-wrap gap-2 justify-center">
            {[
              { label: r.blog.heading,        href: localePath(locale, "/resources/articles"), icon: BookOpen, active: false },
              { label: r.caseStudies.heading, href: "#case-studies",  icon: FileText,   active: false },
              { label: r.whitepapers.heading, href: "#whitepapers",   icon: Download,   active: false },
              { label: r.faq.heading,         href: "#faq",           icon: HelpCircle, active: false },
            ].map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50 transition-colors shadow-sm"
              >
                <Icon size={14} aria-hidden="true" />
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Latest Articles ── */}
      <section id="blog" className="py-16 bg-white" aria-labelledby="blog-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#ccfbf1" }}>
                <BookOpen size={18} style={{ color: "#0d9488" }} aria-hidden="true" />
              </div>
              <h2 id="blog-heading" className="text-2xl font-extrabold text-slate-900">{r.blog.heading}</h2>
            </div>
            <Link
              href={localePath(locale, "/resources/articles")}
              className="text-sm font-semibold text-teal-600 hover:text-teal-800 flex items-center gap-1 transition-colors"
            >
              {r.blog.readMore} <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* Featured + sidebar layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Featured — first article */}
            {articles[0] && (() => {
              const post = articles[0];
              const col = getCategoryColor(post.category);
              return (
                <article className="lg:col-span-2 group flex flex-col rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <Link href={localePath(locale, `/resources/articles/${post.slug}`)} className="flex flex-col flex-1">
                    <div
                      className="h-48 relative flex items-end p-6"
                      style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
                    >
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                      <span className="relative px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: col.bg, color: col.text }}>
                        {post.category}
                      </span>
                    </div>
                    <div className="p-7 flex flex-col flex-1 bg-white">
                      <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-teal-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-5 flex-1">{post.description}</p>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1.5"><Calendar size={12} aria-hidden="true" /><time>{formatDate(post.publishedAt)}</time></span>
                        <span className="flex items-center gap-1.5"><Clock size={12} aria-hidden="true" />{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })()}

            {/* Compact sidebar — articles 1–3 */}
            <div className="flex flex-col gap-4">
              {articles.slice(1, 4).map((post) => {
                const col = getCategoryColor(post.category);
                return (
                  <article key={post.slug} className="group">
                    <Link href={localePath(locale, `/resources/articles/${post.slug}`)} className="flex gap-4 rounded-2xl border border-slate-100 p-4 hover:shadow-md transition-all hover:-translate-y-0.5 bg-white">
                      <div className="w-1 rounded-full flex-shrink-0 self-stretch" style={{ backgroundColor: col.text }} aria-hidden="true" />
                      <div className="min-w-0">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-1.5" style={{ backgroundColor: col.bg, color: col.text }}>
                          {post.category}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1 group-hover:text-teal-700 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1.5">
                          <span className="flex items-center gap-1"><Calendar size={10} aria-hidden="true" /><time>{formatDate(post.publishedAt)}</time></span>
                          <span className="flex items-center gap-1"><Clock size={10} aria-hidden="true" />{post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Last 2 articles */}
          <div className="grid md:grid-cols-2 gap-5 mt-5">
            {articles.slice(4, 6).map((post) => {
              const col = getCategoryColor(post.category);
              return (
                <article key={post.slug} className="group">
                  <Link href={localePath(locale, `/resources/articles/${post.slug}`)} className="flex gap-5 rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-all hover:-translate-y-1 bg-white">
                    <div className="w-1 rounded-full flex-shrink-0 self-stretch" style={{ backgroundColor: col.text }} aria-hidden="true" />
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2" style={{ backgroundColor: col.bg, color: col.text }}>
                        {post.category}
                      </span>
                      <h3 className="font-bold text-slate-900 mb-1.5 leading-snug group-hover:text-teal-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">{post.description}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Calendar size={11} aria-hidden="true" /><time>{formatDate(post.publishedAt)}</time></span>
                        <span className="flex items-center gap-1"><Clock size={11} aria-hidden="true" />{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section id="case-studies" className="py-16" style={{ backgroundColor: "#f8fafc" }} aria-labelledby="case-studies-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#dbeafe" }}>
                <FileText size={18} style={{ color: "#1d4ed8" }} aria-hidden="true" />
              </div>
              <h2 id="case-studies-heading" className="text-2xl font-extrabold text-slate-900">{r.caseStudies.heading}</h2>
            </div>
            <Link
              href={localePath(locale, "/resources/case-studies")}
              className="text-sm font-semibold text-teal-600 hover:text-teal-800 flex items-center gap-1 transition-colors"
            >
              {r.caseStudies.readMore} <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {r.caseStudies.items.map((cs) => (
              <article key={cs.company} className="group">
                <Link
                  href={localePath(locale, "/resources/case-studies")}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${cs.color}, ${cs.color}88)` }} aria-hidden="true" />
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: cs.color + "18", color: cs.color }}>
                        {cs.segment}
                      </span>
                      <p className="text-xs text-slate-400 font-semibold">{cs.company}</p>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-4 leading-snug group-hover:text-teal-700 transition-colors flex-1">
                      {cs.headline}
                    </h3>
                    <div className="rounded-xl px-4 py-3 mb-4" style={{ backgroundColor: cs.color + "10", borderLeft: `3px solid ${cs.color}` }}>
                      <p className="text-xs font-bold" style={{ color: cs.color }}>{cs.result}</p>
                    </div>
                    <p className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#0d9488" }}>
                      {r.caseStudies.readMore} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Whitepapers & Guides ── */}
      <section id="whitepapers" className="py-16 bg-white" aria-labelledby="whitepapers-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f3e8ff" }}>
                <Download size={18} style={{ color: "#7e22ce" }} aria-hidden="true" />
              </div>
              <h2 id="whitepapers-heading" className="text-2xl font-extrabold text-slate-900">{r.whitepapers.heading}</h2>
            </div>
            <Link
              href={localePath(locale, "/resources/whitepapers")}
              className="text-sm font-semibold text-teal-600 hover:text-teal-800 flex items-center gap-1 transition-colors"
            >
              {r.whitepapers.downloadBtn} <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-4">
            {r.whitepapers.items.map((wp) => (
              <div key={wp.title} className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-all bg-white hover:border-teal-200">
                <div
                  className="flex-shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center text-white font-bold shadow-md"
                  style={{ background: "linear-gradient(135deg, #0d9488, #1e3a5f)" }}
                  aria-hidden="true"
                >
                  <span className="text-lg leading-tight">{wp.pages.split(" ")[0]}</span>
                  <span className="text-[9px] opacity-80 uppercase tracking-wide">{wp.pages.split(" ")[1] ?? "pp"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 mb-1 leading-snug group-hover:text-teal-700 transition-colors">
                    {wp.title}
                  </h3>
                  <p className="text-sm text-slate-500">{wp.desc}</p>
                </div>
                <Link
                  href={localePath(locale, "/resources/whitepapers")}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow hover:shadow-md transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: "#0d9488" }}
                >
                  <Download size={14} aria-hidden="true" />
                  {r.whitepapers.downloadBtn}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16" style={{ backgroundColor: "#f8fafc" }} aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#fff7ed" }}>
              <HelpCircle size={18} style={{ color: "#f97316" }} aria-hidden="true" />
            </div>
            <h2 id="faq-heading" className="text-2xl font-extrabold text-slate-900">{r.faq.heading}</h2>
          </div>
          <div className="space-y-3">
            {faqData.map((faq) => (
              <details key={faq.q} className="bg-white rounded-2xl border border-slate-100 overflow-hidden group">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-slate-900 hover:text-teal-700 transition-colors list-none gap-4">
                  <span>{faq.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center group-open:bg-teal-50 group-open:border-teal-300 transition-colors" aria-hidden="true">
                    <ArrowRight size={12} className="text-slate-400 group-open:rotate-90 group-open:text-teal-600 transition-all" />
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
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">{r.cta.headline}</h2>
            <p className="text-teal-100 text-lg max-w-xl mx-auto mb-8 relative z-10">{r.cta.sub}</p>
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
