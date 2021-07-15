import React from "react";
import { Link } from "gatsby";

import logo from "../assets/img/logo-dark.svg";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer--content container">
          <div className="footer--logo-column">
            <Link className="logo" to="/">
              <img className="logo--icon" src={logo} alt="Logo" />
              <span className="logo--text">Uncommon sense</span>
            </Link>
          </div>
          <div className="footer--nav-column">
            <Link to="/patterns">Design Patterns</Link>
            <Link to="/page-designs">Page Designs</Link>
            <Link className="navbar--item" to="/blog">
              Blog
            </Link>
            <Link className="navbar--item" to="/about">
              About
            </Link>
            <Link className="navbar--item" to="/sign-in">
              Sign in
            </Link>
          </div>
          <div className="footer--nav-column">
            <Link to="/contact">Contact</Link>
            <Link to="/uses">What do you use?</Link>
            <Link to="/sitemap">Sitemap</Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
          <div className="footer--newsletter">
            <h3 className="header--xsmall footer--newsletter-header">Get the best product design advice delivered right to your inbox.</h3>
            <form action="">
              <input
                className="footer--input"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
              />
              <input
                className="footer--input"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
              <input className="footer--button" type="button" value="Sign up" />
            </form>
          </div>
        </div>
        <div className="footer--legal container">
          You look nice today. © 2021 Uncommon Sense. All rights reserved.
        </div>
      </footer>
    );
  }
};

export default Footer;
