"use client";

import { useLanguage } from "@/contexts/LanguageContext";

// ── Types ─────────────────────────────────────────────────────────────────────
type Lang = "en" | "zh";

type Entry =
  | { t: "s1";    en: string; zh: string }
  | { t: "s2";    en: string; zh: string }
  | { t: "p";     en: string; zh: string }
  | { t: "li";    en: string; zh: string }
  | { t: "table"; tableId: string };

// ── Parser ────────────────────────────────────────────────────────────────────
function hasChinese(s: string) { return /[\u4e00-\u9fff\uac00-\ud7af]/.test(s); }
function isBi(s: string)       { return s.includes("  |  "); }
function parseBi(s: string)    { const p = s.split("  |  "); return { en: p[0].trim(), zh: p[1]?.trim() ?? "" }; }

function parse(lines: string[]): Entry[] {
  const entries: Entry[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("[H1] ")) {
      const { en, zh } = parseBi(line.slice(5));
      entries.push({ t: "s1", en, zh });
      i++;
    } else if (line.startsWith("[H2] ")) {
      const { en, zh } = parseBi(line.slice(5));
      entries.push({ t: "s2", en, zh });
      i++;
    } else if (line.startsWith("[TABLE_")) {
      const tableId = line.slice(7, -1); // strip "[TABLE_" prefix and "]" suffix
      entries.push({ t: "table", tableId });
      i++;
    } else if (line.startsWith(">> ")) {
      const clean = line.slice(3);
      if (isBi(clean)) {
        const { en, zh } = parseBi(clean);
        entries.push({ t: "li", en, zh });
      } else {
        const next = lines[i + 1] ?? "";
        if (next && hasChinese(next)) {
          entries.push({ t: "li", en: clean, zh: next });
          i += 2; continue;
        } else {
          entries.push({ t: "li", en: clean, zh: "" });
        }
      }
      i++;
    } else if (isBi(line)) {
      const { en, zh } = parseBi(line);
      entries.push({ t: "p", en, zh });
      i++;
    } else {
      const next = lines[i + 1] ?? "";
      if (next && !next.startsWith("[H") && !next.startsWith(">> ") && !next.startsWith("[TABLE_") && hasChinese(next) && !hasChinese(line)) {
        entries.push({ t: "p", en: line, zh: next });
        i += 2;
      } else {
        entries.push({ t: "p", en: line, zh: "" });
        i++;
      }
    }
  }
  return entries;
}

// ── Table data ────────────────────────────────────────────────────────────────
type CookieRow = { name: string; purpose: string; duration: string; kind: string };

const TABLES: Record<string, CookieRow[]> = {
  essential: [
    { name: "_mixcare_session", purpose: "Maintains your login session and keeps you authenticated across pages", duration: "Session", kind: "Essential" },
    { name: "csrf_token",       purpose: "Protects against cross-site request forgery attacks",                   duration: "Session", kind: "Essential" },
    { name: "user_prefs",       purpose: "Stores your language and accessibility preferences",                    duration: "1 year",  kind: "Essential" },
    { name: "cookie_consent",   purpose: "Records your cookie consent choices",                                   duration: "1 year",  kind: "Essential" },
    { name: "load_balancer",    purpose: "Routes requests to the appropriate server for platform stability",       duration: "Session", kind: "Essential" },
  ],
  analytics: [
    { name: "_ga",           purpose: "Google Analytics: distinguishes unique users",                                    duration: "2 years",  kind: "Analytics" },
    { name: "_ga_XXXXXXXX",  purpose: "Google Analytics GA4: maintains session state",                                   duration: "2 years",  kind: "Analytics" },
    { name: "_gid",          purpose: "Google Analytics: distinguishes users within a 24-hour window",                   duration: "24 hours", kind: "Analytics" },
    { name: "_gat",          purpose: "Google Analytics: throttles request rate to Google servers",                      duration: "1 minute", kind: "Analytics" },
    { name: "mixcare_perf",  purpose: "Internal: records page load and feature interaction timings",                     duration: "30 days",  kind: "Analytics" },
  ],
  marketing: [
    { name: "_fbp",         purpose: "Facebook Pixel: tracks conversions from Facebook ads",            duration: "3 months", kind: "Marketing" },
    { name: "_gcl_au",      purpose: "Google Ads: measures ad campaign effectiveness",                  duration: "3 months", kind: "Marketing" },
    { name: "mixcare_ref",  purpose: "Records referral source for campaign attribution",                duration: "30 days",  kind: "Marketing" },
    { name: "li_fat_id",    purpose: "LinkedIn Insight: tracks campaign conversions from LinkedIn",     duration: "1 month",  kind: "Marketing" },
  ],
  ai: [
    { name: "mc_ai_pref",      purpose: "Stores your AI-derived wellness preference profile for personalised recommendations",                         duration: "6 months", kind: "AI / Personalisation" },
    { name: "mc_ai_seg",       purpose: "Assigns you to an anonymised wellness segment to improve recommendation relevance",                           duration: "3 months", kind: "AI / Personalisation" },
    { name: "mc_benefit_ctx",  purpose: "Records your recent benefit interactions to contextualise FSA and Flex Benefit suggestions",                  duration: "90 days",  kind: "AI / Personalisation" },
    { name: "mc_search_hist",  purpose: "Caches recent search queries on the Wellness Marketplace to improve smart-search results",                    duration: "30 days",  kind: "AI / Personalisation" },
    { name: "mc_event_rec",    purpose: "Stores your wellness event attendance history to personalise future event suggestions",                        duration: "6 months", kind: "AI / Personalisation" },
  ],
};

