import { Box, Center, FormControl, FormHelperText, FormLabel, Input, SimpleGrid, Textarea, Image, Checkbox, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../modules/seo";
import * as Yup from "yup";

const ContactPage = () => {
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
            termsAccepted: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().max(30).required(), 
            email: Yup.string().email().required(),
            message: Yup.string().min(15).required(),
            termsAccepted: Yup.boolean().required().oneOf([true])
          }),
        onSubmit: values => {
            // Placeholder function, remove this and add an action to your "form". Look at documentation for more info.
            alert(JSON.stringify(values, null, 2));
        },
   
      });
    const [currentTime, setCurrentTime] = React.useState<Date>(new Date());
    const paragraphs: string[] = t("pages.contact.paragraphs", { returnObjects: true });
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return(() => {
            clearInterval(interval);
        })
    }, [currentTime]);

    return (
        <>
        <SEO title={t("siteMetadata.title")+" | "+t("siteMetadata.menuLinks.links.1.name")} description={t("siteMetadata.menuLinks.links.1.description")}></SEO>
        <SimpleGrid columns={{base: 1, lg: 2}} gap={10}>
            <SimpleGrid columns={1} boxSize="fit-content">
                <Box w="100%" textAlign="center" display="block" mb="1rem">
                    <Image style={{marginLeft:"auto", marginRight:"auto", height:"18vh"}} src="/illustrations/undraw_time.svg" />
                </Box>
                <Box boxSize="fit-content" mb="1rem">
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
            </SimpleGrid>
            <SimpleGrid columns={1}>
                <Box w="100%" textAlign="center" display="block" mb="1rem">
                    <Image style={{marginLeft:"auto", marginRight:"auto", height:"18vh"}} src="/illustrations/undraw_chat.svg" />
                </Box>
                <Box display="block" w="100%">
                    <form onSubmit={formik.handleSubmit} method="POST">
                        <FormControl isRequired>
                            <FormLabel>{t('pages.contact.form.nameLabel')}</FormLabel>
                            <Input name="name" type="text" onChange={formik.handleChange} value={formik.values.name} required />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t('pages.contact.form.emailLabel')}</FormLabel>
                            <Input name="email" type="email" onChange={formik.handleChange} value={formik.values.email} required />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t('pages.contact.form.messageLabel')}</FormLabel>
                            <Textarea name="message" onChange={formik.handleChange} value={formik.values.message} required />
                            <FormHelperText>{t('pages.contact.form.messageHelper')}</FormHelperText>
                        </FormControl>
                        <FormControl isRequired>
                            <Checkbox onChange={formik.handleChange} value={formik.values.termsAccepted} name="termsAccepted" isRequired>{t('pages.contact.form.termsAcceptedLabel')}</Checkbox>
                        </FormControl>
                        <Center>
                        <Button disabled={!formik.isValid} type="submit">
                            {t('pages.contact.form.submitLabel')}
                        </Button>
                        </Center>
                    </form>
                </Box>
            </SimpleGrid>
        </SimpleGrid>
        </>
    )
}

export default ContactPage;