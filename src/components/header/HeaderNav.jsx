import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function HeaderNav() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navMenuRef = useRef();
  const navToggleRef = useRef();

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        closeNav();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const toggleNav = () => {
    setIsNavExpanded((prevExpanded) => !prevExpanded);
    if (!isNavExpanded) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  };

  const closeNav = () => {
    setIsNavExpanded(false);
    document.body.classList.remove("disable-scroll");
  };

  const handleFocusOut = (event) => {
    if (!navMenuRef.current.contains(event.relatedTarget)) {
      closeNav();
    }
  };

  return (
    <nav className="nav" aria-label="main">
      <button
        className="nav__button"
        aria-expanded={isNavExpanded}
        aria-controls="nav__menu-list"
        aria-label="menu"
        onClick={toggleNav}
        ref={navToggleRef}
      >
        <span className="nav__button-line" />
        <span className="nav__button-line" />
        <span className="nav__button-line" />
      </button>
      <ul
        className={`nav__menu-list${isNavExpanded ? " expanded" : ""}`}
        id="nav__menu-list"
        ref={navMenuRef}
        onBlur={handleFocusOut}
      >
        <li className="nav__menu-item">
          <Link to="/" className="nav__menu-link">
            About
          </Link>
        </li>
        <li className="nav__menu-item">
          <Link to="/" className="nav__menu-link">
            Careers
          </Link>
        </li>
        <li className="nav__menu-item">
          <Link to="/" className="nav__menu-link">
            Events
          </Link>
        </li>
        <li className="nav__menu-item">
          <Link to="/" className="nav__menu-link">
            Products
          </Link>
        </li>
        <li className="nav__menu-item">
          <Link to="/" className="nav__menu-link">
            Support
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
