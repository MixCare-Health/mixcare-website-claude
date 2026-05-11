import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { allEventsQuery, type SanityEventListItem } from "@/lib/sanity.queries";
import ResourcesTabs from "@/components/resources/ResourcesTabs";
import EventsBrowser from "@/components/resources/EventsBrowser";
import { Calendar } from "lucide-react";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/resources/events");

export const metadata: Metadata = {
  title: `Events | ${SITE_NAME}`,
  description:
    "MixCare Health events — conferences, webinars, workshops, and networking events across Hong Kong, Macau, and Singapore.",
  keywords: [
    "MixCare events", "health tech events Hong Kong", "corporate wellness events",
    "digital health conference", "employee benefits webinar", "health insurance networking",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Events | ${SITE_NAME}`,
    description: "MixCare Health events — conferences, webinars, and industry networking.",
    url: canonical,
    images: ogImage("MixCare Events"),
  },
};

export default async function EventsPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const ui = t.resources.ui;

  const events: SanityEventListItem[] = isSanityConfigured
    ? await sanityClient.fetch<SanityEventListItem[]>(allEventsQuery, {
        locale: toSanityLocale(locale),
      })
    : [];

  return (
    <main>
      <JsonLd
        data={[
          webPageSchema(
            "Events",
            "MixCare Health events — conferences, webinars, workshops, and networking.",
            "/resources/events"
          ),
          breadcrumbSchema([
            { name: "Home",      path: "/" },
            { name: "Resources", path: "/resources" },
            { name: "Events",    path: "/resources/events" },
          ]),
        ]}
      />
      <AppNavbar />
      <ResourcesTabs active="events" locale={locale} />

      {/* Page header */}
      <div
        className="pt-16 pb-14 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm font-bold mb-4">
            <Calendar size={15} aria-hidden="true" />
            {t.resources.tabs.events}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            {t.resources.tabs.events}
          </h1>
          <p className="text-teal-100 text-lg max-w-xl mx-auto">
            {ui.eventsSub}
          </p>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventsBrowser
            events={events}
            locale={locale}
            readMore={ui.readMore}
            register={ui.register}
            noEvents={ui.noEvents}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
