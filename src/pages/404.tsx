import * as React from "react"
import {graphql} from "gatsby"

import Layout, {LocationType} from "../components/layout"
import SEO from "../components/seo"

type NotFoundPageProps = {
    data: PageQueryType,
    location: LocationType,
}

class NotFoundPage extends React.Component<NotFoundPageProps> {
    render() {
        const {data} = this.props
        const siteTitle = data.site.siteMetadata.title

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="404: Not Found"/>
                <h1>Not Found</h1>
                <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
            </Layout>
        )
    }
}

export default NotFoundPage

type PageQueryType = {
    site: {
        siteMetadata: {
            title: string,
        }
    }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
