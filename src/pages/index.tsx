import { Box, Grid, SimpleGrid, Tag } from "@chakra-ui/react";
import * as React from "react"
import { useTranslation } from "react-i18next";
import SEO from "../modules/seo";
import * as base from "../style/base.module.css";

// markup
const IndexPage = () => {
  const { t } = useTranslation();
  const paragraphs: string[] = t("pages.about.paragraphs", { returnObjects: true });
  const hobbies: string[] = t("pages.about.hobbies", { returnObjects: true });
  const skills: string[] = t("pages.about.skills", { returnObjects: true });
  const skillTexts: string[] = t("pages.about.skillTexts", { returnObjects: true });

  return (
    <>
      <SEO title={t("siteMetadata.title")+" | "+t("siteMetadata.menuLinks.links.0.name")} description={t("siteMetadata.menuLinks.links.0.description")}></SEO>
      <SimpleGrid columns={{base: 1, lg: 2}} gap={10}>
        <Box w="100%" display="block" boxSize="fit-content">
          <Grid templateColumns="2fr 7fr" gap={5}>
            <Box>
              <img style={{maxWidth:"80%", marginLeft:"auto", marginRight:"auto"}} src="/illustrations/undraw_working.svg" />
            </Box>
            <Box boxSize="fit-content">
              {
                [...paragraphs].map((paragraph, i) => {
                  return (
                    <Box key={i}>
                      {paragraph}<br />
                      {i === paragraph.length -1 ? "" : <br />}
                    </Box>
                  )
                }
              )}
            </Box>
          </Grid>
        </Box>
        <Box w="100%" display="block" boxSize="fit-content">
          <SimpleGrid columns={1}>
            <Grid templateColumns="2fr 7fr" gap={5}>
              <Box>
                <img style={{maxWidth:"80%", marginLeft:"auto", marginRight:"auto"}} src="/illustrations/undraw_winter_walk.svg" />
              </Box>
              <Box boxSize="fit-content">
                {
                  [...hobbies].map((paragraph, i) => {
                    return (
                      <Box key={i}>
                        {paragraph}<br />
                        {i === paragraph.length -1 ? "" : <br />}
                      </Box>
                    )
                  }
                )}
              </Box>
            </Grid>
            <Grid templateColumns="2fr 7fr" gap={5} mt="5rem">
              <Box>
                <img style={{maxWidth:"80%", marginLeft:"auto", marginRight:"auto"}} src="/illustrations/undraw_certificate.svg" />
              </Box>
              <Box boxSize="fit-content">
                {[...skillTexts].map((text, i) => {
                    return (
                      <Box key={i}>
                        {text}<br />
                        {i === skillTexts.length -1 ? "" : <br />}
                      </Box>
                    )
                  }
                )}<br />
                {
                  [...skills].map((skill, i) => {
                    return (
                      <>
                        <Tag key={i} borderRadius="full">
                          {skill}
                        </Tag>
                        {i === skills.length -1 ? "" : " "}
                      </>
                    )
                  }
                )}
              </Box>
            </Grid>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </>
  )
}

export default IndexPage
