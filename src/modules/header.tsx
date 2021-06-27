import * as React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
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
        <>
            <Button
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                ref={btnRef}
                onClick={onOpen}
            />
            <Button
                as={IconButton}
                aria-label="toggle dark mode"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                ref={toggleRef}
                onClick={toggleColorMode}
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
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder="Type here..." />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue">Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header;