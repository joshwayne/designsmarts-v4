import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

const PageDesignTemplate = () => (
  <Layout className="section">
    <h1>Page Design</h1>
  </Layout>
);

export default PageDesignTemplate;
