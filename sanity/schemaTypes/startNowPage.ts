import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField } from "./locale-helpers";

export const startNowPageType = defineType({
  name: "startNowPage",
  title: "Start Now Page",
  type: "document",
  fields: [
    // Hero badge + headline
    localeStringField("badge", "Hero Badge"),
    localeStringField("headline", "Headline"),
    localeStringField("headlineHighlight", "Headline Highlight"),
    localeTextField("sub", "Sub-heading"),

    // Sign-up form labels
    defineField({
      name: "formTitle",
      title: "Form Title",
      type: "object",
      fields: [
        defineField({ name: "en",   title: "English",  type: "string" }),
        defineField({ name: "zhTW", title: "繁體中文",  type: "string" }),
        defineField({ name: "zhCN", title: "简体中文",  type: "string" }),
      ],
      options: { columns: 1 },
    }),
    defineField({
      name: "fields",
      title: "Form Field Labels",
      type: "object",
      fields: [
        localeStringField("name",    "Name Label"),
        localeStringField("email",   "Email Label"),
        localeStringField("company", "Company Label"),
        localeStringField("submit",  "Submit Button"),
        localeStringField("note",    "Note Below Button"),
      ],
    }),

    // Success state
    defineField({
      name: "success",
      title: "Success State",
      type: "object",
      fields: [
        localeStringField("title", "Title"),
        localeTextField("sub",    "Sub-text"),
      ],
    }),

    // Steps section
    localeStringField("stepsTitle", "Steps Section Title"),
    defineField({
      name: "steps",
      title: "Setup Steps",
      type: "array",
      of: [{
        type: "object",
        fields: [
          localeStringField("title", "Step Title"),
          localeTextField("desc",   "Step Description"),
          localeStringField("time", "Time Label"),
        ],
        preview: { select: { title: "title.en", subtitle: "time.en" } },
      }],
    }),

    // Pricing section
    localeStringField("pricingTitle", "Pricing Section Title"),
    localeTextField("pricingSub",    "Pricing Sub-heading"),
    defineField({
      name: "plans",
      title: "Pricing Plans",
      type: "array",
      of: [{
        type: "object",
        fields: [
          localeStringField("name",  "Plan Name"),
          localeStringField("price", "Price"),
          localeStringField("per",   "Per (billing period)"),
          localeStringField("desc",  "Plan Description"),
          localeStringField("cta",   "CTA Label"),
          defineField({ name: "popular", title: "Most Popular?", type: "boolean" }),
        ],
        preview: { select: { title: "name.en", subtitle: "price.en" } },
      }],
    }),
    localeStringField("popularLabel", "Popular Badge Label"),

    // Testimonials
    localeStringField("testimonialsTitle", "Testimonials Section Title"),
  ],
  preview: {
    prepare() { return { title: "Start Now Page" }; },
  },
});
