import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./blog-post.css"

import Sidebar from "../components/sidebar/Sidebar"
import CustomShareBlock from "../components/CustomShareBlock"
import CommentsBlock from "../components/CommentsBlock"
import TagsBlock from "../components/TagsBlock"
import SubscribeBlock from '../components/subscribe-block/SubscribeBlock'

const BlogPost = (props) => {
  const post = props.data.markdownRemark
  const labels = props.data.site.siteMetadata.labels
  const siteName = props.data.site.siteMetadata.title
  const siteUrl = props.data.site.siteMetadata.url
  const facebookAppId = props.data.site.siteMetadata.facebookAppId
  const url = `${siteUrl}${props.pageContext.slug}`;
  const tags = post.frontmatter.tags

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="post-page-main">
        <div className="sidebar px-4 py-2">
          <Sidebar />
        </div>

        <div className="post-main">
          <SEO title={post.frontmatter.title} />
          <div className="heading">
            <h1 className="title">{post.frontmatter.title}</h1>
            <div>
              <small>
                <i>Đăng ngày </i> {post.frontmatter.date}
              </small>
            </div>
            <TagsBlock tags={tags} labels={labels} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <CustomShareBlock title={post.frontmatter.title} siteName={siteName} url={url} />
          <SubscribeBlock />
          <CommentsBlock url={url} facebookAppId={facebookAppId} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
      site {
        siteMetadata {
          url
          title
          facebookAppId
          labels {
              tag
              tech 
              name 
              size 
              color
          }
        }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD-MM-YYYY")
        tags
      }
    }
  }
`

export default BlogPost
