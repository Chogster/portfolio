import * as React from "react";
import {
    Box,
    Spacer,
    Center,
    Skeleton,
    useColorMode,
    SimpleGrid,
    Link,
    Grid,
} from "@chakra-ui/react"
import { PageContext } from "../types/pagecontext";
import Sidebar from "./sidebar";
import * as base from "../style/base.module.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHeart } from "@fortawesome/free-solid-svg-icons";
import Typed from 'typed.js';

interface Props {
    location?: Location
    title?: string
    children?: any,
    pageContext: PageContext
}

const Layout = ( {children, pageContext}: Props) => {
    const [imgLoaded, setImgLoaded] = React.useState<boolean>(false);
    const [currentPath, setCurrentPath] = React.useState<string>();
    const [shortSlug, setShortSlug] = React.useState<string>();
    const [imgUrl, setImgUrl] = React.useState<string>();
    const { t } = useTranslation();
    const { colorMode } = useColorMode();
    const typeTarget = React.useRef(null);
    const typedStrings: string[] = t("pages.about.typedStrings", { returnObjects: true });

    // Show skeleton on route change
    useEffect(() => {
        if (pageContext.originalPath !== currentPath) {
            setPage();
            setCurrentPath(pageContext.originalPath);
        }

        if ((shortSlug === "about")) {
            const typed = new Typed(typeTarget.current || "", {
                strings: typedStrings,
                typeSpeed: 30,
                backDelay: 2000,
                backSpeed: 40,
                loopCount: Infinity,
                loop: true,
            });
    
            return () => {
                typed.destroy();
            };
        }
        
    });

    const setPage = () => {
        setImgLoaded(false);
        const img = new Image();
        const slug = pageContext.originalPath.replace(/(.html|\/)/g, "");
        setShortSlug(slug ? slug : 'about');

        if (slug === "contact") {
            img.src = `/images/contact.jpg`;
        } else if (slug === "projects") {
            img.src = `/images/projects.jpg`;
        } else if (slug === "404") {
            img.src = `/images/404.jpg`;
        } else {
            const decider = (Math.floor(Math.random() *100)) % 2;
            img.src = `/images/landing${decider}.jpg`;
        }

        setImgUrl(img.src);

        img.addEventListener('load', () => {
            setImgLoaded(true);
        });
    }

    const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, pageContext),
    );

    return (
        <Box h="100vh" display="flex" flexDirection="column">
            <Grid templateRows="1" templateColumns="25fr 5fr 1fr" position="fixed" zIndex="2" backgroundColor={colorMode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(21, 21, 21, 0.9)'} width="100%" height="6rem" py='2rem' px="1rem">
                <Box fontSize="1.5rem">{t("siteMetadata.title")}</Box>
                <Spacer />
                <Sidebar pageContext={pageContext} />
            </Grid>
            <Skeleton mt="6rem" display="flex" flexDirection="column" justifyContent="center" isLoaded={imgLoaded}>
                <Box backgroundColor={colorMode === 'light' ? 'rgba(211, 211, 211, 0.6)' : 'rgba(21, 21, 21, 0.7)'} className={base.landingBox} fontSize="3rem" >
                    {t('pages.'+shortSlug+'.landingBox')}
                </Box>
                {(shortSlug === "about") && 
                <Box mt="10rem" mb="auto" backgroundColor={colorMode === 'light' ? 'rgba(211, 211, 211, 0.6)' : 'rgba(21, 21, 21, 0.7)'} className={base.landingBox} fontSize="1.5rem">
                    <span ref={typeTarget}></span>
                </Box>}
                <Box width="100%" height="40vh">
                    <Box alignSelf="center" className={base.landingBg} alignItems="end" alignContent="end" display="flex" backgroundImage={imgUrl} />
                </Box>
            </Skeleton>
            <SimpleGrid>
                <Box fontSize="1.15rem" display="block" boxSize="fit-content" px="2rem" py="2rem">
                        {childrenWithProps}
                </Box>
            </SimpleGrid>
            <Spacer />
            <Box py="3rem">
                <Center>
                    Made with &nbsp;<FontAwesomeIcon icon={faCoffee} />&nbsp; and&nbsp;<FontAwesomeIcon color="red" icon={faHeart} />&nbsp;by&nbsp;<Link target="_blank" color="#00bfb1" href="https://github.com/chogster/portfolio">Bartu Bazna</Link>
                </Center>
            </Box>
        </Box>
    );
}

export default Layout;