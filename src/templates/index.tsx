import * as React from 'react'
import {graphql, Link} from 'gatsby'

import Bio from '../components/bio'
import Layout, {LocationType} from '../components/layout'
import SEO from '../components/seo'
import {rhythm} from '../utils/typography'

type BlogIndexProps = {
    data: PageQueryType,
    location: LocationType,
    pageContext: {
        limit: number,
        skip: number,
        numPages: number,
        currentPage: number,
    }
}

class BlogIndex extends React.Component<BlogIndexProps> {
    render() {
        const {data} = this.props
        const siteTitle = data.site.siteMetadata.title
        const posts = data.allMarkdownRemark.edges
        const {currentPage, numPages} = this.props.pageContext
        const isFirst = currentPage === 1
        const isLast = currentPage === numPages
        const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
        const nextPage = (currentPage + 1).toString()

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
                                    <Link style={{boxShadow: 'none'}} to={node.fields.slug}>
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
                <ul
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        listStyle: 'none',
                        padding: 0,
                    }}
                >
                    {!isFirst && (
                        <Link to={prevPage} rel="prev">
                            ← Previous Page
                        </Link>
                    )}
                    {Array.from({length: numPages}, (_, i) => (
                        <li
                            key={`pagination-number${i + 1}`}
                            style={{
                                margin: 0,
                            }}
                        >
                            <Link
                                to={`/${i === 0 ? '' : i + 1}`}
                                style={{
                                    padding: rhythm(1 / 4),
                                    textDecoration: 'none',
                                    color: i + 1 === currentPage ? '#ffffff' : '',
                                    background: i + 1 === currentPage ? '#007acc' : '',
                                }}
                            >
                                {i + 1}
                            </Link>
                        </li>
                    ))}
                    {!isLast && (
                        <Link to={nextPage} rel="next">
                            Next Page →
                        </Link>
                    )}
                </ul>
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
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
