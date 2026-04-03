/**
 * Master seed script — runs all individual seed scripts in sequence.
 * Run with: npx tsx scripts/seed-all.ts
 */

import { execSync } from "child_process";

const scripts = [
  "scripts/seed-sanity.ts",        // articles (already exists)
  "scripts/seed-case-studies.ts",
  "scripts/seed-whitepapers.ts",
  "scripts/seed-faq.ts",
  "scripts/seed-audience-pages.ts",
  "scripts/seed-site-settings.ts",
];

for (const script of scripts) {
  console.log(`\n▶ Running ${script}...`);
  execSync(`npx tsx ${script}`, { stdio: "inherit" });
}

console.log("\n✅ All seeds complete.");
