import { Box, SimpleGrid, Tag, Image, TagLeftIcon } from "@chakra-ui/react";
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
          <SimpleGrid columns={1} boxSize="fit-content">
            <Box w="100%" textAlign="center" display="block" mb="1rem">
              <Image style={{marginLeft:"auto", marginRight:"auto", height:"18vh"}} src="/illustrations/undraw_working.svg" />
            </Box>
            <Box py="2rem" boxSize="fit-content">
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
          <SimpleGrid columns={1} boxSize="fit-content">
            <SimpleGrid columns={1}>
              <Box w="100%" textAlign="center" display="block" mb="1rem">
                <Image style={{marginLeft:"auto", marginRight:"auto", height:"18vh"}} src="/illustrations/undraw_winter_walk.svg" />
              </Box>
              <Box py="2rem" boxSize="fit-content">
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
            <SimpleGrid columns={1} py="1rem">
              <Box w="100%" textAlign="center" display="block" mb="1rem">
                <Image style={{marginLeft:"auto", marginRight:"auto", height:"18vh"}} src="/illustrations/undraw_certificate.svg" />
              </Box>
              <Box py="2rem" boxSize="fit-content">
                {[...skillTexts].map((text, i) => {
                    return (
                      <Box key={i}>
                        {text}<br />
                        {i === skillTexts.length -1 ? "" : <br />}
                      </Box>
                    )
                  }
                )}
                <br />
                {
                  [...skills].map((skill, i) => {
                    return (
                      <span key={i}>
                        <Tag mt="0.3rem" py="0.3rem" fontSize="1.15rem" mr="2px">
                          <TagLeftIcon as={Image} src={`/devicons/${skill.toLowerCase()}.svg`} />
                          {skill}
                        </Tag>
                      </span>
                    )
                  }
                )}
              </Box>
            </SimpleGrid>
          </SimpleGrid>
      </SimpleGrid>
    </>
  )
}

export default IndexPage
