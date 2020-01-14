import React from 'react'
import PropTypes from "prop-types"
import get from 'lodash/get'
import { Link } from "gatsby"

import TechTag from "../components/tags/TechTag"

const Post = ({post, labels}) => {
  const tags = get(post, 'node.frontmatter.tags')

  const getTechTags = (tags) => {
    const techTags = []
    tags.forEach((tag, i) => {
      labels.forEach((label) => {
        if (tag === label.tag) {
          techTags.push(<TechTag key={i} tag={label.tag} tech={label.tech} name={label.name} size={label.size} color={label.color} />)
        }
      })
    })
    return techTags
  }

  return (
    <>
      <Link
        to={get(post,'node.fields.slug')}
        className="text-dark"
      >
        <h2 className="heading">{get(post, 'node.frontmatter.title')}</h2>
      </Link>
      <small className="d-block text-info">Đăng ngày {get(post, 'node.frontmatter.date')}
      </small>
      <p className="mt-3 d-inline">{get(post, 'node.excerpt')}</p>
      <Link
        to={get(post, 'node.fields.slug')}
        className="text-primary"
      >
        <small className="d-inline-block ml-3"> Đọc tiếp</small>
      </Link>
      <div className="d-block">
        {getTechTags(tags)}
      </div>
    </>
  )
}

Post.propsTypes = {
  post: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired
}

export default Post
