import React from "react"
import { Link, graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.css"
import "../pages/index.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar/Sidebar"
import Post from '../components/Post'

const PostList = (props) => {
    const posts = props.data.allMarkdownRemark.edges
    const labels = props.data.site.siteMetadata.labels
    const { currentPage, numPages } = props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
        <Layout>
            <SEO title="Home" keywords={[`gatsby`, `javascript`, `react`, `web development`, `blog`, `graphql`]} />
            <div className="index-main">
                <div className="sidebar px-4 py-2">
                    <Sidebar />
                </div>
                <div className="post-list-main">
                    {posts.map((post) => {
                        return (
                            <div key={post.node.id} className="mt-5">
                                <Post post={post} labels={labels} />
                            </div>
                        )
                    })}
                    <div className="text-center mt-4">
                        {!isFirst && (
                            <Link to={prevPage} rel="prev" style={{ textDecoration: `none` }}>
                                <span className="text-dark">← Previous Page</span>
                            </Link>
                        )}
                        {!isLast && isFirst && (
                            <Link to={nextPage} rel="next" style={{ textDecoration: `none` }}>
                                <span className="text-dark ml-5">Next Page →</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const listQuery = graphql`
         query paginateQuery($skip: Int!, $limit: Int!) {
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
             limit: $limit
             skip: $skip
             sort: { fields: [frontmatter___date], order: DESC }
             filter: { frontmatter: { published: { eq: true } } }
           ) {
             totalCount
             edges {
               node {
                 excerpt(pruneLength: 200)
                 html
                 id
                 frontmatter {
                   title
                   date(formatString: "DD-MM-YYYY")
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

export default PostList
