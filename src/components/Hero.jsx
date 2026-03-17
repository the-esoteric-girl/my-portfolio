import "./Hero.css";

function Hero() {
  return (
    <section className="hero" aria-label="Introduction" id="top">
      <div className="hero-content">
        <span className="hero-tag">[ UX / UI DESIGNER ]</span>
        <h1 className="hero-name">
          Sophia<br />
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
          <a href="#work" className="hero-btn hero-btn--primary">VIEW WORK →</a>
          <a href="#contact" className="hero-btn hero-btn--secondary">GET IN TOUCH</a>
        </div>
      </div>

      <div className="hero-aside" aria-hidden="true" />

      <div className="hero-bottom">
        <span className="hero-bottom-scroll">↓ SCROLL TO EXPLORE</span>
        <span className="hero-bottom-status">
          <span className="hero-status-dot" aria-hidden="true" />
          AVAILABLE FOR WORK
        </span>
        <span className="hero-bottom-location">SEATTLE, WA — 2025</span>
      </div>
    </section>
  );
}

export default Hero;
