import { articleType } from "./article";
import { audiencePageType } from "./audiencePage";
import { platformPageType } from "./platformPage";
import { caseStudyType } from "./caseStudy";
import { whitepaperType } from "./whitepaper";
import { teamMemberType } from "./teamMember";
import { faqItemType } from "./faqItem";
import { siteSettingsType } from "./siteSettings";
import { aboutPageType } from "./aboutPage";
import { trustPageType } from "./trustPage";
import { contactPageType } from "./contactPage";
import { getDemoPageType } from "./getDemoPage";
import { startNowPageType } from "./startNowPage";
import { partnersPageType } from "./partnersPage";
import { homePageType } from "./homePage";
import { pressItemType } from "./pressItem";
import { tableBlockType } from "./tableBlock";

export const schemaTypes = [
  // Custom shared blocks (must be registered before types that reference them)
  tableBlockType,
  articleType,
  pressItemType,
  audiencePageType,
  platformPageType,
  caseStudyType,
  whitepaperType,
  teamMemberType,
  faqItemType,
  siteSettingsType,
  aboutPageType,
  trustPageType,
  contactPageType,
  getDemoPageType,
  startNowPageType,
  partnersPageType,
  homePageType,
];
