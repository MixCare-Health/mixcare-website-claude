"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Wifi, ArrowRight, ExternalLink } from "lucide-react";
import type { SanityEventListItem } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import { localePath } from "@/lib/locale";

// ── Constants ─────────────────────────────────────────────────────────────────
const ALL = "All";
const PER_PAGE = 12;

// ── Helpers ───────────────────────────────────────────────────────────────────
const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  "Conference":      { bg: "#dbeafe", text: "#1d4ed8" },
  "Webinar":         { bg: "#ccfbf1", text: "#0f766e" },
  "Workshop":        { bg: "#fff7ed", text: "#c2410c" },
  "Networking":      { bg: "#f3e8ff", text: "#7e22ce" },
  "Award Ceremony":  { bg: "#fef3c7", text: "#92400e" },
  "Health Screening":{ bg: "#dcfce7", text: "#15803d" },
  "Exhibition":      { bg: "#fce7f3", text: "#be185d" },
  "Seminar":         { bg: "#e0f2fe", text: "#0369a1" },
};
function getTypeColor(type: string) {
  return TYPE_COLORS[type] ?? { bg: "#f1f5f9", text: "#475569" };
}

const TYPE_ICONS: Record<string, string> = {
  [ALL]:             "⚡",
  "Conference":      "🎤",
  "Webinar":         "💻",
  "Workshop":        "🛠️",
  "Networking":      "🤝",
  "Award Ceremony":  "🏆",
  "Health Screening":"🩺",
  "Exhibition":      "🏛️",
  "Seminar":         "📚",
};

function formatEventDate(start: string, end?: string): string {
  const s = new Date(start);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  if (!end || end === start) return s.toLocaleDateString("en-US", opts);
  const e = new Date(end);
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()}–${e.toLocaleDateString("en-US", opts)}`;
  }
  return `${s.toLocaleDateString("en-US", { day: "numeric", month: "short" })} – ${e.toLocaleDateString("en-US", opts)}`;
}

function isUpcoming(dateStr: string): boolean {
  return new Date(dateStr) >= new Date(new Date().toDateString());
}

function buildPageNumbers(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (page > 3) pages.push("…");
  for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) pages.push(p);
  if (page < totalPages - 2) pages.push("…");
  pages.push(totalPages);
  return pages;
}

// ── Card ─────────────────────────────────────────────────────────────────────
function EventCard({
  item,
  locale,
  readMore,
  register,
}: {
  item: SanityEventListItem;
  locale: string;
  readMore: string;
  register: string;
}) {
  const col = getTypeColor(item.eventType);
  const hasExternal = !!item.registrationUrl;
  const href = hasExternal
    ? item.registrationUrl!
    : localePath(locale as "en" | "zh-TW" | "zh-CN", `/resources/events/${item.slug}`);
  const upcoming = isUpcoming(item.eventDate);

  return (
    <a
      href={href}
      target={hasExternal ? "_blank" : undefined}
      rel={hasExternal ? "noopener noreferrer" : undefined}
      className="group block bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-0.5 overflow-hidden flex flex-col"
    >
      {/* Cover image */}
      {item.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(item.coverImage).width(480).height(240).fit("crop").url()}
          alt={item.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div
          className="w-full h-40 flex items-center justify-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "18px 18px" }}
          />
          <Calendar size={36} className="text-white/40 relative z-10" />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Type badge + upcoming pill */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: col.bg, color: col.text }}
          >
            {item.eventType}
          </span>
          {upcoming && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              Upcoming
            </span>
          )}
          {item.isVirtual && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 flex items-center gap-1">
              <Wifi size={9} /> Online
            </span>
          )}
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Calendar size={12} className="text-teal-500 flex-shrink-0" />
          {formatEventDate(item.eventDate, item.eventEndDate)}
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug text-sm flex-1">
          {item.title}
        </h3>

        {/* Location / organiser */}
        {(item.location || item.organizer) && (
          <div className="flex items-start gap-1.5 text-xs text-slate-400">
            <MapPin size={11} className="flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">{[item.location, item.organizer].filter(Boolean).join("  ·  ")}</span>
          </div>
        )}

        {/* Description */}
        {item.description && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.description}</p>
        )}

        {/* CTA */}
        <div className="mt-auto pt-2 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#0d9488" }}>
          {hasExternal ? (
            <>{register} <ExternalLink size={12} /></>
          ) : (
            <>{readMore} <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" /></>
          )}
        </div>
      </div>
    </a>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface Props {
  events: SanityEventListItem[];
  locale: string;
  readMore: string;
  register: string;
  noEvents: string;
}

export default function EventsBrowser({ events, locale, readMore, register, noEvents }: Props) {
  const [activeType, setActiveType] = useState(ALL);
  const [page, setPage] = useState(1);

  const types = useMemo(() => {
    const ts = Array.from(new Set(events.map((e) => e.eventType))).filter(Boolean);
    return [ALL, ...ts];
  }, [events]);

  const filtered = useMemo(() => {
    if (activeType === ALL) return events;
    return events.filter((e) => e.eventType === activeType);
  }, [events, activeType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function switchType(t: string) {
    setActiveType(t);
    setPage(1);
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-24 text-slate-400">
        <Calendar size={40} className="mx-auto mb-4 opacity-30" />
        <p className="font-semibold">{noEvents}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Type filter tabs */}
      {types.length > 2 && (
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {types.map((t) => {
            const active = t === activeType;
            return (
              <button
                key={t}
                onClick={() => switchType(t)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  active
                    ? "bg-slate-900 text-white shadow-md scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className="text-base leading-none">{TYPE_ICONS[t] ?? "•"}</span>
                {t === ALL ? "All" : t}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((item) => (
          <EventCard key={item.slug} item={item} locale={locale} readMore={readMore} register={register} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-teal-400 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <ChevronLeft size={16} />
          </button>
          {buildPageNumbers(page, totalPages).map((p, i) =>
            p === "…" ? (
              <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-slate-400">…</span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p as number)}
                className={`w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${
                  p === page
                    ? "bg-teal-600 text-white shadow-md scale-110"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-teal-400 hover:text-teal-600"
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-teal-400 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
