import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TcViewer from "@/components/legal/TcViewer";
import { buildAlternates, SITE_NAME } from "@/lib/seo";
import { getLocale } from "@/lib/locale.server";
import type { Metadata } from "next";

const { canonical, languages } = buildAlternates("/terms-and-conditions");

export const metadata: Metadata = {
  title: `Terms & Conditions | ${SITE_NAME}`,
  description:
    "Terms and Conditions for MixCare Health services in Hong Kong, Macau, and Singapore.",
  alternates: { canonical, languages },
};

export default async function TermsAndConditionsPage() {
  const locale = await getLocale();
  const title =
    locale === "zh-TW" ? "條款及細則"
    : locale === "zh-CN" ? "条款及细则"
    : "Terms & Conditions";

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
      <TcViewer />
      <Footer />
    </main>
  );
}
