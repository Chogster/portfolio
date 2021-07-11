import { Box, Text, SimpleGrid, Image, Tag, TagLeftIcon, Spacer, Link } from "@chakra-ui/react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import SEO from "../modules/seo";

interface IProject {
    title: string;
    description: string;
    technologies: string[];
    url?: string;
    thumbnailSrc: string;
}

const ProjectsPage = () => {
    const { t } = useTranslation();
    const paragraphs: string[] = t("pages.projects.paragraphs", { returnObjects: true });
    const projects: IProject[] = t("pages.projects.projects", { returnObjects: true });

    return (
        <>
            <SEO title={t("siteMetadata.title")+" | "+t("siteMetadata.menuLinks.links.2.name")} description={t("siteMetadata.menuLinks.links.2.description")}></SEO>
            <SimpleGrid w="100%" columns={1}>
                <Box w="100%" textAlign="center" display="block" mb="1rem">
                    <Image w="100%" style={{marginLeft:"auto", marginRight:"auto", height:"18vh"}} src="/illustrations/undraw_maker.svg" />
                </Box>
                <Box w="100%" boxSize="fit-content" py="1rem">
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
                <SimpleGrid gap={10} columns={{base: 1, lg: 3}} justifyContent="space-around" alignContent="space-around" justifyItems="center">
                {
                    [...projects].map((project, i) => {
                        return (
                            <Box position="relative" key={i} borderWidth="1px" borderRadius="lg" overflow="auto" w={{base: "100%", lg: "29vw"}}>
                                <Image style={{marginLeft:"auto", marginRight:"auto"}} w={{base: "100%", lg: "29vw"}} src={project.thumbnailSrc} borderWidth="1px" borderRadius="lg" />
                                <Text pt="1rem" px="1rem" fontSize="1.5rem" fontWeight="bold">
                                    {project.title}
                                    {
                                        project.url && <> - <Link target="_blank" color="#00bfb1" href={project.url}>demo</Link></>
                                    }
                                </Text>
                                <Text pb="5rem" px="1rem">{project.description}</Text>
                                <Box position="absolute" bottom="0" p="1rem">
                                {
                                    [...project.technologies].map((tech, j) => {
                                        return (
                                            <>
                                                <Tag key={j} mr="2px">
                                                    <TagLeftIcon as={Image} src={`/devicons/${tech.toLowerCase()}.svg`} />
                                                    {tech}
                                                </Tag>
                                            </>
                                        )
                                    })
                                }
                                </Box>
                            </Box>
                        )
                    }
                )}
                </SimpleGrid>
            </SimpleGrid>
        </>
    )
}

export default ProjectsPage;