/**
 * Centralised SEO configuration for MixCare Health website.
 * Provides helpers for building consistent metadata across all pages.
 */

export const SITE_URL = "https://m.mixcarehealth.com";
export const SITE_NAME = "MixCare Health";
export const DEFAULT_OG_IMAGE = "https://cdn.sanity.io/images/usfkxchk/production/237287d7fb7d054118a13d5cf228b828bb9b25d7-1424x752.jpg";
export const TWITTER_HANDLE = "@mixcarehealth";

/** Locale → hreflang value mapping */
export const HREFLANG: Record<string, string> = {
  en: "en",
  "zh-hk": "zh-HK",
  "zh-cn": "zh-Hans",
};

/** URL locale prefixes in use (mirrors locale.ts) */
export const LOCALE_PREFIXES = ["en", "zh-hk", "zh-cn"] as const;

/**
 * Build the canonical URL and hreflang alternates for a given page path.
 * The canonical is self-referencing for the requested language version
 * (Chinese pages must not canonicalise to English, or Google drops them).
 * @param path    Page path without locale prefix, e.g. "/platform/fsa"
 * @param prefix  URL locale prefix of the page being rendered ("en" | "zh-hk" | "zh-cn")
 */
export function buildAlternates(path: string, prefix: (typeof LOCALE_PREFIXES)[number] = "en") {
  const cleanPath = path === "/" ? "" : path;
  const canonical = `${SITE_URL}/${prefix}${cleanPath}`;

  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}/en${cleanPath}`,
    en: `${SITE_URL}/en${cleanPath}`,
    "zh-HK": `${SITE_URL}/zh-hk${cleanPath}`,
    "zh-Hans": `${SITE_URL}/zh-cn${cleanPath}`,
  };

  return { canonical, languages };
}

/**
 * Build a full OpenGraph image object.
 * Falls back to the default OG image if none is supplied.
 */
export function ogImage(alt: string, src = DEFAULT_OG_IMAGE) {
  return [
    {
      url: src,
      width: 1200,
      height: 630,
      alt,
    },
  ];
}
