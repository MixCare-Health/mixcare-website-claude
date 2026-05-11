import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Wifi, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, ogImage } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { localePath } from "@/lib/locale";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import {
  allEventSlugsQuery,
  allEventsQuery,
  eventBySlugQuery,
  type SanityEvent,
  type SanityEventListItem,
} from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import RichTextRenderer from "@/components/shared/RichTextRenderer";

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  if (!isSanityConfigured) return [];
  const results = await sanityClient.fetch<Array<{ slug: string }>>(allEventSlugsQuery);
  return results.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await sanityClient.fetch<SanityEvent | null>(eventBySlugQuery, { slug, locale: "en" });
  if (!event) return {};
  return {
    title: `${event.title} | ${SITE_NAME}`,
    description: event.description,
    alternates: { canonical: `${SITE_URL}/en/resources/events/${slug}` },
    openGraph: {
      title: event.title,
      description: event.description,
      url: `${SITE_URL}/en/resources/events/${slug}`,
      type: "article",
      images: ogImage(event.title),
    },
    twitter: { card: "summary_large_image", title: event.title, description: event.description },
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const TYPE_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  "Conference":       { bg: "#dbeafe", text: "#1d4ed8", accent: "#2563eb" },
  "Webinar":          { bg: "#ccfbf1", text: "#0f766e", accent: "#0d9488" },
  "Workshop":         { bg: "#fff7ed", text: "#c2410c", accent: "#f97316" },
  "Networking":       { bg: "#f3e8ff", text: "#7e22ce", accent: "#9333ea" },
  "Award Ceremony":   { bg: "#fef3c7", text: "#92400e", accent: "#d97706" },
  "Health Screening": { bg: "#dcfce7", text: "#15803d", accent: "#16a34a" },
  "Exhibition":       { bg: "#fce7f3", text: "#be185d", accent: "#ec4899" },
  "Seminar":          { bg: "#e0f2fe", text: "#0369a1", accent: "#0284c7" },
};
function getTypeColor(type: string) {
  return TYPE_COLORS[type] ?? { bg: "#f1f5f9", text: "#475569", accent: "#0d9488" };
}

