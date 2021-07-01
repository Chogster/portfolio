import * as React from "react";
import {
    Box,
    Spacer,
    Center,
} from "@chakra-ui/react"
import { Coffee } from "css.gg/icons/tsx/Coffee"
import { Heart } from "css.gg/icons/tsx/Heart"
import { CSSProperties } from "react";
import { PageContext } from "../types/pagecontext";
import Sidebar from "./sidebar";

interface Props {
    location?: Location
    title?: string
    children?: any,
    pageContext: PageContext
}

const Layout = ( {children, pageContext}: Props) => {

    const heartStyle: CSSProperties = {
        color: "red"
    }

    const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, pageContext),
    );

    return (
        <>
            <Box width="100%" height="60px" display="flex" alignItems="end" justifyContent="space-between" p="10px">
                <Spacer />
                <Sidebar pageContext={pageContext} />
            </Box>
            <Box h="calc(100vh - 60px)" display="flex" flexDirection="column" justifyContent="space-between">
                <Box h="50" p="5">
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