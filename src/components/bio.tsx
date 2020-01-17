/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from "react"
import {graphql, useStaticQuery} from "gatsby"

type QueryType = {
    site: {
        siteMetadata: {
            author: string,
            social: {
                twitter: string,
            }
        }
    }
}

const Bio = () => {
    const data: QueryType = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

    const {author, social} = data.site.siteMetadata
    return (
        <div
            style={{
                display: `flex`,
            }}
        >
            <p>
                Written by <strong>{author}</strong>.
                {` `}
                <a href={`https://twitter.com/${social.twitter}`}>
                    Twitter@{social.twitter}
                </a>
            </p>
        </div>
    )
}

export default Bio
