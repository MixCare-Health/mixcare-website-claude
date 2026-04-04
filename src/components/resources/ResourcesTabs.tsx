import Link from "next/link";
import { BookOpen, FileText, Download, HelpCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { localePath } from "@/lib/locale";

export type ResourceTabKey = "articles" | "case-studies" | "whitepapers" | "faq";

interface Tab {
  key: ResourceTabKey;
  label: string;
  icon: LucideIcon;
}

const TABS: Tab[] = [
  { key: "articles",     label: "Articles",     icon: BookOpen   },
  { key: "case-studies", label: "Case Studies", icon: FileText   },
  { key: "whitepapers",  label: "Whitepapers",  icon: Download   },
  { key: "faq",          label: "FAQ",          icon: HelpCircle },
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
  return (
    /* mt-16 clears the fixed navbar (h-16 = 64px).
       sticky top-16 z-30 keeps it pinned just below the navbar when scrolling. */
    <div className="mt-16 sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Resource sections"
          className="h-12 flex items-center gap-1 overflow-x-auto scrollbar-hide"
        >
          {TABS.map(({ key, label, icon: Icon }) => {
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
