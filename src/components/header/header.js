import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import Hamburger from "./Hamburger"
import MobilePageLinks from './MobilePageLinks'
import logo from "../../images/logo.jpg"
import "./header.css"

const Header = ({ siteTitle, tagline, author, contacts }) => {
  const [open, setOpen] = useState(false)
  const handleClickHamburger = () => {
    setOpen(prevState => !prevState)
  }
  return (
    <nav className="head-main">
      <div className="head-elements">
        <h1 className="head-logo" style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <img src={logo} className="profile-img mr-2" alt="" />
            {siteTitle}
          </Link>
        </h1>
        {/* eslint-disable-next-line */}
        <div onClick={handleClickHamburger} className="cursor-pointer">
          <Hamburger open={open} />
        </div>
      </div>
      {open ? <MobilePageLinks /> : undefined}
    </nav>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
