import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Clock, Calendar, ArrowLeft, ArrowRight, User } from "lucide-react";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, ogImage, buildAlternates } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath, LOCALE_URL } from "@/lib/locale";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import RichTextRenderer from "@/components/shared/RichTextRenderer";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import {
  allArticleSlugsQuery,
  allArticlesQuery,
  articleBySlugQuery,
  type SanityArticle,
  type SanityArticleListItem,
} from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

// ── Category colour map ───────────────────────────────────────────────────────
const categoryColors: Record<string, { bg: string; text: string }> = {
  "AI & Claims":       { bg: "#ccfbf1", text: "#0f766e" },
  "Employee Benefits": { bg: "#dbeafe", text: "#1d4ed8" },
  "SMB Guide":         { bg: "#fff7ed", text: "#c2410c" },
  "Wellness":          { bg: "#dcfce7", text: "#15803d" },
  "Compliance":        { bg: "#f3e8ff", text: "#7e22ce" },
  "Insurers":          { bg: "#e0f2fe", text: "#0369a1" },
};

function getCategoryColor(cat: string) {
  return categoryColors[cat] ?? { bg: "#f1f5f9", text: "#475569" };
}

// Format "YYYY-MM-DD" → "Mar 2025"
function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// ── Static params & metadata ──────────────────────────────────────────────────
type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  if (!isSanityConfigured) return [];
  const slugs: { slug: string }[] = await sanityClient.fetch(allArticleSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isSanityConfigured) return {};
  const locale = await getLocale();
  const article: SanityArticle | null = await sanityClient.fetch(articleBySlugQuery, {
    slug,
    locale: toSanityLocale(locale),
  });
  if (!article) return {};

  const path = `/resources/articles/${slug}`;
  const { canonical, languages } = articleAlternates(path, locale, article);

  // The Sanity SEO tab is English-only, so only use it on the English page.
  const seo = locale === "en" ? article.seo ?? undefined : undefined;
  const seoTitle = seo?.metaTitle?.trim();
  const description = seo?.metaDescription?.trim() || article.description;
  // Marketing-written SEO titles are used as-is; add the brand only if it still fits in ~60 characters.
  const fullTitle = seoTitle
    ? (seoTitle.length + SITE_NAME.length + 3 <= 60 ? `${seoTitle} | ${SITE_NAME}` : seoTitle)
    : `${article.title} | ${SITE_NAME}`;

  const ogSource = seo?.ogImage?.asset ? seo.ogImage : article.coverImage?.asset ? article.coverImage : null;
  const ogUrl = ogSource ? urlFor(ogSource).width(1200).height(630).fit("crop").auto("format").url() : undefined;
  const ogTitle = seo?.ogTitle?.trim() || seoTitle || article.title;
  const ogDescription = seo?.ogDescription?.trim() || description;

  return {
    title: { absolute: fullTitle },
    description,
    // Articles with no body sections (old newsletter stubs) render as near-empty pages: keep them out of search
    ...(!(article.sections && article.sections.length) ? { robots: { index: false, follow: true } } : {}),
    alternates: { canonical, languages },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      type: "article",
      publishedTime: article.publishedAt,
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
      images: ogUrl ? ogImage(ogTitle, ogUrl) : ogImage(ogTitle),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      ...(ogUrl ? { images: [ogUrl] } : {}),
    },
  };
}

/**
 * Canonical + hreflang for an article. Each translated language version is
 * self-canonical; a language with no translation (content falls back to
 * English) canonicalises to the English page and is left out of hreflang.
 */
