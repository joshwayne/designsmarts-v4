import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => {
  const content = { __html: widgetFor('body') }
  const title = entry.getIn(['data', 'title'])
  const description = entry.getIn(['data', 'description'])
  const tags = entry.getIn(['data', 'tags'])


  console.log(entry);
  console.log("Title: " + entry.getIn(['data', 'title']));
  console.log("Description: " + entry.getIn(['data', 'description']));
  console.log(content);
  console.log("Tags: " + entry.getIn(['data', 'tags']));

  return (
    <div>
      Hello. 
      {title}
      {description}
      <section dangerouslySetInnerHTML={content.body} />
      {tags}
    </div>
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
