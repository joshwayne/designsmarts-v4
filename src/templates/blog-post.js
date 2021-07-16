import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <Helmet titleTemplate="%s | Blog">
        <title>{`${post.frontmatter.title}`}</title>
        <meta name="description" content={`${post.frontmatter.description}`} />
      </Helmet>
      <div className="container">
        <h1>{post.frontmatter.title}</h1>
        <HTMLContent content={post.html} />
      </div>
      {post.frontmatter.tags && post.frontmatter.tags.length ? (
        <div>
          <h4>Tags</h4>
          <ul className="">
            {post.frontmatter.tags.map((tag) => (
              <li key={tag + `tag`}>
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Layout>
  );
};

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
