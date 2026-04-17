import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/forms/ContactForm";
import type { ContactContent } from "@/components/forms/ContactForm";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { contactPageQuery } from "@/lib/sanity.queries";
import type { SanityContactPage } from "@/lib/sanity.queries";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";

export const revalidate = 60;

const FALLBACK_OFFICES = [
  {
    city: "Hong Kong (Headquarter)",
    cityZh: "香港 (總部)",
    companyEn: "MixUp Solution Company Limited",
    companyZh: "職想科技有限公司",
    address: "23/F, Two International Finance Centre, 8 Finance Street, Central, Hong Kong",
    phone: "+852 3700 8888",
    email: "hk@mixcarehealth.com",
    hours: "Mon–Fri, 9:00am–6:00pm HKT",
  },
  {
    city: "Macau Branch",
    cityZh: "澳門分公司",
    companyEn: "Mixup Solution (Macau) Company Limited",
    companyZh: "職想科技 (澳門) 有限公司",
    address: "23/F, Two International Finance Centre, 8 Finance Street, Central, Hong Kong",
    phone: "+852 3700 8888",
    email: "hk@mixcarehealth.com",
    hours: "Mon–Fri, 9:00am–6:00pm HKT",
  },
  {
    city: "Singapore Branch",
    cityZh: "新加坡分公司",
    companyEn: "MIXCARE HEALTH (SG) PTE. LTD.",
    address: "1 Raffles Place, #20-01, One Raffles Place, Singapore 048616",
    phone: "+65 6800 8888",
    email: "sg@mixcarehealth.com",
    hours: "Mon–Fri, 9:00am–6:00pm SGT",
  },
];

export default async function ContactPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const sanityLocale = toSanityLocale(locale);

  const sp: SanityContactPage | null = isSanityConfigured
    ? await sanityClient.fetch(contactPageQuery, { locale: sanityLocale })
    : null;

  const content: ContactContent = {
    hero: {
      headline: sp?.hero?.headline ?? t.contact.headline,
      headlineHighlight: sp?.hero?.headlineHighlight ?? t.contact.headlineHighlight,
      sub: sp?.hero?.sub ?? t.contact.sub,
    },
    officesTitle: sp?.officesTitle ?? t.contact.officesTitle,
    formTitle: sp?.formTitle ?? t.contact.formTitle,
    formSub: sp?.formSub ?? t.contact.formSub,
    hours: sp?.hours ?? t.contact.hours,
    fields: {
      name: sp?.fields?.name ?? t.contact.fields.name,
      email: sp?.fields?.email ?? t.contact.fields.email,
      company: sp?.fields?.company ?? t.contact.fields.company,
      message: sp?.fields?.message ?? t.contact.fields.message,
      messagePlaceholder: sp?.fields?.messagePlaceholder ?? t.contact.fields.messagePlaceholder,
      submit: sp?.fields?.submit ?? t.contact.fields.submit,
    },
    success: {
      title: sp?.success?.title ?? t.contact.success.title,
      sub: sp?.success?.sub ?? t.contact.success.sub,
    },
    offices: sp?.offices?.length ? sp.offices : FALLBACK_OFFICES,
  };

  return (
    <main>
      <AppNavbar />
      <ContactForm content={content} />
      <Footer />
    </main>
  );
}
