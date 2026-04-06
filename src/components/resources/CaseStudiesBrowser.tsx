"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import type { SanityCaseStudyListItem } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import { localePath } from "@/lib/locale";
import { getTranslations } from "@/translations";

// ── Constants ─────────────────────────────────────────────────────────────────
const ALL = "All";
const RECENTLY_PER_PAGE = 12;

// ── Helpers ───────────────────────────────────────────────────────────────────
const SEGMENT_ICONS: Record<string, string> = {
  [ALL]:        "⚡",
  "Insurer":    "🛡️",
  "保險公司":   "🛡️",
  "保险公司":   "🛡️",
  "Enterprise": "🏢",
  "大型企業":   "🏢",
  "大型企业":   "🏢",
  "SMB":        "🏪",
  "中小企":     "🏪",
};

function segIcon(seg: string): string {
  return SEGMENT_ICONS[seg] ?? (SEGMENT_ICONS[Object.keys(SEGMENT_ICONS).find(k => seg.startsWith(k)) ?? ""] ?? "•");
}

// Build page numbers with ellipsis
function buildPageNumbers(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (page > 3) pages.push("…");
  for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) pages.push(p);
  if (page < totalPages - 2) pages.push("…");
  pages.push(totalPages);
  return pages;
}

// ── Small card ────────────────────────────────────────────────────────────────
function SmallCard({
  item,
  locale,
  readMore,
}: {
  item: SanityCaseStudyListItem;
  locale: string;
  readMore: string;
}) {
  return (
    <Link
      href={localePath(locale as "en" | "zh-TW" | "zh-CN", `/resources/case-studies/${item.slug}`)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Cover image / gradient */}
      <div className="relative h-40 overflow-hidden">
        {item.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(item.featuredImage).width(480).height(320).fit("crop").url()}
            alt={item.headline}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: item.color ? `linear-gradient(135deg, ${item.color} 0%, ${item.color}88 100%)` : "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "18px 18px" }}
            />
          </div>
        )}
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm bg-white/90"
          style={{ color: item.color || "#0d9488" }}
        >
          {item.segment}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{item.company}</p>
        <h3 className="font-bold text-slate-900 mb-2 leading-snug group-hover:text-teal-700 transition-colors line-clamp-2 text-sm flex-1">
          {item.headline}
        </h3>
        <div
          className="rounded-lg px-3 py-2 flex items-start gap-1.5"
          style={{ backgroundColor: (item.color || "#0d9488") + "10", borderLeft: `2px solid ${item.color || "#0d9488"}` }}
        >
          <TrendingUp size={11} className="flex-shrink-0 mt-0.5" style={{ color: item.color || "#0d9488" }} />
          <p className="text-[11px] font-semibold leading-snug line-clamp-2" style={{ color: item.color || "#0d9488" }}>{item.result}</p>
        </div>
        <p className="mt-3 text-xs font-semibold" style={{ color: "#0d9488" }}>{readMore} →</p>
      </div>
    </Link>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface Props {
  caseStudies: SanityCaseStudyListItem[];
  locale: string;
  badge: string;
  headline: string;
  sub: string;
  readMore: string;
}

export default function CaseStudiesBrowser({ caseStudies, locale, badge, headline, sub, readMore }: Props) {
  const ui = getTranslations(locale as "en" | "zh-TW" | "zh-CN").resources.ui;

  const [activeSegment, setActiveSegment] = useState(ALL);
  const [page, setPage] = useState(1);

  const segments = useMemo(() => {
    const segs = Array.from(new Set(caseStudies.map((c) => c.segment))).filter(Boolean);
    return [ALL, ...segs];
  }, [caseStudies]);

  const filtered = useMemo(() => {
    if (activeSegment === ALL) return caseStudies;
    return caseStudies.filter((c) => c.segment === activeSegment);
  }, [caseStudies, activeSegment]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / RECENTLY_PER_PAGE));
  const recent = filtered.slice((page - 1) * RECENTLY_PER_PAGE, page * RECENTLY_PER_PAGE);

  function switchSegment(seg: string) {
    setActiveSegment(seg);
    setPage(1);
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-16 pb-12 text-center" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 mb-5">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            {badge}
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight leading-tight">
            {headline}
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-xl mx-auto">{sub}</p>
        </div>
      </section>

      {/* ── Segment tabs ─────────────────────────────────────────────────── */}
      <div className="sticky top-[112px] z-20 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {segments.map((seg) => {
              const active = seg === activeSegment;
              return (
                <button
                  key={seg}
                  onClick={() => switchSegment(seg)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    active
                      ? "bg-slate-900 text-white shadow-md scale-105"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base leading-none">{segIcon(seg)}</span>
                  {seg === ALL ? ui.all : seg}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* All case studies */}
          {recent.length > 0 && (
            <div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recent.map((item) => (
                  <SmallCard key={item.slug} item={item} locale={locale} readMore={readMore} />
                ))}
              </div>

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
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-semibold text-slate-600">{ui.noCaseStudies}</p>
              <button
                onClick={() => switchSegment(ALL)}
                className="mt-4 text-sm font-semibold text-teal-600 hover:text-teal-800 underline underline-offset-2"
              >
                {ui.viewAll}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
