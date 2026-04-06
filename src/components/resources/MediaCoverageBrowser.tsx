"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Newspaper, ArrowRight, ExternalLink } from "lucide-react";
import type { SanityPressItemListItem } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import { localePath } from "@/lib/locale";

// ── Constants ─────────────────────────────────────────────────────────────────
const PER_PAGE = 12;

// ── Helpers ───────────────────────────────────────────────────────────────────
const categoryColors: Record<string, { bg: string; text: string }> = {
  "Press Coverage":  { bg: "#dbeafe", text: "#1d4ed8" },
  "Press Release":   { bg: "#ccfbf1", text: "#0f766e" },
  "Interview":       { bg: "#f3e8ff", text: "#7e22ce" },
  "Award":           { bg: "#fef3c7", text: "#92400e" },
  "Industry Report": { bg: "#dcfce7", text: "#15803d" },
};
function getCategoryColor(cat: string) {
  return categoryColors[cat] ?? { bg: "#f1f5f9", text: "#475569" };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
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
function PressCard({
  item,
  locale,
  readMore,
  viewOriginal,
}: {
  item: SanityPressItemListItem;
  locale: string;
  readMore: string;
  viewOriginal: string;
}) {
  const col = getCategoryColor(item.category);
  const hasContent = !item.externalUrl;
  const href = hasContent
    ? localePath(locale as "en" | "zh-TW" | "zh-CN", `/resources/media-coverage/${item.slug}`)
    : item.externalUrl!;

  return (
    <a
      href={href}
      target={hasContent ? undefined : "_blank"}
      rel={hasContent ? undefined : "noopener noreferrer"}
      className="group block bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-0.5 overflow-hidden flex flex-col"
    >
      {/* Cover image */}
      {item.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(item.coverImage).width(480).height(240).fit("crop").url()}
          alt={item.title ?? item.outlet}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div
          className="w-full h-40 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
        >
          <Newspaper size={32} className="text-white/40" />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Outlet + date */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{item.outlet}</span>
          <span className="text-xs text-slate-400">{formatDate(item.publishedAt)}</span>
        </div>

        {/* Category badge */}
        <span
          className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: col.bg, color: col.text }}
        >
          {item.category}
        </span>

        {/* Title */}
        <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug text-sm">
          {item.title}
        </h3>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{item.description}</p>
        )}

        {/* CTA */}
        <div className="mt-auto pt-2 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#0d9488" }}>
          {hasContent ? (
            <>{readMore} <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" /></>
          ) : (
            <>{viewOriginal} <ExternalLink size={12} /></>
          )}
        </div>
      </div>
    </a>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface Props {
  pressItems: SanityPressItemListItem[];
  locale: string;
  readMore: string;
  viewOriginal: string;
  noMediaCoverage: string;
}

export default function MediaCoverageBrowser({ pressItems, locale, readMore, viewOriginal, noMediaCoverage }: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(pressItems.length / PER_PAGE));
  const visible = pressItems.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  if (pressItems.length === 0) {
    return (
      <div className="text-center py-24 text-slate-400">
        <Newspaper size={40} className="mx-auto mb-4 opacity-30" />
        <p className="font-semibold">{noMediaCoverage}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((item) => (
          <PressCard key={item.slug} item={item} locale={locale} readMore={readMore} viewOriginal={viewOriginal} />
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
              <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-slate-400">
                …
              </span>
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
