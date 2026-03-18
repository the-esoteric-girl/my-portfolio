import { Link } from "react-router-dom";
import Label from "./ui/Label";
import CaseStudyCard from "./ui/CaseStudyCard";
import CASE_STUDIES from "../data/caseStudies";
import "./CaseStudies.css";

const FEATURED = CASE_STUDIES.filter((s) => s.featured);

export default function CaseStudies() {
  return (
    <section id="work" aria-label="Case Studies">
      <div className="container">
        <div className="case-studies-header">
          <h2>Work</h2>
          <Label variant="counter">[ 01 Case Studies ]</Label>
        </div>
        <div className="case-studies-grid">
          {FEATURED.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
        <div className="case-studies-more">
          <Link to="/work" className="case-studies-more-link">
            See All Work
            <span className="case-studies-more-arrow" aria-hidden="true">↓</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
