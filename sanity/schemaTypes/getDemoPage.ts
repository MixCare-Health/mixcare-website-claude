import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField, localeStringsField } from "./locale-helpers";

export const getDemoPageType = defineType({
  name: "getDemoPage",
  title: "Get a Demo Page",
  type: "document",
  fields: [
    // Hero
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        localeStringField("badge", "Badge"),
        localeStringField("headline", "Headline"),
        localeStringField("headlineHighlight", "Headline Highlight"),
        localeTextField("sub", "Sub-heading"),
      ],
    }),

    // Bullet points
    localeStringsField("bullets", "Bullet Points"),

    // What happens section
    localeStringField("whatHappens", "What Happens Label"),
    localeStringsField("afterSubmit", "After Submit Steps"),

    // Form heading
    localeStringField("formTitle", "Form Title"),
    localeTextField("formSub", "Form Sub-heading"),

    // Form field labels
    defineField({
      name: "fields",
      title: "Form Field Labels",
      type: "object",
      fields: [
        localeStringField("name", "Name Label"),
        localeStringField("email", "Email Label"),
        localeStringField("company", "Company Label"),
        localeStringField("size", "Company Size Label"),
        localeStringField("role", "Role Label"),
        localeStringField("message", "Message Label"),
        localeStringField("messagePlaceholder", "Message Placeholder"),
        localeStringField("submit", "Submit Button"),
        localeStringField("submitting", "Submitting Label"),
        localeStringField("privacy", "Privacy Text"),
        localeStringField("privacyLink", "Privacy Link Text"),
        localeStringField("noSpam", "No Spam Text"),
      ],
    }),

    // Success state
    defineField({
      name: "success",
      title: "Success State",
      type: "object",
      fields: [
        localeStringField("title", "Title"),
        localeTextField("sub", "Sub-heading"),
        localeStringField("explore", "Explore Text"),
        localeStringField("platform", "Platform Link Text"),
        localeStringField("or", "Or Text"),
        localeStringField("caseStudies", "Case Studies Link Text"),
      ],
    }),

    // Dropdown options
    localeStringsField("sizes", "Company Sizes"),
    localeStringsField("roles", "Roles"),
  ],
});
