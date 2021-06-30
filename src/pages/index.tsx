import * as React from "react"
import { useTranslation } from "react-i18next";
import SEO from "../modules/seo";
import { PageContext } from "../types/pagecontext";

// markup
const IndexPage = ( pageContext: PageContext ) => {
  const { t } = useTranslation();
  return (
    <>
    <SEO title={t("siteMetadata.title")+" | "+t("siteMetadata.menuLinks.links.0.name")} description={t("siteMetadata.menuLinks.links.0.description")}></SEO>
      <h2>{t("siteMetadata.title")}</h2>
    </>
  )
}

export default IndexPage
