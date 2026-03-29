## MixCare Health — Copilot Instructions

This project is a Next.js (app router) TypeScript website with Tailwind and HeroUI. The goal of these instructions is to help an AI coding agent be immediately productive by surfacing project-specific conventions, important files, and examples.

- Project roots & tech stack
  - Next.js app directory under `src/app` (server components by default). Key files: `src/app/layout.tsx`, `src/app/providers.tsx`.
  - TypeScript (strict mode), Tailwind CSS, HeroUI (`@heroui/react`), Framer Motion, and `lucide-react` icons.
  - Scripts (package.json): `npm run dev` → `next dev`, `npm run build` → `next build`, `npm run start` → `next start`, `npm run lint` → `next lint`.

- Import style and aliases
  - Path alias `@/*` → `./src/*` (see `tsconfig.json`). Prefer `@/` imports when referencing project files.

- Routing and component model
  - Routes live in `src/app/<route>/page.tsx`. Components under `src/components` are imported by routes.
  - Server vs client: files are server components by default. If a component uses state, effects or browser-only APIs it must include `"use client"` at the top (example: `src/components/Navbar.tsx`). Preserve this marker when refactoring.

- i18n and locale pattern (important)
  - Locale types and constants: `src/lib/locale.ts` (LOCALES, LOCALE_LABELS).
  - Server-side locale detection: `src/lib/locale.server.ts` reads `cookies()` and returns `"en" | "zh-TW" | "zh-CN"`. Cookie key: `locale`.
  - Translations: `src/translations/*.ts` (e.g., `src/translations/en.ts`) export nested objects used via `useLanguage()`.
  - Client provider: `src/app/providers.tsx` wraps the app with `LanguageProvider` from `src/contexts/LanguageContext.tsx`. When changing locale from the client the code calls `router.refresh()` to re-run server rendering that depends on locale.

- Styling and UI library
  - Tailwind config: `tailwind.config.ts` and global styles in `src/app/globals.css`.
  - UI primitives from `@heroui/react` are used across the site (e.g., `Button`). Prefer using HeroUI components for consistent styling.

- Important component patterns & examples
  - `src/components/Navbar.tsx`: large mega-menu example, shows language dropdown, platform menu, and mobile menu patterns. Uses `useLanguage()` translations (t.nav.*), `usePathname()` and `router.refresh()` when locale changes.
  - `src/components/home/*`: home page is composed of smaller sections. Follow the pattern of small, focused components under `src/components/home` and shared components under `src/components/shared`.

- External & integration notes
  - Logo uses an external image URL (not Next Image). Be careful when switching to Next Image—verify external domains and layout changes.
  - No obvious backend services or API clients included in the repo. If adding integrations, include secrets in environment variables and follow Next.js conventions (`process.env` via `next.config` or server runtime environment).

- Developer workflows
  - To run locally: `npm install` then `npm run dev` (development server).
  - Build and start for production: `npm run build` then `npm run start`.
  - Lint: `npm run lint` (uses `next lint`).
  - Node and environment: project uses modern Next/TS; avoid changing compilation targets without verifying `tsconfig.json` and `next.config.ts`.

- Code conventions and small rules the repo follows
  - Keep `"use client"` only in files that need it. Converting server → client is deliberate and has runtime implications.
  - Use the translation object shape (e.g., `t.nav.platformLinks` expects an array with {label, desc}). Edit translations files to change copy.
  - Use `@/` imports for internal modules. Don't invent other path aliases.
  - Preserve `incremental` and `noEmit` TypeScript settings (fast incremental builds, no emit during typecheck).

- Where to look when changing behavior
  - Locale and language: `src/lib/locale.ts`, `src/lib/locale.server.ts`, `src/contexts/LanguageContext.tsx`, `src/translations/*`.
  - Layout and providers: `src/app/layout.tsx`, `src/app/providers.tsx`.
  - Global styles and Tailwind: `src/app/globals.css`, `tailwind.config.ts`, `postcss.config.mjs`.
  - Navigation UI patterns: `src/components/Navbar.tsx` and `src/components/shared/PageHero.tsx`.

- Tests / CI
  - No tests or CI config found in the repository. If adding tests, prefer small unit tests for pure logic and component-level tests for UI pieces.

If anything is unclear or you'd like additional coverage (e.g., specific patterns in `LanguageContext`, or a standard PR checklist), tell me which area to expand and I will update this file.
