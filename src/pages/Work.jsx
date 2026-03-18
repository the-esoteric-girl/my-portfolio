import CaseStudyCard from "../components/ui/CaseStudyCard";
import Label from "../components/ui/Label";
import Footer from "../components/Footer";
import CASE_STUDIES from "../data/caseStudies";
import "./Work.css";

export default function Work() {
  return (
    <main className="work-page">
      <section className="work-header" aria-labelledby="work-title">
        <div className="container">
          <Label variant="counter">[ Work ]</Label>
          <h1 id="work-title">Case Studies</h1>
          <p className="work-desc">
            Selected projects — end-to-end design work across product, systems,
            and experience.
          </p>
        </div>
      </section>

      <section className="work-grid-section" aria-label="All case studies">
        <div className="container">
          <div className="work-grid">
            {CASE_STUDIES.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
