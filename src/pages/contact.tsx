import { Box, Skeleton } from "@chakra-ui/react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import SEO from "../modules/seo";

const ContactPage = () => {
    const { t } = useTranslation();

    return (
        <>
        <SEO title={t("siteMetadata.title")+" | "+t("siteMetadata.menuLinks.links.1.name")} description={t("siteMetadata.menuLinks.links.1.description")}></SEO>
            This is the contact page!
        </>
    )
}

export default ContactPage;