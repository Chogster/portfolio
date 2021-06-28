import { List, ListItem } from "@chakra-ui/react";
import { Link } from "gatsby";
import * as React from "react";
import i18n from "../translations/i18next";
import { PageContext } from "../types/pagecontext";

interface Linkdetails {
    name: string,
    link: string
}

interface Props {
    pageContext: PageContext
}

const Navlinks = ({pageContext}: Props) => {
    const { lang } = pageContext;
    const resource = i18n.getResource(lang ? lang : "en", "translation", "siteMetadata.menuLinks");
    const links: Linkdetails[] = resource.links;
    return (
            <List spacing={3}>
                {
                    links.map((obj, i) => {
                        return (
                            <ListItem key={lang+obj.name+i+"li"}>
                                <Link key={lang+obj.name+i+"link"} to={obj.link}>{obj.name}</Link>
                            </ListItem>
                        )
                    })
                }
            </List>
    )
}

export default Navlinks