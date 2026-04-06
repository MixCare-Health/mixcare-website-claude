"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// ── Types ─────────────────────────────────────────────────────────────────────
type Lang = "en" | "zh";

type Entry =
  | { t: "s1"; en: string; zh: string }
  | { t: "s2"; en: string; zh: string }
  | { t: "p";  en: string; zh: string }
  | { t: "li"; en: string; zh: string }
  | { t: "dc"; text: string };

// ── Parser ────────────────────────────────────────────────────────────────────
function hasChinese(s: string) { return /[\u4e00-\u9fff]/.test(s); }
function isBi(s: string)       { return s.includes("  |  "); }
function parseBi(s: string)    { const p = s.split("  |  "); return { en: p[0].trim(), zh: p[1]?.trim() ?? "" }; }
function isS1(s: string)       { return /^\d+\. /.test(s); }
function isS2(s: string)       { return /^\d+\.\d+ /.test(s); }
function isAllCaps(s: string)  { return s.length > 30 && s === s.toUpperCase() && /[A-Z]/.test(s); }

function prependNum(en: string, zh: string): string {
  if (!zh || /^\d/.test(zh)) return zh;
  const m = en.match(/^(\d+\.\d+\s)/) || en.match(/^(\d+\.\s)/);
  return m ? m[1] + zh : zh;
}

