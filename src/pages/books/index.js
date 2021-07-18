import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container--medium">
          <h1 className="header--big">Blog</h1>
          <BlogRoll />
        </div>
      </Layout>
    );
  }
}
