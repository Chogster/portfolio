import { List, ListItem } from "@chakra-ui/react";
import { Link } from "gatsby";
import * as React from "react";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
    const links: Linkdetails[] = t("siteMetadata.menuLinks.links", { returnObjects: true });
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