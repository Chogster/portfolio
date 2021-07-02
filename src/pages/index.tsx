import { Box, Grid, SimpleGrid, Skeleton, Wrap } from "@chakra-ui/react";
import * as React from "react"
import { useTranslation } from "react-i18next";
import SEO from "../modules/seo";
import * as base from "../style/base.module.css";

// markup
const IndexPage = () => {
  const { t } = useTranslation();
  const paragraphs: string[] = t("pages.about.paragraphs", { returnObjects: true });

  return (
    <>
      <SEO title={t("siteMetadata.title")+" | "+t("siteMetadata.menuLinks.links.0.name")} description={t("siteMetadata.menuLinks.links.0.description")}></SEO>
      <SimpleGrid columns={{base: 1, lg: 2}} gap={10}>
        <Box w="100%" display="block" boxSize="fit-content">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Grid templateColumns="2fr 7fr" gap={5}>
              <Box w="100%" boxSize="fit-content">
                <img width="100%" src="/illustrations/undraw_hello.svg" />
              </Box>
              <Box w="100%" boxSize="fit-content">
                {
                  paragraphs.map((paragraph, i) => {
                    return (
                      <Box>
                        {paragraph}<br />
                        {i === paragraph.length ? "" : <br />}
                      </Box>
                    )
                  }
                )}
              </Box>
            </Grid>
          </Box>
        </Box>
        <Box w="100%" display="block" h="20vh" bg="blue.500" />
      </SimpleGrid>
    </>
  )
}

export default IndexPage
