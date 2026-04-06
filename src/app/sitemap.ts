import type { MetadataRoute } from "next";
import { SITE_URL, LOCALE_PREFIXES } from "@/lib/seo";

/** All canonical page paths (without locale prefix) */
const PAGES = [
  "/",
  "/about-us",
  "/careers",
  "/contact-us",
  "/get-a-demo",
  "/partners",
  "/start-now",
  "/trust",
  "/privacy-policy",
  "/resources",
  "/terms-and-conditions",
  "/cookies-policy",
  "/platform/self-funded-outpatient",
  "/platform/flexible-spending-account",
  "/platform/wellness-marketplace",
  "/platform/wellness-event",
  "/platform/flexible-benefits",
  "/platform/wellness-hub",
  "/who-we-serve/insurers",
  "/who-we-serve/brokers",
  "/who-we-serve/enterprises",
  "/who-we-serve/small-business",
  "/who-we-serve/providers",
];

/** Page priority config */
const PRIORITY: Record<string, number> = {
  "/": 1.0,
  "/get-a-demo": 0.9,
  "/start-now": 0.9,
  "/platform/self-funded-outpatient": 0.8,
  "/platform/flexible-spending-account": 0.8,
  "/platform/wellness-marketplace": 0.8,
  "/platform/wellness-event": 0.8,
  "/platform/flexible-benefits": 0.8,
  "/platform/wellness-hub": 0.8,
  "/who-we-serve/insurers": 0.8,
  "/who-we-serve/brokers": 0.8,
  "/who-we-serve/enterprises": 0.8,
  "/who-we-serve/small-business": 0.8,
  "/who-we-serve/providers": 0.8,
  "/about-us": 0.7,
  "/careers": 0.7,
  "/trust": 0.7,
  "/partners": 0.7,
  "/resources": 0.7,
  "/contact-us": 0.6,
};

const CHANGE_FREQ: Record<string, MetadataRoute.Sitemap[0]["changeFrequency"]> = {
  "/": "weekly",
  "/get-a-demo": "monthly",
  "/start-now": "monthly",
  "/resources": "weekly",
  default: "monthly",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const path of PAGES) {
    const cleanPath = path === "/" ? "" : path;
    for (const locale of LOCALE_PREFIXES) {
      entries.push({
        url: `${SITE_URL}/${locale}${cleanPath}`,
        lastModified: now,
        changeFrequency: CHANGE_FREQ[path] ?? CHANGE_FREQ.default,
        priority: PRIORITY[path] ?? 0.7,
      });
    }
  }

  return entries;
}
