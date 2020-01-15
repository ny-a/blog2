import React from "react"
import {graphql, Link} from "gatsby"

import Bio from "../components/bio"
import Layout, {LocationType} from "../components/layout"
import SEO from "../components/seo"
import {rhythm} from "../utils/typography"

type BlogIndexProps = {
    data: PageQueryType,
    location: LocationType,
}

class BlogIndex extends React.Component<BlogIndexProps> {
    render() {
        const {data} = this.props
        const siteTitle = data.site.siteMetadata.title
        const posts = data.allMarkdownRemark.edges

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="All posts"/>
                <Bio/>
                {posts.map(({node}) => {
                    const title = node.frontmatter.title || node.fields.slug
                    return (
                        <article key={node.fields.slug}>
                            <header>
                                <h3
                                    style={{
                                        marginBottom: rhythm(1 / 4),
                                    }}
                                >
                                    <Link style={{boxShadow: `none`}} to={node.fields.slug}>
                                        {title}
                                    </Link>
                                </h3>
                                <small>{node.frontmatter.date}</small>
                            </header>
                            <section>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: node.excerpt,
                                    }}
                                />
                            </section>
                        </article>
                    )
                })}
            </Layout>
        )
    }
}

export default BlogIndex

type PageQueryType = {
    site: {
        siteMetadata: {
            title: string,
        }
    },
    allMarkdownRemark: {
        edges: [{
            node: {
                excerpt: string,
                fields: {
                    slug: string,
                },
                frontmatter: {
                    date: string,
                    title: string,
                }
            }
        }]
    }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 50)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
