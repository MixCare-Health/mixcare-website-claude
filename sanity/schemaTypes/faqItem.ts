import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField } from "./locale-helpers";

export const faqItemType = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    localeStringField("question", "Question"),
    localeTextField("answer", "Answer"),
    defineField({ name: "order", title: "Display Order", type: "number" }),
    defineField({ name: "category", title: "Category (optional)", type: "string" }),
  ],
  preview: {
    select: { title: "question.en" },
  },
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
