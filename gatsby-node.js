const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

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
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    const patterns = posts.filter(
      (post) => post.node.frontmatter.templateKey === "design-pattern"
    );

    posts.forEach((edge) => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          patterns: patterns.find(
            (pattern) =>
              pattern.node.frontmatter.categories ===
              edge.node.frontmatter.title
          ),
        },
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

// we use sourceNodes instead of onCreateNode because at this time plugins
// will have created all nodes already and we can link both patterns to categories
// and reverse link on categories to patterns
// exports.sourceNodes = ({ actions, getNodes, getNode }) => {
//   const { createNodeField } = actions;

//   const patternsOfCategories = {}; //List of categories with patterns inside
//   const categoriesOfPatterns = {}; // List of patterns with categories inside (reverse index)

//   // as we can have multiple categories for a pattern, we should handle both cases
//   // both when category is specified as single item and when there is list of categories
//   // abstracting it to helper function help prevent code duplication
//   const getCategoryNodeByName = (name) =>
//     getNodes().find(
//       (node2) =>
//         node2.internal.type === `MarkdownRemark` &&
//         node2.frontmatter.title === name
//     );

//   // iterate through all markdown nodes to link patterns to category
//   // and build category index
//   const markdownNodes = getNodes()
//     .filter((node) => node.internal.type === `MarkdownRemark`)
//     .forEach((node) => {
//       if (node.frontmatter.categories) {
//         const categoryNodes =
//           node.frontmatter.categories instanceof Array
//             ? node.frontmatter.categories.map(getCategoryNodeByName) // get array of nodes
//             : [getCategoryNodeByName(node.frontmatter.categories)]; // get single node and create 1 element array

//         // filtered not defined nodes and iterate through defined categories nodes to add data to indexes
//         categoryNodes
//           .filter((categoryNode) => categoryNode)
//           .map((categoryNode) => {
//             // if it's first time for this category init empty array for this pattern
//             if (!(categoryNode.id in patternsOfCategories)) {
//               patternsOfCategories[categoryNode.id] = [];
//             }
//             // add pattern to this category
//             patternsOfCategories[categoryNode.id].push(node.id);

//             // if it's first time for this pattern, init empty array for its categories
//             if (!(node.id in categoriesOfPatterns)) {
//               categoriesOfPatterns[node.id] = [];
//             }
//             // add category to this pattern
//             categoriesOfPatterns[node.id].push(categoryNode.id);
//           });
//       }
//     });

//   Object.entries(patternsOfCategories).forEach(
//     ([categoryNodeId, patternIds]) => {
//       createNodeField({
//         node: getNode(categoryNodeId),
//         name: `patterns`,
//         value: patternIds,
//       });
//     }
//   );

//   Object.entries(categoriesOfPatterns).forEach(
//     ([patternNodeId, categoryIds]) => {
//       createNodeField({
//         node: getNode(patternNodeId),
//         name: `categories`,
//         value: categoryIds,
//       });
//     }
//   );
// };



exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    MarkdownRemark: {
      patterns: {
        type: ["MarkdownRemark"],
        resolve: async (source, args, context, info) => {
          return (
            (await context.nodeModel.runQuery({
              type: "MarkdownRemark",
              query: {
                filter: {
                  frontmatter: {
                    templateKey: {eq: "design-pattern"}, 
                    categories: {eq: source.frontmatter.title}
                  }
                },
              },
            })) || []
          );
        },
      },
      // pageDesigns: {
      //   type: ["MarkdownRemark"],
      //   resolve: async (source, args, context, info) => {
      //     return (
      //       (await context.nodeModel.runQuery({
      //         type: "MarkdownRemark",
      //         query: {
      //           filter: {
      //             frontmatter: {
      //               templateKey: {eq: "design-pattern"}, 
      //               categories: {eq: source.frontmatter.title}
      //             }
      //           },
      //         },
      //       })) || []
      //     );
      //   },
      // },
    },
  };
  createResolvers(resolvers);
};
