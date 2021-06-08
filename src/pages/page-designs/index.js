import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

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
        <div className="container content">
          <div className="columns">
            <div
              className="column is-10 is-offset-1"
              style={{ marginBottom: '6rem' }}
            >
              <h1 className="title is-size-2 is-bold-light">Page Designs</h1>
              <ul className="taglist">
                {pageDesigns && pageDesigns.map(({ node: pageDesign }) => (
                  <li key={pageDesign.id}>
                    <Link to={pageDesign.fields.slug}>
                      {pageDesign.frontmatter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )

export default PageDesignsPage

export const pageDesignsPageQuery = graphql`
  query pageDesignsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      filter: {frontmatter: {templateKey: {eq: "page-design"}}}
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
`
