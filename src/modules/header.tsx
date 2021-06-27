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
} from "@chakra-ui/react"
import { useDisclosure, IconButton, Input, Button, useColorMode } from "@chakra-ui/react"
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import {MutableRefObject} from "react";


const Header = () => {
    return (
        <div>
            {DrawerExample()}
        </div>
    );
}

function DrawerExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef: MutableRefObject<any> = React.useRef()
    const toggleRef: MutableRefObject<any> = React.useRef()
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box width="100%" display="flex" alignItems="end" justifyContent="space-between" p="5">
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
                        <Input placeholder="Type here..." />
                    </DrawerBody>

                    <DrawerFooter display="flex" alignItems="center" justifyContent="space-between">
                        <Button
                            as={IconButton}
                            aria-label="toggle dark mode"
                            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                            ref={toggleRef}
                            onClick={toggleColorMode}
                        />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default Header;