import * as React from "react"
import { useTranslation } from "react-i18next";

// markup
const IndexPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t("siteMetadata.title")}</h2>
    </>
  )
}

export default IndexPage
