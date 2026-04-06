"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SanityArticleListItem } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import { localePath } from "@/lib/locale";
import { getTranslations } from "@/translations";

// ── Constants ─────────────────────────────────────────────────────────────────
const ALL = "All";
const RECENTLY_PER_PAGE = 6;

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function getInitials(name: string | null | undefined): string {
  if (!name) return "MC";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_COLORS = [
  { bg: "#dbeafe", text: "#1d4ed8" },
  { bg: "#ccfbf1", text: "#0f766e" },
  { bg: "#fff7ed", text: "#c2410c" },
  { bg: "#dcfce7", text: "#15803d" },
  { bg: "#f3e8ff", text: "#7e22ce" },
  { bg: "#fce7f3", text: "#be185d" },
  { bg: "#e0f2fe", text: "#0369a1" },
];

function avatarColor(name: string | null | undefined) {
  if (!name) return AVATAR_COLORS[0];
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[h];
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "AI & Claims":       { bg: "#ccfbf1", text: "#0f766e" },
  "Employee Benefits": { bg: "#dbeafe", text: "#1d4ed8" },
  "SMB Guide":         { bg: "#fff7ed", text: "#c2410c" },
  "Wellness":          { bg: "#dcfce7", text: "#15803d" },
  "Compliance":        { bg: "#f3e8ff", text: "#7e22ce" },
  "Insurers":          { bg: "#e0f2fe", text: "#0369a1" },
};
function catColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? { bg: "#f1f5f9", text: "#475569" };
}

const CATEGORY_ICONS: Record<string, string> = {
  [ALL]:               "⚡",
  "AI & Claims":       "🤖",
  "Employee Benefits": "💼",
  "SMB Guide":         "🏢",
  "Wellness":          "🌿",
  "Compliance":        "🛡️",
  "Insurers":          "📋",
};

// ── Small card ────────────────────────────────────────────────────────────────
function SmallCard({ post, locale, categoryLabel }: { post: SanityArticleListItem; locale: string; categoryLabel: string }) {
  const col = catColor(post.category);
  const av = avatarColor(post.author);

  return (
    <Link
      href={localePath(locale as "en" | "zh-TW" | "zh-CN", `/resources/articles/${post.slug}`)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Cover image */}
      <div className="relative h-40 overflow-hidden">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(post.coverImage).width(480).height(320).fit("crop").url()}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
          </div>
        )}
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm"
          style={{ backgroundColor: col.bg, color: col.text }}
        >
          {categoryLabel}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-slate-900 mb-1.5 leading-snug group-hover:text-teal-700 transition-colors line-clamp-2 text-sm">
          {post.title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3 flex-1">
          {post.description}
        </p>
        <div className="flex items-center justify-between">
          {/* Author */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 shadow-sm"
              style={{ backgroundColor: av.bg, color: av.text }}
            >
              {getInitials(post.author)}
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-800 leading-none">{post.author ?? "MixCare Health"}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">MixCare Health</p>
            </div>
          </div>
          {/* Date */}
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
            <time>{formatDate(post.publishedAt)}</time>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface Props {
  articles: SanityArticleListItem[];
  locale: string;
  badge: string;
  headline: string;
  sub: string;
}

export default function ArticlesBrowser({ articles, locale, badge, headline, sub }: Props) {
  const r = getTranslations(locale as "en" | "zh-TW" | "zh-CN").resources;
  const ui = r.ui;
  const catLabels = r.categoryLabels;

  const [activeCategory, setActiveCategory] = useState(ALL);
  const [page, setPage] = useState(1);

  // Derive unique category list from data
  const categories = useMemo(() => {
    const cats = Array.from(new Set(articles.map((a) => a.category))).filter(Boolean);
    return [ALL, ...cats];
  }, [articles]);

  // Filter
  const filtered = useMemo(() => {
    if (activeCategory === ALL) return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [articles, activeCategory]);

  // All articles paginated
  const totalPages = Math.max(1, Math.ceil(filtered.length / RECENTLY_PER_PAGE));
  const recent = filtered.slice((page - 1) * RECENTLY_PER_PAGE, page * RECENTLY_PER_PAGE);

  function switchCategory(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  // Build visible page numbers (show max 5 around current page)
  function buildPageNumbers() {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [];
    pages.push(1);
    if (page > 3) pages.push("…");
    for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) {
      pages.push(p);
    }
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-10 pb-12 text-center" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 mb-5">
            <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
            {badge}
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight leading-tight">
            {headline}
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-xl mx-auto">{sub}</p>
        </div>
      </section>

      {/* ── Category tabs ────────────────────────────────────────────────── */}
      {/* top-[112px] = 64px navbar + 48px ResourcesTabs */}
      <div className="sticky top-[112px] z-20 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => switchCategory(cat)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    active
                      ? "bg-slate-900 text-white shadow-md scale-105"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base leading-none">{CATEGORY_ICONS[cat] ?? "•"}</span>
                  {cat === ALL ? ui.all : (catLabels[cat as keyof typeof catLabels] ?? cat)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Article content ─────────────────────────────────────────────── */}
      <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* All articles grid */}
          {recent.length > 0 && (
            <div>
              {/* 3-col grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recent.map((post) => (
                  <SmallCard key={post.slug} post={post} locale={locale}
                    categoryLabel={catLabels[post.category as keyof typeof catLabels] ?? post.category}
                  />
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
                  {buildPageNumbers().map((p, i) =>
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
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-semibold text-slate-600">{ui.noArticles}</p>
              <button
                onClick={() => switchCategory(ALL)}
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