// ── Content renderer ──────────────────────────────────────────────────────────
function CookieContent({ entries, lang }: { entries: Entry[]; lang: Lang }) {
  return (
    <div>
      {entries.map((e, idx) => {
        if (e.t === "table") {
          const rows = TABLES[e.tableId] ?? [];
          return (
            <div key={idx} className="my-5 overflow-x-auto">
              <table className="w-full text-xs border-collapse" suppressHydrationWarning>
                <thead>
                  <tr className="bg-teal-50">
                    <th className="text-left px-3 py-2 border border-slate-200 font-bold text-slate-700 w-36">Cookie Name</th>
                    <th className="text-left px-3 py-2 border border-slate-200 font-bold text-slate-700">Purpose</th>
                    <th className="text-left px-3 py-2 border border-slate-200 font-bold text-slate-700 w-24">Duration</th>
                    <th className="text-left px-3 py-2 border border-slate-200 font-bold text-slate-700 w-28">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-3 py-2 border border-slate-200 font-mono text-teal-700">{r.name}</td>
                      <td className="px-3 py-2 border border-slate-200 text-slate-600">{r.purpose}</td>
                      <td className="px-3 py-2 border border-slate-200 text-slate-600">{r.duration}</td>
                      <td className="px-3 py-2 border border-slate-200 text-slate-500">{r.kind}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        const text = e[lang];
        if (!text) return null;

        if (e.t === "s1") return (
          <div key={idx} className="mt-12 mb-4 pt-8 border-t-2 border-slate-100">
            <h2 className="text-base font-extrabold text-slate-900 leading-snug">{text}</h2>
          </div>
        );
        if (e.t === "s2") return (
          <h3 key={idx} className="text-sm font-bold text-slate-800 mt-7 mb-2 ml-1">{text}</h3>
        );
        if (e.t === "li") return (
          <div key={idx} className="flex gap-3 ml-4 mb-3">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
            <p className="text-sm text-slate-700 leading-7">{text}</p>
          </div>
        );
        return (
          <p key={idx} className="text-sm text-slate-700 leading-7 mb-4 ml-4">{text}</p>
        );
      })}
    </div>
  );
}

// ── Raw content ───────────────────────────────────────────────────────────────
const CONTENT_LINES = [
  `[H1] 1. Introduction  |  一、簡介`,
  `This Cookies Policy explains how MixCare Health ("we", "us", or "our") uses cookies and similar tracking technologies when you visit our website (www.mixcarehealth.com) or use our digital platforms, including the MixCare Health mobile application and employer portal.  |  本 Cookie 政策解釋 MixCare Health（「我們」）在您訪問我們網站（www.mixcarehealth.com）或使用我們的數位平台（包括 MixCare Health 手機應用程式及雇主門戶網站）時，我們如何使用 Cookies 及類似追蹤技術。`,
  `By continuing to use our platforms, you consent to the use of cookies as described in this policy. You may withdraw consent at any time by adjusting your browser or device settings.  |  繼續使用我們的平台，即表示您同意按本政策使用 Cookies。您可隨時透過調整瀏覽器或裝置設定撤回同意。`,
  `[H1] 2. What Are Cookies?  |  二、什麼是 Cookie？`,
  `Cookies are small text files placed on your device (computer, tablet, or mobile phone) when you visit a website. They help websites remember information about your visit, which can make your next visit easier and the site more useful to you.  |  Cookies 是在您訪問網站時放置於您裝置（電腦、平板電腦或手機）的小型文字檔案。它們有助於網站記住您訪問的資訊，從而使您下次訪問更方便，網站對您更有用。`,
  `We also use similar technologies such as web beacons, pixel tags, and local storage objects that function in a similar way to cookies.  |  我們同樣使用網頁信標、像素標籤及本地儲存對象等類似技術，其功能與 Cookies 相似。`,
  `[H1] 3. Types of Cookies We Use  |  三、我們使用的 Cookie 類型`,
  `[H2] 3.1 Essential Cookies  |  3.1 必要 Cookies`,
  `These cookies are strictly necessary for our platforms to function properly. Without them, services such as secure login, session management, and platform navigation would not work. These cookies do not collect personal data for marketing or analytics purposes and cannot be switched off.  |  這些 Cookies 是我們平台正常運作的必要條件。沒有它們，安全登入、工作階段管理及平台導航等服務將無法運作。這些 Cookies 不會基於營銷或分析目的收集個人資料，且無法關閉。`,
  `[TABLE_essential]`,
  `[H2] 3.2 Analytics Cookies  |  3.2 分析 Cookies`,
  `We use analytics cookies to understand how visitors interact with our platforms. This helps us improve user experience, identify popular features, and diagnose technical issues. We use Google Analytics (GA4) for this purpose.  |  我們使用分析 Cookies 了解訪客如何與我們的平台互動，以改善用戶體驗、識別常用功能及診斷技術問題。我們為此目的使用 Google Analytics（GA4）。`,
  `Google Analytics collects information such as pages visited, time spent on the platform, and the general geographic location of users (at city level). IP addresses are anonymised before being transmitted to Google. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on (available at https://tools.google.com/dlpage/gaoptout).  |  Google Analytics 收集訪問頁面、平台使用時間及用戶的大致地理位置（城市級別）等資訊。IP 地址將在傳輸至 Google 前先進行匿名處理。您可透過安裝 Google Analytics 退出瀏覽器擴展功能退出 Google Analytics。`,
  `[TABLE_analytics]`,
  `[H2] 3.3 Marketing & Advertising Cookies  |  3.3 營銷及廣告 Cookies`,
  `Marketing cookies are used to deliver relevant advertisements and measure the effectiveness of our campaigns. They may track your browsing habits across websites to build a profile of your interests. We only place marketing cookies with your explicit consent.  |  營銷 Cookies 用於投放相關廣告及衡量我們推廣活動的成效。它們可能追蹤您在多個網站的瀏覽行為，以建立您的興趣檔案。我們僅在取得您的明確同意後才放置營銷 Cookies。`,
  `These cookies may be set by MixCare Health or by trusted third-party advertising partners. If you decline marketing cookies, you will still see advertisements but they will be less relevant to your interests.  |  這些 Cookies 可能由 MixCare Health 或可信賴的第三方廣告合作商放置。如果您拒絕營銷 Cookies，您仍會看到廣告，但內容將與您的興趣關連性較低。`,
  `[TABLE_marketing]`,
  `[H2] 3.4 AI & Personalisation Cookies  |  3.4 人工智能及個人化 Cookies`,
  `We use cookies and similar technologies to power AI-driven features on our platform, including personalised wellness recommendations, smart search functionality, benefit utilisation insights, and contextual health content. These features are core to the MixCare Health experience across our self-funded outpatient service, Wellness Marketplace, Flexible Spending Account (FSA), Flexible Benefit Solution, and Wellness Events.  |  我們使用 Cookies 及類似技術支援平台上由人工智能驅動的功能，包括個人化健康建議、智慧搜尋、福利使用洞察及內容展示。這些功能是 MixCare Health 基本體驗的核心組成部分，涵蓋自費門診服務、健康市場、彈性支出帳戶、彈性福利方案及健康活動。`,
  `AI personalisation cookies help us learn your preferences over time, such as preferred wellness categories, frequently accessed providers, and benefit utilisation patterns. This data is processed in a pseudonymised form and is used solely to improve your experience within MixCare Health.  |  人工智能個人化 Cookies 幫助我們隨時間了解您的偏好，如常用健康類別、常用服務提供商及福利使用模式。此資料將以假名化形式處理，僅用於改善您在 MixCare Health 內的體驗。`,
  `We do not use AI personalisation data to make automated decisions that produce legal or similarly significant effects on you without human review.  |  我們不會在未經人工審查的情況下，將人工智能個人化資料用於對您產生法律或類似重大影響的自動化決策。`,
  `[TABLE_ai]`,
  `[H1] 4. Cookie Duration  |  四、Cookie 有效期`,
  `Cookies are classified by how long they remain on your device:  |  Cookies 按其在您裝置上的保留時間分類如下：`,
  `>> Session Cookies: These are temporary cookies that are deleted when you close your browser. They enable basic platform functions during your visit.  |  階段性 Cookies：屬臨時 Cookies，關閉瀏覽器後即被刪除，用於支援您訪問期間的平台基本功能。`,
  `>> Persistent Cookies: These remain on your device for a set period (from minutes to years, as specified in the cookie tables above). They are used to remember your preferences across visits.  |  持久性 Cookies：在您裝置上保留指定期限（如上表所示），用於跨次訪問記住您的偏好。`,
  `[H1] 5. How We Use Cookie Data  |  五、我們如何使用 Cookie 資料`,
  `Data collected through cookies may be used for the following purposes:  |  通過 Cookies 收集的資料可能用於以下目的：`,
  `>> Providing and securing access to our platforms and services  |  提供及保障對我們平台及服務的訪問`,
  `>> Remembering your login status, language preferences, and display settings  |  記住您的登入狀態、語言偏好及顯示設定`,
  `>> Measuring website and application performance and diagnosing errors  |  衡量網站及應用程式的效能及診斷錯誤`,
  `>> Understanding how users navigate our services to improve UX design  |  了解用戶如何瀏覽我們的服務，以改善用戶體驗設計`,
  `>> Personalising content, wellness recommendations, and benefit suggestions using AI  |  使用人工智能個人化內容、健康建議及福利建議`,
  `>> Delivering and measuring targeted marketing campaigns  |  投放及衡量廣告推廣活動的成效`,
  `>> Complying with our legal and regulatory obligations  |  履行我們的法律及監管義務`,
  `[H1] 6. Third-Party Cookies  |  六、第三方 Cookies`,
  `Some cookies on our platform are set by third parties, including analytics and advertising providers. These third parties may collect data about your online activity across multiple websites. We do not control third-party cookies. Please refer to the respective privacy policies of our third-party providers for more information.  |  我們平台上的部分 Cookies 由第三方（包括分析及廣告提供商）放置。這些第三方可能收集您在多個網站的網絡活動資料。我們不控制第三方 Cookies。詳情請參閱各第三方提供商的隱私政策。`,
  `Current third-party providers whose cookies may be present on our platforms include: Google LLC (Google Analytics, Google Ads), Meta Platforms Ireland Ltd (Facebook Pixel), and LinkedIn Ireland Unlimited Company (LinkedIn Insight Tag).  |  目前可能在我們平台上放置 Cookies 的第三方提供商包括：Google LLC（Google Analytics、Google Ads）、Meta Platforms Ireland Ltd（Facebook Pixel）及 LinkedIn Ireland Unlimited Company（LinkedIn Insight Tag）。`,
  `[H1] 7. Managing Your Cookie Preferences  |  七、管理您的 Cookie 偏好`,
  `You have several options for controlling cookies:  |  您有以下方式控制 Cookies：`,
  `>> Cookie Banner: When you first visit our platform, you will see a cookie consent banner. You can accept all, reject non-essential, or customise your preferences by category.  |  Cookie 橫幅：首次訪問我們平台時，您將看到 Cookie 同意橫幅。您可選擇接受所有、拒絕非必要類型或按類別自訂偏好。`,
  `>> Cookie Settings: You may update your preferences at any time by clicking the "Cookie Settings" link in the footer of our website or application.  |  Cookie 設定：您可隨時點擊網站或應用程式底部的「Cookie 設定」連結更新您的偏好。`,
  `>> Browser Settings: Most browsers allow you to block or delete cookies through their settings. Please refer to your browser's help documentation for specific instructions.  |  瀏覽器設定：大多數瀏覽器允許您透過設定封鎖或刪除 Cookies。請參閱您瀏覽器的說明文件以獲取具體操作步驟。`,
  `>> Google Analytics Opt-out: Install the Google Analytics Opt-out Browser Add-on from https://tools.google.com/dlpage/gaoptout  |  退出 Google Analytics：安裝 Google Analytics 退出瀏覽器擴展功能，地址：https://tools.google.com/dlpage/gaoptout`,
  `Please note that disabling certain cookies may affect the functionality of our platforms. Essential cookies cannot be disabled as they are required for the platform to operate.  |  請注意，禁用某些 Cookies 可能影響我們平台的功能。必要 Cookies 無法禁用，因為它們是平台運作的必要條件。`,
  `[H1] 8. Cross-Border Data Transfers  |  八、跨境資料傳輸`,
  `Some cookies set by third parties (such as Google and Meta) may result in data being transferred to and processed in countries outside Hong Kong, Macau, or Singapore. Where such transfers occur, we ensure that appropriate safeguards are in place, including standard contractual clauses or adequacy decisions, in accordance with applicable data protection laws (PDPO Cap. 486 / Lei n.º 8/2005 / PDPA 2012).  |  由第三方（如 Google 及 Meta）放置的部分 Cookies 可能導致資料被傳輸至香港、澳門或新加坡以外的國家並在當地處理。發生此類傳輸時，我們會根據適用的資料保護法律（PDPO 第 486 章／澳門第 8/2005 號法律／新加坡 PDPA 2012）確保已就位適當的保障措施（包括標準合同條款或充分性決定）。`,
  `[H1] 9. Consent and Legal Basis for Processing  |  九、同意及處理的法律基礎`,
  `Our legal basis for processing data collected through cookies varies by cookie type:  |  我們通過 Cookies 收集的資料，其處理的法律基礎按 Cookie 類型而有所不同：`,
  `>> Essential cookies: Legitimate interests / Contractual necessity — required to provide the service you have requested.  |  必要 Cookies：合法利益／合同必要性——提供您所要求的服務所必須。`,
  `>> Analytics, Marketing, and AI / Personalisation cookies: Your explicit consent — obtained via our cookie banner or settings.  |  分析、營銷及人工智能／個人化 Cookies：您的明確同意——透過我們的 Cookie 橫幅或設定頁面取得。`,
  `You may withdraw your consent at any time without affecting the lawfulness of processing carried out prior to withdrawal.  |  您可隨時撤回同意，但撤回不影響撤回前已進行的合法處理。`,
  `[H1] 10. Changes to This Cookies Policy  |  十、本 Cookie 政策的變更`,
  `We may update this Cookies Policy from time to time to reflect changes in technology, regulation, or our business practices. When we make material changes, we will notify you via a prominent notice on our website or by email. The updated policy will take effect from the date indicated at the top of the document.  |  我們可能會不時更新本 Cookie 政策，以反映技術、法規或業務實踐的變化。發生重大變更時，我們將透過網站顯著公告或電子郵件通知您。更新後的政策將自文件頂部所註明的日期起生效。`,
  `[H1] 11. Contact Us  |  十一、聯絡我們`,
  `If you have any questions or concerns about our use of cookies or this Cookies Policy, please contact our Data Protection Officer:  |  如果您對我們使用 Cookies 或本 Cookie 政策有任何疑問，請聯絡我們的資料保護主任：`,
];

// ── UI strings ────────────────────────────────────────────────────────────────
const UI_STRINGS = {
  en:      { headerTitle: "Cookies Policy — Hong Kong · Macau · Singapore", contactUs: "Contact Us" },
  "zh-TW": { headerTitle: "Cookie 政策 — 香港 · 澳門 · 新加坡",             contactUs: "聯絡我們" },
  "zh-CN": { headerTitle: "Cookie 政策 — 香港 · 澳门 · 新加坡",             contactUs: "联络我们" },
} as const;

// ── Main component ────────────────────────────────────────────────────────────
export default function CookieViewer() {
  const { locale } = useLanguage();
  const lang: Lang = locale === "en" ? "en" : "zh";
  const ui = UI_STRINGS[locale as keyof typeof UI_STRINGS] ?? UI_STRINGS["en"];
  const entries = parse(CONTENT_LINES);

  return (
    <div>
      {/* Document header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-1">
            Mixup Solution Company Limited
          </p>
          <h2 className="text-xl font-extrabold text-slate-900">{ui.headerTitle}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CookieContent entries={entries} lang={lang} />

        {/* Contact footer */}
        <div className="mt-14 rounded-2xl bg-slate-50 border border-slate-200 p-6">
          <p className="text-sm font-bold text-slate-700 mb-3">{ui.contactUs}</p>
          <div className="text-sm text-slate-600 space-y-1.5">
            <p>Mixup Solution Company Limited (trading as MixCare Health)</p>
            <p>Email: <a href="mailto:info@mixcarehealth.com" className="text-teal-700 hover:underline">info@mixcarehealth.com</a></p>
            <p>Phone: <a href="tel:+85223233132" className="text-teal-700 hover:underline">+852 2323 3132</a></p>
            <p>Website: <a href="https://www.mixcarehealth.com" className="text-teal-700 hover:underline">www.mixcarehealth.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
