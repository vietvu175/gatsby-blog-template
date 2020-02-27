import React from "react"
import { graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.css"
import "./index.css"
import Post from '../components/Post'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar/Sidebar"

const ArchivePage = ({ data }) => {
    const posts = data.allMarkdownRemark.edges
    const labels = data.site.siteMetadata.labels

    return (
        <Layout>
            <SEO title="Tất cả bài viết" keywords={[`gatsby`, `javascript`, `react`, `web development`, `blog`, `graphql`]} />
            <div className="index-main">
                <div className="sidebar px-4 py-2">
                    <Sidebar />
                </div>
                <div className="post-list-main">
                    <h2 className="heading mt-3">Tất cả bài viết</h2>
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

export const pageQuery = graphql`
         query ArchiveQuery {
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
             limit: 1000
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

export default ArchivePage

