import { useEffect, useRef } from "react";
import "./Hero.css";
import Label from "./ui/Label";
import Button from "./ui/Button";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
const INITIAL_DELAY = 300;
const STAGGER = 80;
const FRAME_DURATION = 50;
const FRAME_COUNT = 8;

function scrambleName(h1) {
  const line1 = "Sophia";
  const line2 = "Ling.";

  const makeItems = (text) =>
    text.split("").map((ch) => {
      const isLetter = ch !== ".";
      const span = document.createElement("span");
      span.textContent = isLetter
        ? SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        : ch;
      return { span, char: ch, isLetter };
    });

  const line1Items = makeItems(line1);
  const line2Items = makeItems(line2);
  const allItems = [...line1Items, ...line2Items];

  h1.innerHTML = "";
  line1Items.forEach(({ span }) => h1.appendChild(span));
  h1.appendChild(document.createElement("br"));
  const line2Wrapper = document.createElement("span");
  line2Items.forEach(({ span }) => line2Wrapper.appendChild(span));
  h1.appendChild(line2Wrapper);

  const ids = [];
  let letterIndex = 0;

  allItems.forEach(({ span, char, isLetter }) => {
    if (!isLetter) return;

    const start = INITIAL_DELAY + letterIndex * STAGGER;
    letterIndex++;

    for (let f = 0; f < FRAME_COUNT; f++) {
      const id = setTimeout(() => {
        span.textContent =
          SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }, start + f * FRAME_DURATION);
      ids.push(id);
    }

    const resolveId = setTimeout(() => {
      span.textContent = char;
    }, start + FRAME_COUNT * FRAME_DURATION);
    ids.push(resolveId);
  });

  return () => ids.forEach(clearTimeout);
}

function Hero() {
  const nameRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const h1 = nameRef.current;
    if (!h1) return;
    return scrambleName(h1);
  }, []);

  return (
    <section className="hero" aria-label="Introduction" id="top">
      <div className="hero-content">
        <span className="hero-tag">[ UX / UI DESIGNER ]</span>
        <h1 className="hero-name" ref={nameRef} aria-label="Sophia Ling.">
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
