import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GetADemoForm from "@/components/forms/GetADemoForm";
import type { GetADemoContent } from "@/components/forms/GetADemoForm";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { getDemoPageQuery } from "@/lib/sanity.queries";
import type { SanityGetDemoPage } from "@/lib/sanity.queries";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";

export const revalidate = 60;

export default async function GetADemoPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const sanityLocale = toSanityLocale(locale);

  const sp: SanityGetDemoPage | null = isSanityConfigured
    ? await sanityClient.fetch(getDemoPageQuery, { locale: sanityLocale })
    : null;

  const content: GetADemoContent = {
    hero: {
      badge: sp?.hero?.badge ?? t.getDemo.badge,
      headline: sp?.hero?.headline ?? t.getDemo.headline,
      headlineHighlight: sp?.hero?.headlineHighlight ?? t.getDemo.headlineHighlight,
      sub: sp?.hero?.sub ?? t.getDemo.sub,
    },
    bullets: sp?.bullets ?? t.getDemo.bullets,
    whatHappens: sp?.whatHappens ?? t.getDemo.whatHappens,
    afterSubmit: sp?.afterSubmit ?? t.getDemo.afterSubmit,
    formTitle: sp?.formTitle ?? t.getDemo.formTitle,
    formSub: sp?.formSub ?? t.getDemo.formSub,
    fields: {
      name: sp?.fields?.name ?? t.getDemo.fields.name,
      email: sp?.fields?.email ?? t.getDemo.fields.email,
      company: sp?.fields?.company ?? t.getDemo.fields.company,
      size: sp?.fields?.size ?? t.getDemo.fields.size,
      role: sp?.fields?.role ?? t.getDemo.fields.role,
      message: sp?.fields?.message ?? t.getDemo.fields.message,
      messagePlaceholder: sp?.fields?.messagePlaceholder ?? t.getDemo.fields.messagePlaceholder,
      submit: sp?.fields?.submit ?? t.getDemo.fields.submit,
      submitting: sp?.fields?.submitting ?? t.getDemo.fields.submitting,
      privacy: sp?.fields?.privacy ?? t.getDemo.fields.privacy,
      privacyLink: sp?.fields?.privacyLink ?? t.getDemo.fields.privacyLink,
      noSpam: sp?.fields?.noSpam ?? t.getDemo.fields.noSpam,
    },
    success: {
      title: sp?.success?.title ?? t.getDemo.success.title,
      sub: sp?.success?.sub ?? t.getDemo.success.sub,
      explore: sp?.success?.explore ?? t.getDemo.success.explore,
      platform: sp?.success?.platform ?? t.getDemo.success.platform,
      or: sp?.success?.or ?? t.getDemo.success.or,
      caseStudies: sp?.success?.caseStudies ?? t.getDemo.success.caseStudies,
    },
    sizes: sp?.sizes ?? t.getDemo.sizes,
    roles: sp?.roles ?? t.getDemo.roles,
  };

  return (
    <main>
      <AppNavbar />
      <GetADemoForm content={content} />
      <Footer />
    </main>
  );
}
