import { MoonIcon, SunIcon, ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure, useColorMode, IconButton, Button, Avatar, AvatarBadge, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Menu, MenuButton, MenuItem, MenuList, Heading, Wrap, Center, Link } from "@chakra-ui/react";
import { useStaticQuery, graphql, navigate } from "gatsby";
import React, { MutableRefObject } from "react";
import { PageContext } from "../types/pagecontext";
import Navlinks from "./navlinks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faXing } from "@fortawesome/free-brands-svg-icons";

interface PersonalDataQueryResponse {
    socials: {
        github: string;
        email: string;
        linkedin: string;
        xing: string;
        twitter: string;
    },
    workingHours: {
        timeZone: string;
        weekendDays: string[];
        workHrBegin: number[];
        workHrEnd: number[];
        sleep: number[];
    }
}

interface QueryResponse {
    site: {
        siteMetadata: {
            supportedLanguages: string[],
            title: string;
            description: string;
            siteUrl: string;
            defaultLanguage: string;
        }
    },
    dataJson: PersonalDataQueryResponse
    
}

interface SidebarProps {
    pageContext: PageContext
}

const Sidebar = ({pageContext}: SidebarProps) => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const btnRef: MutableRefObject<any> = React.useRef()
    const toggleRef: MutableRefObject<any> = React.useRef()
    const { colorMode, toggleColorMode } = useColorMode()
    const {site, dataJson} = getSupportedLanguages();

    const getBadgeStatus = (): string => {
        const curTime = new Date();
        const curTimeStr = curTime.toLocaleTimeString("de-DE", {timeZone: dataJson.workingHours.timeZone});
        const curHour = curTimeStr.split(":")[0];
        const curMin = curTimeStr.split(":")[1];
        const weekDay = curTime.toLocaleDateString("en-US", {weekday:"short",timeZone: dataJson.workingHours.timeZone})
        
        // determine if sleeping
        if (
            (dataJson.workingHours.sleep[0]+8 % 24 > Number(curHour) % 24) &&
            (dataJson.workingHours.sleep[1] > Number(curMin))
        ) {
            return "gray.400";
        }

        // determine if working
        if (
            (dataJson.workingHours.workHrBegin[0] % 24 < Number(curHour) % 24) &&
            (dataJson.workingHours.workHrBegin[1] < Number(curMin)) &&
            (dataJson.workingHours.workHrEnd[0] % 24 > Number(curHour) % 24) &&
            (dataJson.workingHours.workHrEnd[1] > Number(curMin))
        ) {
            return "red.600";
        }

        // determine if weekend
        if (dataJson.workingHours.weekendDays.includes(weekDay)) {
            return "orange.500";
        }
        

        // otherwise return green :-)
        return "green.500";
    }

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
                            <Avatar size="full" name="Bartu Bazna" src="https://avatars.githubusercontent.com/u/25952454?v=4">
                                <AvatarBadge mr="2rem" mb="1rem" boxSize="1.5rem" bg={() => getBadgeStatus()} />    
                            </Avatar>
                        </Box>
                            <Heading textAlign="center" py="0.2rem;">Bartu Bazna</Heading>
                            <Box>
                                <Box display="flex" justifyContent="center">
                                    {
                                        dataJson.socials.github.length > 0 &&
                                        <Link target="_blank" href={dataJson.socials.github} px="0.5rem">
                                            <FontAwesomeIcon icon={faGithub} />
                                        </Link>
                                    }
                                                                        {
                                        dataJson.socials.linkedin.length > 0 &&
                                        <Link target="_blank" href={dataJson.socials.linkedin} px="0.5rem">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                        </Link>
                                    }
                                    {
                                        dataJson.socials.xing.length > 0 &&
                                        <Link target="_blank" href={dataJson.socials.xing} px="0.5rem">
                                            <FontAwesomeIcon icon={faXing} />
                                        </Link>
                                    }
                                </Box>
                            </Box>
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
                                        site.siteMetadata.supportedLanguages.map((obj) => {
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
 * Get supported languages and personal data
 * @returns QueryResponse
 */
 const getSupportedLanguages = (): QueryResponse => {
    return useStaticQuery(graphql `
    query MyQuery {
        dataJson {
            socials {
              github
              email
              linkedin
              xing
              twitter
            }
            workingHours {
              timeZone
              weekendDays
              workHrBegin
              workHrEnd
              sleep
            }
          }
          site {
            siteMetadata {
              title
              description
              siteUrl
              defaultLanguage
              supportedLanguages
            }
          }
        }
      `);
}

const changeLanguageAndGoToAddress = (originalPath: string, lang: string) => {
    const slug = originalPath.replace(/(.html|\/)/g, "");
    navigate("/"+lang+"/"+slug)
}

export default Sidebar;