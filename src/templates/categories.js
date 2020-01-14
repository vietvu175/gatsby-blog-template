import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.css"
import "../pages/index.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar/Sidebar"
import Post from '../components/Post'

const Categories = ({ pageContext, data }) => {
  const posts = data.allMarkdownRemark.edges
  const labels = data.site.siteMetadata.labels
  const { category } = pageContext
  const { totalCount } = data.allMarkdownRemark

  const categoriesHeader = `Chuyên mục "${category}" (${totalCount} bài)`

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `javascript`, `react`, `web development`, `node.js`, `graphql`]} />
      <div className="index-main">
        <div className="sidebar px-4 py-2">
          <Sidebar />
        </div>

        <div className="post-list-main">
          <i><h2 className="heading">{categoriesHeader}</h2></i>
          {posts.map((post) => {
            return (
              <div key={post.node.id} className="mt-5">
                <Post post={post} labels={labels} />
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

Categories.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export const pageQuery = graphql`
  query($category: String) {
    site {
        siteMetadata {
            title 
            author
            labels {
                tag
                tech 
                name 
                size 
                color
            } 
        }
    } 
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
         node {
            excerpt(pruneLength: 200)
            html
            id
            frontmatter {
                title
                date(formatString: "MM-YYYY")
                categories
                tags
            }
             fields {
                slug
            }
        }
      }
    }
  }
`

export default Categories