function articleAlternates(path: string, locale: string, article: SanityArticle) {
  const prefix = LOCALE_URL[locale as keyof typeof LOCALE_URL] ?? "en";
  const has = { "zh-hk": article.translated?.zhTW ?? false, "zh-cn": article.translated?.zhCN ?? false };
  const all = buildAlternates(path, "en");
  const languages: Record<string, string> = { "x-default": all.languages["x-default"], en: all.languages.en };
  if (has["zh-hk"]) languages["zh-HK"] = all.languages["zh-HK"];
  if (has["zh-cn"]) languages["zh-Hans"] = all.languages["zh-Hans"];
  const selfOk = prefix === "en" || has[prefix as "zh-hk" | "zh-cn"];
  const canonical = selfOk ? buildAlternates(path, prefix as "en" | "zh-hk" | "zh-cn").canonical : all.canonical;
  return { canonical, languages };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function ArticlePostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  // Fetch article and all articles for "related" sidebar in parallel
  if (!isSanityConfigured) notFound();

  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);
  const [article, allArticles]: [SanityArticle | null, SanityArticleListItem[]] = await Promise.all([
    sanityClient.fetch(articleBySlugQuery, { slug, locale: sanityLocale }),
    sanityClient.fetch(allArticlesQuery, { locale: sanityLocale }),
  ]);

  if (!article) notFound();

  // If the admin set an external/custom URL, redirect there immediately.
  if (article.externalUrl) redirect(article.externalUrl);

  const t = getTranslations(locale);
  const col = getCategoryColor(article.category);

  // Related = 3 other articles (excluding current)
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <main>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Articles", path: "/resources/articles" },
          { name: article.title, path: `/resources/articles/${slug}` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          author: { "@type": "Organization", name: article.author },
          datePublished: article.publishedAt,
          ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
          mainEntityOfPage: `${SITE_URL}/${LOCALE_URL[locale]}/resources/articles/${slug}`,
          inLanguage: { en: "en", "zh-TW": "zh-HK", "zh-CN": "zh-CN" }[locale] ?? "en",
          ...(article.coverImage?.asset ? { image: urlFor(article.coverImage).width(1200).height(630).fit("crop").url() } : {}),
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/logos/mixcare-logo-257ebb39.png` },
          },
        },
      ]} />
      <AppNavbar />

      {/* Article header */}
      <div
        className="pt-24 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
      >
        {article.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(article.coverImage).width(1400).height(500).fit("crop").url()}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href={localePath(locale, "/resources/articles")}
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} aria-hidden="true" /> {t.resources.blog.heading}
            </Link>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: col.bg, color: col.text }}>
              {article.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-2"><User size={14} aria-hidden="true" />{article.author}</span>
            <span className="flex items-center gap-2"><Calendar size={14} aria-hidden="true" /><time>{formatDate(article.publishedAt)}</time></span>
            <span className="flex items-center gap-2"><Clock size={14} aria-hidden="true" />{article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Article body + sidebar */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Body */}
            <article className="lg:col-span-2" itemScope itemType="https://schema.org/Article">
              <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium border-l-4 pl-5" style={{ borderColor: "#0d9488" }}>
                {article.description}
              </p>
              <div className="space-y-8">
                {(article.sections ?? []).map((section, i) => (
                  <section key={i}>
                    <h2 className="text-xl font-extrabold text-slate-900 mb-3">{section.heading}</h2>
                    <RichTextRenderer value={section.body} />
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="space-y-2 mt-3" role="list">
                        {section.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-3 text-sm text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#0d9488" }} aria-hidden="true" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* Author box */}
              <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ backgroundColor: "#0d9488" }}>
                  M
                </div>
                <div>
                  <p className="font-bold text-slate-900">{article.author}</p>
                  <p className="text-sm text-slate-500">MixCare Health · Hong Kong</p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA card */}
              <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}>
                <p className="font-extrabold text-lg mb-2">See MixCare in action</p>
                <p className="text-sm text-white/80 mb-5">Get a personalised demo for your team — no commitment required.</p>
                <Link
                  href={"https://meetings-na2.hubspot.com/alex-wong9/mixcare-exploration-meeting-"}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: "#f97316", color: "#fff" }}
                >
                  {t.resources.cta.ctaLabel} <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Related articles */}
              {related.length > 0 && (
                <div className="rounded-2xl border border-slate-100 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={16} style={{ color: "#0d9488" }} aria-hidden="true" />
                    <h3 className="font-bold text-slate-900 text-sm">Related Articles</h3>
                  </div>
                  <div className="space-y-4">
                    {related.map((rp) => {
                      const rcol = getCategoryColor(rp.category);
                      return (
                        <Link
                          key={rp.slug}
                          href={localePath(locale, `/resources/articles/${rp.slug}`)}
                          className="group block"
                        >
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-1" style={{ backgroundColor: rcol.bg, color: rcol.text }}>
                            {rp.category}
                          </span>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition-colors leading-snug line-clamp-2">
                            {rp.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">{formatDate(rp.publishedAt)} · {rp.readTime}</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Back link */}
              <Link
                href={localePath(locale, "/resources/articles")}
                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-700 transition-colors"
              >
                <ArrowLeft size={14} aria-hidden="true" /> All Articles
              </Link>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
