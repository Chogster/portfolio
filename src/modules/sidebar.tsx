import { MoonIcon, SunIcon, ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure, useColorMode, IconButton, Button, Avatar, AvatarBadge, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Menu, MenuButton, MenuItem, MenuList, Heading, Wrap, Link, Tooltip, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import { useStaticQuery, graphql, navigate } from "gatsby";
import React, { MutableRefObject, useEffect } from "react";
import { PageContext } from "../types/pagecontext";
import Navlinks from "./navlinks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faTwitter, faXing } from "@fortawesome/free-brands-svg-icons";
import * as base from "../style/base.module.css";

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
        tooltips: {
            busy: string;
            offline: string;
            away: string;
            available: string;
        }
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
    const [badgeTT, setBadgeTT] = React.useState<string>();
    const [badgeColour, setBadgeColor] = React.useState<string>("green.500");

    useEffect(() => {
        const curTime = new Date();
        const curTimeStr = curTime.toLocaleTimeString("de-DE", {timeZone: dataJson.workingHours.timeZone});
        const curHour = curTimeStr.split(":")[0];
        const curMin = curTimeStr.split(":")[1];
        // get day of the week in english
        const weekDay = curTime.toLocaleDateString("en-US", {weekday:"short",timeZone: dataJson.workingHours.timeZone});
        const endOfSleep = ((dataJson.workingHours.sleep[0]+8) % 24)*60 + dataJson.workingHours.sleep[1];
        const beginOfSleep = ((dataJson.workingHours.sleep[0]) % 24)*60 + dataJson.workingHours.sleep[1];
        const curTotalMins = Number(curHour)*60 + Number(curMin);
        const endOfWork = (dataJson.workingHours.workHrEnd[0] % 24)*60 + dataJson.workingHours.workHrEnd[1];
        const beginOfWork = (dataJson.workingHours.workHrBegin[0] % 24)*60 + dataJson.workingHours.workHrBegin[1];

        const isSleeping = beginOfSleep < curTotalMins || curTotalMins < endOfSleep;
        const isWeekend = dataJson.workingHours.weekendDays.includes(weekDay);
        const isWorking = beginOfWork < curTotalMins && curTotalMins < endOfWork && !isWeekend;
        
        // determine if sleeping
        if ( isSleeping ) {
            setBadgeTT(dataJson.workingHours.tooltips.offline);
            setBadgeColor("gray.400");
        }

        // determine if working
        if ( isWorking ) {
            setBadgeTT(dataJson.workingHours.tooltips.busy);
            setBadgeColor("red.600");
        }

        // determine if weekend
        if ( isWeekend && !isSleeping ) {
            setBadgeTT(dataJson.workingHours.tooltips.away);
            setBadgeColor("orange.400");
        }
        

        // otherwise return green :-)
        if ( !isSleeping && !isWorking && !isWeekend ){
            setBadgeTT(dataJson.workingHours.tooltips.available);
            setBadgeColor("green.500");
        }

    });

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
                        <Avatar size="full" name="Chogster" src="https://avatars.githubusercontent.com/u/25952454?v=4">
                            {
                                window.innerWidth > 768 &&
                                <Tooltip borderRadius="lg" fontSize="1.25rem" label={badgeTT}>
                                    <AvatarBadge borderRadius="full" mr="2rem" mb="1rem" boxSize="1.5rem" bg={badgeColour} /> 
                                </Tooltip>
                            }
                            {
                                window.innerWidth < 768 &&
                                <Popover>
                                    <PopoverTrigger>
                                        <AvatarBadge borderColor="white" borderWidth="1px" borderRadius="full" mr="1.5rem" mb="1rem" boxSize="1.5rem" bg={badgeColour} />
                                    </PopoverTrigger>
                                    <PopoverContent _focus={{outline:"none"}} boxSize="fit-content" fontSize="1.25rem" >
                                        {badgeTT}
                                    </PopoverContent>
                                </Popover>
                            }
                        </Avatar>
                    </Box>
                    {/* Your name here */}
                    <Heading textAlign="center" py="0.2rem;">Chogster</Heading>
                    <Box>
                        <Box py="0.5rem" fontSize="1.25rem" display="flex" justifyContent="center">
                            {
                                dataJson.socials.github.length > 0 &&
                                <Link className={base.navLink} target="_blank" href={dataJson.socials.github} px="0.5rem">
                                    <FontAwesomeIcon icon={faGithub} />
                                </Link>
                            }
                                                                {
                                dataJson.socials.linkedin.length > 0 &&
                                <Link className={base.navLink} target="_blank" href={dataJson.socials.linkedin} px="0.5rem">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </Link>
                            }
                            {
                                dataJson.socials.xing.length > 0 &&
                                <Link className={base.navLink} target="_blank" href={dataJson.socials.xing} px="0.5rem">
                                    <FontAwesomeIcon icon={faXing} />
                                </Link>
                            }
                            {
                                dataJson.socials.twitter.length > 0 &&
                                <Link className={base.navLink} target="_blank" href={dataJson.socials.twitter} px="0.5rem">
                                    <FontAwesomeIcon icon={faTwitter} />
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
              tooltips {
                busy
                offline
                away
                available
              }
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
