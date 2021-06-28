import * as React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    Spacer,
    Center,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react"
import { useDisclosure, IconButton, Button, useColorMode } from "@chakra-ui/react"
import { ChevronDownIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import {MutableRefObject} from "react";
import { Coffee } from "css.gg/icons/tsx/Coffee"
import { Heart } from "css.gg/icons/tsx/Heart"
import { CSSProperties } from "react";
import Navlinks from "./navlinks";
import { PageContext } from "../types/pagecontext";
import { useStaticQuery, graphql, navigate } from "gatsby";
import { useTranslation } from "react-i18next";

interface Props {
    location?: Location
    title?: string
    children?: any,
    pageContext: PageContext
}

interface QueryResponse {
    supportedLanguages: string[]
}

const Layout = ( {children, pageContext}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef: MutableRefObject<any> = React.useRef()
    const toggleRef: MutableRefObject<any> = React.useRef()
    const { colorMode, toggleColorMode } = useColorMode()
    const heartStyle: CSSProperties = {
        color: "red"
    }
    const { supportedLanguages } = getSupportedLanguages();
    const { t } = useTranslation();

    return (
        <>
            <Box width="100%" height="60px" display="flex" alignItems="end" justifyContent="space-between" p="10px">
                <Spacer />
                <Button
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                    ref={btnRef}
                    onClick={onOpen}
                />
                <Drawer
                    isOpen={isOpen}
                    placement="right"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Menu</DrawerHeader>
                        <DrawerBody>
                            {/* <Input placeholder="Type here..." /> */}
                            <Navlinks pageContext={pageContext} />
                        </DrawerBody>

                        <DrawerFooter display="flex" alignItems="center" justifyContent="space-around">
                            <Button
                                as={IconButton}
                                aria-label="toggle dark mode"
                                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                                ref={toggleRef}
                                onClick={() => toggleColorMode()}
                            />
                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                    <MenuList>
                                    {
                                        supportedLanguages.map((obj) => {
                                            return (
                                                <MenuItem onClick={() => changeLanguageAndGoToAddress(pageContext.originalPath, obj)} key={obj}>{obj.toUpperCase()}</MenuItem>
                                            )
                                        })
                                    }
                                    </MenuList>
                                    <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                                        {t('language')}
                                    </MenuButton>
                                    </>
                                )}
                            </Menu>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Box>
            <Box h="calc(100vh - 60px)" display="flex" flexDirection="column" justifyContent="space-between">
                <Box h="50" p="5">
                    {children}
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

/**
 * Get supported languages that are listed in gatsby-config.js
 * @returns QueryResponse
 */
const getSupportedLanguages = (): QueryResponse => {
    const { site } = useStaticQuery(graphql `
    query MyQuery {
        site {
          siteMetadata {
            supportedLanguages
          }
        }
      }
      `);
      return site.siteMetadata;
}

const changeLanguageAndGoToAddress = (originalPath: string, lang: string) => {
    navigate("/"+lang+originalPath)
}

export default Layout;