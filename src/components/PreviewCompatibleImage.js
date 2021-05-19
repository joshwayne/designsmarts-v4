import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from "gatsby-plugin-image";

const PreviewCompatibleImage = ({ imageInfo }) => {
  // const imageStyle = { borderRadius: '5px' }
  const { alt = '', className = '', childImageSharp, image } = imageInfo

  if (!!image && !!image.childImageSharp) {
    return (
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        // style={imageStyle}
        alt={alt}
        objectFit="cover"
        className={className}
        />
    );
  }

  if (!!childImageSharp) {
    return <GatsbyImage image={childImageSharp.gatsbyImageData} alt={alt} className={className} />;
  }

  if (!!image && typeof image === 'string')
    return <img src={image} alt={alt} className={className} />

  return null
}

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    className: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    // style: PropTypes.object,
  }).isRequired,
}

export default PreviewCompatibleImage
