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
      <div className="page-header">
        <h1 className="header--large">Design Patterns</h1>
        <span className="subheader">
          X design examples
        </span>
      </div>

      <div className="">
        {categories &&
          categories.map(({ node: category }) => (
            <div className="" key={category.id}>
              <Link to={category.fields.slug} className="pattern-category no-underline">
                <h2 className="header--medium">
                  {category.frontmatter.title}
                </h2>
                <span className="subheader">
                  X design examples
                </span>
              </Link>
              
              <div className="pattern-list">
                {category.patterns &&
                  category.patterns
                    .sort((a, b) => (a.frontmatter.title > b.frontmatter.title) ? 1 : -1)
                    .map(( pattern ) => (
                    <Link to={pattern.fields.slug} className="card pattern-card no-underline">
                      <h3 className="header--xsmall">
                        {pattern.frontmatter.title}
                      </h3>
                      <span className="subheader">
                        X design examples
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
      </div>
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
      sort: {fields: frontmatter___title, order: ASC}
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
