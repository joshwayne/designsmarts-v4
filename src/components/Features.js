import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const FeatureGrid = ({ gridItems }) => (
  <div className="home-menu card--large">
    {gridItems.map((item) => (
      <div key={item.text} className="home-menu--item">
        <h4 className="header--small">{item.header}</h4>
        <p>{item.text}</p>
        <Link
          to="{item.linkUrl}"
          className="home-menu--link"
        >
          {item.linkText}
        </Link>
      </div>
    ))}
  </div>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      linkText: PropTypes.string,
      text: PropTypes.string,
    })
  ),
}

export default FeatureGrid
