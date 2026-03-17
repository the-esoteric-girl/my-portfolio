import "./Hero.css";
import Label from "./ui/Label";
import Button from "./ui/Button";

function Hero() {
  return (
    <section className="hero" aria-label="Introduction" id="top">
      <div className="hero-content">
        <span className="hero-tag">[ UX / UI DESIGNER ]</span>
        <h1 className="hero-name">
          Sophia
          <br />
          <span>Ling.</span>
        </h1>
        <p className="hero-tagline">
          UX/UI designer with a bias for systems thinking and technical craft.
        </p>
        <div className="hero-pills">
          <Label variant="pill">Interaction Design</Label>
          <Label variant="pill">Systems Thinking</Label>
          <Label variant="pill">AI Products</Label>
        </div>
        <div className="hero-ctas">
          <Button as="a" href="#work" variant="primary" size="lg">
            VIEW WORK →
          </Button>
          <Button as="a" href="#contact" variant="secondary" size="lg">
            GET IN TOUCH
          </Button>
        </div>
      </div>

      <div className="hero-aside" aria-hidden="true" />

      <div className="hero-bar-meta">
        <div className="hero-bar-status">Available for work</div>
        <span className="hero-bar-location">
          <span className="hero-bar-location-full">Seattle, WA</span>
          <span className="hero-bar-location-short">Seattle, WA</span>
        </span>
        <span className="hero-bar-scroll">↓ Scroll to explore</span>
      </div>

      <div className="hero-bar-links">
        <a
          className="hero-bar-link hero-bar-link--email"
          href="mailto:sophiaxuling@gmail.com"
        >
          sophiaxuling@gmail.com ↗
        </a>
        <a
          className="hero-bar-link"
          href="https://linkedin.com/in/sophia-x-ling"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
        <a
          className="hero-bar-link"
          href="https://github.com/the-esoteric-girl"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
      </div>
    </section>
  );
}

export default Hero;
