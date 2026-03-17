import Button from "./ui/Button";
import Label from "./ui/Label";
import "./CaseStudies.css";

export default function CaseStudies() {
  return (
    <section id="work" aria-label="Case Studies">
      <div className="container">
        <div className="case-studies-header">
          <h2>Work</h2>
          <Label variant="counter">[ 01 Case Studies ]</Label>
        </div>
        <div className="case-studies-grid">
          <article className="case-study-card">
            <div className="case-study-image">
              <img
                src="/img/consulta-thumbnail.png"
                alt="Consulta Immigration Portal — before and after redesign"
              />
            </div>
            <div className="case-study-body">
              <div className="case-study-top">
                <Label variant="meta">Sole Designer — 7 Months — 2025</Label>
                <h3>Consulta Immigration Portal Redesign</h3>
                <p>
                  Full-cycle redesign of an AI-powered immigration platform.
                  Real users, real stakes — immigrants navigating the US
                  immigration process.
                </p>
                <div className="case-study-outcomes">
                  <Label variant="accent">[ Outcomes ]</Label>
                  <p>
                    Support questions dropped. Users reported significantly less
                    confusion. Shipped to real users before company closure in
                    Oct 2025.
                  </p>
                </div>
              </div>
              <div className="case-study-bottom">
                <div className="case-study-pills">
                  <Label variant="pill-accent">UX/UI</Label>
                  <Label variant="pill">Figma</Label>
                  <Label variant="pill">Accessibility</Label>
                  <Label variant="pill">Design Systems</Label>
                </div>
                <div className="case-study-footer">
                  <Button
                    variant="secondary"
                    size="md"
                    as="a"
                    href="/case-studies/consulta"
                  >
                    View Case Study →
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
