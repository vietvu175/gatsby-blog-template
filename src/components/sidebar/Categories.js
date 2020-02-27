import React from 'react'
import { Link } from "gatsby"

const Categories = (props) => {
  const edges = props.edges || [];
  let categories = [];

  edges.forEach(({ node }) => {
    categories = Array.from(
      new Set([...categories, ...node.frontmatter.categories])
    );
  });

  return (
    <>
      <h4>Chuyên mục</h4>
      {
        categories.map((category, index) => (
          <div key={index} className="mb-2">
            <Link to={`/category/${category.toLowerCase()}/`}>
              {category}
            </Link>
          </div>
        ))
      }
    </>
  )
}

export default Categories
