import Link from "next/link";
import { BookOpen, FileText, Download, HelpCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { localePath } from "@/lib/locale";
import { getTranslations } from "@/translations";

export type ResourceTabKey = "articles" | "case-studies" | "whitepapers" | "faq";

interface Tab {
  key: ResourceTabKey;
  icon: LucideIcon;
}

const TAB_DEFS: Tab[] = [
  { key: "articles",     icon: BookOpen   },
  { key: "case-studies", icon: FileText   },
  { key: "whitepapers",  icon: Download   },
  { key: "faq",          icon: HelpCircle },
];

const HREFS: Record<ResourceTabKey, string> = {
  "articles":     "/resources/articles",
  "case-studies": "/resources/case-studies",
  "whitepapers":  "/resources/whitepapers",
  "faq":          "/resources/faq",
};

interface Props {
  active: ResourceTabKey;
  locale: string;
}

export default function ResourcesTabs({ active, locale }: Props) {
  const t = getTranslations(locale as "en" | "zh-TW" | "zh-CN");
  const tabs = t.resources.tabs;

  const LABELS: Record<ResourceTabKey, string> = {
    "articles":     tabs.articles,
    "case-studies": tabs.caseStudies,
    "whitepapers":  tabs.whitepapers,
    "faq":          tabs.faq,
  };

  return (
    /* mt-16 clears the fixed navbar (h-16 = 64px).
       sticky top-16 z-30 keeps it pinned just below the navbar when scrolling. */
    <div className="mt-16 sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Resource sections"
          className="h-12 flex items-center gap-1 overflow-x-auto scrollbar-hide lg:justify-center"
        >
          {TAB_DEFS.map(({ key, icon: Icon }) => {
            const label = LABELS[key];
            const isActive = key === active;
            return (
              <Link
                key={key}
                href={localePath(locale as "en" | "zh-TW" | "zh-CN", HREFS[key])}
                className={`
                  h-full flex items-center gap-2 px-5 text-sm font-semibold whitespace-nowrap
                  border-b-2 transition-colors duration-150
                  ${isActive
                    ? "border-teal-500 text-teal-700 bg-teal-50/60"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                  }
                `}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
