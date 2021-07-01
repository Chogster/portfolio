import * as React from "react";
import {
    Box,
    Spacer,
    Center,
    Skeleton,
} from "@chakra-ui/react"
import { Coffee } from "css.gg/icons/tsx/Coffee"
import { Heart } from "css.gg/icons/tsx/Heart"
import { CSSProperties } from "react";
import { PageContext } from "../types/pagecontext";
import Sidebar from "./sidebar";
import * as base from "../style/base.module.css";
import { useEffect } from "react";

interface Props {
    location?: Location
    title?: string
    children?: any,
    pageContext: PageContext
}

const Layout = ( {children, pageContext}: Props) => {
    const [imgLoaded, setImgLoaded] = React.useState<boolean>(false);
    const [currentPath, setCurrentPath] = React.useState<string>();

    // Show skeleton on route change
    useEffect(() => {
        if (pageContext.originalPath !== currentPath) {
            setImgLoaded(false);
            setCurrentPath(pageContext.originalPath);
        }
    })

    const getBgImg = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const img = new Image();
        if (pageContext.originalPath.includes("contact")) {
            img.src = `https://source.unsplash.com/-0xCCPIbl3M/${width}x${Math.round((height/100)*33)}`;
        } else if (pageContext.originalPath.includes("projects")) {
            img.src = `https://source.unsplash.com/9OKGEVJiTKk/${width}x${Math.round((height/100)*33)}`;
        } else if (pageContext.originalPath.includes("404")) {
            img.src = `https://source.unsplash.com/52jRtc2S_VE/${width}x${Math.round((height/100)*33)}`;
        } else {
            img.src = `https://source.unsplash.com/collection/551546/${width}x${Math.round((height/100)*33)}`;
        }
        img.addEventListener('load', () => {
            setImgLoaded(true);
        });
        return img.src;
    }

    const heartStyle: CSSProperties = {
        color: "red"
    }

    const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, pageContext),
    );

    return (
        <>
            <Box width="100%" height="60px" display="flex" alignItems="end" justifyContent="space-between" pt="10px" pr="20px">
                <Spacer />
                <Sidebar pageContext={pageContext} />
            </Box>
            <Skeleton mt="10px" isLoaded={imgLoaded}>
                <Box width="100%" height="33vh" display="flex" justifyContent="center">
                    <Box alignSelf="center" className={base.landingBg} alignItems="end" alignContent="end" display="flex" backgroundImage={"url("+getBgImg()+")"} />
                </Box>
            </Skeleton>
            <Box h="calc(67vh - 70px)" display="flex" flexDirection="column" justifyContent="space-between">
                <Box h="30vh" px="20">
                    {childrenWithProps}
                </Box>
                
                <Box as="footer" role="contentinfo" w="100" py="10" position="relative" bottom="0" px={{ base: '4', md: '8' }}>
                    <Center>
                        Made with &nbsp;<Coffee /> &nbsp; and &nbsp; <Heart style={heartStyle} /> &nbsp; by Bartu Bazna
                    </Center>
                </Box>
            </Box>
        </>
    );
}

export default Layout;