import { MoonIcon, SunIcon, ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure, useColorMode, IconButton, Button, Avatar, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Menu, MenuButton, MenuItem, MenuList, Heading, Wrap } from "@chakra-ui/react";
import { useStaticQuery, graphql, navigate } from "gatsby";
import React, { MutableRefObject } from "react";
import { PageContext } from "../types/pagecontext";
import Navlinks from "./navlinks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

interface QueryResponse {
    supportedLanguages: string[]
}

interface SidebarProps {
    pageContext: PageContext
}

const Sidebar = ({pageContext}: SidebarProps) => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const btnRef: MutableRefObject<any> = React.useRef()
    const toggleRef: MutableRefObject<any> = React.useRef()
    const { colorMode, toggleColorMode } = useColorMode()
    const { supportedLanguages } = getSupportedLanguages();

    return (
        <>
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
                    <DrawerContent bg={colorMode === "dark" ? "b2dark" : "white"}>
                        <DrawerCloseButton />
                        <DrawerHeader fontSize="2rem"></DrawerHeader>
                        <DrawerBody>
                        <Box width="100%" display="flex" alignItems="center" py="0.5rem;" justifyContent="center" px="2rem">
                            <Avatar size="full" name="Bartu Bazna" src="https://avatars.githubusercontent.com/u/25952454?v=4" />
                        </Box>
                            <Heading textAlign="center" py="0.2rem;">Bartu Bazna</Heading>
                        <Wrap mt="1rem;" onClick={onClose}>
                            <Navlinks pageContext={pageContext} />
                        </Wrap>
                        
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
                                    <MenuList bg={colorMode === "dark" ? "b2dark" : 'white'}>
                                    {
                                        supportedLanguages.map((obj) => {
                                            return (
                                                <MenuItem onClick={() => {changeLanguageAndGoToAddress(pageContext.originalPath, obj); onClose()}} key={obj}>{obj.toUpperCase()}</MenuItem>
                                            )
                                        })
                                    }
                                    </MenuList>
                                    <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                                        <FontAwesomeIcon icon={faLanguage}></FontAwesomeIcon>
                                    </MenuButton>
                                    </>
                                )}
                            </Menu>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
                </>
    )
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

export default Sidebar;