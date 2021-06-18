const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    const patterns = posts.filter(post => post.node.frontmatter.templateKey === 'design-pattern');


    posts.forEach((edge) => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          patterns: patterns.find((pattern) => pattern.node.frontmatter.categories === edge.node.frontmatter.title)
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// we use sourceNodes instead of onCreateNode because at this time plugins
// will have created all nodes already and we can link both books to authors
// and reverse link on authors to books
exports.sourceNodes = ({ boundActionCreators, getNodes, getNode }) => {
  const { createNodeField } = boundActionCreators

  const booksOfAuthors = {}
  // iterate thorugh all markdown nodes to link books to author
  // and build author index
  const markdownNodes = getNodes()
    .filter(node => node.internal.type === `MarkdownRemark`)
    .forEach(node => {
      if (node.frontmatter.author) {
        const authorNode = getNodes().find(
          node2 =>
            node2.internal.type === `MarkdownRemark` &&
            node2.frontmatter.title === node.frontmatter.author
        )

        if (authorNode) {
          createNodeField({
            node,
            name: `author`,
            value: authorNode.id,
          })

          // if it's first time for this author init empty array for his books
          if (!(authorNode.id in booksOfAuthors)) {
            booksOfAuthors[authorNode.id] = []
          }
          // add book to this author
          booksOfAuthors[authorNode.id].push(node.id)
        }
      }
    })

  Object.entries(booksOfAuthors).forEach(([authorNodeId, bookIds]) => {
    createNodeField({
      node: getNode(authorNodeId),
      name: `books`,
      value: bookIds,
    })
  })
}