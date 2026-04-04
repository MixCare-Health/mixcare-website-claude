import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { allArticlesQuery, type SanityArticleListItem } from "@/lib/sanity.queries";
import ArticlesBrowser from "@/components/resources/ArticlesBrowser";
import ResourcesTabs from "@/components/resources/ResourcesTabs";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/resources/articles");

export const metadata: Metadata = {
  title: "Health Benefits Blog — Browse All Articles | MixCare Health",
  description:
    "Expert articles on AI-powered claims, flexible benefits, FSA, employee wellness, and HR compliance across Hong Kong, Macau, and Singapore.",
  keywords: [
    "health benefits blog", "employee benefits articles", "AI claims processing",
    "flexible benefits Hong Kong", "FSA guide Asia", "HR benefits insights",
    "corporate wellness blog", "MixCare articles", "digital health blog",
    "group insurance Asia", "wellness programme guide",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Health Benefits Blog | ${SITE_NAME}`,
    description:
      "Expert articles on AI-powered claims, flexible benefits, FSA, and employee wellness in Asia-Pacific.",
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

export default async function ArticlesPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);

  const articles: SanityArticleListItem[] = isSanityConfigured
    ? await sanityClient.fetch<SanityArticleListItem[]>(allArticlesQuery, {
        locale: toSanityLocale(locale),
      })
    : [];

  return (
    <main>
      <JsonLd
        data={[
          webPageSchema(
            "Health Benefits Blog — Browse All Articles",
            "Expert articles on AI-powered claims, flexible benefits, FSA, and employee wellness in Asia-Pacific.",
            "/resources/articles"
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: "Articles", path: "/resources/articles" },
          ]),
        ]}
      />
      <AppNavbar />
      <ResourcesTabs active="articles" locale={locale} />
      <ArticlesBrowser
        articles={articles}
        locale={locale}
        badge={t.resources.blog.heading}
        headline="Browse Resources"
        sub="Expert insights on AI-powered health benefits, employee wellness, and digital health across Asia-Pacific. For real."
      />
      <Footer />
    </main>
  );
}
