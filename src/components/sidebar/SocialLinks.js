import React from "react"
import {
    FaLinkedin,
    FaGithubSquare,
    FaFacebook
} from "react-icons/fa"
import "./sidebar.css"


const SocialLinks = ({ contacts }) => {
    return (
        <>
            <h4>Social Links</h4>
            <div className="side-social-links mt-3 mb-3">
                <a className="text-secondary pt-2 pb-2 pr-2 pl-0"
                    href={contacts.linkedin}>
                    <span title="Linked In">
                        <FaLinkedin size={26} style={{ color: "secondary" }} />
                    </span>
                </a>
                <a className="text-secondary p-2"
                    href={contacts.github}>
                    <span title="GitHub">
                        <FaGithubSquare size={26} style={{ color: "secondary" }} />
                    </span>
                </a>
                <a className="text-secondary p-2"
                    href={contacts.facebook}>
                    <span title="facebook">
                        <FaFacebook size={26} style={{ color: "secondary" }} />
                    </span>
                </a>
            </div>
        </>
    )
}

export default SocialLinks