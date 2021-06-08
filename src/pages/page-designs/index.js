import React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
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
                    <GatsbyImage image={getImage(pageDesign.frontmatter.image)} alt={pageDesign.frontmatter.title} />
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
      filter: {frontmatter: {templateKey: {eq: "page-design"}}}
      sort: {order: DESC, fields: frontmatter___date}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                gatsbyImageData(width: 400, placeholder: BLURRED)
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