function parse(lines: string[]): Entry[] {
  const entries: Entry[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith(">> ")) {
      const clean = line.slice(3);
      if (isBi(clean)) {
        const { en, zh } = parseBi(clean);
        entries.push({ t: "li", en, zh });
      } else {
        const next = lines[i + 1] ?? "";
        if (next && hasChinese(next)) {
          entries.push({ t: "li", en: clean, zh: next });
          i += 2;
          continue;
        } else {
          entries.push({ t: "li", en: clean, zh: "" });
        }
      }
      i++;
      continue;
    }
    if (isBi(line)) {
      const { en, zh } = parseBi(line);
      if (isS2(en))      entries.push({ t: "s2", en, zh: prependNum(en, zh) });
      else if (isS1(en)) entries.push({ t: "s1", en, zh: prependNum(en, zh) });
      else               entries.push({ t: "p",  en, zh });
      i++;
    } else if (isAllCaps(line)) {
      entries.push({ t: "dc", text: line });
      i++;
    } else {
      const next = lines[i + 1] ?? "";
      if (next && !isBi(next) && hasChinese(next) && !isS1(next) && !isS2(next)) {
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
function TcContent({ entries, lang }: { entries: Entry[]; lang: Lang }) {
  return (
    <div>
      {entries.map((e, idx) => {
        // All-caps disclaimer — always English only
        if (e.t === "dc") return (
          <div key={idx} className="my-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-xs font-bold text-amber-800 leading-relaxed tracking-wide">{e.text}</p>
          </div>
        );

        if (e.t === "li") {
          const text = e[lang];
          if (!text) return null;
          return (
            <div key={idx} className="flex gap-3 ml-4 mb-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
              <p className="text-sm text-slate-700 leading-7">{text}</p>
            </div>
          );
        }

        const text = e[lang];
        if (!text) return null;

        // Section heading (e.g. "1. Becoming a MixCare Member")
        if (e.t === "s1") return (
          <div key={idx} className="mt-12 mb-4 pt-8 border-t-2 border-slate-100">
            <h2 className="text-base font-extrabold text-slate-900 leading-snug">{text}</h2>
          </div>
        );

        // Subsection heading (e.g. "1.1 Welcome")
        if (e.t === "s2") return (
          <h3 key={idx} className="text-sm font-bold text-slate-800 mt-7 mb-2 ml-1">{text}</h3>
        );

        // Body paragraph — indented under the section
        return (
          <p key={idx} className="text-sm text-slate-700 leading-7 mb-4 ml-4">{text}</p>
        );
      })}
    </div>
  );
}

// ── Raw content ───────────────────────────────────────────────────────────────

// HK/Macau body lines (skip doc-header lines 0-6)
const HK_LINES = [
  `Terms & Conditions  |  條款及細則`,
  `These Terms and Conditions (collectively, the "Agreement") constitute a legal agreement between you and Mixup Solution Company Limited ("the Company", "we", "our", "MixCare Health") governing your use of the MixCare Health platform, applications, and services operated by the Company. By using or receiving any services supplied by the Platform, you acknowledge and agree to be bound by this Agreement. If you do not agree, do not access or use the Platform.`,
  `本條款及細則（統稱「協議」）構成您與Mixup Solution Company Limited（「本公司」、「我們」、「MixCare Health」）之間的法律協議，規管您對MixCare Health平台、應用程式及服務的使用。使用本平台即表示您確認並同意受本協議約束。如您不同意，請勿使用本平台。`,
  `The Company reserves the right to update and/or modify this Agreement at any time, effective upon posting. Your continued use of the Platform constitutes acceptance of the revised Agreement.`,
  `本公司保留隨時更新及／或修改本協議的權利，修改內容於發布後立即生效。您繼續使用本平台即視為接受修訂後的協議。`,
  `1. Becoming a MixCare Member  |  成為MixCare會員`,
  `1.1 Welcome  |  歡迎`,
  `Welcome to MixCare, a health and wellness membership program administered, managed and distributed by MixCare Health and our partners. MixCare provides access to a wide medical network of General Practitioners, Specialists, and other wellness services. You can access these products and services via our web platform and mobile app.`,
  `歡迎使用MixCare——由MixCare Health及其合作夥伴管理和分發的健康及保健會員計劃。MixCare提供廣泛的醫療網絡，包括全科醫生、專科醫生及其他保健服務。您可通過我們的網絡平台及移動應用程式使用相關產品及服務。`,
  `This is a membership program and not an insurance contract. By joining MixCare, you are deemed to have read, fully understood and agreed to abide by these Terms and Conditions.`,
  `本計劃為會員計劃而非保險合同。加入MixCare即視為您已閱讀、充分理解並同意遵守本條款及細則。`,
  `1.2 Eligibility  |  資格要求`,
  `To join MixCare, you must:`,
  `申請加入MixCare，您須符合以下條件：`,
  `>> Have received an invitation from us or our designated partners;  |  已收到我們或我們指定合作夥伴的邀請；`,
  `>> Have a valid and unique work email address and contact phone number;  |  擁有有效且唯一的工作電郵地址及聯絡電話號碼；`,
  `>> Reside or work in Hong Kong or Macau;  |  居住或工作於香港或澳門；`,
  `>> Be a natural person (not a company, trust or other structure); and  |  為自然人（非公司、信託或其他架構）；及`,
  `>> Meet all other criteria we may impose from time to time.  |  符合我們不時提出的所有其他標準。`,
  `1.3 Registration  |  登記`,
  `You may apply to join MixCare through our website or mobile app. We will notify you of acceptance via email. We may assign different membership statuses with different rights attached.`,
  `您可通過我們的網站或移動應用程式申請加入MixCare。我們將通過電郵通知您是否獲接受。我們可能為不同會員設定不同的會員狀態及相應權利。`,
  `1.4 Renewals  |  續期`,
  `Membership terms are either monthly or annual as specified on the Platform. MixCare adopts an auto-renewal policy. If you do not unsubscribe, your membership will auto-renew at expiry. Benefits not used within a term are forfeited and cannot be carried over.`,
  `會員期限為按月或按年訂閱，具體以平台說明為準。MixCare採用自動續期政策。如您未取消訂閱，您的會員資格將於到期時自動續期。未在本期內使用的福利將被取消，不可結轉。`,
  `1.5 Changing Membership Status  |  更改會員狀態`,
  `We may offer membership status changes at our sole discretion. Any such change is subject to our acceptance.`,
  `我們可能酌情提供會員狀態變更選項，任何此類變更均需獲我們批准。`,
  `2. Our Services  |  我們的服務`,
  `MixCare Health offers the following services to eligible members and corporate clients. Each service may be subject to additional terms and conditions.`,
  `MixCare Health向符合資格的會員及企業客戶提供以下服務。每項服務可能附有額外條款及細則。`,
  `2.1 Self-Funded Outpatient Service  |  自付費門診服務`,
  `MixCare provides access to a network of registered General Practitioners and Specialists for outpatient consultations. Members may use their allocated benefits or flexible spending account balance to pay for eligible outpatient visits. This service does not constitute an insurance policy. Eligibility, benefit limits, and co-payment requirements (if any) are set out in your membership plan.`,
  `MixCare提供已登記全科醫生及專科醫生的門診服務網絡。會員可使用其分配的福利或彈性消費帳戶餘額支付符合資格的門診費用。本服務不構成保險保單。資格、福利上限及自付費要求（如適用）載於您的會員計劃中。`,
  `2.2 Wellness Marketplace  |  保健市集`,
  `The Wellness Marketplace is an online platform within MixCare where members can browse, book, and pay for health and wellness products and services offered by third-party Wellness Providers. The Company acts solely as a technology facilitator and is not the seller or provider of marketplace offerings. All marketplace transactions are directly between the member and the Wellness Provider.`,
  `保健市集是MixCare內的線上平台，會員可在此瀏覽、預訂及購買由第三方保健服務提供商提供的健康保健產品及服務。本公司僅作為技術促進方，並非市集產品的賣方或提供方。所有市集交易均直接在會員與保健服務提供商之間進行。`,
  `2.3 Flexible Spending Account (FSA)  |  彈性消費帳戶`,
  `Eligible members or employees enrolled through a corporate plan may receive a Flexible Spending Account ("FSA") funded by their employer or plan sponsor. FSA funds may be used toward eligible health, wellness, and outpatient expenses as specified in the applicable plan. FSA balances are non-transferable, non-exchangeable for cash, and subject to expiry as stated in the plan. Unused balances at the end of the plan period will be forfeited. FSA administration is subject to the rules of the employer or plan sponsor.`,
  `通過企業計劃加入的合資格會員或員工可獲得由僱主或計劃發起人資助的彈性消費帳戶（「FSA」）。FSA資金可用於計劃指定的合資格醫療、保健及門診費用。FSA餘額不可轉讓、不可兌換為現金，且依計劃規定設有有效期。計劃期結束時未使用的餘額將被取消。FSA的管理受僱主或計劃發起人的規則約束。`,
  `2.4 Flexible Benefit Solution  |  彈性福利方案`,
  `The Flexible Benefit Solution allows corporate clients to configure customised employee benefit packages comprising selections from eligible services and products available on the MixCare platform. Employees may allocate their benefit credits across approved categories. The specific benefit options, credit allocations, and eligibility criteria are determined by the corporate client in consultation with MixCare Health. MixCare Health acts as a benefit administration platform only and does not guarantee the availability of any specific benefit option.`,
  `彈性福利方案允許企業客戶為員工配置由MixCare平台上符合資格的服務及產品組成的定制員工福利套餐。員工可將其福利積分分配至已批准的類別。具體福利選項、積分分配及資格標準由企業客戶與MixCare Health協商確定。MixCare Health僅作為福利管理平台，不保證任何特定福利選項的可用性。`,
  `2.5 Wellness Events  |  保健活動`,
  `MixCare Health organises and facilitates wellness events, including seminars, workshops, health screenings, and other programmes for corporate clients and members. Participation may be subject to separate event-specific terms, registration requirements, and capacity limits. MixCare Health reserves the right to cancel, reschedule or modify any event at any time.`,
  `MixCare Health為企業客戶及會員組織及促進保健活動，包括研討會、工作坊、健康檢查及其他活動。參與可能受獨立的活動條款、登記要求及人數限制約束。MixCare Health保留隨時取消、重新安排或修改任何活動的權利。`,
  `3. Using Your Membership  |  使用您的會員資格`,
  `3.1 Claiming Benefits  |  領取福利`,
  `You can view and claim benefits through the Membership Portal following the instructions provided.`,
  `您可按照提供的說明通過會員入口查看及領取福利。`,
  `3.2 Membership Portal  |  會員入口`,
  `Use of the Membership Portal is subject to these Terms and Conditions, our website Terms of Use, and our Privacy Policy. The Portal may not be available at all times and we shall not be liable for any unavailability.`,
  `使用會員入口須遵守本條款及細則、我們的網站使用條款及私隱政策。本入口可能並非隨時可用，我們對任何不可用情況概不負責。`,
  `3.3 Additional Payments  |  額外費用`,
  `Certain benefits may require additional payment beyond membership fees. You will be informed of any such requirements before using the service.`,
  `某些福利可能需要在會員費以外額外付費。我們將在您使用服務前告知您相關要求。`,
  `3.4 Personal Use Only  |  僅供個人使用`,
  `Your membership is for your personal use only and is non-transferable. You must not use MixCare for commercial purposes. Use by dependants may be permitted subject to additional conditions.`,
  `您的會員資格僅供個人使用，不可轉讓。您不得將MixCare用於商業目的。受養人的使用可能在附加條件下獲得許可。`,
  `3.5 Independent Advice  |  獨立建議`,
  `MixCare is not a substitute for professional medical advice or treatment. You should consult a qualified healthcare professional before making health decisions.`,
  `MixCare不能替代專業醫療建議或治療。您應在做出醫療決定前諮詢合資格的醫療專業人員。`,
  `4. Fees, Charges and Taxes  |  費用、收費及稅款`,
  `All fees are specified in your Order Form or subscription plan. Fees are based on services purchased and not actual usage. Payment obligations are non-cancellable and fees paid are non-refundable unless otherwise stated.`,
  `所有費用在您的訂購表格或訂閱計劃中列明。費用基於購買的服務而非實際使用量。付款義務不可取消，已付費用不予退還，除非另有說明。`,
  `You must provide valid payment information and authorise the Company to charge your payment method for subscription fees. Subscriptions renew automatically unless cancelled. The Company reserves the right to modify fees upon reasonable notice.`,
  `您須提供有效的付款資料，並授權本公司向您的付款方式收取訂閱費用。訂閱自動續期，除非已取消。本公司保留在合理通知後修改費用的權利。`,
  `You are responsible for all applicable taxes arising from your use of the Platform, including but not limited to Profits Tax under the Inland Revenue Ordinance (Cap. 112, Laws of Hong Kong).`,
  `您須負責因使用本平台而產生的所有適用稅款，包括但不限於根據《稅務條例》（香港法例第112章）徵收的利得稅。`,
  `5. The Company's Role  |  本公司的角色`,
  `We are an online platform that connects Consumers seeking wellness services with third-party Wellness Providers. We are a neutral technology facilitator and are not a party to transactions between Users. We do not provide the wellness services listed on the Platform.`,
  `我們是一個線上平台，將尋求保健服務的消費者與第三方保健服務提供商連接起來。我們是中立的技術促進方，不是用戶之間交易的一方。我們不提供平台上列出的保健服務。`,
  `5.1 Wellness Providers as Independent Contractors  |  保健服務提供商為獨立承包商`,
  `Wellness Providers are independent contractors providing services directly to Consumers. There is NO employment relationship between Wellness Providers, Consumers, and the Company. Wellness Providers must comply with all applicable laws of Hong Kong, including the Employment Ordinance (Cap. 57), Employees' Compensation Ordinance (Cap. 282), and taxation obligations under the Inland Revenue Ordinance (Cap. 112). Wellness Providers are not entitled to MPF contributions, annual leave, or other statutory employee benefits from the Company.`,
  `保健服務提供商是直接向消費者提供服務的獨立承包商。保健服務提供商、消費者與本公司之間不存在僱傭關係。保健服務提供商須遵守香港所有適用法律，包括《僱傭條例》（第57章）、《僱員補償條例》（第282章）及《稅務條例》（第112章）下的稅務義務。保健服務提供商無權向本公司要求強積金供款、年假或其他法定員工福利。`,
  `6. Registration Procedures  |  登記程序`,
  `To access the Platform, you must create a password-protected account. Consumers must agree to these Terms and Conditions and provide required information. Wellness Providers must additionally complete email verification and warrant that they hold all necessary licences, qualifications, and insurance.`,
  `要使用本平台，您須創建受密碼保護的帳戶。消費者須同意本條款及細則並提供所需資料。保健服務提供商還須完成電郵驗證，並保證持有所有必要的許可證、資格及保險。`,
  `Wellness Providers are wholly responsible for filing applicable tax returns with the Inland Revenue Department of Hong Kong SAR in respect of all earnings, including those from wellness services provided through the Platform.`,
  `保健服務提供商就通過本平台提供保健服務所賺取的所有收入（包括保健服務收入），全責向香港特別行政區稅務局申報適用的稅務申報表。`,
  `7. No Guarantees for Wellness Services  |  不保證保健服務`,
  `We do not guarantee that Wellness Providers will be punctual or will attend scheduled appointments. We make no guarantees regarding quality or outcome. Any verification badge indicates only that the Wellness Provider is a registered Platform member, not an endorsement by the Company.`,
  `我們不保證保健服務提供商將準時或出席預定的預約。我們不對服務質量或結果作出任何保證。任何認證標誌僅表示保健服務提供商是本平台的已登記會員，並非本公司的背書。`,
  `8. Release from Claims  |  免除索償`,
  `Where Consumers have disputes with Wellness Providers, such disputes should be addressed directly with the Wellness Provider. Users agree to release the Company and its officers, directors, affiliates, employees and agents from any claims arising from such disputes.`,
  `消費者與保健服務提供商之間的糾紛，應直接向保健服務提供商提出。用戶同意免除本公司及其高管、董事、附屬公司、員工及代理人對任何由此類糾紛引起的索償。`,
  `9. Prohibited Uses  |  禁止使用`,
  `You must not misuse the Platform. Prohibited activities include but are not limited to: hacking, scraping, fraud, spamming, soliciting other users, recreating or competing with the Company, collecting personal data of other users, or using the Platform for any unlawful purpose.`,
  `您不得濫用本平台。禁止活動包括但不限於：入侵、抓取數據、欺詐、發送垃圾郵件、招攬其他用戶、重複建立或與本公司競爭、收集其他用戶的個人數據，或將本平台用於任何非法目的。`,
  `The Company reserves the right to immediately terminate your access and initiate legal proceedings for misuse.`,
  `本公司保留立即終止您的訪問權限並對濫用行為提起法律程序的權利。`,
  `10. Subscription and Billing  |  訂閱及帳單`,
  `10.1 General  |  概述`,
  `These billing terms apply to all subscription-based membership services on MixCare Health. You must be at least 18 years old to purchase. A purchase constitutes an offer to the Wellness Provider which is not accepted until payment is completed.`,
  `本帳單條款適用於MixCare Health上所有訂閱制會員服務。您須年滿18歲方可購買。購買構成向保健服務提供商提出的要約，直至付款完成方被接受。`,
  `10.2 Payment  |  付款`,
  `You agree to pay all charges incurred under your account including applicable taxes and fees. You authorise us to charge your designated payment method and to retain payment information associated with your account.`,
  `您同意支付在您帳戶下產生的所有費用，包括適用稅費。您授權我們向您指定的付款方式收費，並保留與您帳戶相關的付款資料。`,
  `10.3 Cancellation  |  取消`,
  `All subscription services are non-refundable unless otherwise specified. To cancel, contact us at info@mixcarehealth.com. Your membership will continue until the end of the current billing cycle. Processing takes up to 5 business days.`,
  `除非另有說明，所有訂閱服務均不予退款。如需取消，請聯絡info@mixcarehealth.com。您的會員資格將持續至當前計費週期結束。處理時間最長需5個工作日。`,
  `11. Privacy and Personal Data  |  私隱及個人數據`,
  `The collection, use, and disclosure of your personal data is governed by our Privacy Policy, which is incorporated by reference. By using the Platform, you consent to such collection and use.`,
  `您的個人數據的收集、使用及披露受我們的私隱政策（通過引用納入本協議）約束。使用本平台即表示您同意此類收集及使用。`,
  `For Hong Kong users: Your personal data is collected and processed in accordance with the Personal Data (Privacy) Ordinance (Cap. 486, Laws of Hong Kong) ("PDPO"). You have the right to request access to, correction of, and to object to the use of your personal data as provided under the PDPO. Requests may be directed to info@mixcarehealth.com.`,
  `香港用戶：您的個人數據依照《個人資料（私隱）條例》（香港法例第486章）（「條例」）進行收集及處理。您有權根據條例要求查閱、更正及反對使用您的個人數據。請求可發送至info@mixcarehealth.com。`,
  `For Macau users: Your personal data is additionally protected under the Macau Personal Data Protection Act (Lei n.º 8/2005). You may exercise your rights under that law by contacting us at info@mixcarehealth.com.`,
  `澳門用戶：您的個人數據另受澳門《個人資料保護法》（第8/2005號法律）的保護。您可通過info@mixcarehealth.com聯絡我們行使該法律賦予您的權利。`,
  `12. Communications  |  通訊`,
  `By registering, you consent to receive transactional communications via SMS, WhatsApp, and email. Marketing communications may be opted out. To opt out of SMS/WhatsApp, contact us at +852 2323 3132. For email opt-out, refer to our Privacy Policy.`,
  `通過登記，您同意通過短訊、WhatsApp及電郵接收交易通知。您可選擇退出營銷通訊。如需退出短訊/WhatsApp，請致電+852 2323 3132。如需退出電郵，請參閱我們的私隱政策。`,
  `13. Dispute Resolution  |  糾紛解決`,
  `The Company may provide limited assistance in resolving disputes between Consumers and Wellness Providers upon request. Disputes between you and the Company shall first be submitted to good faith negotiation for a period of 30 days. If unresolved, disputes shall be settled by arbitration in accordance with Section 24.`,
  `本公司可應要求就消費者與保健服務提供商之間的糾紛提供有限協助。您與本公司之間的糾紛應首先提交誠信談判，期限為30天。如未能解決，糾紛應依照第24條提交仲裁。`,
  `14. User Generated Content  |  用戶生成內容`,
  `Content you post on the Platform (ratings, reviews, images, comments) may be viewed by the public. You grant the Company an irrevocable, royalty-free, worldwide licence to use, reproduce, modify and distribute such content. You warrant that you own or have rights to all content you post.`,
  `您在本平台發佈的內容（評分、評論、圖片、留言）可能被公眾查看。您授予本公司不可撤銷的、免版稅的全球許可，以使用、複製、修改和分發此類內容。您保證您擁有或有權使用您發佈的所有內容。`,
  `The Company reserves the right to remove content that violates content guidelines, including offensive, illegal, false, or platform-standard-violating material.`,
  `本公司保留刪除違反內容指引的內容的權利，包括冒犯性、非法、虛假或違反平台標準的材料。`,
  `15. Intellectual Property  |  知識產權`,
  `All Platform content (excluding user-generated content) is owned by the Company and protected under the Copyright Ordinance (Cap. 528, Laws of Hong Kong SAR) and applicable international laws. You may not copy, reproduce, or retransmit any content without prior written consent.`,
  `本平台所有內容（用戶生成內容除外）歸本公司所有，並受《版權條例》（香港特別行政區法例第528章）及適用的國際法律保護。未經事先書面同意，您不得複製、重製或轉播任何內容。`,
  `16. Wellness Provider Pre-Screening  |  保健服務提供商預審`,
  `While the Company takes steps to verify Wellness Providers, we cannot confirm that Wellness Providers are who they claim to be. Verification is based on information provided by Wellness Providers at registration and may not reflect current status. Consumers should exercise due diligence before engaging Wellness Providers.`,
  `雖然本公司採取措施核實保健服務提供商，但我們無法確認其身份的真實性。核實基於保健服務提供商在登記時提供的資料，可能不反映當前狀態。消費者在聘用保健服務提供商前應進行盡職調查。`,
  `17. Ratings & Reviews  |  評分及評論`,
  `Ratings and Reviews reflect the opinions of Consumers only and do not represent the views of the Company. The Company assumes no responsibility for any Review or claims resulting from use of the Platform.`,
  `評分及評論僅反映消費者的意見，並不代表本公司的觀點。本公司對任何評論或因使用本平台而產生的索償概不負責。`,
  `18. Articles and Content  |  文章及內容`,
  `Platform content relating to wellness services is provided "as-is" without warranties. Such content does not constitute professional advice.`,
  `平台上有關保健服務的內容按「原樣」提供，不附帶任何保證。此類內容不構成專業建議。`,
  `19. Third Party Links  |  第三方連結`,
  `Links to third-party sites are provided for convenience only and do not constitute endorsement. The Company is not responsible for third-party site content. Use of such sites is at your own risk and governed by their own terms.`,
  `第三方網站連結僅供參考，並不構成背書。本公司對第三方網站內容概不負責。使用此類網站的風險由您自行承擔，並受其本身條款約束。`,
  `20. Disclaimer of Warranties  |  免責聲明`,
  `THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. THE COMPANY MAKES NO WARRANTIES REGARDING ACCURACY, COMPLETENESS OR FITNESS FOR A PARTICULAR PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY HONG KONG LAW, ALL IMPLIED WARRANTIES ARE DISCLAIMED.`,
  `本平台按「原樣」提供，不附帶任何形式的保證。本公司不對準確性、完整性或特定用途適用性作出任何保證。在香港法律允許的最大範圍內，所有默示保證均被免除。`,
  `Subject to sections 20.1 and 21, nothing in these Terms and Conditions shall exclude or limit any liability which cannot be excluded or limited under applicable Hong Kong law.`,
  `在第20.1條及第21條的規限下，本條款及細則中的任何內容均不排除或限制在適用香港法律下不可排除或限制的任何責任。`,
  `21. Limitation of Liability  |  責任限制`,
  `To the maximum extent permitted by Hong Kong law, the Company shall not be liable for any indirect, incidental, special, consequential or exemplary damages arising from your use of the Platform or services.`,
  `在香港法律允許的最大範圍內，本公司對因您使用本平台或服務而引起的任何間接、附帶、特殊、後果性或懲罰性損失概不負責。`,
  `If the Company is found liable, the aggregate liability shall not exceed the total fees paid by you in the six (6) months preceding the claim.`,
  `如本公司被裁定須承擔責任，則總責任上限為您在索償前六（6）個月內向本公司支付的總費用。`,
  `22. Indemnification  |  彌償`,
  `You agree to indemnify, defend, and hold harmless the Company, its directors, officers, employees, and agents from any claims, losses, or expenses (including legal fees) arising from your use of the Platform, your violation of these Terms, or your breach of any third-party rights.`,
  `您同意就因您使用本平台、違反本條款或侵犯第三方權利而引起的任何索償、損失或費用（包括法律費用）對本公司及其董事、高管、員工及代理人作出彌償、抗辯及保障。`,
  `23. Changes and Termination  |  修改及終止`,
  `23.1 Changes to the Program  |  修改計劃`,
  `We may at any time modify, suspend or terminate any aspect of MixCare including membership fees, benefits, and these Terms and Conditions. Changes are effective upon posting.`,
  `我們可隨時修改、暫停或終止MixCare的任何方面，包括會員費、福利及本條款及細則。修改於發布後立即生效。`,
  `23.2 Termination by the Company  |  本公司終止`,
  `We may terminate your membership at any time for misuse, breach, or fraud with or without notice.`,
  `我們可隨時以有/無通知的方式，因濫用、違規或欺詐而終止您的會員資格。`,
  `23.3 Termination by You  |  由您終止`,
  `To terminate, notify us via the portal or email info@mixcarehealth.com. Your membership continues until the end of the billing cycle. Processing takes up to 5 business days.`,
  `如需終止，請通過門戶或電郵info@mixcarehealth.com通知我們。您的會員資格持續至計費週期結束。處理時間最長需5個工作日。`,
  `23.4 Termination upon Demise  |  死亡時終止`,
  `Membership automatically terminates upon a member's death.`,
  `會員資格於會員死亡時自動終止。`,
  `24. Artificial Intelligence (AI) Terms of Use  |  人工智能使用條款`,
  `MixCare Health may incorporate artificial intelligence ("AI") and machine learning features within its platform, including but not limited to health recommendations, symptom checking tools, benefits optimisation suggestions, and wellness content personalisation ("AI Features").`,
  `MixCare Health可能在其平台內整合人工智能（「AI」）及機器學習功能，包括但不限於健康建議、症狀檢測工具、福利優化建議及保健內容個性化功能（「AI功能」）。`,
  `24.1 Nature of AI Features  |  AI功能的性質`,
  `AI Features are provided for informational and convenience purposes only. They do not constitute medical advice, diagnosis, or treatment. AI-generated outputs may be inaccurate, incomplete, or not applicable to your individual circumstances. You should not rely on AI Features as a substitute for professional medical, health, financial, or legal advice.`,
  `AI功能僅供資訊及便利目的而提供。它們不構成醫療建議、診斷或治療。AI生成的輸出可能不準確、不完整，或不適用於您的個人情況。您不應將AI功能替代專業醫療、健康、財務或法律建議。`,
  `24.2 Data Use by AI  |  AI的數據使用`,
  `AI Features may process your health data, usage patterns, and preferences to provide personalised outputs. By using AI Features, you consent to such processing. All processing is conducted in accordance with our Privacy Policy and the Personal Data (Privacy) Ordinance (Cap. 486) (for Hong Kong users) and Lei n.º 8/2005 (for Macau users).`,
  `AI功能可能處理您的健康數據、使用模式及偏好以提供個性化輸出。使用AI功能即表示您同意此類處理。所有處理均依照我們的私隱政策及《個人資料（私隱）條例》（第486章）（香港用戶）及第8/2005號法律（澳門用戶）進行。`,
  `24.3 Limitations and Disclaimer  |  限制及免責聲明`,
  `The Company makes no warranty that AI Features will be accurate, uninterrupted, or free from error. The Company shall not be liable for any decisions made based on AI-generated outputs. AI Features may be modified, suspended, or discontinued at any time without notice.`,
  `本公司不保證AI功能的準確性、連續性或無錯誤。本公司對基於AI生成輸出所作的任何決定概不負責。AI功能可能隨時被修改、暫停或終止而不事先通知。`,
  `24.4 User Obligations  |  用戶義務`,
  `You must not attempt to reverse-engineer, manipulate, or circumvent AI Features. You must not use AI Features to generate or spread misinformation. You must not use AI outputs for any unlawful purpose.`,
  `您不得嘗試對AI功能進行逆向工程、操縱或規避。您不得使用AI功能生成或傳播虛假信息。您不得將AI輸出用於任何非法目的。`,
  `24.5 Feedback  |  反饋`,
  `If you notice errors or concerning outputs from AI Features, please report them to info@mixcarehealth.com. We continuously monitor AI systems for quality and safety.`,
  `如您發現AI功能出現錯誤或令人擔憂的輸出，請向info@mixcarehealth.com報告。我們持續監控AI系統以確保質量及安全。`,
  `25. Arbitration  |  仲裁`,
  `Any dispute, controversy or claim arising out of or relating to this Agreement, or its breach, termination or invalidity, shall be settled by arbitration in accordance with the UNCITRAL Arbitration Rules. The appointing authority shall be the Hong Kong International Arbitration Centre (HKIAC). The seat of arbitration shall be Hong Kong. There shall be one arbitrator. Proceedings may be conducted in English and/or Chinese.`,
  `因本協議或其違反、終止或無效而產生或與之相關的任何糾紛、爭議或索償，應根據《聯合國國際貿易法委員會仲裁規則》提交仲裁。指定機構為香港國際仲裁中心（HKIAC）。仲裁地點為香港。仲裁員一名。程序可以英文及／或中文進行。`,
  `26. Governing Law  |  適用法律`,
  `This Agreement is governed by and construed in accordance with the laws of the Hong Kong Special Administrative Region of the People's Republic of China. The courts of Hong Kong SAR shall have non-exclusive jurisdiction over any disputes arising from this Agreement.`,
  `本協議受中華人民共和國香港特別行政區法律管轄並據此解釋。香港特別行政區法院對因本協議引起的任何爭議擁有非專屬管轄權。`,
  `27. HealthCoin Terms  |  HealthCoin條款`,
  `The following terms apply to HealthCoin and HealthCoin redemption codes:`,
  `以下條款適用於HealthCoin及HealthCoin兌換碼：`,
  `>> HealthCoin is only applicable to MixCare direct sales customers, employee benefit plan participants, or MixCare channel customers.  |  HealthCoin僅適用於MixCare直銷客戶、員工福利計劃參與者或MixCare渠道客戶。`,
  `>> HealthCoin exchange rate: 1 HealthCoin = HKD 1.  |  HealthCoin兌換率：1 HealthCoin = 港幣1元。`,
  `>> Remaining HealthCoin balance may be used for subsequent purchases on the Platform.  |  剩餘的HealthCoin餘額可用於平台上的後續購買。`,
  `>> HealthCoins are non-exchangeable for cash, non-refundable, and non-transferable.  |  HealthCoin不可兌換為現金、不可退款且不可轉讓。`,
  `>> MixCare Health reserves the right to cancel HealthCoins awarded under any promotion for fraud or abuse.  |  MixCare Health保留因欺詐或濫用而取消任何促銷活動中獎勵的HealthCoin的權利。`,
  `>> In the event of any inconsistency between language versions, the English version prevails.  |  如各語言版本之間存在不一致，以英文版本為準。`,
  `>> MixCare Health reserves the right to vary or terminate the HealthCoin programme without prior notice.  |  MixCare Health保留在不事先通知的情況下修改或終止HealthCoin計劃的權利。`,
  `28. General Provisions  |  一般條款`,
  `Severability: If any provision is found unlawful or unenforceable, it shall be modified to be enforceable to the maximum extent possible. If modification is not possible, the provision shall be severed without affecting remaining provisions.`,
  `可分割性：如任何條款被裁定為非法或不可執行，應在最大可能範圍內修改以使其可執行。如無法修改，該條款應被剔除，而不影響其餘條款。`,
  `Entire Agreement: These Terms and Conditions constitute the entire agreement between you and the Company regarding the subject matter and supersede all prior agreements.`,
  `完整協議：本條款及細則構成您與本公司就相關事項的完整協議，並取代所有先前的協議。`,
  `Language: In case of inconsistency between the English and Chinese versions, the English version shall prevail.`,
  `語言：如英文版本與中文版本之間存在不一致，以英文版本為準。`,
];

const SG_LINES = [
  `Terms & Conditions  |  条款及细则`,
  `These Terms and Conditions (collectively, the "Agreement") constitute a legal agreement between you and Mixup Solution Company Limited ("the Company", "we", "our", "MixCare Health") governing your use of the MixCare Health platform, applications, and services. By using the Platform, you acknowledge and agree to be bound by this Agreement. If you do not agree, do not access or use the Platform.`,
  `本条款及细则（统称"协议"）构成您与Mixup Solution Company Limited（"本公司"、"我们"、"MixCare Health"）之间的法律协议，规管您对MixCare Health平台、应用程序及服务的使用。使用本平台即表示您确认并同意受本协议约束。如您不同意，请勿使用本平台。`,
  `The Company reserves the right to update this Agreement at any time. Continued use of the Platform constitutes acceptance of any revisions.`,
  `本公司保留随时更新本协议的权利。继续使用本平台即视为接受修订后的协议。`,
  `1. Becoming a MixCare Member  |  成为MixCare会员`,
  `1.1 Welcome  |  欢迎`,
  `Welcome to MixCare, a health and wellness membership program administered by MixCare Health and our partners. MixCare provides access to a wide medical network of General Practitioners, Specialists, and other wellness services available via our web platform and mobile app.`,
  `欢迎使用MixCare——由MixCare Health及其合作伙伴管理的健康及保健会员计划。MixCare通过我们的网络平台及移动应用程序提供广泛的医疗网络，包括全科医生、专科医生及其他保健服务。`,
  `This is a membership program and not an insurance contract. By joining MixCare, you are deemed to have read and agreed to these Terms and Conditions.`,
  `本计划为会员计划而非保险合同。加入MixCare即视为您已阅读并同意本条款及细则。`,
  `1.2 Eligibility  |  资格要求`,
  `To join MixCare, you must:`,
  `申请加入MixCare，您须符合以下条件：`,
  `>> Have received an invitation from us or our designated partners;  |  已收到我们或我们指定合作伙伴的邀请；`,
  `>> Have a valid and unique work email address and contact phone number;  |  拥有有效且唯一的工作电邮地址及联络电话号码；`,
  `>> Reside or work in Singapore;  |  居住或工作于新加坡；`,
  `>> Be a natural person (not a company, trust or other structure); and  |  为自然人（非公司、信托或其他架构）；及`,
  `>> Meet all other criteria we may impose from time to time.  |  符合我们不时提出的所有其他标准。`,
  `1.3 Registration  |  登记`,
  `You may apply through our website or mobile app. We will notify you of acceptance via email. We may assign different membership statuses with varying rights.`,
  `您可通过我们的网站或移动应用程序申请。我们将通过电邮通知您是否获接受。我们可能为不同会员设定不同的会员状态及相应权利。`,
  `1.4 Renewals  |  续期`,
  `Membership terms are monthly or annual as specified. MixCare adopts an auto-renewal policy unless you unsubscribe before expiry. Benefits not used within a term are forfeited and cannot be carried over.`,
  `会员期限按月或按年订阅，具体以说明为准。MixCare采用自动续期政策，除非您在到期前取消订阅。未在本期内使用的福利将被取消，不可结转。`,
  `2. Our Services  |  我们的服务`,
  `MixCare Health offers the following services to eligible members and corporate clients. Each service may be subject to additional terms and conditions.`,
  `MixCare Health向符合资格的会员及企业客户提供以下服务。每项服务可能附有额外条款及细则。`,
  `2.1 Self-Funded Outpatient Service  |  自付费门诊服务`,
  `MixCare provides access to a network of registered General Practitioners and Specialists for outpatient consultations. Members may use their allocated benefits or flexible spending account balance to pay for eligible outpatient visits. This service does not constitute an insurance policy under the Insurance Act 1966 (Singapore) and is not regulated by the Monetary Authority of Singapore (MAS) as an insurance product. Eligibility, benefit limits, and co-payment requirements are set out in your membership plan.`,
  `MixCare提供已登记全科医生及专科医生的门诊服务网络。会员可使用其分配的福利或弹性消费账户余额支付符合资格的门诊费用。本服务不构成《保险法》（1966年，新加坡）项下的保险保单，亦不受新加坡金融管理局（MAS）作为保险产品进行监管。资格、福利上限及自付费要求载于您的会员计划中。`,
  `2.2 Wellness Marketplace  |  保健市集`,
  `The Wellness Marketplace is an online platform within MixCare where members can browse, book, and pay for health and wellness products and services offered by third-party Wellness Providers. The Company acts solely as a technology facilitator and is not the seller or provider of marketplace offerings. All marketplace transactions are directly between the member and the Wellness Provider.`,
  `保健市集是MixCare内的线上平台，会员可在此浏览、预订及购买由第三方保健服务提供商提供的健康保健产品及服务。本公司仅作为技术促进方，并非市集产品的卖方或提供方。所有市集交易均直接在会员与保健服务提供商之间进行。`,
  `2.3 Flexible Spending Account (FSA)  |  弹性消费账户`,
  `Eligible members or employees enrolled through a corporate plan may receive a Flexible Spending Account ("FSA") funded by their employer or plan sponsor. FSA funds may be used toward eligible health, wellness, and outpatient expenses as specified in the applicable plan. FSA balances are non-transferable, non-exchangeable for cash, and subject to expiry. Unused balances at the end of the plan period will be forfeited. FSA administration is subject to employer or plan sponsor rules.`,
  `通过企业计划加入的合资格会员或员工可获得由雇主或计划发起人资助的弹性消费账户（"FSA"）。FSA资金可用于计划指定的合资格医疗、保健及门诊费用。FSA余额不可转让、不可兑换为现金，且设有有效期。计划期结束时未使用的余额将被取消。FSA的管理受雇主或计划发起人的规则约束。`,
  `2.4 Flexible Benefit Solution  |  弹性福利方案`,
  `The Flexible Benefit Solution allows corporate clients to configure customised employee benefit packages comprising selections from eligible services and products on the MixCare platform. Employees may allocate their benefit credits across approved categories. The specific benefit options, credit allocations, and eligibility criteria are determined by the corporate client in consultation with MixCare Health. MixCare Health acts as a benefit administration platform only.`,
  `弹性福利方案允许企业客户为员工配置由MixCare平台上符合资格的服务及产品组成的定制员工福利套餐。员工可将其福利积分分配至已批准的类别。具体福利选项、积分分配及资格标准由企业客户与MixCare Health协商确定。MixCare Health仅作为福利管理平台。`,
  `2.5 Wellness Events  |  保健活动`,
  `MixCare Health organises and facilitates wellness events including seminars, workshops, health screenings, and other programmes for corporate clients and members. Participation may be subject to event-specific terms, registration requirements, and capacity limits. MixCare Health reserves the right to cancel, reschedule, or modify any event at any time.`,
  `MixCare Health为企业客户及会员组织及促进保健活动，包括研讨会、工作坊、健康检查及其他活动。参与可能受独立的活动条款、登记要求及人数限制约束。MixCare Health保留随时取消、重新安排或修改任何活动的权利。`,
  `3. Using Your Membership  |  使用您的会员资格`,
  `3.1 Claiming Benefits  |  领取福利`,
  `You can view and claim benefits through the Membership Portal following the instructions provided.`,
  `您可按照提供的说明通过会员入口查看及领取福利。`,
  `3.2 Membership Portal  |  会员入口`,
  `Use of the Membership Portal is subject to these Terms and Conditions, our website Terms of Use, and our Privacy Policy. The Portal may not be available at all times.`,
  `使用会员入口须遵守本条款及细则、我们的网站使用条款及隐私政策。本入口可能并非随时可用。`,
  `3.3 Personal Use Only  |  仅供个人使用`,
  `Your membership is for your personal use only and is non-transferable. Commercial use is prohibited. Use by dependants may be permitted subject to additional conditions.`,
  `您的会员资格仅供个人使用，不可转让。商业使用被禁止。受养人的使用可能在附加条件下获得许可。`,
  `3.4 Independent Advice  |  独立建议`,
  `MixCare is not a substitute for professional medical advice. You should consult a qualified healthcare professional before making health decisions.`,
  `MixCare不能替代专业医疗建议。您应在做出医疗决定前咨询合资格的医疗专业人员。`,
  `4. Fees, Charges and Taxes  |  费用、收费及税款`,
  `All fees are specified in your Order Form or subscription plan. Fees are based on services purchased and not actual usage. Payment obligations are non-cancellable and fees paid are non-refundable unless otherwise stated.`,
  `所有费用在您的订购表格或订阅计划中列明。费用基于购买的服务而非实际使用量。付款义务不可取消，已付费用不予退还，除非另有说明。`,
  `You are responsible for all applicable taxes including Goods and Services Tax (GST) as levied under the Goods and Services Tax Act 1993 (Singapore). Prices displayed on the Platform may or may not include GST; any GST applicable will be indicated at the point of purchase.`,
  `您须负责所有适用税款，包括根据《商品及服务税法》（1993年，新加坡）征收的商品及服务税（GST）。平台上显示的价格可能包含或不含GST；任何适用的GST将在购买时注明。`,
  `The Company reserves the right to modify fees with reasonable notice.`,
  `本公司保留在合理通知后修改费用的权利。`,
  `5. The Company's Role  |  本公司的角色`,
  `We are an online platform that connects Consumers with third-party Wellness Providers. We are a neutral technology facilitator and are not a party to transactions between Users. We do not provide the wellness services listed on the Platform.`,
  `我们是一个线上平台，将消费者与第三方保健服务提供商连接起来。我们是中立的技术促进方，不是用户之间交易的一方。我们不提供平台上列出的保健服务。`,
  `5.1 Wellness Providers as Independent Contractors  |  保健服务提供商为独立承包商`,
  `Wellness Providers are independent contractors providing services directly to Consumers. There is NO employment relationship between Wellness Providers, Consumers, and the Company. Wellness Providers must comply with all applicable Singapore laws including the Employment Act 1968 (Cap. 91A), Central Provident Fund Act 1953, Work Injury Compensation Act 2019, and all applicable tax obligations under the Income Tax Act 1947. Wellness Providers are not entitled to CPF contributions, paid leave, or other statutory employee benefits from the Company.`,
  `保健服务提供商是直接向消费者提供服务的独立承包商。保健服务提供商、消费者与本公司之间不存在雇佣关系。保健服务提供商须遵守所有适用的新加坡法律，包括《雇佣法》（1968年，第91A章）、《公积金法》（1953年）、《工伤补偿法》（2019年）及《所得税法》（1947年）下的所有适用税务义务。保健服务提供商无权向本公司要求公积金供款、带薪假期或其他法定员工福利。`,
  `6. Registration Procedures  |  登记程序`,
  `To access the Platform, you must create a password-protected account. Consumers must agree to these Terms and provide required information. Wellness Providers must additionally complete email verification and warrant that they hold all necessary licences, qualifications, and insurance required by Singapore law.`,
  `要使用本平台，您须创建受密码保护的账户。消费者须同意本条款并提供所需资料。保健服务提供商还须完成电邮验证，并保证持有新加坡法律要求的所有必要许可证、资格及保险。`,
  `Wellness Providers are responsible for filing all applicable tax returns with the Inland Revenue Authority of Singapore (IRAS) in respect of all earnings from services provided through the Platform.`,
  `保健服务提供商就通过本平台提供服务所赚取的所有收入，全责向新加坡税务局（IRAS）申报所有适用的税务申报表。`,
  `7. No Guarantees for Wellness Services  |  不保证保健服务`,
  `We do not guarantee Wellness Provider attendance or service quality. Any verification badge indicates only Platform membership, not an endorsement. Consumers should exercise due diligence before engaging Wellness Providers.`,
  `我们不保证保健服务提供商的出勤率或服务质量。任何认证标志仅表示平台会员身份，并非背书。消费者在聘用保健服务提供商前应进行尽职调查。`,
  `8. Release from Claims  |  免除索偿`,
  `Disputes between Consumers and Wellness Providers should be addressed directly with the Wellness Provider. Users agree to release the Company and its officers, directors, affiliates, employees, and agents from claims arising from such disputes.`,
  `消费者与保健服务提供商之间的纠纷应直接向保健服务提供商提出。用户同意免除本公司及其高管、董事、附属公司、员工及代理人对任何由此类纠纷引起的索偿。`,
  `9. Prohibited Uses  |  禁止使用`,
  `You must not misuse the Platform. Prohibited activities include: hacking, scraping, fraud, spamming, soliciting other users, recreating or competing with the Company, collecting personal data of other users, or using the Platform for any unlawful purpose under Singapore law.`,
  `您不得滥用本平台。禁止活动包括：入侵、抓取数据、欺诈、发送垃圾邮件、招揽其他用户、重复建立或与本公司竞争、收集其他用户的个人数据，或将本平台用于任何违反新加坡法律的非法目的。`,
  `The Company reserves the right to immediately terminate your access and initiate legal proceedings for misuse.`,
  `本公司保留立即终止您的访问权限并对滥用行为提起法律程序的权利。`,
  `10. Subscription and Billing  |  订阅及账单`,
  `These billing terms apply to all subscription-based services on MixCare Health. You must be at least 18 years old to purchase. All subscription services are non-refundable unless otherwise specified.`,
  `本账单条款适用于MixCare Health上所有订阅制服务。您须年满18岁方可购买。除非另有说明，所有订阅服务均不予退款。`,
  `Where a refund is required under the Consumer Protection (Fair Trading) Act (Singapore), MixCare Health will comply with applicable obligations.`,
  `如根据《消费者保护（公平交易）法》（新加坡）须提供退款，MixCare Health将履行相关义务。`,
  `To cancel, contact us at info@mixcarehealth.com. Your membership will continue until the end of the current billing cycle. Processing takes up to 5 business days.`,
  `如需取消，请联络info@mixcarehealth.com。您的会员资格将持续至当前计费周期结束。处理时间最长需5个工作日。`,
  `11. Privacy and Personal Data  |  隐私及个人数据`,
  `The collection, use, and disclosure of your personal data is governed by our Privacy Policy, which is incorporated herein by reference. By using the Platform, you consent to such collection and use.`,
  `您的个人数据的收集、使用及披露受我们的隐私政策（通过引用纳入本协议）约束。使用本平台即表示您同意此类收集及使用。`,
  `Your personal data is collected and processed in accordance with the Personal Data Protection Act 2012 (Singapore) ("PDPA"). You have the right to access, correct, and withdraw consent to the use of your personal data as provided under the PDPA. Data Protection Officer contact: info@mixcarehealth.com.`,
  `您的个人数据依照《个人数据保护法》（2012年，新加坡）（"PDPA"）进行收集及处理。您有权根据PDPA要求查阅、更正及撤回对使用您的个人数据的同意。数据保护官联络方式：info@mixcarehealth.com。`,
  `We will not sell your personal data to third parties. We may share data with trusted service partners who are bound by data protection obligations. Cross-border transfers of personal data will be made only in compliance with the PDPA and its Transfer Limitation Obligation.`,
  `我们不会将您的个人数据出售给第三方。我们可能与受数据保护义务约束的可信服务合作伙伴共享数据。个人数据的跨境传输仅在符合PDPA及其转移限制义务的情况下进行。`,
  `12. Communications  |  通讯`,
  `By registering, you consent to receive transactional communications via SMS and email. Marketing messages require your separate consent under the PDPA. To opt out of SMS, contact us at +852 2323 3132. Opt-out of email marketing via our Privacy Policy.`,
  `通过登记，您同意通过短信及电邮接收交易通知。营销信息需要您根据PDPA单独同意。如需退出短信，请联系+852 2323 3132。退出电邮营销，请参阅我们的隐私政策。`,
  `13. Dispute Resolution  |  纠纷解决`,
  `Disputes between Consumers and Wellness Providers should be addressed directly with the Wellness Provider. Disputes between you and the Company shall first be submitted to good faith negotiation for 30 days. If unresolved, disputes shall be settled by arbitration per Section 24.`,
  `消费者与保健服务提供商之间的纠纷应直接向保健服务提供商提出。您与本公司之间的纠纷应首先提交诚信谈判，期限为30天。如未能解决，纠纷应依照第24条提交仲裁。`,
  `Nothing in this clause prevents either party from seeking urgent interim or injunctive relief from the Singapore courts.`,
  `本条款不妨碍任何一方向新加坡法院寻求紧急临时或禁令救济。`,
  `14. User Generated Content  |  用户生成内容`,
  `Content you post on the Platform may be viewed by the public. You grant the Company an irrevocable, royalty-free, worldwide licence to use, reproduce, modify, and distribute such content. You warrant that you own or have rights to all content you post.`,
  `您在本平台发布的内容可能被公众查看。您授予本公司不可撤销的、免版税的全球许可，以使用、复制、修改和分发此类内容。您保证您拥有或有权使用您发布的所有内容。`,
  `The Company reserves the right to remove content that violates content guidelines including offensive, illegal, false, or platform-standard-violating material.`,
  `本公司保留删除违反内容指引的内容的权利，包括冒犯性、非法、虚假或违反平台标准的材料。`,
  `15. Intellectual Property  |  知识产权`,
  `All Platform content (excluding user-generated content) is owned by the Company and protected under the Copyright Act 2021 (Singapore) and applicable international intellectual property laws. You may not copy, reproduce, or retransmit any content without prior written consent.`,
  `本平台所有内容（用户生成内容除外）归本公司所有，并受《版权法》（2021年，新加坡）及适用的国际知识产权法律保护。未经事先书面同意，您不得复制、重制或转播任何内容。`,
  `16. Wellness Provider Pre-Screening  |  保健服务提供商预审`,
  `While the Company verifies Wellness Providers, we cannot guarantee the accuracy of information provided. Verification is conducted at registration and may not reflect current status. Consumers should perform independent due diligence.`,
  `虽然本公司对保健服务提供商进行核实，但我们无法保证所提供信息的准确性。核实于登记时进行，可能不反映当前状态。消费者应进行独立的尽职调查。`,
  `17. Ratings & Reviews  |  评分及评论`,
  `Ratings and Reviews reflect Consumer opinions only and do not represent the views of the Company. The Company assumes no responsibility for any Review or resulting claims.`,
  `评分及评论仅反映消费者的意见，并不代表本公司的观点。本公司对任何评论或因此产生的索偿概不负责。`,
  `18. Articles and Content  |  文章及内容`,
  `Platform wellness content is provided "as-is" without warranties and does not constitute professional advice.`,
  `平台上的保健内容按"原样"提供，不附带任何保证，且不构成专业建议。`,
  `19. Third Party Links  |  第三方链接`,
  `Links to third-party sites are for convenience only and do not constitute endorsement. Use of such sites is at your own risk and governed by their own terms.`,
  `第三方网站链接仅供参考，并不构成背书。使用此类网站的风险由您自行承担，并受其本身条款约束。`,
  `20. Disclaimer of Warranties  |  免责声明`,
  `THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY SINGAPORE LAW, THE COMPANY DISCLAIMS ALL IMPLIED WARRANTIES INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.`,
  `本平台按"原样"提供，不附带任何形式的保证。在新加坡法律允许的最大范围内，本公司免除所有默示保证，包括适销性及特定用途适用性。`,
  `Nothing in these Terms shall exclude any rights you have under the Consumer Protection (Fair Trading) Act (Singapore) or other applicable Singapore consumer protection legislation, which cannot be excluded by agreement.`,
  `本条款中的任何内容均不排除您依据《消费者保护（公平交易）法》（新加坡）或其他适用新加坡消费者保护法规享有的、不可通过协议排除的权利。`,
  `21. Limitation of Liability  |  责任限制`,
  `To the maximum extent permitted by Singapore law, the Company shall not be liable for any indirect, incidental, special, consequential or exemplary damages arising from your use of the Platform or services.`,
  `在新加坡法律允许的最大范围内，本公司对因您使用本平台或服务而引起的任何间接、附带、特殊、后果性或惩罚性损失概不负责。`,
  `If the Company is found liable, the aggregate liability shall not exceed the total fees paid by you in the six (6) months preceding the claim.`,
  `如本公司被裁定须承担责任，则总责任上限为您在索偿前六（6）个月内向本公司支付的总费用。`,
  `22. Indemnification  |  赔偿`,
  `You agree to indemnify, defend, and hold harmless the Company, its directors, officers, employees, and agents from any claims, losses, or expenses (including legal fees) arising from your use of the Platform, violation of these Terms, or breach of any third-party rights.`,
  `您同意就因您使用本平台、违反本条款或侵犯第三方权利而引起的任何索偿、损失或费用（包括法律费用）对本公司及其董事、高管、员工及代理人作出赔偿、辩护及保障。`,
  `23. Changes and Termination  |  修改及终止`,
  `23.1 Changes to the Program  |  修改计划`,
  `We may modify, suspend, or terminate any aspect of MixCare at any time. Changes are effective upon posting.`,
  `我们可随时修改、暂停或终止MixCare的任何方面。修改于发布后立即生效。`,
  `23.2 Termination by the Company  |  本公司终止`,
  `We may terminate your membership for misuse, breach, or fraud, with or without notice.`,
  `我们可以有/无通知的方式，因滥用、违规或欺诈而终止您的会员资格。`,
  `23.3 Termination by You  |  由您终止`,
  `To terminate, contact us at info@mixcarehealth.com. Your membership continues until the end of the billing cycle. Processing takes up to 5 business days.`,
  `如需终止，请联络info@mixcarehealth.com。您的会员资格持续至计费周期结束。处理时间最长需5个工作日。`,
  `23.4 Termination upon Demise  |  死亡时终止`,
  `Membership automatically terminates upon a member's death.`,
  `会员资格于会员死亡时自动终止。`,
  `24. Artificial Intelligence (AI) Terms of Use  |  人工智能使用条款`,
  `MixCare Health may incorporate artificial intelligence ("AI") and machine learning features including health recommendations, symptom checking tools, benefits optimisation suggestions, and wellness content personalisation ("AI Features").`,
  `MixCare Health可能整合人工智能（"AI"）及机器学习功能，包括健康建议、症状检测工具、福利优化建议及保健内容个性化功能（"AI功能"）。`,
  `24.1 Nature of AI Features  |  AI功能的性质`,
  `AI Features are for informational and convenience purposes only. They do not constitute medical advice, diagnosis, or treatment. AI-generated outputs may be inaccurate or inapplicable to your circumstances. You must not rely on AI Features as a substitute for professional medical, health, financial, or legal advice.`,
  `AI功能仅供资讯及便利目的而提供。它们不构成医疗建议、诊断或治疗。AI生成的输出可能不准确或不适用于您的情况。您不得将AI功能替代专业医疗、健康、财务或法律建议。`,
  `24.2 Data Use by AI  |  AI的数据使用`,
  `AI Features may process your health data, usage patterns, and preferences to provide personalised outputs. By using AI Features, you consent to such processing. All processing is conducted in accordance with our Privacy Policy and the Personal Data Protection Act 2012 (Singapore). You may withdraw consent at any time by contacting info@mixcarehealth.com, though withdrawal may affect the availability of certain AI Features.`,
  `AI功能可能处理您的健康数据、使用模式及偏好以提供个性化输出。使用AI功能即表示您同意此类处理。所有处理均依照我们的隐私政策及《个人数据保护法》（2012年，新加坡）进行。您可随时通过联络info@mixcarehealth.com撤回同意，但撤回可能影响某些AI功能的可用性。`,
  `24.3 Limitations and Disclaimer  |  限制及免责声明`,
  `The Company makes no warranty that AI Features will be accurate, uninterrupted, or error-free. The Company shall not be liable for decisions made based on AI-generated outputs. AI Features may be modified, suspended, or discontinued at any time.`,
  `本公司不保证AI功能的准确性、连续性或无错误。本公司对基于AI生成输出所作的任何决定概不负责。AI功能可能随时被修改、暂停或终止。`,
  `24.4 User Obligations  |  用户义务`,
  `You must not attempt to reverse-engineer, manipulate, or circumvent AI Features. You must not use AI Features to generate or spread misinformation. You must not use AI outputs for any unlawful purpose under Singapore law.`,
  `您不得尝试对AI功能进行逆向工程、操纵或规避。您不得使用AI功能生成或传播虚假信息。您不得将AI输出用于任何违反新加坡法律的非法目的。`,
  `24.5 Feedback  |  反馈`,
  `Report any errors or concerning AI outputs to info@mixcarehealth.com. We continuously monitor AI systems for quality and safety.`,
  `如发现AI输出存在错误或令人担忧的内容，请向info@mixcarehealth.com报告。我们持续监控AI系统以确保质量及安全。`,
  `25. Arbitration  |  仲裁`,
  `Any dispute, controversy or claim arising out of or relating to this Agreement shall be referred to and finally resolved by arbitration administered by the Singapore International Arbitration Centre ("SIAC") in accordance with the Arbitration Rules of the SIAC for the time being in force. The seat of arbitration shall be Singapore. There shall be one arbitrator. The language of arbitration shall be English.`,
  `因本协议产生的或与之相关的任何争议、纠纷或索偿，应提交新加坡国际仲裁中心（"SIAC"）按照其现行仲裁规则进行最终裁决。仲裁地点为新加坡。仲裁员一名。仲裁语言为英语。`,
  `26. Governing Law  |  适用法律`,
  `This Agreement is governed by and construed in accordance with the laws of the Republic of Singapore. Subject to Section 25, the parties submit to the non-exclusive jurisdiction of the Singapore courts.`,
  `本协议受新加坡共和国法律管辖并据此解释。在第25条的规限下，双方服从新加坡法院的非专属管辖权。`,
  `27. HealthCoin Terms  |  HealthCoin条款`,
  `The following terms apply to HealthCoin and HealthCoin redemption codes:`,
  `以下条款适用于HealthCoin及HealthCoin兑换码：`,
  `>> HealthCoin is only applicable to MixCare direct sales customers, employee benefit plan participants, or MixCare channel customers.  |  HealthCoin仅适用于MixCare直销客户、员工福利计划参与者或MixCare渠道客户。`,
  `>> HealthCoin exchange rate: 1 HealthCoin = SGD 1 (or equivalent as specified in the Platform).  |  HealthCoin兑换率：1 HealthCoin = 新加坡元1元（或平台指定等值货币）。`,
  `>> Remaining HealthCoin balance may be used for subsequent purchases on the Platform.  |  剩余的HealthCoin余额可用于平台上的后续购买。`,
  `>> HealthCoins are non-exchangeable for cash, non-refundable, and non-transferable.  |  HealthCoin不可兑换为现金、不可退款且不可转让。`,
  `>> MixCare Health reserves the right to cancel HealthCoins for fraud or abuse.  |  MixCare Health保留因欺诈或滥用而取消HealthCoin的权利。`,
  `>> In the event of any inconsistency between language versions, the English version prevails.  |  如各语言版本之间存在不一致，以英文版本为准。`,
  `>> MixCare Health reserves the right to vary or terminate the HealthCoin programme without prior notice.  |  MixCare Health保留在不事先通知的情况下修改或终止HealthCoin计划的权利。`,
  `28. General Provisions  |  一般条款`,
  `Severability: If any provision is found unlawful or unenforceable, it shall be modified to be enforceable to the maximum extent possible, and if modification is not possible, it shall be severed without affecting remaining provisions.`,
  `可分割性：如任何条款被裁定为非法或不可执行，应在最大可能范围内修改以使其可执行；如无法修改，该条款应被剔除，而不影响其余条款。`,
  `Entire Agreement: These Terms and Conditions constitute the entire agreement between you and the Company and supersede all prior agreements.`,
  `完整协议：本条款及细则构成您与本公司之间的完整协议，并取代所有先前的协议。`,
  `Language: In case of inconsistency between the English and Chinese versions, the English version shall prevail.`,
  `语言：如英文版本与中文版本之间存在不一致，以英文版本为准。`,
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
  en:      { headerPrefix: "General Terms & Conditions —", contactUs: "Contact Us" },
  "zh-TW": { headerPrefix: "一般條款及細則 —",               contactUs: "聯絡我們" },
  "zh-CN": { headerPrefix: "一般条款及细则 —",               contactUs: "联络我们" },
} as const;

// ── Main component ────────────────────────────────────────────────────────────
export default function TcViewer() {
  const { locale } = useLanguage();
  const lang: Lang = locale === "en" ? "en" : "zh";
  const [regionId, setRegionId] = useState(() => locale === "zh-CN" ? "sg" : "hk");

  useEffect(() => { setRegionId(locale === "zh-CN" ? "sg" : "hk"); }, [locale]);

  const region = REGIONS.find((r) => r.id === regionId)!;
  const entries = parse(region.lines);

  const ui = UI_STRINGS[locale] ?? UI_STRINGS["en"];
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
        <TcContent entries={entries} lang={lang} />

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
          </div>
        </div>
      </div>
    </div>
  );
}
