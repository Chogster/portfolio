import { Box } from "@chakra-ui/react";
import * as React from "react"
import { useTranslation } from "react-i18next";
import SEO from "../modules/seo";

// markup
const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <>
    <SEO title={t("siteMetadata.title")+" | 404"} description={t("pages.404.description")}></SEO>
      <Box>
        {t("pages.404.paragraphs")}
      </Box>
    </>
  )
}

export default NotFoundPage