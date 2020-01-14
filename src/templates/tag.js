import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.css"
import "../pages/index.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar/Sidebar"
import Post from '../components/Post'

const Tag = ({ pageContext, data }) => {
    const posts = data.allMarkdownRemark.edges
    const labels = data.site.siteMetadata.labels
    const { tag } = pageContext
    const { totalCount } = data.allMarkdownRemark
    const tagHeader = `Chủ đề "${tag}" (${totalCount} bài)`

    return (
        <Layout>
            <SEO title="Home" keywords={[`gatsby`, `javascript`, `react`, `web development`, `node.js`, `graphql`]} />
            <div className="index-main">
                <div className="sidebar px-4 py-2">
                    <Sidebar />
                </div>

                <div className="post-list-main">
                    <i><h2 className="heading">{tagHeader}</h2></i>
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

Tag.propTypes = {
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
  query($tag: String) {
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
      filter: { frontmatter: { tags: { in: [$tag] } } }
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

export default Tag