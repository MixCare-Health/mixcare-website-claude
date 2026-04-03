import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityClient = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

/** Returns true when Sanity env vars are configured */
export const isSanityConfigured = Boolean(projectId);

/** Maps Next.js locale keys to Sanity document field keys */
export function toSanityLocale(locale: string): "en" | "zhTW" | "zhCN" {
  const map: Record<string, "en" | "zhTW" | "zhCN"> = {
    en:     "en",
    "zh-TW": "zhTW",
    "zh-CN": "zhCN",
  };
  return map[locale] ?? "en";
}
