import type { MetadataRoute } from "next";
import { SITE_URL, LOCALE_PREFIXES, buildAlternates } from "@/lib/seo";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";

// Rebuild the sitemap at most once an hour so new Sanity content appears quickly.
export const revalidate = 3600;

/** Static pages (without locale prefix). All three language versions exist in code. */
const PAGES = [
  "/",
  "/about-us",
  "/careers",
  "/contact-us",
  "/get-a-demo",
  "/partners",
  "/trust",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookies-policy",
  "/resources/articles",
  "/resources/case-studies",
  "/resources/whitepapers",
  "/resources/media-coverage",
  "/resources/events",
  "/platform/self-funded-outpatient",
  "/platform/flexible-spending-account",
  "/platform/wellness-marketplace",
  "/platform/wellness-event",
  // "/platform/flexible-benefits" and "/platform/wellness-hub": coming soon, excluded
  // "/start-now": noindex, excluded
  // "/resources": redirects to /resources/articles, excluded
  "/who-we-serve/insurers",
  "/who-we-serve/brokers",
  "/who-we-serve/enterprises",
  "/who-we-serve/small-business",
  "/who-we-serve/providers",
];

const PRIORITY: Record<string, number> = {
  "/": 1.0,
  "/get-a-demo": 0.9,
  "/platform/self-funded-outpatient": 0.8,
  "/platform/flexible-spending-account": 0.8,
  "/platform/wellness-marketplace": 0.8,
  "/platform/wellness-event": 0.8,
  "/who-we-serve/insurers": 0.8,
  "/who-we-serve/brokers": 0.8,
  "/who-we-serve/enterprises": 0.8,
  "/who-we-serve/small-business": 0.8,
  "/who-we-serve/providers": 0.8,
  "/resources/articles": 0.7,
  "/contact-us": 0.6,
  "/privacy-policy": 0.3,
  "/terms-and-conditions": 0.3,
  "/cookies-policy": 0.3,
};

type ArticleRow = { slug: string; updatedAt?: string; zhTW?: boolean; zhCN?: boolean };
type DocRow = { slug: string; updatedAt?: string };

const articlesQuery = `
  *[_type == "article" && defined(slug.current) && !defined(externalUrl) && count(sections) > 0] {
    "slug": slug.current,
    "updatedAt": _updatedAt,
    "zhTW": defined(title.zhTW),
    "zhCN": defined(title.zhCN),
  }
`;

// Other content types: their detail pages are English-canonical, so list the /en URL only.
const otherDocsQuery = `{
  "caseStudies":  *[_type == "caseStudy"  && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt },
  "whitepapers":  *[_type == "whitepaper" && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt },
  "press":        *[_type == "pressItem"  && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt },
  "events":       *[_type == "eventItem"  && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt },
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages: one entry per language version, each listing its alternates.
  for (const path of PAGES) {
    const { languages } = buildAlternates(path);
    for (const prefix of LOCALE_PREFIXES) {
      entries.push({
        url: buildAlternates(path, prefix).canonical,
        changeFrequency: path === "/" || path === "/resources/articles" ? "weekly" : "monthly",
        priority: PRIORITY[path] ?? 0.7,
        alternates: { languages },
      });
    }
  }

  if (!isSanityConfigured) return entries;

  try {
    const [articles, other] = await Promise.all([
      sanityClient.fetch<ArticleRow[]>(articlesQuery),
      sanityClient.fetch<Record<string, DocRow[]>>(otherDocsQuery),
    ]);

    for (const a of articles) {
      const path = `/resources/articles/${a.slug}`;
      const all = buildAlternates(path);
      const versions: ("en" | "zh-hk" | "zh-cn")[] = ["en"];
      const languages: Record<string, string> = { "x-default": all.languages["x-default"], en: all.languages.en };
      if (a.zhTW) { versions.push("zh-hk"); languages["zh-HK"] = all.languages["zh-HK"]; }
      if (a.zhCN) { versions.push("zh-cn"); languages["zh-Hans"] = all.languages["zh-Hans"]; }
      for (const prefix of versions) {
        entries.push({
          url: buildAlternates(path, prefix).canonical,
          ...(a.updatedAt ? { lastModified: new Date(a.updatedAt) } : {}),
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: { languages },
        });
      }
    }

    const routes: Record<string, string> = {
      caseStudies: "/resources/case-studies",
      whitepapers: "/resources/whitepapers",
      press: "/resources/media-coverage",
      events: "/resources/events",
    };
    for (const [key, base] of Object.entries(routes)) {
      for (const d of other[key] ?? []) {
        entries.push({
          url: `${SITE_URL}/en${base}/${d.slug}`,
          ...(d.updatedAt ? { lastModified: new Date(d.updatedAt) } : {}),
          changeFrequency: "monthly",
          priority: 0.5,
        });
      }
    }
  } catch {
    // If Sanity is unreachable, still serve the static part of the sitemap.
  }

  return entries;
}
