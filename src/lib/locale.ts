export type Locale = "en" | "zh-TW" | "zh-CN";
export const LOCALES: Locale[] = ["en", "zh-TW", "zh-CN"];
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  "zh-TW": "繁",
  "zh-CN": "简",
};

// URL prefix ↔ locale mapping
export const URL_LOCALE: Record<string, Locale> = {
  en: "en",
  "zh-hk": "zh-TW",
  "zh-cn": "zh-CN",
};

export const LOCALE_URL: Record<Locale, string> = {
  en: "en",
  "zh-TW": "zh-hk",
  "zh-CN": "zh-cn",
};

export const LOCALE_URL_PREFIXES = Object.keys(URL_LOCALE); // ["en","zh-hk","zh-cn"]

/** Prefix a path with the locale URL prefix, e.g. "/platform/x" → "/zh-hk/platform/x" */
export function localePath(locale: Locale, path: string): string {
  const prefix = LOCALE_URL[locale];
  if (path === "/") return `/${prefix}`;
  return `/${prefix}${path}`;
}

/** Strip any locale prefix from a pathname and return { locale, basePath } */
export function parseLocalePath(pathname: string): { locale: Locale | null; basePath: string } {
  for (const prefix of LOCALE_URL_PREFIXES) {
    if (pathname === `/${prefix}`) {
      return { locale: URL_LOCALE[prefix], basePath: "/" };
    }
    if (pathname.startsWith(`/${prefix}/`)) {
      return { locale: URL_LOCALE[prefix], basePath: pathname.slice(prefix.length + 1) };
    }
  }
  return { locale: null, basePath: pathname };
}
