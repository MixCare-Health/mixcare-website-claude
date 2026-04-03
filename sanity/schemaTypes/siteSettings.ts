import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField } from "./locale-helpers";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    // Nav
    defineField({
      name: "nav",
      title: "Navigation",
      type: "object",
      fields: [
        localeStringField("platform", "Platform Label"),
        localeStringField("whoWeServe", "Who We Serve Label"),
        localeStringField("resources", "Resources Label"),
        localeStringField("about", "About Label"),
        localeStringField("trust", "Trust Label"),
        localeStringField("startNow", "Start Now Label"),
        localeStringField("getDemo", "Get a Demo Label"),
        localeStringField("platformSolutions", "Platform Solutions Heading"),
        localeStringField("byAudience", "By Audience Heading"),
        defineField({
          name: "platformLinks",
          title: "Platform Links",
          type: "array",
          of: [{
            type: "object",
            fields: [
              localeStringField("label", "Label"),
              localeStringField("desc", "Description"),
              defineField({ name: "href", title: "href", type: "string" }),
            ],
            preview: { select: { title: "label.en" } },
          }],
        }),
        defineField({
          name: "audienceLinks",
          title: "Audience Links",
          type: "array",
          of: [{
            type: "object",
            fields: [
              localeStringField("label", "Label"),
              localeStringField("desc", "Description"),
              defineField({ name: "href", title: "href", type: "string" }),
            ],
            preview: { select: { title: "label.en" } },
          }],
        }),
      ],
    }),
    // Footer
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        localeTextField("tagline", "Tagline"),
        defineField({
          name: "platformLinks",
          title: "Platform Links",
          type: "array",
          of: [{ type: "object", fields: [localeStringField("label", "Label"), defineField({ name: "href", type: "string", title: "href" })], preview: { select: { title: "label.en" } } }],
        }),
        defineField({
          name: "whoWeServeLinks",
          title: "Who We Serve Links",
          type: "array",
          of: [{ type: "object", fields: [localeStringField("label", "Label"), defineField({ name: "href", type: "string", title: "href" })], preview: { select: { title: "label.en" } } }],
        }),
        defineField({
          name: "resourceLinks",
          title: "Resource Links",
          type: "array",
          of: [{ type: "object", fields: [localeStringField("label", "Label"), defineField({ name: "href", type: "string", title: "href" })], preview: { select: { title: "label.en" } } }],
        }),
        defineField({
          name: "companyLinks",
          title: "Company Links",
          type: "array",
          of: [{ type: "object", fields: [localeStringField("label", "Label"), defineField({ name: "href", type: "string", title: "href" })], preview: { select: { title: "label.en" } } }],
        }),
      ],
    }),
  ],
  preview: {
    prepare() { return { title: "Site Settings" }; },
  },
});
