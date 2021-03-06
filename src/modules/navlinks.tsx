import { List, ListItem } from "@chakra-ui/react";
import { Link } from "gatsby";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { PageContext } from "../types/pagecontext";
import * as base from "../style/base.module.css"

interface Linkdetails {
    name: string,
    link: string
}

interface Props {
    pageContext: PageContext
}

const Navlinks = ({pageContext}: Props) => {
    const { lang } = pageContext;
    const { t } = useTranslation();
    const links: Linkdetails[] = t("siteMetadata.menuLinks.links", { returnObjects: true });
    return (
            <List spacing={3}>
                {
                    links.map((obj, i) => {
                        return (
                            <ListItem key={lang+obj.name+i+"li"}>
                                <Link style={{fontSize:"1.5rem"}} key={lang+obj.name+i+"link"} to={obj.link} className={base.navLink}
                                activeClassName={base.navLinkActive}>
                                    {obj.name}
                                </Link>
                            </ListItem>
                        )
                    })
                }
            </List>
    )
}

export default Navlinks