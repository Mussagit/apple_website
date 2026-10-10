// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const appleLogo =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNyAyMCIgd2lkdGg9IjE3IiBoZWlnaHQ9IjIwIiBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMTMuNyAxMC44Yy0uMDMtMi43IDIuMi00IDIuMy00LjEtMS4yLTEuOC0zLjItMi0zLjktMi0xLjctLjItMy4yIDEtNCAxLTAuOCAwLTIuMS0xLTMuNC0uOS0xLjguMDMtMy41IDEtNC40IDIuNi0xLjkgMy4zLS41IDguMSAxLjMgMTAuOC45IDEuMyAxLjkgMi43IDMuMyAyLjcgMS4zLS4wNSAxLjgtLjggMy40LS44IDEuNiAwIDIuMS44IDMuNC44IDEuNC0uMDIgMi4zLTEuMyAzLjItMi42IDEtMS41IDEuNC0yLjkgMS40LTMtLjAzLS4wMS0yLjctMS0yLjctNC4xek0xMS4yIDIuOWMuNy0uOSAxLjItMi4xIDEtMy40LTEgLjA0LTIuMy43LTMgMS42LS42LjguMS0yLjEtMS0zLjQuOS0uMS4wNC0yLjMuOC0zLjEgMS44eiIvPjwvc3ZnPg==";

function Navbar() {
  const navLinks = [
    { label: "Mac", path: "/mac" },
    { label: "iphone", path: "/iphone" },
    { label: "ipad", path: "/ipad" },
    { label: "Watch", path: "/watch" },
    { label: "TV", path: "/tv" },
    { label: "Music", path: "/music" },
    { label: "Support", path: "/support" },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <img src={appleLogo} alt="Apple logo" />
      </Link>

      <ul className="navbar__links">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <div className="navbar__icons">
        <span className="navbar__icon" aria-label="search">
          &#128269;
        </span>
        <span className="navbar__icon" aria-label="bag">
          &#128092;
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
