import CaseStudyCard from "../components/ui/CaseStudyCard";
import Label from "../components/ui/Label";
import Footer from "../components/Footer";
import CASE_STUDIES from "../data/caseStudies";
import { useStaggerReveal } from "../hooks/useStaggerReveal";
import "./Work.css";

export default function Work() {
  const gridRef = useStaggerReveal({ individual: true });

  return (
    <main className="work-page">
      <section className="work-header" aria-labelledby="work-title">
        <div className="container">
          <Label variant="counter">[ 01 Case Studies ]</Label>
          <h1 id="work-title">Work</h1>
          <p className="work-desc">
            Selected projects — end-to-end design work across product, systems,
            and experience.
          </p>
        </div>
      </section>

      <section className="work-grid-section" aria-label="All case studies">
        <div className="container">
          <div className="work-grid" ref={gridRef}>
            {CASE_STUDIES.map((study) => (
              <div key={study.slug} data-stagger>
                <CaseStudyCard study={study} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
