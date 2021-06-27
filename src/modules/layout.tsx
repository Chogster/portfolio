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
} from "@chakra-ui/react"
import { useDisclosure, IconButton, Input, Button, useColorMode } from "@chakra-ui/react"
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import {MutableRefObject} from "react";
import { Coffee } from "css.gg/icons/tsx/Coffee"
import { Heart } from "css.gg/icons/tsx/Heart"
import { CSSProperties } from "react";
import Navlinks from "./navlinks";

interface Props {
    location?: Location
    title?: string
    children?: any
  }

const Layout = ( {children}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef: MutableRefObject<any> = React.useRef()
    const toggleRef: MutableRefObject<any> = React.useRef()
    const { colorMode, toggleColorMode } = useColorMode()
    const heartStyle: CSSProperties = {
        color: "red"
    }

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
                            <Navlinks />
                        </DrawerBody>

                        <DrawerFooter display="flex" alignItems="center" justifyContent="space-between">
                            <Spacer />
                            <Button
                                as={IconButton}
                                aria-label="toggle dark mode"
                                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                                ref={toggleRef}
                                onClick={toggleColorMode}
                            />
                            <Spacer />
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

export default Layout;