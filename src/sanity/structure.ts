import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("MixCare Content")
    .items([
      S.listItem().title("Site Settings").id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem().title("Resources").child(
        S.list().title("Resources").items([
          S.documentTypeListItem("article").title("Articles"),
          S.documentTypeListItem("caseStudy").title("Case Studies"),
          S.documentTypeListItem("whitepaper").title("Whitepapers"),
          S.documentTypeListItem("faqItem").title("FAQ Items"),
        ])
      ),
      S.divider(),
      S.listItem().title("Platform Pages").child(
        S.documentTypeList("platformPage").title("Platform Pages")
      ),
      S.listItem().title("Audience Pages").child(
        S.documentTypeList("audiencePage").title("Audience Pages")
      ),
      S.divider(),
      S.listItem().title("Team Members").child(
        S.documentTypeList("teamMember").title("Team Members")
      ),
    ]);
