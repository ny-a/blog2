/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import {graphql, useStaticQuery} from "gatsby"

const Bio = () => {
    const data = useStaticQuery(graphql`
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
