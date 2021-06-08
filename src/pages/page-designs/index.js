import React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";

const PageDesignsPage = ({
  data: {
    allMarkdownRemark: { edges: pageDesigns },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Page Designs | ${title}`} />
      <div className="">
        <div className="">
          <div className="">

            <h1 className="">Page Designs</h1>

            {pageDesigns &&
              pageDesigns.map(({ node: pageDesign }) => (
                <div key={pageDesign.id}>
                  <Link to={pageDesign.fields.slug}>
                    {pageDesign.frontmatter.title}
                  </Link>
                </div>
              ))}
              
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default PageDesignsPage;

export const pageDesignsPageQuery = graphql`
  query pageDesignsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "page-design" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            image {
              childrenImageSharp {
                fixed(width: 400) {
                  base64
                  tracedSVG
                  aspectRatio
                  srcWebp
                  srcSetWebp
                  originalName
                }
              }
            }
          }
        }
      }
    }
  }
`;
