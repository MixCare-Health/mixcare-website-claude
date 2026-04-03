import { defineField } from "sanity";

export const localeStringField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "en",   title: "English",  type: "string" }),
      defineField({ name: "zhTW", title: "繁體中文",  type: "string" }),
      defineField({ name: "zhCN", title: "简体中文",  type: "string" }),
    ],
    options: { columns: 1 },
  });

export const localeTextField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "en",   title: "English",  type: "text", rows: 4 }),
      defineField({ name: "zhTW", title: "繁體中文",  type: "text", rows: 4 }),
      defineField({ name: "zhCN", title: "简体中文",  type: "text", rows: 4 }),
    ],
    options: { columns: 1 },
  });

export const localeBulletsField = defineField({
  name: "bullets",
  title: "Bullet Points",
  type: "object",
  description: "Optional bullet list to append after the body text.",
  fields: [
    defineField({ name: "en",   title: "English",  type: "array", of: [{ type: "string" }] }),
    defineField({ name: "zhTW", title: "繁體中文",  type: "array", of: [{ type: "string" }] }),
    defineField({ name: "zhCN", title: "简体中文",  type: "array", of: [{ type: "string" }] }),
  ],
  options: { columns: 1 },
});

export const localeStringsField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    description: "Array of strings per language",
    fields: [
      defineField({ name: "en",   title: "English",  type: "array", of: [{ type: "string" }] }),
      defineField({ name: "zhTW", title: "繁體中文",  type: "array", of: [{ type: "string" }] }),
      defineField({ name: "zhCN", title: "简体中文",  type: "array", of: [{ type: "string" }] }),
    ],
    options: { columns: 1 },
  });
