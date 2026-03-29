import { en } from "./en";
import { zhTW } from "./zh-TW";
import { zhCN } from "./zh-CN";
import type { Translations } from "./en";
import type { Locale } from "@/lib/locale";

export type { Translations };

export function getTranslations(locale: Locale): Translations {
  if (locale === "zh-TW") return zhTW as Translations;
  if (locale === "zh-CN") return zhCN as Translations;
  return en as Translations;
}
