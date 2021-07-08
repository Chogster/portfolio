import { Box, SimpleGrid, Tag, Image } from "@chakra-ui/react";
import * as React from "react"
import { useTranslation } from "react-i18next";
import SEO from "../modules/seo";

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
          <SimpleGrid columns={1}>
            <Box w="100%" textAlign="center" display="block" mb="1rem">
              <Image style={{marginLeft:"auto", marginRight:"auto", height:"18vh"}} src="/illustrations/undraw_working.svg" />
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
          </SimpleGrid>
        </Box>
        <Box w="100%" display="block" boxSize="fit-content">
          <SimpleGrid columns={1}>
            <SimpleGrid columns={1}>
              <Box w="100%" textAlign="center" display="block" mb="1rem">
                <Image style={{marginLeft:"auto", marginRight:"auto", height:"18vh"}} src="/illustrations/undraw_winter_walk.svg" />
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
            </SimpleGrid>
            <SimpleGrid columns={1}>
              <Box w="100%" textAlign="center" display="block" mb="1rem">
                <Image style={{marginLeft:"auto", marginRight:"auto", height:"18vh"}} src="/illustrations/undraw_certificate.svg" />
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
                )}
                {
                  [...skills].map((skill, i) => {
                    return (
                      <span key={i}>
                        <Tag mt="0.3rem" py="0.3rem" px="1.5rem" fontSize="1.15rem" borderRadius="xl">
                          <Image maxH="1rem" ml="-0.75rem" mr="0.4rem" src={`/devicons/${skill.toLowerCase()}.svg`} /> {skill}
                        </Tag>
                        {i === skills.length -1 ? "" : " "}
                      </span>
                    )
                  }
                )}
              </Box>
            </SimpleGrid>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </>
  )
}

export default IndexPage
