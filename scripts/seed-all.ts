/**
 * Master seed script — runs all individual seed scripts in sequence.
 * Run with: npx tsx scripts/seed-all.ts
 */

import { execSync } from "child_process";

const scripts = [
  "scripts/seed-sanity.ts",           // articles
  "scripts/seed-case-studies.ts",
  "scripts/seed-whitepapers.ts",
  "scripts/seed-faq.ts",
  "scripts/seed-audience-pages.ts",
  "scripts/seed-platform-pages.ts",
  "scripts/seed-site-settings.ts",
  "scripts/seed-about.ts",
  "scripts/seed-trust.ts",
  "scripts/seed-contact-demo.ts",
  "scripts/seed-start-partners.ts",
  "scripts/seed-home.ts",
];

for (const script of scripts) {
  console.log(`\n▶ Running ${script}...`);
  execSync(`~/.nvm/versions/node/v20.19.5/bin/node --import tsx/esm ${script}`, { stdio: "inherit" });
}

console.log("\n✅ All seeds complete.");
