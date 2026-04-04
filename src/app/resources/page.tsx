import { redirect } from "next/navigation";
import { getLocale } from "@/lib/locale.server";
import { localePath } from "@/lib/locale";

// /resources → /resources/articles (default section)
export default async function ResourcesPage() {
  const locale = await getLocale();
  redirect(localePath(locale, "/resources/articles"));
}
