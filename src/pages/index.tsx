import { Box, Skeleton } from "@chakra-ui/react";
import * as React from "react"
import { useTranslation } from "react-i18next";
import SEO from "../modules/seo";
import * as base from "../style/base.module.css";

// markup
const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={t("siteMetadata.title")+" | "+t("siteMetadata.menuLinks.links.0.name")} description={t("siteMetadata.menuLinks.links.0.description")}></SEO>
      <h2 className={base.landingTitle}>{t("siteMetadata.title")}</h2>
    </>
  )
}

export default IndexPage
