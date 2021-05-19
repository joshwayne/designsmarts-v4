import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import Img from "gatsby-image"

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="container--narrow">
        {posts && posts.map(({ node: post }) => (
          <Link 
            className="blog-post" 
            key={post.id}
            to={post.fields.slug}
          >
            {post.frontmatter.featuredimage ? (
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.frontmatter.featuredimage,
                  alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                  className: `blog-post--image`,
                }}
              />
            ) : null}
            <div className="blog-post--text">
              <p
                className="blog-post--type"
              // className={`blog-list-item tile is-child box notification ${post.frontmatter.featuredpost ? "is-featured" : ""}`}
              >
                Article
              </p>
              <h3 className="header--medium">
                {post.frontmatter.title}
              </h3>
              <p className="blog-post--excerpt">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))
        }
      </div>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

const BlogRollPage = () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 140)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    gatsbyImageData(
                      width: 400
                      quality: 100
                      layout: CONSTRAINED
                    )
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);

export default BlogRollPage;
