"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// ── Types ─────────────────────────────────────────────────────────────────────
type Lang = "en" | "zh";

type Entry =
  | { t: "s1"; en: string; zh: string }
  | { t: "s2"; en: string; zh: string }
  | { t: "p";  en: string; zh: string }
  | { t: "li"; en: string; zh: string };

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
      if (next && !next.startsWith("[H") && !next.startsWith(">> ") && hasChinese(next) && !hasChinese(line)) {
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

// ── Content renderer ──────────────────────────────────────────────────────────
function PpContent({ entries, lang }: { entries: Entry[]; lang: Lang }) {
  return (
    <div>
      {entries.map((e, idx) => {
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

const HK_LINES = [
  `[H1] Introduction  |  引言`,
  `Your privacy and the confidentiality of your personal information is important to Mixup Solution Company Limited ("MixCare Health", "we", "our", "us"). This Privacy Policy ("Policy") sets out how we collect, use, disclose, retain, and protect your personal information in connection with all services provided by MixCare Health, including our self-funded outpatient service, Wellness Marketplace, Flexible Spending Account, Flexible Benefit Solution, and Wellness Events.`,
  `您的隱私及個人資料的保密對 Mixup Solution Company Limited（「MixCare Health」、「我們」）至為重要。本私隱政策（「本政策」）就我們就MixCare Health所有服務（包括自費門診服務、保健市集、彈性消費帳戶、彈性福利方案及保健活動）的個人資料收集、使用、披露、保留及保護方式作出說明。`,
  `This Policy is governed by and complies with the Personal Data (Privacy) Ordinance (Cap. 486, Laws of Hong Kong) ("PDPO") and its six Data Protection Principles. For members and users in Macau, this Policy additionally complies with the Macau Personal Data Protection Act (Lei n.º 8/2005). By using our services, you consent to the practices described in this Policy.`,
  `本政策受《個人資料（私隱）條例》（香港法例第486章）（「條例」）及其六項資料保護原則的規管及符合其要求。對於澳門的會員及用戶，本政策另外遵守澳門《個人資料保護法》（第8/2005號法律）。使用我們的服務即表示您同意本政策所述的做法。`,
  `[H1] Our Privacy Principles  |  我們的私隱原則`,
  `MixCare Health is committed to protecting your personal data in accordance with the six Data Protection Principles ("DPPs") of the PDPO:`,
  `MixCare Health承諾按照條例下六項資料保護原則（「DPPs」）保護您的個人資料：`,
  `>> DPP 1 – Collection: We collect personal data only for lawful, specified purposes and in a fair manner, limited to what is necessary for those purposes.  |  DPP 1 – 收集：我們僅為合法、特定目的以公平方式收集個人資料，且不超過該目的所需限量。`,
  `>> DPP 2 – Accuracy: We take reasonable steps to ensure personal data is accurate and kept up-to-date.  |  DPP 2 – 準確：我們採取合理步驟確保個人資料準確並保持更新。`,
  `>> DPP 3 – Use: We use personal data only for the purpose it was collected or a directly related purpose, unless consent is obtained.  |  DPP 3 – 使用：我們僅將個人資料用於收集目的或直接相關目的，除非獲得同意。`,
  `>> DPP 4 – Security: We protect personal data against unauthorised or accidental access, processing, erasure, loss, or use.  |  DPP 4 – 安全：我們保護個人資料，防止未經授權或意外的存取、處理、刪除、遺失或使用。`,
  `>> DPP 5 – Openness: We make our data policies and practices readily available to the public.  |  DPP 5 – 公開：我們將資料政策及做法公開供大眾參閱。`,
  `>> DPP 6 – Access and Correction: We respect your right to access and correct your personal data.  |  DPP 6 – 查閱及更正：我們尊重您查閱及更正個人資料的權利。`,
  `[H1] Services Covered by This Policy  |  本政策所涵蓋的服務`,
  `This Privacy Policy applies to personal data collected through all MixCare Health services, including:`,
  `本私隱政策適用於通過所有MixCare Health服務所收集的個人資料，包括：`,
  `>> Self-Funded Outpatient Service: data collected during GP/Specialist consultations, appointment bookings, and claim submissions.  |  自費門診服務：全科醫生／專科就診、預約及理賠申請期間所收集的資料。`,
  `>> Wellness Marketplace: data collected when you browse, book, and transact with third-party Wellness Providers.  |  保健市集：您瀏覽、預訂及與第三方保健服務提供商交易時所收集的資料。`,
  `>> Flexible Spending Account (FSA): data collected to administer your employer-funded benefit balance, eligible claims, and transaction history.  |  彈性消費帳戶（FSA）：管理您由雇主資助的福利餘額、符合資格的理賠及交易記錄所收集的資料。`,
  `>> Flexible Benefit Solution: data collected to configure and manage personalised employee benefit packages on behalf of corporate clients.  |  彈性福利方案：代表企業客戶配置及管理個人化員工福利套餐所收集的資料。`,
  `>> Wellness Events: data collected for event registration, attendance, feedback, and follow-up communications.  |  保健活動：活動登記、出席、反饋及追蹤聯絡所收集的資料。`,
  `[H1] Personal Data We Collect  |  我們收集的個人資料`,
  `[H2] Categories of Data  |  資料類別`,
  `We may collect the following categories of personal data:`,
  `我們可能收集以下類別的個人資料：`,
  `>> Identity information: full name, date of birth, staff ID, gender  |  身份資料：全名、出生日期、員工編號、性別`,
  `>> Contact details: email address, phone number, mailing address  |  聯絡資料：電郵地址、電話號碼、郵寄地址`,
  `>> Financial information: bank account details, credit/debit card details, payment transaction records  |  財務資料：銀行帳戶資料、信用卡／借記卡資料、付款交易記錄`,
  `>> Health and medical information: appointment records, consultation notes, diagnosis and treatment information, claim documents and wellness receipts  |  健康及醫療資料：預約記錄、診診記錄、診斷及治療資訊、理賠文件及保健收據`,
  `>> Profile information: profile photo, membership status, benefit entitlements  |  個人資料：個人照片、會員狀態、福利資格`,
  `>> Usage data: platform activity logs, booking and claim history, session data  |  使用資料：平台活動日誌、預訂及理賠記錄、就診資料`,
  `>> Technical data: IP address, device identifiers, browser type, cookie data  |  技術資料：IP地址、裝置識別碼、瀏覽器類型、Cookie資料`,
  `[H2] How We Collect Data  |  收集方式`,
  `We collect personal data through:`,
  `我們通過以下方式收集個人資料：`,
  `>> Online registration, membership applications, and account management on our Platform  |  在我們平台上線上登記、會員申請及帳戶管理`,
  `>> Completion of forms, surveys, feedback, or wellness event registration  |  填寫表格、調查、反饋或保健活動登記`,
  `>> Email, chat, phone, or SMS communications with our team  |  與我們團隊的電郵、聊天、電話或短訊通訊`,
  `>> Appointment booking and claims submission through the MixCare app or website  |  通過MixCare應用程式或網站預訂預約及提交理賠`,
  `>> Website cookies and tracking technologies (see Cookie Policy)  |  網站Cookie及追蹤技術（請參閱Cookie政策）`,
  `>> Third parties such as payment gateways, your employer or plan sponsor, social media platforms, or family members acting on your behalf  |  第三方，如付款閘道、您的雇主或計劃發起人、社交媒體平台或代您行事的家庭成員`,
  `[H1] How We Use Your Personal Data  |  我們如何使用您的個人資料`,
  `In accordance with DPP 3 of the PDPO, we use your personal data only for the purposes for which it was collected or directly related purposes. These include:`,
  `根據條例DPP 3，我們僅將您的個人資料用於收集目的或直接相關目的，包括：`,
  `>> Providing, operating, and improving our services, platform, and mobile application  |  提供、運營及改善我們的服務、平台及移動應用程式`,
  `>> Processing membership applications, renewals, and benefit entitlements  |  處理會員申請、續期及福利資格`,
  `>> Administering FSA balances, claims processing, and benefit allocation under the Flexible Benefit Solution  |  管理FSA餘額、理賠處理及彈性福利方案下的福利分配`,
  `>> Verifying your identity and conducting fraud prevention checks  |  驗證您的身份及進行欺詐預防檢查`,
  `>> Processing payments and maintaining financial records  |  處理付款及維護財務記錄`,
  `>> Facilitating appointment bookings with GPs, Specialists, and Wellness Providers  |  協助預訂全科醫生、專科醫生及保健服務提供商的預約`,
  `>> Sending service notifications, appointment reminders, and transactional communications  |  發送服務通知、預約提醒及交易通訊`,
  `>> Conducting wellness event management and post-event follow-up  |  管理保健活動及活動後追蹤`,
  `>> Displaying your profile image and membership information within the app or website  |  在應用程式或網站內顯示您的個人照片及會員資料`,
  `>> Conducting market research, analytics, and service improvement (using aggregated or anonymised data where possible)  |  進行市場研究、數據分析及服務改善（盡可能使用整合或匿名化資料）`,
  `>> Complying with applicable laws and regulations, including PDPO requirements and court orders  |  遵守適用法律法規，包括條例要求及法院命令`,
  `>> With your separate consent: sending marketing communications about our services and partner offers  |  經您另行同意：發送有關我們服務及合作夥伴優惠的營銷通訊`,
  `[H1] Use of Personal Data in Artificial Intelligence (AI)  |  個人資料在人工智能（AI）中的使用`,
  `MixCare Health may use AI and machine learning technologies to enhance and personalise your experience on our platform. This section explains how your personal data may be processed in connection with AI features.`,
  `MixCare Health可能使用人工智能及機器學習技術來強化及個人化您在我們平台上的體驗。本節說明您的個人資料如何在與AI功能相關的情況下被處理。`,
  `[H2] AI Features We Use  |  我們使用的AI功能`,
  `AI features on our platform may include:`,
  `我們平台上的AI功能可能包括：`,
  `>> Personalised health and wellness recommendations based on your usage history, benefit selections, and stated preferences  |  根據您的使用記錄、福利選擇及述明的偏好而提供個人化健康及保健建議`,
  `>> Wellness Marketplace search ranking and product recommendations tailored to your profile  |  根據您的資料對保健市集搜尋排名及產品建議進行個人化`,
  `>> FSA and Flexible Benefit optimisation suggestions to help you maximise your benefit credits  |  FSA及彈性福利優化建議，協助您最大化福利積分`,
  `>> Automated processing of claim documents and wellness receipts for eligibility checks  |  自動處理理賠文件及保健收據以進行資格檢查`,
  `>> Anomaly detection for fraud prevention and account security  |  異常檢測以預防欺詐及保障帳戶安全`,
  `[H2] Data Used in AI Processing  |  AI處理所使用的資料`,
  `AI features may process the following categories of your personal data: usage patterns and platform activity, benefit selections and claim history, health and wellness preferences you provide, and anonymised or aggregated usage data for model training and improvement. We do not use AI to make fully automated decisions that have significant legal effects on you without human oversight.`,
  `AI功能可能處理以下類別的個人資料：使用模式及平台活動、福利選擇及理賠記錄、您提供的健康及保健偏好，以及用於模型訓練及改善的匿名化或整合使用資料。我們不會在沒有人類監督的情況下使用AI作出對您具有重大法律效果的完全自動化決定。`,
  `[H2] Legal Basis and Your Rights  |  法律依據及您的權利`,
  `AI processing of your personal data is conducted on the legal basis of: (a) performance of our contract with you; (b) compliance with legal obligations; and (c) our legitimate interests in improving service quality, subject to your interests and rights. Where AI processing is based on consent, you may withdraw consent at any time by contacting info@mixcarehealth.com. Withdrawal of consent will not affect processing already carried out.`,
  `AI處理您個人資料的法律依據為：(a)履行我們與您的合同；(b)遵守法律義務；及(c)我們在符合您的利益及權利的前提下改善服務質素的正當利益。如AI處理基於同意，您可隨時聯絡info@mixcarehealth.com撤回同意。撤回同意不影響已進行的處理。`,
  `[H2] AI Limitations Disclaimer  |  AI限制免責聲明`,
  `AI-generated recommendations and outputs are for informational purposes only. They do not constitute medical advice, diagnosis, or treatment. MixCare Health is not liable for any decisions made based solely on AI-generated outputs. Always consult a qualified healthcare professional for medical decisions.`,
  `AI生成的建議及輸出僅供資訊目的。它們不構成醫療建議、診斷或治療。MixCare Health對僅根據AI輸出所作的任何決定不承擔責任。醫療決定請諮詢合資格的醫療專業人員。`,
  `[H1] Sharing Your Personal Data  |  分享您的個人資料`,
  `We may share your personal data with the following categories of recipients, subject to appropriate data processing agreements and safeguards:`,
  `我們可能將您的個人資料在適當的資料處理協議及保障措施下分享給以下類別的接收方：`,
  `>> Wellness Providers on the Marketplace who fulfil your bookings and services  |  在市集上完成您預訂及服務的保健服務提供商`,
  `>> Your employer or plan sponsor for benefit administration purposes under the FSA or Flexible Benefit Solution  |  您的雇主或計劃發起人，用於FSA或彈性福利方案下的福利管理目的`,
  `>> Payment gateway providers and financial institutions for processing transactions  |  用於處理交易的付款閘道提供商及金融機構`,
  `>> IT service providers, cloud hosting providers, and analytics partners who support our platform operations  |  支援我們平台運營的IT服務提供商、雲端托管提供商及分析合作夥伴`,
  `>> Regulatory authorities, law enforcement, or courts as required by law, including compliance with PDPO obligations  |  如法律要求，包括遵守條例義務，向監管機構、執法機構或法院提供`,
  `We do not sell, rent, or license your personal data to third parties for their own marketing purposes.`,
  `我們不會將您的個人資料出售、出租或許可給第三方用於其自身的營銷目的。`,
  `[H1] Cross-border Data Transfers  |  跨境資料傳輸`,
  `Your personal data may be transferred to or processed in jurisdictions outside Hong Kong or Macau (for example, where our cloud service providers are based). We take steps to ensure equivalent data protection standards apply to all transfers, in compliance with Schedule 3 of the PDPO and applicable transfer regulations.`,
  `您的個人資料可能會被傳輸至香港或澳門以外的司法管轄區域或在其中處理（例如我們的雲端服務提供商所在地）。我們會採取步驟以確保所有傳輸均遵守條例附表3及適用的傳輸法規，並適用同等水準的資料保護標準。`,
  `[H1] Data Security  |  資料安全`,
  `In accordance with DPP 4 of the PDPO, we implement appropriate technical and organisational measures to protect your personal data against unauthorised or accidental access, collection, use, disclosure, copying, modification, disposal, or similar risks. These measures include:`,
  `根據條例DPP 4，我們實施適當的技術和組織措施，保護您的個人資料免受未經授權或意外的存取、收集、使用、披露、複製、修改、處置或類似風險。該措施包括：`,
  `>> End-to-end encryption of sensitive data in transit and at rest  |  傳輸中和靜止狀態的敏感資料的端到端加密`,
  `>> Role-based access controls limiting data access to authorised personnel only  |  基於角色的訪問控制，僅限授權人員存取資料`,
  `>> Regular security assessments, penetration testing, and vulnerability management  |  定期安全評估、滲透測試及漏洞管理`,
  `>> Staff training on data protection obligations and privacy best practices  |  對員工進行資料保護義務及私隱最佳做法的培訓`,
  `>> Incident response procedures for data breaches, including notification to the Privacy Commissioner for Personal Data (PCPD) where required  |  資料外洩的應對程序，包括在需要時通知個人資料私隱專員公署`,
  `[H1] Data Retention  |  資料保留`,
  `We retain your personal data for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Our general retention periods are:`,
  `我們將您的個人資料保留至完成收集目的所需時間，或適用法律所要求的期限為止。我們的一般保留期限為：`,
  `>> Membership and account records: for the duration of membership plus 7 years  |  會員及帳戶記錄：會員期間加7年`,
  `>> Health and medical records: as required by applicable medical record retention laws or 7 years, whichever is longer  |  健康及醫療記錄：適用醫療記錄保留法律或7年，以較長者為準`,
  `>> Financial and payment records: 7 years in compliance with Hong Kong tax and commercial regulations  |  財務及付款記錄：遵守香港稅務及商業法規，保留7年`,
  `>> Marketing communications data: until you withdraw consent or opt out  |  營銷通訊資料：直至您撤回同意或選擇退出`,
  `Upon expiry of the retention period, personal data will be securely deleted or anonymised.`,
  `保留期限屆滿後，個人資料將被安全刪除或匿名化處理。`,
  `[H1] Your Rights  |  您的權利`,
  `Under the PDPO, you have the following rights in relation to your personal data held by us:`,
  `根據條例，您對我們持有的您的個人資料擁有以下權利：`,
  `>> Right of Access (DPP 6): You may request access to personal data we hold about you. We will respond within 40 days of receiving a valid Data Access Request (DAR).  |  查閱權（DPP 6）：您可要求查閱我們持有的您的個人資料。我們將在收到有效查閱資料請求後40天內作出回應。`,
  `>> Right of Correction (DPP 6): You may request correction of inaccurate personal data. We will respond within 40 days.  |  更正權（DPP 6）：您可要求更正不準確的個人資料。我們將在40天內作出回應。`,
  `>> Right to Opt Out of Direct Marketing: You may at any time withdraw consent to the use of your personal data for direct marketing.  |  退出直接營銷權：您可隨時撤回將您的個人資料用於直接營銷的同意。`,
  `>> Right to Complain: If you believe your rights under the PDPO have been infringed, you may lodge a complaint with the Privacy Commissioner for Personal Data (PCPD) at www.pcpd.org.hk.  |  投訴權：如您認為您在條例下的權利受到侵犯，可向個人資料私隱專員公署（網址：www.pcpd.org.hk）提出投訴。`,
  `To exercise your rights, please contact us in writing at info@mixcarehealth.com, clearly stating the nature of your request. We may charge a reasonable fee for processing Data Access Requests, as permitted under the PDPO.`,
  `如需行使權利，請以書面形式向info@mixcarehealth.com發出請求，請清楚說明您請求的性質。我們可能會按條例所允許收取合理費用以處理查閱資料請求。`,
  `[H1] Cookies and Tracking Technologies  |  Cookie及追蹤技術`,
  `We use cookies and similar tracking technologies on our website and app to improve functionality, analyse usage, and personalise your experience. You may manage cookie preferences through your browser settings. Disabling cookies may affect the functionality of certain features.`,
  `我們在網站及應用程式上使用Cookie及類似追蹤技術，以改善功能性、分析使用情況及個人化您的體驗。您可通過瀏覽器設定管理Cookie偏好。禁用Cookie可能影響某些功能的使用。`,
  `[H1] Changes to This Policy  |  本政策的變更`,
  `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated Policy on our platform and, where appropriate, by direct notification. The date of the most recent revision is indicated at the top of this Policy. Your continued use of our services after any update constitutes acceptance of the revised Policy.`,
  `我們可能會不時更新本私隱政策。我們將通過在平台上發布更新的政策，並在適當情況下直接通知您重大變更。任何更新後繼續使用我們的服務即表示接受修訂後的政策。`,
];

const SG_LINES = [
  `[H1] Introduction  |  引言`,
  `Your privacy and the confidentiality of your personal information is important to Mixup Solution Company Limited ("MixCare Health", "we", "our", "us"). This Privacy Policy ("Policy") sets out how we collect, use, disclose, retain, and protect your personal information in connection with all MixCare Health services, including our self-funded outpatient service, Wellness Marketplace, Flexible Spending Account, Flexible Benefit Solution, and Wellness Events.`,
  `您的隐私及个人信息的保密对Mixup Solution Company Limited（"MixCare Health"、"我们"）至关重要。本隐私政策（"本政策"）就我们就MixCare Health所有服务（包括自费门诊服务、保健市集、弹性消费账户、弹性福利方案及保健活动）的个人信息收集、使用、披露、保留及保护方式作出说明。`,
  `This Policy is governed by and complies with the Personal Data Protection Act 2012 (Singapore) ("PDPA") and its mandatory data protection obligations. By using our services, you consent to the practices described in this Policy.`,
  `本政策受新加坡《个人数据保护法》（2012年）（"PDPA"）及其强制性数据保护义务的规管并符合其要求。使用我们的服务即表示您同意本政策所述的做法。`,
  `Our Data Protection Officer (DPO) can be contacted at: info@mixcarehealth.com.`,
  `我们的数据保护官（DPO）可通过以下方式联系：info@mixcarehealth.com。`,
  `[H1] Our Data Protection Obligations  |  我们的数据保护义务`,
  `MixCare Health complies with the following mandatory obligations under the PDPA:`,
  `MixCare Health遵守PDPA下的以下强制性义务：`,
  `>> Consent Obligation: We obtain your consent before collecting, using, or disclosing your personal data, unless an exception under the PDPA applies.  |  同意义务：我们在收集、使用或披露您的个人数据前征得您的同意，除非PDPA下适用例外。`,
  `>> Purpose Limitation Obligation: We collect, use, and disclose personal data only for purposes that a reasonable person would consider appropriate in the circumstances.  |  目的限制义务：我们仅出于合理人在该情况下认为适当的目的收集、使用和披露个人数据。`,
  `>> Notification Obligation: We inform you of the purposes for which your personal data is collected at or before the time of collection.  |  通知义务：我们在收集您的个人数据时或之前告知您收集目的。`,
  `>> Access and Correction Obligation: We provide you with access to and the ability to correct your personal data held by us.  |  查阅和更正义务：我们为您提供查阅和更正我们持有的您的个人数据的权利。`,
  `>> Accuracy Obligation: We make reasonable effort to ensure personal data collected is accurate and complete.  |  准确性义务：我们尽合理努力确保所收集的个人数据准确完整。`,
  `>> Protection Obligation: We protect personal data in our possession or control by implementing reasonable security arrangements.  |  保护义务：我们通过实施合理的安全安排保护我们持有或控制的个人数据。`,
  `>> Retention Limitation Obligation: We cease to retain personal data when it is no longer necessary for any business or legal purpose.  |  保留限制义务：当个人数据不再是任何业务或法律目的所必需时，我们将停止保留该数据。`,
  `>> Transfer Limitation Obligation: We transfer personal data overseas only to countries with comparable data protection standards or under contractual protections.  |  转移限制义务：我们仅将个人数据转移至具有可比数据保护标准或具备合同保护的国家或地区。`,
  `>> Data Breach Notification Obligation: We notify the Personal Data Protection Commission (PDPC) and affected individuals of notifiable data breaches within 3 business days of assessment.  |  数据泄露通知义务：我们将在评估后3个工作日内就可通知数据泄露事件向个人数据保护委员会（PDPC）及受影响个人发出通知。`,
  `[H1] Services Covered by This Policy  |  本政策所涵盖的服务`,
  `This Privacy Policy applies to personal data collected through all MixCare Health services, including:`,
  `本隐私政策适用于通过所有MixCare Health服务所收集的个人数据，包括：`,
  `>> Self-Funded Outpatient Service: data collected during GP/Specialist consultations, appointment bookings, and claim submissions.  |  自费门诊服务：全科医生／专科就诊、预约及理赔申请期间所收集的数据。`,
  `>> Wellness Marketplace: data collected when you browse, book, and transact with third-party Wellness Providers.  |  保健市集：您浏览、预订及与第三方保健服务提供商交易时所收集的数据。`,
  `>> Flexible Spending Account (FSA): data collected to administer your employer-funded benefit balance, eligible claims, and transaction history.  |  弹性消费账户（FSA）：管理您由雇主资助的福利余额、符合资格的理赔及交易记录所收集的数据。`,
  `>> Flexible Benefit Solution: data collected to configure and manage personalised employee benefit packages on behalf of corporate clients.  |  弹性福利方案：代表企业客户配置及管理个性化员工福利套餐所收集的数据。`,
  `>> Wellness Events: data collected for event registration, attendance, feedback, and follow-up communications.  |  保健活动：活动登记、出席、反馈及追踪联络所收集的数据。`,
  `[H1] Personal Data We Collect  |  我们收集的个人数据`,
  `[H2] Categories of Data  |  数据类别`,
  `We may collect the following categories of personal data:`,
  `我们可能收集以下类别的个人数据：`,
  `>> Identity information: full name, date of birth, NRIC/FIN, staff ID, gender  |  身份信息：姓名、出生日期、身份证号码（NRIC/FIN）、员工编号、性别`,
  `>> Contact details: email address, phone number, mailing address  |  联系资料：电邮地址、电话号码、邮寄地址`,
  `>> Financial information: bank account details, credit/debit card details, payment records  |  财务信息：银行账户资料、信用卡／借记卡资料、付款记录`,
  `>> Health and medical information: consultation records, diagnosis and treatment information, claim documents, wellness receipts  |  健康及医疗信息：就诊记录、诊断及治疗信息、理赔文件、保健收据`,
  `>> Profile information: profile photo, membership status, benefit entitlements  |  个人资料：个人照片、会员状态、福利资格`,
  `>> Usage data: platform activity logs, booking and claim history  |  使用数据：平台活动日志、预订及理赔记录`,
  `>> Technical data: IP address, device identifiers, browser type, cookie data  |  技术数据：IP地址、设备标识符、浏览器类型、Cookie数据`,
  `[H2] How We Collect Data  |  收集方式`,
  `We collect personal data through:`,
  `我们通过以下方式收集个人数据：`,
  `>> Online registration, membership applications, and account management on our Platform  |  在我们平台上进行在线注册、会员申请及账户管理`,
  `>> Completion of forms, surveys, feedback, or wellness event registration  |  填写表格、调查、反馈或保健活动登记`,
  `>> Email, chat, phone, or SMS communications with our team  |  与我们团队的电邮、聊天、电话或短信通讯`,
  `>> Appointment booking and claims submission through the MixCare app or website  |  通过MixCare应用程序或网站预订预约及提交理赔`,
  `>> Cookies and tracking technologies (see Cookie Policy)  |  Cookie及追踪技术（请参阅Cookie政策）`,
  `>> Third parties such as payment gateways, your employer or plan sponsor, or social media platforms  |  第三方，如付款网关、您的雇主或计划发起人或社交媒体平台`,
  `[H1] How We Use Your Personal Data  |  我们如何使用您的个人数据`,
  `Subject to applicable PDPA obligations and your consent where required, we use your personal data for the following purposes:`,
  `在遵守PDPA义务及在需要时征得您同意的前提下，我们将您的个人数据用于以下目的：`,
  `>> Providing, operating, and improving our services, platform, and mobile application  |  提供、运营及改善我们的服务、平台及移动应用程序`,
  `>> Processing membership applications, renewals, and benefit entitlements  |  处理会员申请、续期及福利资格`,
  `>> Administering FSA balances, claims processing, and benefit allocation under the Flexible Benefit Solution  |  管理FSA余额、理赔处理及弹性福利方案下的福利分配`,
  `>> Verifying your identity (including NRIC/FIN where applicable) and conducting fraud prevention checks  |  验证您的身份（包括适用时的NRIC/FIN）及进行欺诈预防检查`,
  `>> Processing payments and maintaining financial records in compliance with Singapore tax obligations  |  遵守新加坡税务义务，处理付款及维护财务记录`,
  `>> Facilitating appointment bookings with GPs, Specialists, and Wellness Providers  |  协助预订全科医生、专科医生及保健服务提供商的预约`,
  `>> Sending service notifications, appointment reminders, and transactional communications  |  发送服务通知、预约提醒及交易通讯`,
  `>> Conducting wellness event management and post-event follow-up  |  管理保健活动及活动后跟踪`,
  `>> Conducting market research and analytics using anonymised or aggregated data  |  使用匿名化或整合数据进行市场研究和数据分析`,
  `>> Complying with PDPA obligations, other applicable Singapore laws, and court orders  |  遵守PDPA义务、其他适用新加坡法律及法院命令`,
  `>> With your separate consent: sending marketing messages about our services and partner offers  |  在征得您单独同意的情况下：发送关于我们服务及合作伙伴优惠的营销信息`,
  `We do not use your personal data for direct marketing without your express consent, in compliance with the PDPA and the Do Not Call (DNC) Registry provisions.`,
  `我们不会在没有您明确同意的情况下将您的个人数据用于直接营销，这符合PDPA与"谢绝接听"（DNC）登记册的规定。`,
  `[H1] Use of Personal Data in Artificial Intelligence (AI)  |  个人数据在人工智能（AI）中的使用`,
  `MixCare Health may use AI and machine learning technologies to enhance and personalise your experience. This section explains how your personal data may be processed in connection with AI features.`,
  `MixCare Health可能使用人工智能及机器学习技术来增强并个性化您的体验。本节说明您的个人数据如何在与AI功能相关的情况下被处理。`,
  `[H2] AI Features We Use  |  我们使用的AI功能`,
  `AI features on our platform may include:`,
  `我们平台上的AI功能可能包括：`,
  `>> Personalised health and wellness recommendations based on your usage history, benefit selections, and stated preferences  |  根据您的使用记录、福利选择及述明的偏好提供个性化健康及保健建议`,
  `>> Wellness Marketplace search ranking and product recommendations tailored to your profile  |  根据您的资料对保健市集搜索排名及产品建议进行个性化`,
  `>> FSA and Flexible Benefit optimisation suggestions to help you maximise benefit credits  |  FSA及弹性福利优化建议，协助您最大化福利积分`,
  `>> Automated processing of claim documents and wellness receipts for eligibility checks  |  自动处理理赔文件及保健收据以进行资格检查`,
  `>> Anomaly detection for fraud prevention and account security  |  异常检测以预防欺诈及保障账户安全`,
  `[H2] Data Used in AI Processing  |  AI处理所使用的数据`,
  `AI features may process: usage patterns and platform activity, benefit selections and claim history, health and wellness preferences you provide, and anonymised or aggregated usage data for model improvement. We obtain your consent before using your personal data to train AI models in ways that go beyond the original collection purpose. You may withdraw consent at any time by contacting info@mixcarehealth.com.`,
  `AI功能可能处理：使用模式及平台活动、福利选择及理赔记录、您提供的健康及保健偏好，以及用于模型改善的匿名化或整合使用数据。在超出原始收集目的的情况下使用您的个人数据训练AI模型，我们会征得您的同意。您可通过联系info@mixcarehealth.com随时撤回同意。`,
  `[H2] PDPA Compliance for AI  |  AI的PDPA合规性`,
  `All AI processing of personal data complies with PDPA obligations. We do not make fully automated decisions with significant legal or similarly significant effects on you without human review. If AI is used to profile you for marketing purposes, we will obtain your prior consent. You may request a human review of any AI-generated decision that affects you by contacting info@mixcarehealth.com.`,
  `所有个人数据的AI处理均符合PDPA义务。我们不会在没有人工审查的情况下就对您产生重大法律或类似重大影响的内容做出全自动化决定。如果AI用于出于营销目的对您进行画像分析，我们将事先征得您的同意。您可通过联系info@mixcarehealth.com要求对影响您的任何AI生成决定进行人工审查。`,
  `[H2] AI Limitations Disclaimer  |  AI限制免责声明`,
  `AI-generated recommendations are for informational purposes only and do not constitute medical advice, diagnosis, or treatment. MixCare Health is not liable for decisions made solely on AI outputs. Always consult a qualified healthcare professional for medical decisions.`,
  `AI生成的建议仅供资讯目的，不构成医疗建议、诊断或治疗。MixCare Health对仅根据AI输出所作的任何决定不承担责任。医疗决定请咨询合资格的医疗专业人员。`,
  `[H1] Sharing Your Personal Data  |  分享您的个人数据`,
  `We may share your personal data with the following categories of recipients:`,
  `我们可能将您的个人数据分享给以下类别的接收方：`,
  `>> Wellness Providers on the Marketplace who fulfil your bookings and services  |  在市集上完成您预订及服务的保健服务提供商`,
  `>> Your employer or plan sponsor for benefit administration under the FSA or Flexible Benefit Solution  |  您的雇主或计划发起人，用于FSA或弹性福利方案下的福利管理`,
  `>> Payment gateway providers and financial institutions for processing transactions  |  用于处理交易的付款网关提供商及金融机构`,
  `>> IT and cloud service providers who support our platform operations, bound by data processing agreements  |  支持我们平台运营的IT及云服务提供商，并受数据处理协议约束`,
  `>> The Personal Data Protection Commission (PDPC), regulatory authorities, law enforcement, or courts as required by law  |  应法律要求，向个人数据保护委员会（PDPC）、监管机构、警方或法院提供`,
  `We do not sell, rent, or license your personal data to third parties for their own marketing purposes.`,
  `我们不会将您的个人数据出售、出租或许可给第三方用于其自身的营销目的。`,
  `[H1] Cross-border Data Transfers  |  跨境数据传输`,
  `Your personal data may be transferred overseas. We comply with the Transfer Limitation Obligation under the PDPA and only transfer personal data to countries that provide comparable data protection standards, or under binding contractual obligations that impose equivalent protections.`,
  `您的个人数据可能会被传输至境外。我们遵守PDPA下的转移限制义务，仅将个人数据转移至提供可比数据保护标准的国家或地区，或具备具有同等保护的具有约束力的合同义务。`,
  `[H1] Data Security  |  数据安全`,
  `In accordance with the Protection Obligation under the PDPA, we implement reasonable security arrangements to protect your personal data. These measures include:`,
  `根据PDPA下的保护义务，我们实施合理的安全安排以保护您的个人数据。这些措施包括：`,
  `>> Encryption of sensitive data in transit and at rest  |  敏感数据传输和静止状态的加密`,
  `>> Role-based access controls limiting data access to authorised personnel only  |  基于角色的访问控制，仅限授权人员访问数据`,
  `>> Regular security assessments and vulnerability management  |  定期安全评估和漏洞管理`,
  `>> Staff training on PDPA obligations and data protection best practices  |  对员工进行PDPA义务及数据保护最佳实践的培训`,
  `>> Data breach response procedures, including notification to the PDPC and affected individuals as required under the PDPA  |  数据泄露应对程序，包括按PDPA要求向PDPC及受影响个人发出通知`,
  `[H1] Data Retention  |  数据保留`,
  `In accordance with the Retention Limitation Obligation under the PDPA, we retain personal data only as long as necessary for business or legal purposes. Our general retention periods are:`,
  `根据PDPA下的保留限制义务，我们仅在业务或法律目的所必需的期限内保留个人数据。我们的一般保留期限为：`,
  `>> Membership and account records: for the duration of membership plus 7 years  |  会员及账户记录：会员期间加7年`,
  `>> Health and medical records: as required by applicable Singapore medical record retention laws or 7 years, whichever is longer  |  健康及医疗记录：适用新加坡医疗记录保留法律或7年，以较长者为准`,
  `>> Financial and payment records: 5 years in compliance with Singapore IRAS requirements and applicable commercial laws  |  财务及付款记录：遵守新加坡IRAS要求及适用商业法律，保留5年`,
  `>> Marketing communications data: until you withdraw consent or opt out  |  营销通讯数据：直至您撤回同意或选择退出`,
  `Upon expiry, personal data will be securely deleted or anonymised.`,
  `保留期限届满后，个人数据将被安全删除或匿名化处理。`,
  `[H1] Your Rights  |  您的权利`,
  `Under the PDPA, you have the following rights:`,
  `根据PDPA，您拥有以下权利：`,
  `>> Right of Access: You may request access to personal data we hold about you. We will respond within 30 calendar days.  |  查阅权：您可要求查阅我们持有的您的个人数据。我们将在30个日历日内作出回应。`,
  `>> Right of Correction: You may request correction of inaccurate or incomplete personal data. We will correct it as soon as practicable.  |  更正权：您可要求更正不准确或不完整的个人数据，我们将尽快进行更正。`,
  `>> Right to Withdraw Consent: You may withdraw consent at any time. Withdrawal does not affect processing already carried out.  |  撤回同意权：您可随时撤回同意。撤回同意不影响已进行的处理。`,
  `>> Right to Opt Out of Direct Marketing: You may opt out of receiving marketing messages at any time, including via the DNC Registry.  |  退出直接营销权：您可随时选择不再接收营销信息，包括通过DNC登记册。`,
  `>> Right to Complain: You may lodge a complaint with the Personal Data Protection Commission (PDPC) at www.pdpc.gov.sg.  |  投诉权：您可就个人数据保护委员会（PDPC）提出投诉，网址：www.pdpc.gov.sg。`,
  `To exercise any of your rights, please contact our DPO in writing at info@mixcarehealth.com, clearly stating your request.`,
  `如需行使任何权利，请以书面形式向我们的DPO发送请求，电邮地址：info@mixcarehealth.com，请清楚说明您的请求。`,
  `[H1] Cookies and Tracking Technologies  |  Cookie及追踪技术`,
  `We use cookies and similar tracking technologies to improve functionality, analyse usage, and personalise your experience. You may manage cookie preferences through your browser settings. Disabling cookies may affect platform functionality.`,
  `我们使用Cookie及类似追踪技术来改善功能性、分析使用情况并个性化您的体验。您可通过浏览器设置管理Cookie偏好。禁用Cookie可能影响平台功能。`,
  `[H1] Changes to This Policy  |  本政策的变更`,
  `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated Policy on our platform and by direct notification where required. Your continued use of our services after any update constitutes acceptance of the revised Policy.`,
  `我们可能不时更新本隐私政策。我们将通过在平台上发布更新的政策并在需要时直接通知您重大变更。任何更新后继续使用我们的服务即表示接受修订后的政策。`,
];

// ── Tab data ──────────────────────────────────────────────────────────────────
const REGIONS = [
  {
    id: "hk",
    label: { en: "Hong Kong & Macau", zhTW: "香港及澳門", zhCN: "香港及澳門" },
    lines: HK_LINES,
  },
  {
    id: "sg",
    label: { en: "Singapore", zhTW: "新加坡", zhCN: "新加坡" },
    lines: SG_LINES,
  },
];

const UI_STRINGS = {
  en:      { headerPrefix: "Privacy Policy —", contactUs: "Contact Us" },
  "zh-TW": { headerPrefix: "私隱政策 —",        contactUs: "聯絡我們" },
  "zh-CN": { headerPrefix: "隐私政策 —",         contactUs: "联络我们" },
} as const;

// ── Main component ────────────────────────────────────────────────────────────
export default function PrivacyViewer() {
  const { locale } = useLanguage();
  const lang: Lang = locale === "en" ? "en" : "zh";
  const [regionId, setRegionId] = useState(() => locale === "zh-CN" ? "sg" : "hk");

  useEffect(() => { setRegionId(locale === "zh-CN" ? "sg" : "hk"); }, [locale]);

  const region = REGIONS.find((r) => r.id === regionId)!;
  const entries = parse(region.lines);

  const ui = UI_STRINGS[locale as keyof typeof UI_STRINGS] ?? UI_STRINGS["en"];
  const regionLabel =
    locale === "zh-TW" ? region.label.zhTW
    : locale === "zh-CN" ? region.label.zhCN
    : region.label.en;

  return (
    <div>
      {/* Sticky tab bar */}
      <div className="sticky top-16 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 gap-4">

            {/* Region tabs */}
            <div className="flex gap-1">
              {REGIONS.map((r) => {
                const tabLabel =
                  locale === "zh-TW" ? r.label.zhTW
                  : locale === "zh-CN" ? r.label.zhCN
                  : r.label.en;
                return (
                  <button
                    key={r.id}
                    onClick={() => setRegionId(r.id)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      regionId === r.id
                        ? "bg-teal-700 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {tabLabel}
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* Document header — left-aligned */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-1">
            Mixup Solution Company Limited
          </p>
          <h2 className="text-xl font-extrabold text-slate-900">
            {ui.headerPrefix} {regionLabel}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <PpContent entries={entries} lang={lang} />

        {/* Contact footer */}
        <div className="mt-14 rounded-2xl bg-slate-50 border border-slate-200 p-6">
          <p className="text-sm font-bold text-slate-700 mb-3">
            {ui.contactUs}
          </p>
          <div className="text-sm text-slate-600 space-y-1.5">
            <p>Mixup Solution Company Limited — MixCare Health</p>
            <p>
              Email:{" "}
              <a href="mailto:info@mixcarehealth.com" className="text-teal-700 hover:underline">
                info@mixcarehealth.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+85223233132" className="text-teal-700 hover:underline">
                +852 2323 3132
              </a>
            </p>
            <p>
              Website:{" "}
              <a href="https://www.mixcarehealth.com" className="text-teal-700 hover:underline">
                www.mixcarehealth.com
              </a>
            </p>
            {regionId === "hk" && lang === "en" && (
              <p className="mt-3 text-xs text-slate-500">
                You also have the right to lodge a complaint with the Privacy Commissioner for Personal Data (PCPD) at{" "}
                <a href="https://www.pcpd.org.hk" className="text-teal-700 hover:underline">www.pcpd.org.hk</a>
                {", or the Office for Personal Data Protection (GPDP) of Macau at "}
                <a href="https://www.gpdp.gov.mo" className="text-teal-700 hover:underline">www.gpdp.gov.mo</a>
                {"."}
              </p>
            )}
            {regionId === "hk" && lang === "zh" && (
              <p className="mt-3 text-xs text-slate-500">
                您亦有權就香港個人資料私隱專員公署（
                <a href="https://www.pcpd.org.hk" className="text-teal-700 hover:underline">www.pcpd.org.hk</a>
                ）或澳門個人資料保護局（
                <a href="https://www.gpdp.gov.mo" className="text-teal-700 hover:underline">www.gpdp.gov.mo</a>
                ）提出投訴。
              </p>
            )}
            {regionId === "sg" && lang === "en" && (
              <p className="mt-3 text-xs text-slate-500">
                You also have the right to lodge a complaint with the Personal Data Protection Commission (PDPC) of Singapore at{" "}
                <a href="https://www.pdpc.gov.sg" className="text-teal-700 hover:underline">www.pdpc.gov.sg</a>
                {"."}
              </p>
            )}
            {regionId === "sg" && lang === "zh" && (
              <p className="mt-3 text-xs text-slate-500">
                您亦有权就新加坡个人数据保护委员会（PDPC）提出投诉，网址：
                <a href="https://www.pdpc.gov.sg" className="text-teal-700 hover:underline">www.pdpc.gov.sg</a>
                。
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
