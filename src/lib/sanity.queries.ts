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

// ── Audience Pages ──────────────────────────────────────────────────────────

export const audiencePageByIdQuery = `
  *[_type == "audiencePage" && pageId == $pageId][0] {
    "pageId": pageId,
    "badge": coalesce(badge[$locale], badge.en),
    "headline": coalesce(headline[$locale], headline.en),
    "headlineHighlight": coalesce(headlineHighlight[$locale], headlineHighlight.en),
    "sub": coalesce(sub[$locale], sub.en),
    "accentColor": accentColor,
    "bgGradient": bgGradient,
    "ctaLabel": coalesce(ctaLabel[$locale], ctaLabel.en),
    "metaTitle": coalesce(metaTitle[$locale], metaTitle.en),
    "metaDescription": coalesce(metaDescription[$locale], metaDescription.en),
    "challenges": challenges[] {
      "icon": icon,
      "title": coalesce(title[$locale], title.en),
      "desc": coalesce(desc[$locale], desc.en),
    },
    "solutions": solutions[] {
      "icon": icon,
      "title": coalesce(title[$locale], title.en),
      "desc": coalesce(desc[$locale], desc.en),
    },
    "featuredSolutions": featuredSolutions[] {
      "label": coalesce(label[$locale], label.en),
      "desc": coalesce(desc[$locale], desc.en),
      "href": href,
    },
    "metrics": metrics[] {
      "value": value,
      "label": coalesce(label[$locale], label.en),
      "sub": coalesce(sub[$locale], sub.en),
    },
    "testimonial": {
      "quote": coalesce(testimonial.quote[$locale], testimonial.quote.en),
      "name": testimonial.name,
      "title": testimonial.title,
      "company": testimonial.company,
    },
    "hideSolutions": hideSolutions,
    "hideTestimonial": hideTestimonial,
    "hideMetrics": hideMetrics,
  }
`;

export type SanityAudiencePage = {
  pageId: string;
  badge: string;
  headline: string;
  headlineHighlight: string;
  sub: string;
  accentColor: string;
  bgGradient: string;
  ctaLabel: string;
  metaTitle: string;
  metaDescription: string;
  challenges: Array<{ icon: string; title: string; desc: string }>;
  solutions: Array<{ icon: string; title: string; desc: string }>;
  featuredSolutions: Array<{ label: string; desc: string; href: string }>;
  metrics: Array<{ value: string; label: string; sub: string }>;
  testimonial: { quote: string; name: string; title: string; company: string };
  hideSolutions: boolean;
  hideTestimonial: boolean;
  hideMetrics: boolean;
};

// ── Case Studies ────────────────────────────────────────────────────────────

export const allCaseStudySlugsQuery = `
  *[_type == "caseStudy"] { "slug": slug.current }
`;

export const allCaseStudiesQuery = `
  *[_type == "caseStudy"] | order(publishedAt desc) {
    "slug": slug.current,
    "company": coalesce(company[$locale], company.en),
    "segment": coalesce(segment[$locale], segment.en),
    "headline": coalesce(headline[$locale], headline.en),
    "result": coalesce(result[$locale], result.en),
    "description": coalesce(description[$locale], description.en),
    "color": color,
    "gradient": gradient,
    "publishedAt": publishedAt,
  }
`;

export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    "slug": slug.current,
    "company": coalesce(company[$locale], company.en),
    "segment": coalesce(segment[$locale], segment.en),
    "headline": coalesce(headline[$locale], headline.en),
    "result": coalesce(result[$locale], result.en),
    "description": coalesce(description[$locale], description.en),
    "color": color,
    "gradient": gradient,
    "challenge": coalesce(challenge[$locale], challenge.en),
    "approach": coalesce(approach[$locale], approach.en),
    "outcomes": outcomes[] {
      "value": value,
      "label": coalesce(label[$locale], label.en),
    },
    "sections": sections[] {
      "heading": coalesce(heading[$locale], heading.en),
      "body": coalesce(body[$locale], body.en),
      "bullets": coalesce(bullets[$locale], bullets.en),
    },
    "publishedAt": publishedAt,
  }
`;

export type SanityCaseStudyListItem = {
  slug: string;
  company: string;
  segment: string;
  headline: string;
  result: string;
  description: string;
  color: string;
  gradient: string;
  publishedAt: string;
};

export type SanityCaseStudy = SanityCaseStudyListItem & {
  challenge: string;
  approach: string;
  outcomes: Array<{ value: string; label: string }>;
  sections: Array<{ heading: string; body: string; bullets?: string[] }>;
};

// ── Whitepapers ──────────────────────────────────────────────────────────────

export const allWhitepaperSlugsQuery = `
  *[_type == "whitepaper"] { "slug": slug.current }
`;

export const allWhitepapersQuery = `
  *[_type == "whitepaper"] | order(publishedAt desc) {
    "slug": slug.current,
    "title": coalesce(title[$locale], title.en),
    "description": coalesce(description[$locale], description.en),
    "pages": pages,
    "format": format,
    "audience": coalesce(audience[$locale], audience.en),
    "gradient": gradient,
    "accentColor": accentColor,
    "publishedAt": publishedAt,
  }
`;

export const whitepaperBySlugQuery = `
  *[_type == "whitepaper" && slug.current == $slug][0] {
    "slug": slug.current,
    "title": coalesce(title[$locale], title.en),
    "description": coalesce(description[$locale], description.en),
    "pages": pages,
    "format": format,
    "audience": coalesce(audience[$locale], audience.en),
    "gradient": gradient,
    "accentColor": accentColor,
    "topics": coalesce(topics[$locale], topics.en),
    "sections": sections[] {
      "heading": coalesce(heading[$locale], heading.en),
      "body": coalesce(body[$locale], body.en),
      "bullets": coalesce(bullets[$locale], bullets.en),
    },
    "publishedAt": publishedAt,
  }
`;

export type SanityWhitepaperListItem = {
  slug: string;
  title: string;
  description: string;
  pages: string;
  format: string;
  audience: string;
  gradient: string;
  accentColor: string;
  publishedAt: string;
};

export type SanityWhitepaper = SanityWhitepaperListItem & {
  topics: string[];
  sections: Array<{ heading: string; body: string; bullets?: string[] }>;
};

// ── FAQ Items ────────────────────────────────────────────────────────────────

export const allFaqItemsQuery = `
  *[_type == "faqItem"] | order(order asc) {
    _id,
    "question": coalesce(question[$locale], question.en),
    "answer": coalesce(answer[$locale], answer.en),
    "category": category,
    "order": order,
  }
`;

export type SanityFaqItem = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
};
