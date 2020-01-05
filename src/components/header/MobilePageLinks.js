import React from "react"
import { Link } from "gatsby"

const MobilePages = () => {
    return (
        <div className="mobile-pages-main">
            <Link to="/">
                <div className="text-left" style={{ padding: "10px 0px" }}>
                    <p className="d-inline p-3 text-dark">Blog Home</p>
                </div>
            </Link>
            <Link to="/about">
                <div className="text-left" style={{ padding: "10px 0px", borderTop: "1px solid #cdcdcd" }}>
                    <p className="d-inline p-3 text-dark">About</p>
                </div>
            </Link>
            <Link to="/archive">
                <div className="text-left" style={{ padding: "10px 0px", borderTop: "1px solid #cdcdcd" }}>
                    <p className="d-inline p-3 text-dark">Archive</p>
                </div>
            </Link>
        </div>
    )
}

export default MobilePages


