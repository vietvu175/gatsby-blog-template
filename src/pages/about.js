import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"

import Sidebar from "../components/sidebar/Sidebar"

const AboutPage = (props) => {
    const labels = props.data.site.siteMetadata.labels
    const aboutTags = ["react", "nodejs", "html", "css"]
    const tags = {}
    labels.forEach(label => {
        aboutTags.forEach(tag => {
            if (tag === label.tag) {
                tags[tag] = label.name
            }
        })
    })

    return (
        <Layout>
            <SEO title="Giới thiệu" />
            <div className="post-page-main">
                <div className="sidebar px-4 py-2">
                    <Sidebar />
                </div>

                <div className="post-main">
                    <SEO title="About" />
                    <div className="mt-3">
                        <h2 className="heading">Giới thiệu</h2>
                        <p><i>"Tốt nghiệp như một thợ xây nhưng lại làm việc như một thợ code. Hiện mình đang làm nhà phát triển đằng trước cho một công ty công nghệ được định giá dưới một tỉ đô nằm trên đại lộ danh vọng Thăng Long."</i></p>
                        <br />
                        <p>Với suy nghĩ chỉ cần biết lập trình thì mình có thể hiện thực hoá cả tá những thứ hay ho mà mình nghĩ ra, nên tầm cuối 2017 đầu 2018 mình đã tự khép lại sự nghiệp của một kỹ sư xây dựng đẹp trai với số phận lận đận để bắt đầu mày mò viết những dòng code đầu tiên. Cho đến nay mình đã có thể tự tin viết chương trình "Hello world!" bằng 5 ngôn ngữ khác nhau, và mình tin con số này sẽ tiếp tục tăng lên ở những năm tiếp theo nữa.</p>
                        <br />
                        <p>Những kiến thức của mình hiện tại tích luỹ được đều hầu hết đến từ quá trình tự học (mình không đi học ở trung tâm nào cả vì bạn biết đấy, kỹ sư xây dựng ngoài đẹp trai ra thì nghèo lắm T_T), và ngay từ lúc bắt đầu mình đã ấp ủ dự định viết một chiếc nhật ký thật hịn để ghi chép lại quá trình ấy. Phần để nhìn lại được quá trình phát triển bản thân, phần vì muốn chia sẻ với mọi người những thứ hay ho mà mình học được, ngộ được. Tuy nhiên vì bận trăm công nghìn việc nhưng chủ yếu là LƯỜI mà mãi tận hôm nay mình mới bắt tay thực hiện dự định ấy. Từ hôm nay mình xin hứa mỗi tuần sẽ viết một bài, bài gì cũng được, không ai đọc cũng được, XIN HỨA, XIN HỨA, XIN HỨA...</p>
                        <br />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query aboutQuery {
        site {
            siteMetadata {
                labels {
                    tag
                    tech 
                    name 
                    size 
                    color
                }
            }
        }
    }
`

export default AboutPage

