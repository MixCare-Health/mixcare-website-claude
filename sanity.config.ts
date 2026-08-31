"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import seoPlugin from "sanity-plugin-seo";

const projectId = "usfkxchk";
const dataset = "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "MixCare Content Studio",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    visionTool(),
    seoPlugin(),
  ],
});
