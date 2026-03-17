import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-name">Sophia Ling</span>
          <span className="footer-copy">© 2025 — All rights reserved</span>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a className="footer-link" href="mailto:sophiaxuling@gmail.com">
            Email ↗
          </a>
          <a
            className="footer-link"
            href="https://linkedin.com/in/sophia-x-ling"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            className="footer-link"
            href="https://github.com/the-esoteric-girl"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
