import React from "react"
import "./sidebar.css"

import logo from "../../images/logo.png"

const Bio = ({ author, tagline }) => {

    return (
        <div className="bio-main w-75">
            <img src={logo} style={{ maxWidth: `180px` }} className="profile-img" alt="" />
            <div className="mt-3">
                <small className="text-muted">{tagline}</small>
            </div>
        </div>
    )
}

export default Bio