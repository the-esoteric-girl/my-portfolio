import { useState } from "react";
import Button from "./ui/Button";
import Label from "./ui/Label";
import "./Contact.css";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const lastSubmitted = localStorage.getItem("contact_last_submitted");
    if (lastSubmitted && Date.now() - Number(lastSubmitted) < 60000) {
      setError("Please wait a minute before sending another message.");
      return;
    }
    const form = e.target;
    try {
      const res = await fetch("https://formspree.io/f/mjgapavd", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        localStorage.setItem("contact_last_submitted", String(Date.now()));
        setSubmitted(true);
        setError("");
      } else {
        setError(
          "Something went wrong. Please try again or email me directly.",
        );
      }
    } catch {
      setError("Network error. Please try again or email me directly.");
    }
  }

  return (
    <section id="contact" aria-label="Contact">
      <div className="container">
        <div className="contact-header">
          <h2>Contact</h2>
          <Label variant="counter">[ 03 Get In Touch ]</Label>
        </div>
        <div className="contact-grid">
          <div className="contact-left">
            <div className="contact-intro">
              <h3 className="contact-heading">
                Let's work <br />
                <span>together.</span>
              </h3>
              <p className="contact-desc">
                I'm open to full-time roles, freelance projects, and
                collaborations. Whether you have a brief or just want to talk
                through an idea — I'd love to hear from you.
              </p>
            </div>
            <div className="contact-links">
              <a className="contact-link" href="mailto:sophiaxuling@gmail.com">
                <span>Email</span> sophiaxuling@gmail.com ↗
              </a>
              <a
                className="contact-link"
                href="https://linkedin.com/in/sophia-x-ling"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>LinkedIn</span> sophia-x-ling ↗
              </a>
              <a
                className="contact-link"
                href="https://github.com/the-esoteric-girl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>GitHub</span> the-esoteric-girl ↗
              </a>
            </div>
          </div>

          <div className="contact-right">
            {!submitted ? (
              <form onSubmit={handleSubmit} noValidate>
                <div className="contact-field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-subject">
                    Subject{" "}
                    <span className="contact-field-optional">optional</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Write here..."
                  />
                </div>
                {error && <p className="contact-error">{error}</p>}
                <div className="contact-submit-row">
                  <Button variant="primary" size="md" type="submit">
                    Send Message →
                  </Button>
                </div>
              </form>
            ) : (
              <div className="contact-success">
                <Label variant="eyebrow">[ Message Sent ]</Label>
                <h3>Thanks for reaching out.</h3>
                <p>
                  I'll get back to you as soon as I can — usually within a day
                  or two.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                >
                  ← Back
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
