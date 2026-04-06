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
    "coverImage":  coverImage,
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
    "coverImage":  coverImage,
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

// Reusable Sanity image reference type (works with urlFor())
export type SanityImageRef = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type SanityArticleListItem = {
  title: string;
  slug: string;
  category: string;
  author: string;
  publishedAt: string; // "YYYY-MM-DD"
  readTime: string;
  description: string;
  coverImage?: SanityImageRef;
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
    "challenges": coalesce(challenges[$locale], challenges.en),
    "solutions": coalesce(solutions[$locale], solutions.en),
    "featuredSolutions": coalesce(featuredSolutions[$locale], featuredSolutions.en),
    "metrics": coalesce(metrics[$locale], metrics.en),
    "testimonial": {
      "quote": coalesce(testimonial.quote[$locale], testimonial.quote.en),
      "name": testimonial.name,
      "title": coalesce(testimonial.title[$locale], testimonial.title.en),
      "company": coalesce(testimonial.company[$locale], testimonial.company.en),
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
    "featuredImage": coalesce(featuredImage, coverImage),
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
    "featuredImage": featuredImage,
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
  featuredImage?: SanityImageRef;
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
    "coverImage": coverImage,
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
    "coverImage": coverImage,
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
  coverImage?: SanityImageRef;
};

export type SanityWhitepaper = SanityWhitepaperListItem & {
  topics: string[];
  sections: Array<{ heading: string; body: string; bullets?: string[] }>;
};

// ── Platform Pages ───────────────────────────────────────────────────────────

export const platformPageByIdQuery = `
  *[_type == "platformPage" && pageId == $pageId][0] {
    "pageId": pageId,
    "metaTitle": coalesce(metaTitle[$locale], metaTitle.en),
    "metaDescription": coalesce(metaDescription[$locale], metaDescription.en),
    "hero": {
      "badge": coalesce(hero.badge[$locale], hero.badge.en),
      "headline": coalesce(hero.headline[$locale], hero.headline.en),
      "headlineHighlight": coalesce(hero.headlineHighlight[$locale], hero.headlineHighlight.en),
      "sub": coalesce(hero.sub[$locale], hero.sub.en),
      "ctaLabel": coalesce(hero.ctaLabel[$locale], hero.ctaLabel.en),
      "iconColor": hero.iconColor,
      "bgGradient": hero.bgGradient,
    },
    "benefits": {
      "heading": coalesce(benefits.heading[$locale], benefits.heading.en),
      "sub": coalesce(benefits.sub[$locale], benefits.sub.en),
      "items": benefits.items[] {
        "icon": icon,
        "title": coalesce(title[$locale], title.en),
        "desc": coalesce(desc[$locale], desc.en),
      },
    },
    "howItWorks": {
      "heading": coalesce(howItWorks.heading[$locale], howItWorks.heading.en),
      "sub": coalesce(howItWorks.sub[$locale], howItWorks.sub.en),
      "steps": howItWorks.steps[] {
        "step": step,
        "title": coalesce(title[$locale], title.en),
        "desc": coalesce(desc[$locale], desc.en),
        "bullets": coalesce(bullets[$locale], bullets.en),
      },
    },
    "stats": stats[] {
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
    "cta": {
      "heading": coalesce(cta.heading[$locale], cta.heading.en),
      "sub": coalesce(cta.sub[$locale], cta.sub.en),
      "ctaLabel": coalesce(cta.ctaLabel[$locale], cta.ctaLabel.en),
      "secondaryLabel": coalesce(cta.secondaryLabel[$locale], cta.secondaryLabel.en),
    },
    "painPoints": painPoints[] {
      "title": coalesce(title[$locale], title.en),
      "desc": coalesce(desc[$locale], desc.en),
      "icon": icon,
    },
  }
`;

export type SanityPlatformHero = {
  badge: string;
  headline: string;
  headlineHighlight: string;
  sub: string;
  ctaLabel: string;
  iconColor: string;
  bgGradient: string;
};

export type SanityPlatformPage = {
  pageId: string;
  metaTitle: string;
  metaDescription: string;
  hero: SanityPlatformHero;
  benefits: {
    heading: string;
    sub: string;
    items: Array<{ icon: string; title: string; desc: string }>;
  };
  howItWorks: {
    heading: string;
    sub: string;
    steps: Array<{ step: string; title: string; desc: string; bullets?: string[] }>;
  };
  stats: Array<{ value: string; label: string; sub: string }>;
  testimonial: { quote: string; name: string; title: string; company: string };
  cta: { heading: string; sub: string; ctaLabel: string; secondaryLabel: string };
  painPoints: Array<{ title: string; desc: string; icon: string }>;
};

// ── FAQ Items ────────────────────────────────────────────────────────────────

export const allFaqItemsQuery = `
  *[_type == "faqItem"] | order(_createdAt desc) {
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

// ── About Page ───────────────────────────────────────────────────────────────

export const aboutPageQuery = `
  *[_id == "aboutPage"][0] {
    "hero": {
      "badge":             coalesce(hero.badge[$locale],             hero.badge.en),
      "headline":          coalesce(hero.headline[$locale],          hero.headline.en),
      "headlineHighlight": coalesce(hero.headlineHighlight[$locale], hero.headlineHighlight.en),
      "sub":               coalesce(hero.sub[$locale],               hero.sub.en),
    },
    "story": {
      "headline": coalesce(story.headline[$locale], story.headline.en),
      "p1":       coalesce(story.p1[$locale],       story.p1.en),
      "p2":       coalesce(story.p2[$locale],       story.p2.en),
      "p3":       coalesce(story.p3[$locale],       story.p3.en),
    },
    "stats": stats[] {
      "value": value,
      "label": coalesce(label[$locale], label.en),
    },
    "values": {
      "headline": coalesce(values.headline[$locale], values.headline.en),
      "items": values.items[] {
        "title": coalesce(title[$locale], title.en),
        "desc":  coalesce(desc[$locale],  desc.en),
      },
    },
    "team": {
      "headline": coalesce(team.headline[$locale], team.headline.en),
      "sub":      coalesce(team.sub[$locale],      team.sub.en),
    },
    "careers": {
      "headline": coalesce(careers.headline[$locale], careers.headline.en),
      "sub":      coalesce(careers.sub[$locale],      careers.sub.en),
      "cta":      coalesce(careers.cta[$locale],      careers.cta.en),
    },
    "press": {
      "headline":     coalesce(press.headline[$locale],     press.headline.en),
      "mediaEnquiry": coalesce(press.mediaEnquiry[$locale], press.mediaEnquiry.en),
      "items": press.items[] {
        "outlet":   coalesce(outlet[$locale],   outlet.en),
        "date":     coalesce(date[$locale],     date.en),
        "headline": coalesce(headline[$locale], headline.en),
        "url": url,
      },
    },
    "cta": {
      "headline":       coalesce(cta.headline[$locale],       cta.headline.en),
      "sub":            coalesce(cta.sub[$locale],            cta.sub.en),
      "ctaLabel":       coalesce(cta.ctaLabel[$locale],       cta.ctaLabel.en),
      "secondaryLabel": coalesce(cta.secondaryLabel[$locale], cta.secondaryLabel.en),
    },
  }
`;

export type SanityAboutPage = {
  hero: { badge: string; headline: string; headlineHighlight: string; sub: string };
  story: { headline: string; p1: string; p2: string; p3: string };
  stats: Array<{ value: string; label: string }>;
  values: { headline: string; items: Array<{ title: string; desc: string }> };
  team: { headline: string; sub: string };
  careers: { headline: string; sub: string; cta: string };
  press: {
    headline: string;
    mediaEnquiry: string;
    items: Array<{ outlet: string; date: string; headline: string; url?: string }>;
  };
  cta: { headline: string; sub: string; ctaLabel: string; secondaryLabel: string };
};

// ── Team Members ─────────────────────────────────────────────────────────────

export const allTeamMembersQuery = `
  *[_type == "teamMember"] | order(order asc) {
    _id,
    "name":  name,
    "role":  coalesce(role[$locale], role.en),
    "bio":   coalesce(bio[$locale],  bio.en),
    "photo": photo,
    "order": order,
  }
`;

export type SanityTeamMember = {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photo?: SanityImageRef;
  order: number;
};

// ── Trust Page ───────────────────────────────────────────────────────────────

export const trustPageQuery = `
  *[_id == "trustPage"][0] {
    "hero": {
      "badge":             coalesce(hero.badge[$locale],             hero.badge.en),
      "headline":          coalesce(hero.headline[$locale],          hero.headline.en),
      "headlineHighlight": coalesce(hero.headlineHighlight[$locale], hero.headlineHighlight.en),
      "sub":               coalesce(hero.sub[$locale],               hero.sub.en),
    },
    "certifications": {
      "heading": coalesce(certifications.heading[$locale], certifications.heading.en),
      "sub":     coalesce(certifications.sub[$locale],     certifications.sub.en),
      "items": certifications.items[] {
        "label":  coalesce(label[$locale],  label.en),
        "desc":   coalesce(desc[$locale],   desc.en),
        "detail": coalesce(detail[$locale], detail.en),
      },
    },
    "security": {
      "heading": coalesce(security.heading[$locale], security.heading.en),
      "sub":     coalesce(security.sub[$locale],     security.sub.en),
      "pillars": security.pillars[] {
        "icon":  icon,
        "title": coalesce(title[$locale], title.en),
        "desc":  coalesce(desc[$locale],  desc.en),
      },
    },
    "privacy": {
      "heading": coalesce(privacy.heading[$locale], privacy.heading.en),
      "principles": privacy.principles[] {
        "principle": coalesce(principle[$locale], principle.en),
        "desc":      coalesce(desc[$locale],      desc.en),
      },
    },
    "partnerBar": {
      "label":       coalesce(partnerBar.label[$locale],       partnerBar.label.en),
      "contactNote": coalesce(partnerBar.contactNote[$locale], partnerBar.contactNote.en),
      "logos":       partnerBar.logos,
    },
    "cta": {
      "headline":       coalesce(cta.headline[$locale],       cta.headline.en),
      "sub":            coalesce(cta.sub[$locale],            cta.sub.en),
      "ctaLabel":       coalesce(cta.ctaLabel[$locale],       cta.ctaLabel.en),
      "secondaryLabel": coalesce(cta.secondaryLabel[$locale], cta.secondaryLabel.en),
    },
  }
`;

export type SanityTrustPage = {
  hero: { badge: string; headline: string; headlineHighlight: string; sub: string };
  certifications: {
    heading: string;
    sub: string;
    items: Array<{ label: string; desc: string; detail: string }>;
  };
  security: {
    heading: string;
    sub: string;
    pillars: Array<{ icon: string; title: string; desc: string }>;
  };
  privacy: {
    heading: string;
    principles: Array<{ principle: string; desc: string }>;
  };
  partnerBar: { label: string; contactNote: string; logos: string[] };
  cta: { headline: string; sub: string; ctaLabel: string; secondaryLabel: string };
};

// ── Contact Page ─────────────────────────────────────────────────────────────

export const contactPageQuery = `
  *[_id == "contactPage"][0] {
    "hero": {
      "headline":          coalesce(hero.headline[$locale],          hero.headline.en),
      "headlineHighlight": coalesce(hero.headlineHighlight[$locale], hero.headlineHighlight.en),
      "sub":               coalesce(hero.sub[$locale],               hero.sub.en),
    },
    "officesTitle": coalesce(officesTitle[$locale], officesTitle.en),
    "formTitle":    coalesce(formTitle[$locale],    formTitle.en),
    "formSub":      coalesce(formSub[$locale],      formSub.en),
    "hours":        coalesce(hours[$locale],        hours.en),
    "fields": {
      "name":               coalesce(fields.name[$locale],               fields.name.en),
      "email":              coalesce(fields.email[$locale],              fields.email.en),
      "company":            coalesce(fields.company[$locale],            fields.company.en),
      "message":            coalesce(fields.message[$locale],            fields.message.en),
      "messagePlaceholder": coalesce(fields.messagePlaceholder[$locale], fields.messagePlaceholder.en),
      "submit":             coalesce(fields.submit[$locale],             fields.submit.en),
    },
    "success": {
      "title": coalesce(success.title[$locale], success.title.en),
      "sub":   coalesce(success.sub[$locale],   success.sub.en),
    },
    "offices": offices[] {
      "city":    city,
      "address": address,
      "phone":   phone,
      "email":   email,
      "hours":   coalesce(hours[$locale], hours.en),
    },
  }
`;

export type SanityContactOffice = {
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
};

export type SanityContactPage = {
  hero: { headline: string; headlineHighlight: string; sub: string };
  officesTitle: string;
  formTitle: string;
  formSub: string;
  hours: string;
  fields: {
    name: string;
    email: string;
    company: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
  };
  success: { title: string; sub: string };
  offices: SanityContactOffice[];
};

// ── Get a Demo Page ──────────────────────────────────────────────────────────

export const getDemoPageQuery = `
  *[_id == "getDemoPage"][0] {
    "hero": {
      "badge":             coalesce(hero.badge[$locale],             hero.badge.en),
      "headline":          coalesce(hero.headline[$locale],          hero.headline.en),
      "headlineHighlight": coalesce(hero.headlineHighlight[$locale], hero.headlineHighlight.en),
      "sub":               coalesce(hero.sub[$locale],               hero.sub.en),
    },
    "bullets":     coalesce(bullets[$locale],     bullets.en),
    "whatHappens": coalesce(whatHappens[$locale], whatHappens.en),
    "afterSubmit": coalesce(afterSubmit[$locale], afterSubmit.en),
    "formTitle":   coalesce(formTitle[$locale],   formTitle.en),
    "formSub":     coalesce(formSub[$locale],     formSub.en),
    "fields": {
      "name":               coalesce(fields.name[$locale],               fields.name.en),
      "email":              coalesce(fields.email[$locale],              fields.email.en),
      "company":            coalesce(fields.company[$locale],            fields.company.en),
      "size":               coalesce(fields.size[$locale],               fields.size.en),
      "role":               coalesce(fields.role[$locale],               fields.role.en),
      "message":            coalesce(fields.message[$locale],            fields.message.en),
      "messagePlaceholder": coalesce(fields.messagePlaceholder[$locale], fields.messagePlaceholder.en),
      "submit":             coalesce(fields.submit[$locale],             fields.submit.en),
      "submitting":         coalesce(fields.submitting[$locale],         fields.submitting.en),
      "privacy":            coalesce(fields.privacy[$locale],            fields.privacy.en),
      "privacyLink":        coalesce(fields.privacyLink[$locale],        fields.privacyLink.en),
      "noSpam":             coalesce(fields.noSpam[$locale],             fields.noSpam.en),
    },
    "success": {
      "title":       coalesce(success.title[$locale],       success.title.en),
      "sub":         coalesce(success.sub[$locale],         success.sub.en),
      "explore":     coalesce(success.explore[$locale],     success.explore.en),
      "platform":    coalesce(success.platform[$locale],    success.platform.en),
      "or":          coalesce(success.or[$locale],          success.or.en),
      "caseStudies": coalesce(success.caseStudies[$locale], success.caseStudies.en),
    },
    "sizes": coalesce(sizes[$locale], sizes.en),
    "roles": coalesce(roles[$locale], roles.en),
  }
`;

export type SanityGetDemoPage = {
  hero: { badge: string; headline: string; headlineHighlight: string; sub: string };
  bullets: string[];
  whatHappens: string;
  afterSubmit: string[];
  formTitle: string;
  formSub: string;
  fields: {
    name: string;
    email: string;
    company: string;
    size: string;
    role: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    privacy: string;
    privacyLink: string;
    noSpam: string;
  };
  success: {
    title: string;
    sub: string;
    explore: string;
    platform: string;
    or: string;
    caseStudies: string;
  };
  sizes: string[];
  roles: string[];
};

// ── Start Now Page ────────────────────────────────────────────────────────────

export const startNowPageQuery = `
  *[_id == "startNowPage"][0] {
    "badge":             coalesce(badge[$locale],             badge.en),
    "headline":          coalesce(headline[$locale],          headline.en),
    "headlineHighlight": coalesce(headlineHighlight[$locale], headlineHighlight.en),
    "sub":               coalesce(sub[$locale],               sub.en),
    "formTitle":         coalesce(formTitle[$locale],         formTitle.en),
    "fields": {
      "name":    coalesce(fields.name[$locale],    fields.name.en),
      "email":   coalesce(fields.email[$locale],   fields.email.en),
      "company": coalesce(fields.company[$locale], fields.company.en),
      "submit":  coalesce(fields.submit[$locale],  fields.submit.en),
      "note":    coalesce(fields.note[$locale],    fields.note.en),
    },
    "success": {
      "title": coalesce(success.title[$locale], success.title.en),
      "sub":   coalesce(success.sub[$locale],   success.sub.en),
    },
    "stepsTitle":    coalesce(stepsTitle[$locale],    stepsTitle.en),
    "steps": steps[] {
      "title": coalesce(title[$locale], title.en),
      "desc":  coalesce(desc[$locale],  desc.en),
      "time":  coalesce(time[$locale],  time.en),
    },
    "pricingTitle": coalesce(pricingTitle[$locale], pricingTitle.en),
    "pricingSub":   coalesce(pricingSub[$locale],   pricingSub.en),
    "plans": plans[] {
      "name":    coalesce(name[$locale],  name.en),
      "price":   coalesce(price[$locale], price.en),
      "per":     coalesce(per[$locale],   per.en),
      "desc":    coalesce(desc[$locale],  desc.en),
      "cta":     coalesce(cta[$locale],   cta.en),
      "popular": popular,
    },
    "popularLabel":      coalesce(popularLabel[$locale],      popularLabel.en),
    "testimonialsTitle": coalesce(testimonialsTitle[$locale], testimonialsTitle.en),
  }
`;

export type SanityStartNowPlan = {
  name: string;
  price: string;
  per: string;
  desc: string;
  cta: string;
  popular: boolean;
};

export type SanityStartNowStep = {
  title: string;
  desc: string;
  time: string;
};

export type SanityStartNowPage = {
  badge: string;
  headline: string;
  headlineHighlight: string;
  sub: string;
  formTitle: string;
  fields: {
    name: string;
    email: string;
    company: string;
    submit: string;
    note: string;
  };
  success: { title: string; sub: string };
  stepsTitle: string;
  steps: SanityStartNowStep[];
  pricingTitle: string;
  pricingSub: string;
  plans: SanityStartNowPlan[];
  popularLabel: string;
  testimonialsTitle: string;
};

// ── Site Settings ────────────────────────────────────────────────────────────

export const siteSettingsQuery = `
  *[_id == "siteSettings"][0] {
    "nav": {
      "platform":         coalesce(nav.platform[$locale],         nav.platform.en),
      "whoWeServe":       coalesce(nav.whoWeServe[$locale],       nav.whoWeServe.en),
      "resources":        coalesce(nav.resources[$locale],        nav.resources.en),
      "about":            coalesce(nav.about[$locale],            nav.about.en),
      "trust":            coalesce(nav.trust[$locale],            nav.trust.en),
      "startNow":         coalesce(nav.startNow[$locale],         nav.startNow.en),
      "getDemo":          coalesce(nav.getDemo[$locale],          nav.getDemo.en),
      "platformSolutions":coalesce(nav.platformSolutions[$locale],nav.platformSolutions.en),
      "byAudience":       coalesce(nav.byAudience[$locale],       nav.byAudience.en),
      "platformLinks": nav.platformLinks[] {
        "label": coalesce(label[$locale], label.en),
        "desc":  coalesce(desc[$locale],  desc.en),
        "href":  href,
      },
      "audienceLinks": nav.audienceLinks[] {
        "label": coalesce(label[$locale], label.en),
        "desc":  coalesce(desc[$locale],  desc.en),
        "href":  href,
      },
    },
    "footer": {
      "tagline": coalesce(footer.tagline[$locale], footer.tagline.en),
      "platformLinks": footer.platformLinks[] {
        "label": coalesce(label[$locale], label.en),
        "href":  href,
      },
      "whoWeServeLinks": footer.whoWeServeLinks[] {
        "label": coalesce(label[$locale], label.en),
        "href":  href,
      },
      "resourceLinks": footer.resourceLinks[] {
        "label": coalesce(label[$locale], label.en),
        "href":  href,
      },
      "companyLinks": footer.companyLinks[] {
        "label": coalesce(label[$locale], label.en),
        "href":  href,
      },
    },
  }
`;

export type SanitySiteSettings = {
  nav: {
    platform: string;
    whoWeServe: string;
    resources: string;
    about: string;
    trust: string;
    startNow: string;
    getDemo: string;
    platformSolutions: string;
    byAudience: string;
    platformLinks: Array<{ label: string; desc: string; href: string }>;
    audienceLinks: Array<{ label: string; desc: string; href: string }>;
  };
  footer: {
    tagline: string;
    platformLinks: Array<{ label: string; href: string }>;
    whoWeServeLinks: Array<{ label: string; href: string }>;
    resourceLinks: Array<{ label: string; href: string }>;
    companyLinks: Array<{ label: string; href: string }>;
  };
};

// ── Partners Page ─────────────────────────────────────────────────────────────

export const partnersPageQuery = `
  *[_id == "partnersPage"][0] {
    "badge":             coalesce(badge[$locale],             badge.en),
    "headline":          coalesce(headline[$locale],          headline.en),
    "headlineHighlight": coalesce(headlineHighlight[$locale], headlineHighlight.en),
    "sub":               coalesce(sub[$locale],               sub.en),
    "typesTitle":        coalesce(typesTitle[$locale],        typesTitle.en),
    "types": types[] {
      "label":    coalesce(label[$locale],    label.en),
      "desc":     coalesce(desc[$locale],     desc.en),
      "benefits": coalesce(benefits[$locale], benefits.en),
    },
    "benefitsTitle": coalesce(benefitsTitle[$locale], benefitsTitle.en),
    "benefits": benefits[] {
      "icon":  icon,
      "title": coalesce(title[$locale], title.en),
      "desc":  coalesce(desc[$locale],  desc.en),
    },
    "formTitle": coalesce(formTitle[$locale], formTitle.en),
    "formSub":   coalesce(formSub[$locale],   formSub.en),
    "fields": {
      "name":               coalesce(fields.name[$locale],               fields.name.en),
      "email":              coalesce(fields.email[$locale],              fields.email.en),
      "company":            coalesce(fields.company[$locale],            fields.company.en),
      "type":               coalesce(fields.type[$locale],               fields.type.en),
      "website":            coalesce(fields.website[$locale],            fields.website.en),
      "message":            coalesce(fields.message[$locale],            fields.message.en),
      "messagePlaceholder": coalesce(fields.messagePlaceholder[$locale], fields.messagePlaceholder.en),
      "submit":             coalesce(fields.submit[$locale],             fields.submit.en),
      "note":               coalesce(fields.note[$locale],               fields.note.en),
    },
    "typeOptions": coalesce(typeOptions[$locale], typeOptions.en),
    "success": {
      "title": coalesce(success.title[$locale], success.title.en),
      "sub":   coalesce(success.sub[$locale],   success.sub.en),
    },
  }
`;

export type SanityPartnerType = {
  label: string;
  desc: string;
  benefits: string[];
};

export type SanityPartnerBenefit = {
  icon: string;
  title: string;
  desc: string;
};

export type SanityPartnersPage = {
  badge: string;
  headline: string;
  headlineHighlight: string;
  sub: string;
  typesTitle: string;
  types: SanityPartnerType[];
  benefitsTitle: string;
  benefits: SanityPartnerBenefit[];
  formTitle: string;
  formSub: string;
  fields: {
    name: string;
    email: string;
    company: string;
    type: string;
    website: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    note: string;
  };
  typeOptions: string[];
  success: { title: string; sub: string };
};

// ── Home Page ─────────────────────────────────────────────────────────────────

export const homePageQuery = `
  *[_id == "homePage"][0] {
    "hero": {
      "badge":            coalesce(hero.badge[$locale],            hero.badge.en),
      "headline1":        coalesce(hero.headline1[$locale],        hero.headline1.en),
      "headline2":        coalesce(hero.headline2[$locale],        hero.headline2.en),
      "headline3":        coalesce(hero.headline3[$locale],        hero.headline3.en),
      "sub":              coalesce(hero.sub[$locale],              hero.sub.en),
      "ctaPrimary":       coalesce(hero.ctaPrimary[$locale],       hero.ctaPrimary.en),
      "ctaSecondary":     coalesce(hero.ctaSecondary[$locale],     hero.ctaSecondary.en),
      "dashboardTitle":   coalesce(hero.dashboardTitle[$locale],   hero.dashboardTitle.en),
      "dashboardCompany": coalesce(hero.dashboardCompany[$locale], hero.dashboardCompany.en),
      "dashboardLive":    coalesce(hero.dashboardLive[$locale],    hero.dashboardLive.en),
      "statLabels":       coalesce(hero.statLabels[$locale],       hero.statLabels.en),
      "statValues":       coalesce(hero.statValues[$locale],       hero.statValues.en),
      "claimLabels":      coalesce(hero.claimLabels[$locale],      hero.claimLabels.en),
      "recentClaims":     coalesce(hero.recentClaims[$locale],     hero.recentClaims.en),
      "approved":         coalesce(hero.approved[$locale],         hero.approved.en),
      "processing":       coalesce(hero.processing[$locale],       hero.processing.en),
      "costSaved":        coalesce(hero.costSaved[$locale],        hero.costSaved.en),
      "costSavedSub":     coalesce(hero.costSavedSub[$locale],     hero.costSavedSub.en),
      "compliance":       coalesce(hero.compliance[$locale],       hero.compliance.en),
      "services":         coalesce(hero.services[$locale],         hero.services.en),
      "servicesSub":      coalesce(hero.servicesSub[$locale],      hero.servicesSub.en),
    },
    "logoBar": {
      "label": coalesce(logoBar.label[$locale], logoBar.label.en),
      "logos": logoBar.logos[] {
        "_key": _key,
        "name": name,
        "image": image,
        "href": href,
      },
    },
    "corePlatform": {
      "badge":             coalesce(corePlatform.badge[$locale],             corePlatform.badge.en),
      "headline":          coalesce(corePlatform.headline[$locale],          corePlatform.headline.en),
      "headlineHighlight": coalesce(corePlatform.headlineHighlight[$locale], corePlatform.headlineHighlight.en),
      "sub":               coalesce(corePlatform.sub[$locale],               corePlatform.sub.en),
      "learnMore":         coalesce(corePlatform.learnMore[$locale],         corePlatform.learnMore.en),
      "pillars": corePlatform.pillars[] {
        "title": coalesce(title[$locale], title.en),
        "desc":  coalesce(desc[$locale],  desc.en),
        "stats": coalesce(stats[$locale], stats.en),
      },
      "counters": corePlatform.counters[] {
        "value": value,
        "label": coalesce(label[$locale], label.en),
      },
    },
    "platformFeatures": {
      "badge":      coalesce(platformFeatures.badge[$locale],      platformFeatures.badge.en),
      "headline":   coalesce(platformFeatures.headline[$locale],   platformFeatures.headline.en),
      "sub":        coalesce(platformFeatures.sub[$locale],        platformFeatures.sub.en),
      "soon":       coalesce(platformFeatures.soon[$locale],       platformFeatures.soon.en),
      "comingSoon": coalesce(platformFeatures.comingSoon[$locale], platformFeatures.comingSoon.en),
      "available":  coalesce(platformFeatures.available[$locale],  platformFeatures.available.en),
      "learnMore":  coalesce(platformFeatures.learnMore[$locale],  platformFeatures.learnMore.en),
      "explore":    coalesce(platformFeatures.explore[$locale],    platformFeatures.explore.en),
      "features": platformFeatures.features[] {
        "headline": coalesce(headline[$locale], headline.en),
        "desc":     coalesce(desc[$locale],     desc.en),
        "bullets":  coalesce(bullets[$locale],  bullets.en),
      },
    },
    "audience": {
      "badge":      coalesce(audience.badge[$locale],      audience.badge.en),
      "headline":   coalesce(audience.headline[$locale],   audience.headline.en),
      "sub":        coalesce(audience.sub[$locale],        audience.sub.en),
      "howWeHelp":  coalesce(audience.howWeHelp[$locale],  audience.howWeHelp.en),
      "learnMore":  coalesce(audience.learnMore[$locale],  audience.learnMore.en),
      "audiences": audience.audiences[] {
        "label":   coalesce(label[$locale],   label.en),
        "tagline": coalesce(tagline[$locale], tagline.en),
        "cta":     coalesce(cta[$locale],     cta.en),
        "ctaHref": ctaHref,
        "bullets": coalesce(bullets[$locale], bullets.en),
      },
    },
    "howItWorks": {
      "badge":      coalesce(howItWorks.badge[$locale],      howItWorks.badge.en),
      "headline":   coalesce(howItWorks.headline[$locale],   howItWorks.headline.en),
      "sub":        coalesce(howItWorks.sub[$locale],        howItWorks.sub.en),
      "stepLabel":  coalesce(howItWorks.stepLabel[$locale],  howItWorks.stepLabel.en),
      "cta":        coalesce(howItWorks.cta[$locale],        howItWorks.cta.en),
      "footnote":   coalesce(howItWorks.footnote[$locale],   howItWorks.footnote.en),
      "steps": howItWorks.steps[] {
        "title": coalesce(title[$locale], title.en),
        "desc":  coalesce(desc[$locale],  desc.en),
      },
    },
    "testimonials": {
      "badge":    coalesce(testimonials.badge[$locale],    testimonials.badge.en),
      "headline": coalesce(testimonials.headline[$locale], testimonials.headline.en),
      "sub":      coalesce(testimonials.sub[$locale],      testimonials.sub.en),
      "audienceLabels": {
        "insurer":       coalesce(testimonials.audienceLabels.insurer[$locale],       testimonials.audienceLabels.insurer.en),
        "enterprise":    coalesce(testimonials.audienceLabels.enterprise[$locale],    testimonials.audienceLabels.enterprise.en),
        "broker":        coalesce(testimonials.audienceLabels.broker[$locale],        testimonials.audienceLabels.broker.en),
        "smallBusiness": coalesce(testimonials.audienceLabels.smallBusiness[$locale], testimonials.audienceLabels.smallBusiness.en),
        "provider":      coalesce(testimonials.audienceLabels.provider[$locale],      testimonials.audienceLabels.provider.en),
      },
      "stats": testimonials.stats[] {
        "value": value,
        "label": coalesce(label[$locale], label.en),
      },
    },
    "compliance": {
      "badge":        coalesce(compliance.badge[$locale],        compliance.badge.en),
      "headline":     coalesce(compliance.headline[$locale],     compliance.headline.en),
      "sub":          coalesce(compliance.sub[$locale],          compliance.sub.en),
      "certFootnote": coalesce(compliance.certFootnote[$locale], compliance.certFootnote.en),
      "pillars": compliance.pillars[] {
        "title": coalesce(title[$locale], title.en),
        "desc":  coalesce(desc[$locale],  desc.en),
      },
    },
    "cta": {
      "badge":         coalesce(cta.badge[$locale],         cta.badge.en),
      "headline":      coalesce(cta.headline[$locale],      cta.headline.en),
      "sub":           coalesce(cta.sub[$locale],           cta.sub.en),
      "ctaPrimary":    coalesce(cta.ctaPrimary[$locale],    cta.ctaPrimary.en),
      "ctaSecondary":  coalesce(cta.ctaSecondary[$locale],  cta.ctaSecondary.en),
    },
  }
`;

export type SanityHomeHero = {
  badge: string;
  headline1: string;
  headline2: string;
  headline3: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  dashboardTitle: string;
  dashboardCompany: string;
  dashboardLive: string;
  statLabels: string[];
  statValues: string[];
  claimLabels: string[];
  recentClaims: string;
  approved: string;
  processing: string;
  costSaved: string;
  costSavedSub: string;
  compliance: string;
  services: string;
  servicesSub: string;
};

export type SanityHomeLogoBar = {
  label: string;
  logos?: Array<{ _key: string; name: string; image: SanityImageRef; href?: string }>;
};

export type SanityHomeCorePlatform = {
  badge: string;
  headline: string;
  headlineHighlight: string;
  sub: string;
  learnMore: string;
  pillars: Array<{ title: string; desc: string; stats: string }>;
  counters: Array<{ value: string; label: string }>;
};

export type SanityHomePlatformFeature = {
  headline: string;
  desc: string;
  bullets: string[];
};

export type SanityHomePlatformFeatures = {
  badge: string;
  headline: string;
  sub: string;
  soon: string;
  comingSoon: string;
  available: string;
  learnMore: string;
  explore: string;
  features: SanityHomePlatformFeature[];
};

export type SanityHomeAudienceSegment = {
  label: string;
  tagline: string;
  cta: string;
  ctaHref: string;
  bullets: string[];
};

export type SanityHomeAudience = {
  badge: string;
  headline: string;
  sub: string;
  howWeHelp: string;
  learnMore: string;
  audiences: SanityHomeAudienceSegment[];
};

export type SanityHomeHowItWorks = {
  badge: string;
  headline: string;
  sub: string;
  stepLabel: string;
  cta: string;
  footnote: string;
  steps: Array<{ title: string; desc: string }>;
};

export type SanityHomeTestimonials = {
  badge: string;
  headline: string;
  sub: string;
  audienceLabels: {
    insurer: string;
    enterprise: string;
    broker: string;
    smallBusiness: string;
    provider: string;
  };
  stats: Array<{ value: string; label: string }>;
};

export type SanityHomeCompliance = {
  badge: string;
  headline: string;
  sub: string;
  certFootnote: string;
  pillars: Array<{ title: string; desc: string }>;
};

export type SanityHomeCta = {
  badge: string;
  headline: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type SanityHomePage = {
  hero: SanityHomeHero;
  logoBar: SanityHomeLogoBar;
  corePlatform: SanityHomeCorePlatform;
  platformFeatures: SanityHomePlatformFeatures;
  audience: SanityHomeAudience;
  howItWorks: SanityHomeHowItWorks;
  testimonials: SanityHomeTestimonials;
  compliance: SanityHomeCompliance;
  cta: SanityHomeCta;
};

// ── Press / Media Coverage ────────────────────────────────────────────────────

export const allPressItemsQuery = `
  *[_type == "pressItem"] | order(publishedAt desc) {
    "title":       coalesce(title[$locale],       title.en),
    "slug":        slug.current,
    "outlet":      outlet,
    "outletLogo":  outletLogo,
    "publishedAt": publishedAt,
    "category":    category,
    "isFeatured":  isFeatured,
    "externalUrl": externalUrl,
    "description": coalesce(description[$locale], description.en),
    "coverImage":  coverImage,
  }
`;

export const pressItemBySlugQuery = `
  *[_type == "pressItem" && slug.current == $slug][0] {
    "title":       coalesce(title[$locale],       title.en),
    "slug":        slug.current,
    "outlet":      outlet,
    "outletLogo":  outletLogo,
    "publishedAt": publishedAt,
    "category":    category,
    "isFeatured":  isFeatured,
    "externalUrl": externalUrl,
    "description": coalesce(description[$locale], description.en),
    "coverImage":  coverImage,
    "sections": sections[] {
      "heading": coalesce(heading[$locale], heading.en),
      "body":    coalesce(body[$locale],    body.en),
      "bullets": coalesce(bullets[$locale], bullets.en),
    },
  }
`;

export const allPressSlugsQuery = `
  *[_type == "pressItem"] { "slug": slug.current }
`;

export type SanityPressItemListItem = {
  title: string;
  slug: string;
  outlet: string;
  outletLogo?: SanityImageRef;
  publishedAt: string;
  category: string;
  isFeatured: boolean;
  externalUrl?: string;
  description: string;
  coverImage?: SanityImageRef;
};

export type SanityPressItem = SanityPressItemListItem & {
  sections: Array<{
    heading: string;
    body: string;
    bullets?: string[];
  }>;
};
