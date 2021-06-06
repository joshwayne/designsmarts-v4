import React from 'react'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const PatternsPage = ({
  data: {
    allMarkdownRemark: { edges: patterns },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
    <Layout>
      <section className="section">
        <Helmet title={`Design Patterns | ${title}`} />
        <div className="container content">
          <div className="columns">
            <div
              className="column is-10 is-offset-1"
              style={{ marginBottom: '6rem' }}
            >
              <h1 className="title is-size-2 is-bold-light">Design Patterns</h1>
              <ul className="taglist">
                {patterns && patterns.map(({ node: pattern }) => (
                  <li key={pattern.id}>
                    <Link to={pattern.fields.slug}>
                      {pattern.frontmatter.title}
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

export default PatternsPage

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
          id
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
`
