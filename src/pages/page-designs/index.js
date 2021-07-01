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
    <div className="container">
      <Helmet title={`Page Designs | ${title}`} />
      <div className="page-header">
        <h1 className="header--large">Page Designs</h1>
        <span className="subheader">
          X design examples
        </span>
      </div>
      <div className="">
        <div className="">
          <div className="design-list">
            {pageDesigns &&
              pageDesigns.map(({ node: pageDesign }) => (
                <Link 
                  key={pageDesign.id} 
                  to={pageDesign.fields.slug}
                  className="design-list--item no-underline"
                >
                  <GatsbyImage 
                    image={getImage(pageDesign.frontmatter.image)} 
                    alt={pageDesign.frontmatter.title}
                    className="design-list--item--image"
                  />
                  <div className="design-list--item--content">
                    {pageDesign.frontmatter.title}
                  </div>
                </Link>
              ))}
              
          </div>
        </div>
      </div>
    </div>
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
