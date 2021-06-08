import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const CompanyTemplate = () => (
    <Layout>
      <h1>Company Page</h1>
    </Layout>
)

export default CompanyTemplate