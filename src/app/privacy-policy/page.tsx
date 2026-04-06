import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyViewer from "@/components/legal/PrivacyViewer";
import { buildAlternates, SITE_NAME } from "@/lib/seo";
import { getLocale } from "@/lib/locale.server";
import type { Metadata } from "next";

const { canonical, languages } = buildAlternates("/privacy-policy");

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: "MixCare Health Privacy Policy for Hong Kong, Macau, and Singapore.",
  alternates: { canonical, languages },
};

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const title =
    locale === "zh-TW" ? "私隱政策"
    : locale === "zh-CN" ? "隐私政策"
    : "Privacy Policy";

  return (
    <main>
      <AppNavbar />
      <section
        className="pt-28 pb-10"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 text-left">
          <h1 className="text-4xl font-extrabold text-slate-900">{title}</h1>
        </div>
      </section>
      <PrivacyViewer />
      <Footer />
    </main>
  );
}
