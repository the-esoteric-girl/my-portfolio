import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import "./Nav.css";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", anchor: "about" },
  { label: "Contact", anchor: "contact" },
];

function Nav() {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav
        className={`nav${isScrolled ? " nav--scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            Sophia Ling
          </a>

          <ul className="nav-links" role="list">
            {NAV_LINKS.map(({ label, href, anchor }) => (
              <li key={label}>
                {href ? (
                  <Link to={href} className="nav-link">
                    {label}
                  </Link>
                ) : (
                  <Link to={{ pathname: "/", hash: `#${anchor}` }} className="nav-link">
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button
              className="nav-theme-toggle"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
            >
              {isDark ? "☀" : "☽"}
            </button>

            <button
              className="nav-hamburger"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="nav-overlay"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span className="nav-hamburger-line" aria-hidden="true" />
              <span className="nav-hamburger-line" aria-hidden="true" />
              <span className="nav-hamburger-line" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <div
        id="nav-overlay"
        className={`nav-overlay${isMenuOpen ? " nav-overlay--open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          className="nav-overlay-close"
          aria-label="Close menu"
          onClick={closeMenu}
        >
          ✕
        </button>
        <ul className="nav-overlay-links" role="list">
          {NAV_LINKS.map(({ label, href, anchor }) => (
            <li key={label}>
              {href ? (
                <Link
                  to={href}
                  className="nav-overlay-link"
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              ) : (
                <Link
                  to={{ pathname: "/", hash: `#${anchor}` }}
                  className="nav-overlay-link"
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Nav;
