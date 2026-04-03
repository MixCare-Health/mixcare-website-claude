// ── GROQ queries for Sanity content ──────────────────────────────────────────
// All queries accept $locale ("en" | "zhTW" | "zhCN").
// coalesce() falls back to English if the locale field is empty.

// All articles — for listing page and generateStaticParams
export const allArticlesQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    "title":       coalesce(title[$locale],       title.en),
    "slug":        slug.current,
    "category":    category,
    "author":      author,
    "publishedAt": publishedAt,
    "readTime":    readTime,
    "description": coalesce(description[$locale], description.en),
  }
`;

// Single article by slug — full content with sections
export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    "title":       coalesce(title[$locale],       title.en),
    "slug":        slug.current,
    "category":    category,
    "author":      author,
    "publishedAt": publishedAt,
    "readTime":    readTime,
    "description": coalesce(description[$locale], description.en),
    "sections": sections[] {
      "heading": coalesce(heading[$locale], heading.en),
      "body":    coalesce(body[$locale],    body.en),
      "bullets": coalesce(bullets[$locale], bullets.en),
    }
  }
`;

// All slugs only — for generateStaticParams (locale-independent)
export const allArticleSlugsQuery = `
  *[_type == "article"] { "slug": slug.current }
`;

// ── TypeScript types ──────────────────────────────────────────────────────────
// The GROQ projection resolves locale fields server-side,
// so these types stay as plain strings regardless of locale.

export type SanityArticleListItem = {
  title: string;
  slug: string;
  category: string;
  author: string;
  publishedAt: string; // "YYYY-MM-DD"
  readTime: string;
  description: string;
};

export type SanityArticleSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type SanityArticle = SanityArticleListItem & {
  sections: SanityArticleSection[];
};
