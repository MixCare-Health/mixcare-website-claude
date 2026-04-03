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
  photo?: { asset: { _ref: string } };
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
