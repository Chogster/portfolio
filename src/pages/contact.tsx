import { Box, Center, FormControl, FormHelperText, FormLabel, Grid, Input, SimpleGrid, Skeleton, Tag, Textarea } from "@chakra-ui/react";
import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../modules/seo";

const ContactPage = () => {
    const { t } = useTranslation();
    const [currentTime, setCurrentTime] = React.useState<Date>(new Date());
    const paragraphs: string[] = t("pages.contact.paragraphs", { returnObjects: true });
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return(() => {
            clearInterval(interval);
        })
    });

    return (
        <>
        <SEO title={t("siteMetadata.title")+" | "+t("siteMetadata.menuLinks.links.1.name")} description={t("siteMetadata.menuLinks.links.1.description")}></SEO>
        <SimpleGrid columns={{base: 1, lg: 2}} gap={10}>
            <Box w="100%" display="block" boxSize="fit-content">
                <Grid templateColumns="2fr 7fr" gap={5}>
                <Box>
                    <img style={{maxWidth:"80%", marginLeft:"auto", marginRight:"auto"}} src="/illustrations/undraw_time.svg" />
                </Box>
                <Box boxSize="fit-content">
                    <>
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
                        <Center fontSize="2.5rem">{currentTime.toLocaleTimeString('de-DE', {hour12:true, timeZone: 'Europe/Berlin'})}</Center>
                    </>
                </Box>
                </Grid>
            </Box>
            <Box w="100%" display="block" boxSize="fit-content">
                <SimpleGrid columns={1}>
                    <Grid templateColumns="2fr 7fr" gap={5}>
                        <Box>
                            <img style={{maxWidth:"80%", marginLeft:"auto", marginRight:"auto"}} src="/illustrations/undraw_chat.svg" />
                        </Box>
                        <Box boxSize="fit-content" w="80%">
                            <FormControl id="name" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" />
                            </FormControl>
                            <FormControl id="message" isRequired>
                                <FormLabel>Message</FormLabel>
                                <Textarea/>
                            </FormControl>
                        </Box>
                    </Grid>
                </SimpleGrid>
            </Box>
        </SimpleGrid>
        </>
    )
}

export default ContactPage;