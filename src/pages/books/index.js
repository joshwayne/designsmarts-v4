import React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";

const BookReviewsPage = ({
  data: {
    allMarkdownRemark: { 
      edges: books,
    },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <div className="container--medium">
      <Helmet title={`UX/UI Book Reviews | ${title}`} />
      <div className="page-header">
        <h1 className="header--large">Design Book Reviews</h1>
      </div>
      <p>There’s a lot of design books out there. Some of them good, some not so good. Below is an evolving list of reviews for the books I’ve read. Most are about design, but I’ve included some books about topics I think designers should know about like psychology, business, and creativity.</p>

      <div className="">
        {books &&
          books.map(({ node: book }) => (
            <div className="" key={book.id}>

            <div className="book">
              <a className="book-cover" href="/books/' + books[i].notes_slug + '/">
                <picture></picture>
                <div className="book-rating">
                  <span>9</span>/10
                </div>
              </a>
              <div className="book-content">
                <h3 className="book-title">
                  <a href="/books/BOOK">Book Title</a>
                </h3>
                <p className="book-author">author</p>
                <div className="book-summary">summary</div>
                <div className="button-container">
                  <a className=" button" href="/books/BOOK">
                    Read my notes
                  </a>
                </div>
                <div className="button-container buy-link">
                  <a className="button" target="_blank" href="buy_link" rel="noopener">
                    Buy on buy_location
                  </a>
                </div>
              </div>
            </div>

              <Link to={book.fields.slug} className="pattern-category no-underline">
                <h2 className="header--medium">
                  {book.frontmatter.title}
                </h2>
              </Link>
            </div>
          ))}
      </div>
    </div>
  </Layout>
);

export default BookReviewsPage;

export const bookReviewsPageQuery = graphql`
  query bookReviewsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {templateKey: {eq: "book-review"}}}
      sort: {fields: frontmatter___title, order: ASC}
    ) {
      edges {
        node {
          frontmatter {
            title
            author
            buy_link
            buy_location
            summary
            cover {
              childImageSharp {
                fixed {
                  src
                }
              }
            }
            rating
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
