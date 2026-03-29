import { cookies } from "next/headers";
import type { Locale } from "./locale";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const loc = cookieStore.get("locale")?.value;
  if (loc === "zh-TW" || loc === "zh-CN") return loc;
  return "en";
}
