import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField, localeStringsField } from "./locale-helpers";

export const partnersPageType = defineType({
  name: "partnersPage",
  title: "Partners Page",
  type: "document",
  fields: [
    // Hero
    localeStringField("badge",             "Hero Badge"),
    localeStringField("headline",          "Headline"),
    localeStringField("headlineHighlight", "Headline Highlight"),
    localeTextField("sub",                 "Sub-heading"),

    // Partner types section
    localeStringField("typesTitle", "Partner Types Section Title"),
    defineField({
      name: "types",
      title: "Partner Types",
      type: "array",
      of: [{
        type: "object",
        fields: [
          localeStringField("label", "Label"),
          localeTextField("desc",   "Description"),
          localeStringsField("benefits", "Benefits List"),
        ],
        preview: { select: { title: "label.en" } },
      }],
    }),

    // What you get section
    localeStringField("benefitsTitle", "Benefits Section Title"),
    defineField({
      name: "benefits",
      title: "Partner Benefits",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "icon", title: "Icon Name", type: "string" }),
          localeStringField("title", "Title"),
          localeTextField("desc",   "Description"),
        ],
        preview: { select: { title: "title.en" } },
      }],
    }),

    // Application form labels
    localeStringField("formTitle", "Form Title"),
    localeTextField("formSub",    "Form Sub-heading"),
    defineField({
      name: "fields",
      title: "Form Field Labels",
      type: "object",
      fields: [
        localeStringField("name",               "Full Name Label"),
        localeStringField("email",              "Email Label"),
        localeStringField("company",            "Company Label"),
        localeStringField("type",               "Partner Type Label"),
        localeStringField("website",            "Website Label"),
        localeStringField("message",            "Message Label"),
        localeTextField("messagePlaceholder",   "Message Placeholder"),
        localeStringField("submit",             "Submit Button"),
        localeStringField("note",               "Note Below Button"),
      ],
    }),
    localeStringsField("typeOptions", "Partner Type Dropdown Options"),

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
  ],
  preview: {
    prepare() { return { title: "Partners Page" }; },
  },
});
