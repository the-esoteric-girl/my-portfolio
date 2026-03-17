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
          <span className="hero-name-accent">Ling.</span>
        </h1>
        <p className="hero-tagline">
          UX/UI designer with a bias for systems thinking and technical craft.
        </p>
        <div className="hero-pills">
          <span className="hero-pill hero-pill--filled">FIGMA</span>
          <span className="hero-pill">REACT</span>
          <span className="hero-pill">ACCESSIBILITY</span>
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

      <div className="hero-bottom">
        <span className="hero-bottom-scroll">↓ SCROLL TO EXPLORE</span>
        <span className="hero-bottom-status">
          <span className="hero-status-dot" aria-hidden="true" />
          AVAILABLE FOR WORK
        </span>
        <span className="hero-bottom-location">SEATTLE, WA — 2026</span>
        <Label variant="footer" as="a" href="mailto:sophiaxuling@gmail.com">
          sophiaxuling@gmail.com
        </Label>
        <Label
          variant="footer"
          as="a"
          href="https://linkedin.com/in/sophia-x-ling"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </Label>
        <Label
          variant="footer"
          as="a"
          href="https://github.com/the-esoteric-girl"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </Label>
      </div>
    </section>
  );
}

export default Hero;
