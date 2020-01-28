const path = require(`path`)

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions

    const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
    const result = await graphql(
        `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
    )

    if (result.errors) {
        throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node
        const slug = post.node.fields.slug

        createPage({
            path: slug,
            component: blogPost,
            context: {
                slug: slug,
                previous,
                next,
            },
        })
    })

    // Create blog post list pages
    const postsPerPage = 10;
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({length: numPages}).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/` : `/${i + 1}`,
            component: path.resolve('./src/templates/index.tsx'),
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1
            },
        });
    });
}

exports.onCreateNode = ({node, actions, getNode}) => {
    const {createNodeField} = actions

    if (node.internal.type === `MarkdownRemark`) {
        const value = getNode(node.parent).relativeDirectory
        createNodeField({
            name: `slug`,
            node,
            value: `${value}/`,
        })
    }
}
