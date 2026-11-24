import type { Metadata } from "next";
import { getLocale } from "./locale.server";
import { LOCALE_URL } from "./locale";
import { buildAlternates, LOCALE_PREFIXES } from "./seo";

/** Canonical + hreflang for the language version currently being rendered. */
export async function localizedAlternates(path: string) {
  const locale = await getLocale();
  const prefix = LOCALE_URL[locale] as (typeof LOCALE_PREFIXES)[number];
  return buildAlternates(path, prefix);
}

/** Apply the localized canonical/hreflang (and og:url) to a static metadata object. */
export async function withLocalizedAlternates(base: Metadata, path: string): Promise<Metadata> {
  const { canonical, languages } = await localizedAlternates(path);
  return {
    ...base,
    alternates: { canonical, languages },
    ...(base.openGraph ? { openGraph: { ...base.openGraph, url: canonical } } : {}),
  };
}
