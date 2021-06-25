import React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";

const PatternsPage = ({
  data: {
    allMarkdownRemark: { 
      edges: categories,
    },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <div className="container">
      <Helmet title={`Design Patterns | ${title}`} />
      <h1 className="header--large">Design Patterns</h1>

      {categories &&
        categories.map(({ node: category }) => (
          <div key={category.id}>
            <Link to={category.fields.slug} className="header--medium no-underline">{category.frontmatter.title}</Link>

            {category.patterns &&
              category.patterns.map(( pattern ) => (
                <li>
                  <Link to={pattern.fields.slug} className="header--xsmall no-underline">{pattern.frontmatter.title}</Link>
                </li>
              ))}
          </div>
        ))}
    </div>
  </Layout>
);

export default PatternsPage;

export const patternsPageQuery = graphql`
  query patternsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {templateKey: {eq: "design-pattern-category"}}}
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
          patterns {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  }
`;
