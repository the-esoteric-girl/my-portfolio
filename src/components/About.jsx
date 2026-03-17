import "./About.css";
import Label from "./ui/Label";
import Button from "./ui/Button";

function About() {
  return (
    <section id="about" className="about" aria-label="About">
      <div className="container">
        {/* Header */}
        <div className="about-header">
          <h2>About Me</h2>
          <Label variant="counter">[ 02 About ]</Label>
        </div>

        {/* Statement */}
        <p className="about-statement-text">
          Designing at the intersection of{" "}
          <span className="about-statement-accent">
            technology and human behavior
          </span>{" "}
          — asking not just how it works, but how it shapes us.
        </p>

        {/* Detail: photo col + bio col */}
        <div className="about-detail">
          {/* Left: photo + facts */}
          <div className="about-photo-col">
            <div className="about-photo-frame">
              <img
                src="/img/sophia.jpg"
                alt="Sophia Ling, UX/UI designer"
                className="about-photo"
              />
            </div>

            <div className="about-facts">
              <div className="about-fact">
                <span className="about-fact-label">Experience</span>
                <span className="about-fact-value">2+ Years</span>
              </div>
              <div className="about-fact">
                <span className="about-fact-label">Focus</span>
                <span className="about-fact-value">Product Design</span>
              </div>
              <div className="about-fact">
                <span className="about-fact-label">Based in</span>
                <span className="about-fact-value">Seattle, WA</span>
              </div>
              <div className="about-fact">
                <span className="about-fact-label">Status</span>
                <span className="about-fact-value about-fact-value--accent">
                  Available
                </span>
              </div>
            </div>

            <div className="about-links">
              <a className="about-link" href="mailto:sophiaxuling@gmail.com">
                <span className="about-link-label">Email</span>
                <span className="about-link-value">sophiaxuling@gmail.com</span>
                <span className="about-link-arrow">↗</span>
              </a>
              <a
                className="about-link"
                href="https://linkedin.com/in/sophia-x-ling"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="about-link-label">LinkedIn</span>
                <span className="about-link-value">sophia-x-ling</span>
                <span className="about-link-arrow">↗</span>
              </a>
              <a
                className="about-link"
                href="https://github.com/the-esoteric-girl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="about-link-label">GitHub</span>
                <span className="about-link-value">the-esoteric-girl</span>
                <span className="about-link-arrow">↗</span>
              </a>
            </div>
          </div>

          {/* Right: bio */}
          <div className="about-bio-col">
            <div className="about-bio-content">
              <Label variant="eyebrow">[ Background ]</Label>
              <p>
                I grew up with technology but remember when it was
                supplementary, not essential. That in-between position shapes
                how I think about design — I'm obsessed with understanding how
                interfaces shape behavior, attention, and culture, not just
                whether they're usable.
              </p>
              <p>
                I studied Human-Centered Design and Engineering at UW, and have
                spent the last year designing AI products at two startups —
                leading the full redesign of an immigration platform as sole
                designer, and working as a UI/UX designer on an AI coaching
                platform. I taught myself enough code to speak engineer, which
                means I spend a lot of time in the gap between design and
                development. That's where I like to be.
              </p>
              <p>
                Outside work I'm usually in the kitchen making something from
                scratch — bread, pasta, whatever's technically interesting. I
                lift weights, watch films, and listen to a lot of 90s trip hop.
                I care about craft in most things I do.
              </p>
            </div>

            <div className="about-ctas">
              <Button
                as="a"
                href="/sophia-ling-resume.pdf"
                variant="primary"
                size="md"
              >
                Download Resume
              </Button>
              <Button as="a" href="#contact" variant="secondary" size="md">
                Get In Touch
              </Button>
            </div>
          </div>
        </div>

        {/* Personal: image grid */}
        <div className="about-personal">
          <Label variant="eyebrow">[ Beyond the Brief ]</Label>
          <div className="about-images-grid">
            <img
              className="about-img"
              src="/img/thanksgiving.jpg"
              alt="White buttercream cake with 'happy thanksgiving 2025' written on it and piped rosettes"
            />
            <img
              className="about-img"
              src="/img/strawberries.jpg"
              alt="Chocolate-dipped strawberries with detailing"
            />
            <img
              className="about-img"
              src="/img/strawberrycake.jpg"
              alt="Asian-style whipped cream chiffon cake with strawberries on top"
            />
            <img
              className="about-img"
              src="/img/purple.jpg"
              alt="Purple buttercream cake with 'twenty one' written on top and star and flower detailing"
            />
            <img
              className="about-img"
              src="/img/astronaut.jpg"
              alt="Watercolor painting of astronaut in space"
            />
            <img
              className="about-img"
              src="/img/fruittart.jpg"
              alt="Fruit tarts"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
