import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Bio from "./Bio"
import "./sidebar.css"

import SocialLinks from "./SocialLinks"
import TechTags from "./TechTags"
import Categories from './Categories'

const Sidebar = () => {
    return (
        <StaticQuery
            query={graphql`
                query SiteBioQuery {
                    site {
                        siteMetadata {
                            title
                            tagline
                            author
                            contacts {
                                linkedin
                                github
                                stackoverflow
                                freecodecamp
                                twitter
                                facebook
                            }
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
                        limit: 10
                        sort: { fields: [frontmatter___date], order: DESC }
                        filter: { frontmatter: { published: { eq: true } } }
                    ) {
                        edges {
                            node {
                                frontmatter {
                                    tags
                                    categories
                                }
                            }
                        }
                    }
                }
            `}
            render={data => (
                <>
                    <div className="sidebar-main border-right">
                        <Bio author={data.site.siteMetadata.author} tagline={data.site.siteMetadata.tagline} />
                        <div className="page-links">
                            <Link to="/"><span className="text-dark d-block py-1">Trang chủ</span></Link>
                            <Link to="/about"><span className="text-dark d-block py-1">Giới thiệu</span></Link>
                            <Link to="/archive"><span className="text-dark d-block py-1">Tất cả bài viết</span></Link>
                        </div>
                        <div className="mt-4">
                            <Categories edges={data.allMarkdownRemark.edges}/>
                        </div>
                        <div className="tech-tags mt-4">
                            <TechTags labels={data.site.siteMetadata.labels} posts={data.allMarkdownRemark.edges} />
                        </div>
                        <div className="tech-tags mt-4">
                            <SocialLinks contacts={data.site.siteMetadata.contacts} />
                        </div>

                    </div>
                </>
            )}
        />
    )
}

export default Sidebar