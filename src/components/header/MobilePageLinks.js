import React from "react"
import { Link } from "gatsby"

const MobilePages = () => {
    return (
        <div className="mobile-pages-main">
            <Link to="/">
                <div className="text-left" style={{ padding: "10px 0px" }}>
                    <p className="d-inline p-3 text-dark">Trang chủ</p>
                </div>
            </Link>
            <Link to="/about">
                <div className="text-left" style={{ padding: "10px 0px", borderTop: "1px solid #cdcdcd" }}>
                    <p className="d-inline p-3 text-dark">Giới thiệu</p>
                </div>
            </Link>
            <Link to="/archive">
                <div className="text-left" style={{ padding: "10px 0px", borderTop: "1px solid #cdcdcd" }}>
                    <p className="d-inline p-3 text-dark">Tất cả bài viết</p>
                </div>
            </Link>
        </div>
    )
}

export default MobilePages