import { List, ListItem } from "@chakra-ui/react";
import { useStaticQuery } from "gatsby";
import { graphql, Link } from "gatsby";
import * as React from "react";

interface Navlink {
    language: string,
    links: Linkdetails[]
}

interface Linkdetails {
    name: string,
    link: string
}

interface QueryResponse {
    siteMetadata: {
        title?: string,
        description?: string,
        menuLinks?: Navlink[]
    }
}

const Navlinks = () => {
    const query = getSiteLinks();
    let links: Array<Navlink> = [];
    if (Array.isArray(query.siteMetadata.menuLinks)) {
        links = query.siteMetadata.menuLinks;
    }
    console.log(links)
    return (
        <div>
            {
                links.map((obj, i) => {
                    return (
                        obj.links.map((details, j) => {
                            return (
                                <List spacing={3}>
                                    <ListItem>
                                        <Link key={''+i+j} to={details.link}>{details.name}</Link>
                                    </ListItem>
                                </List>
                            )
                        })
                    )
                })
            }
        </div>
    )
}

const getSiteLinks = (): QueryResponse => {
    const { site } = useStaticQuery(graphql `
    query MyQuery {
        site {
          siteMetadata {
            menuLinks {
              language
              links {
                name
                link
              }
            }
          }
        }
      }
      `);
      return site;
}

export default Navlinks