// Resolves the platform page for a "featured solution" card.
// Cards come from Sanity in any order (and the list can be longer than the
// fallback href array), so matching by index produced wrong links and
// "/enundefined". We match on the label first and only fall back to index.
const RULES: { test: RegExp; href: string }[] = [
  { test: /outpatient|門診|门诊/i, href: "/platform/self-funded-outpatient" },
  { test: /spending|\bFSA\b|支出|消費|消费/i, href: "/platform/flexible-spending-account" },
  { test: /marketplace|市集|市场|市場/i, href: "/platform/wellness-marketplace" },
  { test: /wellness hub|健康中心/i, href: "/platform/wellness-hub" },
  { test: /event|活動|活动/i, href: "/platform/wellness-event" },
  { test: /flexible benefits|彈性福利|弹性福利/i, href: "/platform/flexible-benefits" },
];

export function solutionHref(label: string | undefined, index: number, fallbacks: string[]): string {
  const match = label ? RULES.find((r) => r.test.test(label)) : undefined;
  return match?.href ?? fallbacks[index] ?? fallbacks[0];
}
