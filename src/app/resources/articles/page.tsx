import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import Link from "next/link";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { allArticlesQuery, type SanityArticleListItem } from "@/lib/sanity.queries";

export const revalidate = 60; // re-fetch from Sanity every 60 seconds

const { canonical, languages } = buildAlternates("/resources/articles");

export const metadata: Metadata = {
  title: "Health Benefits Blog — Latest Articles | MixCare Health",
  description:
    "Expert articles on AI-powered claims, flexible benefits, FSA, employee wellness, and HR compliance across Hong Kong, Macau, and Singapore.",
  keywords: [
    "health benefits blog", "employee benefits articles", "AI claims processing",
    "flexible benefits Hong Kong", "FSA guide Asia", "HR benefits insights",
    "corporate wellness blog", "MixCare articles", "digital health blog",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Health Benefits Blog — Latest Articles | ${SITE_NAME}`,
    description: "Expert articles on AI-powered claims, flexible benefits, FSA, and employee wellness in Asia-Pacific.",
    url: canonical,
    type: "website",
    images: ogImage("MixCare Health Blog"),
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${SITE_NAME}`,
    description: "Expert articles on health benefits, AI claims, and employee wellness in Asia.",
    images: ["/opengraph-image.png"],
  },
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  "AI & Claims":       { bg: "#ccfbf1", text: "#0f766e" },
  "Employee Benefits": { bg: "#dbeafe", text: "#1d4ed8" },
  "SMB Guide":         { bg: "#fff7ed", text: "#c2410c" },
  "Wellness":          { bg: "#dcfce7", text: "#15803d" },
  "Compliance":        { bg: "#f3e8ff", text: "#7e22ce" },
  "Insurers":          { bg: "#e0f2fe", text: "#0369a1" },
};

const gradients = [
  "from-teal-600 to-cyan-800",
  "from-blue-600 to-indigo-800",
  "from-orange-500 to-rose-700",
  "from-emerald-600 to-teal-800",
  "from-violet-600 to-purple-800",
  "from-sky-600 to-blue-800",
];

function getCategoryColor(cat: string) {
  return categoryColors[cat] ?? { bg: "#f1f5f9", text: "#475569" };
}

// Format "YYYY-MM-DD" → "Mar 2025"
function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default async function ArticlesPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const r = t.resources;

  const articles: SanityArticleListItem[] = isSanityConfigured
    ? await sanityClient.fetch(allArticlesQuery, { locale: toSanityLocale(locale) })
    : [];
  const [featured, ...rest] = articles;

  return (
    <main>
      <JsonLd data={[
        webPageSchema(
          "Health Benefits Blog — Latest Articles",
          "Expert articles on AI-powered claims, flexible benefits, FSA, and employee wellness.",
          "/resources/articles"
        ),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Articles", path: "/resources/articles" },
        ]),
      ]} />
      <AppNavbar />

      {/* Page header */}
      <div className="pt-24 pb-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={localePath(locale, "/resources")}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-700 transition-colors mb-6"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Resources
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#ccfbf1" }}>
              <BookOpen size={20} style={{ color: "#0d9488" }} aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">{r.blog.heading}</h1>
          </div>
          <p className="text-slate-500 max-w-2xl">{r.hero.sub}</p>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured article */}
          {featured && (() => {
            const col = getCategoryColor(featured.category);
            return (
              <article className="group mb-10" itemScope itemType="https://schema.org/Article">
                <Link href={localePath(locale, `/resources/articles/${featured.slug}`)} className="flex flex-col lg:flex-row rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className={`lg:w-2/5 min-h-[220px] relative flex items-end p-8 bg-gradient-to-br ${gradients[0]}`}>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} aria-hidden="true" />
                    <div className="relative">
                      <span className="px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block" style={{ backgroundColor: col.bg, color: col.text }}>
                        {featured.category}
                      </span>
                      <p className="text-white/70 text-sm font-semibold">Featured Article</p>
                    </div>
                  </div>
                  <div className="lg:w-3/5 p-8 flex flex-col justify-between bg-white">
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-teal-700 transition-colors" itemProp="headline">
                        {featured.title}
                      </h2>
                      <p className="text-slate-600 leading-relaxed mb-5" itemProp="description">{featured.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5"><Calendar size={12} aria-hidden="true" /><time itemProp="datePublished">{formatDate(featured.publishedAt)}</time></span>
                        <span className="flex items-center gap-1.5"><Clock size={12} aria-hidden="true" />{featured.readTime}</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-teal-600 group-hover:gap-2.5 transition-all">
                        {r.blog.readMore} <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })()}

          {/* Article grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => {
              const col = getCategoryColor(post.category);
              return (
                <article key={post.slug} className="group" itemScope itemType="https://schema.org/Article">
                  <Link href={localePath(locale, `/resources/articles/${post.slug}`)} className="flex flex-col rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 h-full bg-white">
                    {/* Gradient visual bar */}
                    <div className={`h-28 relative flex items-end p-4 bg-gradient-to-br ${gradients[(i + 1) % gradients.length]}`}>
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "18px 18px" }} aria-hidden="true" />
                      <span className="relative px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: col.bg, color: col.text }}>
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h2 className="font-bold text-slate-900 mb-2 leading-snug group-hover:text-teal-700 transition-colors flex-1" itemProp="headline">
                        {post.title}
                      </h2>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3" itemProp="description">{post.description}</p>
                      <div className="flex items-center justify-between text-xs text-slate-400 mt-auto">
                        <span className="flex items-center gap-1.5"><Calendar size={11} aria-hidden="true" /><time itemProp="datePublished">{formatDate(post.publishedAt)}</time></span>
                        <span className="flex items-center gap-1.5"><Clock size={11} aria-hidden="true" />{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link
              href={localePath(locale, "/resources")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-700 transition-colors"
            >
              <ArrowLeft size={14} aria-hidden="true" /> Back to Resources
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
