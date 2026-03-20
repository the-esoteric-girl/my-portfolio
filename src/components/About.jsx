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
          — asking not just how we shape technology, but how it shapes us.
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
                loading="lazy"
              />
            </div>

            <div className="about-facts">
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
                I studied Human-Centered Design and Engineering at UW, and have
                spent the last year designing AI products at two startups —
                leading the full redesign of an immigration platform as sole
                designer, and working as a UI/UX designer on an AI coaching
                platform.
              </p>
              <p>
                I'm obsessed with understanding why and how things work—whether
                it's the chemistry of making delicious food, the biomechanics of
                weight-lifting, or the psychology behind an interface. I've
                recently been channeling this passion through baking and cooking
                from scratch.
              </p>
              <p>
                I'm also passionate about health and movement, building strength
                and mobility with weightlifting and calisthenics.
              </p>
              <p>
                I'm a regular consumer of film, music, and the ideas they
                explore. My current favorite genre is 90's trip hop! I love its
                layered production and atmospheric depth.
              </p>
            </div>

            <div className="about-ctas">
              <Button
                as="a"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
              >
                View Resume ↗
              </Button>
              <Button as="a" href="#contact" variant="secondary" size="md">
                Get In Touch
              </Button>
            </div>
          </div>
        </div>

        {/* Personal: image grid */}
        <div className="about-personal">
          <Label variant="eyebrow">[ MY ARTISTIC SIDE ]</Label>
          <div className="about-images-grid">
            <img
              className="about-img"
              src="/img/thanksgiving.jpg"
              alt="White buttercream cake with 'happy thanksgiving 2025' written on it and piped rosettes"
              loading="lazy"
            />
            <img
              className="about-img"
              src="/img/strawberries.jpg"
              alt="Chocolate-dipped strawberries with detailing"
              loading="lazy"
            />
            <img
              className="about-img"
              src="/img/strawberrycake.jpg"
              alt="Asian-style whipped cream chiffon cake with strawberries on top"
              loading="lazy"
            />
            <img
              className="about-img"
              src="/img/purple.jpg"
              alt="Purple buttercream cake with 'twenty one' written on top and star and flower detailing"
              loading="lazy"
            />
            <img
              className="about-img"
              src="/img/astronaut.jpg"
              alt="Watercolor painting of astronaut in space"
              loading="lazy"
            />
            <img
              className="about-img"
              src="/img/fruittart.jpg"
              alt="Fruit tarts"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
