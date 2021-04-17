import React from "react";
import { Link } from "gatsby";
import logo from "../assets/img/logo-dark.svg";
// import sun from "../img/sun.svg"
// import moon from "../img/moon.svg"

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active",
            })
          : this.setState({
              navBarActiveClass: "",
            });
      }
    );
  };

  render() {
    return (
      <nav className="container navbar" role="navigation" aria-label="main-navigation">
        <Link className="logo" to="/">
          <img className="logo--icon" src={logo} alt="Logo" />
          <span className="logo--text">Uncommon sense</span>
        </Link>
        {/* Hamburger menu */}
        <div
          className={`navbar-burger burger ${this.state.navBarActiveClass}`}
          data-target="navMenu"
          onClick={() => this.toggleHamburger()}
        >
          <span />
          <span />
          <span />
        </div>
        <div
          id="navMenu"
          className={`navbar--menu ${this.state.navBarActiveClass}`}
        >
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/about">
              About
            </Link>
            <Link className="navbar-item" to="/products">
              Products
            </Link>
            <Link className="navbar-item" to="/blog">
              Blog
            </Link>
            <Link className="navbar-item" to="/contact">
              Contact
            </Link>
            <Link className="navbar-item" to="/patterns">
              Design Patterns
            </Link>
            <Link className="navbar-item" to="/contact/examples">
              Form Examples
            </Link>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
