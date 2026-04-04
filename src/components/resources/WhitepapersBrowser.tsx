"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Download, FileText } from "lucide-react";
import type { SanityWhitepaperListItem } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import { localePath } from "@/lib/locale";

// ── Constants ─────────────────────────────────────────────────────────────────
const ALL = "All";
const RECENTLY_PER_PAGE = 6;

// ── Helpers ───────────────────────────────────────────────────────────────────
const FORMAT_ICONS: Record<string, string> = {
  [ALL]:   "⚡",
  "PDF":   "📄",
  "Guide": "📘",
  "Report":"📊",
};
function fmtIcon(fmt: string): string {
  return FORMAT_ICONS[fmt] ?? "📄";
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

// Teal fallback gradient when whitepaper has no gradient set
const FALLBACK_GRADIENT = "from-teal-600 to-blue-900";

// ── Featured card ─────────────────────────────────────────────────────────────
function FeaturedCard({
  item,
  index,
  locale,
  downloadBtn,
  readPreview,
}: {
  item: SanityWhitepaperListItem;
  index: number;
  locale: string;
  downloadBtn: string;
  readPreview: string;
}) {
  const accentColor = item.accentColor || "#0d9488";
  const gradient = item.gradient || FALLBACK_GRADIENT;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Cover */}
      <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between`}>
        {item.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(item.coverImage).width(640).height(416).fit("crop").url()}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="relative flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <FileText size={20} className="text-white" aria-hidden="true" />
          </div>
          {index === 1 && (
            <div className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white shadow-sm">
              ✦ Featured
            </div>
          )}
        </div>
        <div className="relative flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">{item.pages}</span>
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">{item.format}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <div
          className="text-[11px] font-bold uppercase tracking-widest mb-2 px-2.5 py-1 rounded-full self-start"
          style={{ backgroundColor: accentColor + "15", color: accentColor }}
        >
          {item.format}
        </div>
        <h2 className="text-[17px] font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-teal-700 transition-colors line-clamp-2 flex-1">
          {item.title}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">{item.description}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow hover:shadow-md transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: accentColor }}
          >
            <Download size={14} aria-hidden="true" />
            {downloadBtn}
          </a>
          <Link
            href={localePath(locale as "en" | "zh-TW" | "zh-CN", `/resources/whitepapers/${item.slug}`)}
            className="text-sm font-semibold text-slate-500 hover:text-teal-700 transition-colors"
          >
            {readPreview} →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Small card ────────────────────────────────────────────────────────────────
function SmallCard({
  item,
  locale,
  downloadBtn,
  readPreview,
}: {
  item: SanityWhitepaperListItem;
  locale: string;
  downloadBtn: string;
  readPreview: string;
}) {
  const accentColor = item.accentColor || "#0d9488";
  const gradient = item.gradient || FALLBACK_GRADIENT;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Cover */}
      <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${gradient} p-5 flex flex-col justify-between`}>
        {item.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(item.coverImage).width(480).height(320).fit("crop").url()}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="relative w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
          <FileText size={16} className="text-white" aria-hidden="true" />
        </div>
        <div className="relative flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">{item.pages}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div
          className="text-[10px] font-bold uppercase tracking-widest mb-1.5 px-2 py-0.5 rounded-full self-start"
          style={{ backgroundColor: accentColor + "15", color: accentColor }}
        >
          {item.format}
        </div>
        <h3 className="font-bold text-slate-900 mb-2 leading-snug group-hover:text-teal-700 transition-colors line-clamp-2 text-sm flex-1">
          {item.title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-3 py-1.5 rounded-lg shadow hover:shadow-md transition-all"
            style={{ backgroundColor: accentColor }}
          >
            <Download size={12} /> {downloadBtn}
          </a>
          <Link
            href={localePath(locale as "en" | "zh-TW" | "zh-CN", `/resources/whitepapers/${item.slug}`)}
            className="text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors"
          >
            {readPreview} →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface Props {
  whitepapers: SanityWhitepaperListItem[];
  locale: string;
  badge: string;
  headline: string;
  sub: string;
  downloadBtn: string;
  readPreview: string;
}

export default function WhitepapersBrowser({ whitepapers, locale, badge, headline, sub, downloadBtn, readPreview }: Props) {
  const [activeFormat, setActiveFormat] = useState(ALL);
  const [page, setPage] = useState(1);

  const formats = useMemo(() => {
    const fmts = Array.from(new Set(whitepapers.map((w) => w.format))).filter(Boolean);
    return [ALL, ...fmts];
  }, [whitepapers]);

  const filtered = useMemo(() => {
    if (activeFormat === ALL) return whitepapers;
    return whitepapers.filter((w) => w.format === activeFormat);
  }, [whitepapers, activeFormat]);

  const featured = filtered.slice(0, 3);
  const recentAll = filtered.slice(3);
  const totalPages = Math.max(1, Math.ceil(recentAll.length / RECENTLY_PER_PAGE));
  const recent = recentAll.slice((page - 1) * RECENTLY_PER_PAGE, page * RECENTLY_PER_PAGE);

  function switchFormat(fmt: string) {
    setActiveFormat(fmt);
    setPage(1);
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-10 pb-12 text-center" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 mb-5">
            <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
            {badge}
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight leading-tight">
            {headline}
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-xl mx-auto">{sub}</p>
        </div>
      </section>

      {/* ── Format tabs ──────────────────────────────────────────────────── */}
      <div className="sticky top-[112px] z-20 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {formats.map((fmt) => {
              const active = fmt === activeFormat;
              return (
                <button
                  key={fmt}
                  onClick={() => switchFormat(fmt)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    active
                      ? "bg-slate-900 text-white shadow-md scale-105"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base leading-none">{fmtIcon(fmt)}</span>
                  {fmt}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Featured 2-col */}
          {featured.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {featured.map((item, i) => (
                <FeaturedCard key={item.slug} item={item} index={i} locale={locale} downloadBtn={downloadBtn} readPreview={readPreview} />
              ))}
            </div>
          )}

          {/* More guides */}
          {recent.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-7">
                <div className="flex -space-x-1.5">
                  {[
                    { initials: "WP", bg: "#7e22ce", text: "#fff" },
                    { initials: "AI", bg: "#0d9488", text: "#fff" },
                  ].map(({ initials, bg, text }) => (
                    <div
                      key={initials}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-sm"
                      style={{ backgroundColor: bg, color: text }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">More Guides</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recent.map((item) => (
                  <SmallCard key={item.slug} item={item} locale={locale} downloadBtn={downloadBtn} readPreview={readPreview} />
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
              <p className="text-lg font-semibold text-slate-600">No whitepapers in this format yet.</p>
              <button
                onClick={() => switchFormat(ALL)}
                className="mt-4 text-sm font-semibold text-teal-600 hover:text-teal-800 underline underline-offset-2"
              >
                View all whitepapers
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
