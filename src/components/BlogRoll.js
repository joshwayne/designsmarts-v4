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
        {posts &&
          posts.map(({ node: post }) => (
            <div className="blog-post" key={post.id}>
                  {post.frontmatter.featuredimage ? (
                    <div className="blog-post--image">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null}
                  <div className="blog-post--text">
                    <p 
                      className="blog-post--type"
                      // className={`blog-list-item tile is-child box notification ${post.frontmatter.featuredpost ? "is-featured" : ""}`}
                    >
                      Article
                    </p>
                    <Link
                      className="header--medium"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link>
                    <p className="blog-post--excerpt">
                      {post.excerpt}
                    </p>
                  </div>
            </div>
          ))}
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
                      width: 300
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
