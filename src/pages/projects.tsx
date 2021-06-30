import * as React from "react";
import { useTranslation } from "react-i18next";
import SEO from "../modules/seo";
const ContactPage = () => {
    const { t } = useTranslation();

    return (
        <>
        <SEO title={t("siteMetadata.title")+" | "+t("siteMetadata.menuLinks.links.2.name")} description={t("siteMetadata.menuLinks.links.2.description")}></SEO>
            This is the projects page, hello!
        </>
    )
}

export default ContactPage;