function formatEventDate(start: string, end?: string): string {
  const s = new Date(start);
  const opts: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  if (!end || end === start) return s.toLocaleDateString("en-US", opts);
  const e = new Date(end);
  return `${s.toLocaleDateString("en-US", { day: "numeric", month: "long" })} – ${e.toLocaleDateString("en-US", opts)}`;
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function EventDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  if (!isSanityConfigured) notFound();

  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);

  const [event, allEvents] = await Promise.all([
    sanityClient.fetch<SanityEvent | null>(eventBySlugQuery, { slug, locale: sanityLocale }),
    sanityClient.fetch<SanityEventListItem[]>(allEventsQuery, { locale: sanityLocale }),
  ]);

  if (!event) notFound();

  // If admin set a registration URL with no content, redirect there.
  if (event.registrationUrl && (!event.sections || event.sections.length === 0)) {
    redirect(event.registrationUrl);
  }

  const col = getTypeColor(event.eventType);
  const related = allEvents.filter((e) => e.slug !== slug).slice(0, 2);

  return (
    <main>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home",      path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Events",    path: "/resources/events" },
          { name: event.title, path: `/resources/events/${slug}` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Event",
          name: event.title,
          description: event.description,
          startDate: event.eventDate,
          endDate: event.eventEndDate ?? event.eventDate,
          eventAttendanceMode: event.isVirtual
            ? "https://schema.org/OnlineEventAttendanceMode"
            : "https://schema.org/OfflineEventAttendanceMode",
          location: event.isVirtual
            ? { "@type": "VirtualLocation", url: event.registrationUrl ?? "" }
            : { "@type": "Place", name: event.location ?? "TBC" },
          organizer: { "@type": "Organization", name: event.organizer ?? SITE_NAME, url: SITE_URL },
        },
      ]} />
      <AppNavbar />

      {/* Header */}
      <div
        className="pt-24 pb-16 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${col.accent} 0%, #1e3a5f 100%)` }}
      >
        {event.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(event.coverImage).width(1400).height(500).fit("crop").url()}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href={localePath(locale, "/resources/events")}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Events
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              {event.eventType}
            </span>
            {event.isVirtual && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-white/20">
                <Wifi size={11} /> Online
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <Calendar size={14} aria-hidden="true" />
              {formatEventDate(event.eventDate, event.eventEndDate)}
            </span>
            {event.location && (
              <span className="flex items-center gap-2">
                <MapPin size={14} aria-hidden="true" /> {event.location}
              </span>
            )}
            {event.organizer && (
              <span className="flex items-center gap-2">
                <Clock size={14} aria-hidden="true" /> {event.organizer}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body + sidebar */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Main content */}
            <article className="lg:col-span-2">
              {/* Description lead */}
              {event.description && (
                <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium border-l-4 pl-5"
                  style={{ borderColor: col.accent }}>
                  {event.description}
                </p>
              )}

              {/* Rich text sections */}
              {event.sections && event.sections.length > 0 && (
                <div className="space-y-8">
                  {event.sections.map((section, i) => (
                    <section key={i}>
                      {section.heading && (
                        <h2 className="text-xl font-extrabold text-slate-900 mb-3">{section.heading}</h2>
                      )}
                      {section.body && Array.isArray(section.body) ? (
                        <RichTextRenderer value={section.body} />
                      ) : section.body ? (
                        <p className="text-slate-600 leading-relaxed mb-3">{String(section.body)}</p>
                      ) : null}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="space-y-2 mt-3" role="list">
                          {section.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-3 text-sm text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: col.accent }} aria-hidden="true" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA card */}
              <div
                className="rounded-2xl p-6 text-white"
                style={{ background: `linear-gradient(135deg, ${col.accent} 0%, #1e3a5f 100%)` }}
              >
                <p className="font-extrabold text-lg mb-2">Interested in this event?</p>
                <p className="text-sm text-white/80 mb-5">
                  {event.registrationUrl
                    ? "Register now to secure your spot at this event."
                    : "Contact us to find out more or request an invitation."}
                </p>
                {event.registrationUrl ? (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: "#f97316", color: "#fff" }}
                  >
                    Register Now <ArrowRight size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    href={localePath(locale, "/contact-us")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: "#f97316", color: "#fff" }}
                  >
                    Contact Us <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </div>

              {/* Event details card */}
              <div className="rounded-2xl border border-slate-100 p-6">
                <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                  <Calendar size={15} style={{ color: col.accent }} aria-hidden="true" />
                  Event Details
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Date</dt>
                    <dd className="text-slate-700 font-medium">{formatEventDate(event.eventDate, event.eventEndDate)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Type</dt>
                    <dd>
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold"
                        style={{ backgroundColor: col.bg, color: col.text }}
                      >
                        {event.eventType}
                      </span>
                    </dd>
                  </div>
                  {event.location && (
                    <div>
                      <dt className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Location</dt>
                      <dd className="text-slate-700">{event.location}</dd>
                    </div>
                  )}
                  {event.organizer && (
                    <div>
                      <dt className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Organiser</dt>
                      <dd className="text-slate-700">{event.organizer}</dd>
                    </div>
                  )}
                  {event.isVirtual && (
                    <div>
                      <dt className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Format</dt>
                      <dd className="text-slate-700 flex items-center gap-1"><Wifi size={12} /> Online / Virtual</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Related events */}
              {related.length > 0 && (
                <div className="rounded-2xl border border-slate-100 p-6">
                  <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                    <Calendar size={15} style={{ color: "#0d9488" }} aria-hidden="true" />
                    More Events
                  </h3>
                  <div className="space-y-4">
                    {related.map((r) => {
                      const rc = getTypeColor(r.eventType);
                      return (
                        <Link
                          key={r.slug}
                          href={localePath(locale, `/resources/events/${r.slug}`)}
                          className="group block"
                        >
                          <span
                            className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-1"
                            style={{ backgroundColor: rc.bg, color: rc.text }}
                          >
                            {r.eventType}
                          </span>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition-colors leading-snug line-clamp-2">
                            {r.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">{r.eventDate}</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Back link */}
              <Link
                href={localePath(locale, "/resources/events")}
                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-700 transition-colors"
              >
                <ArrowLeft size={14} aria-hidden="true" /> All Events
              </Link>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
