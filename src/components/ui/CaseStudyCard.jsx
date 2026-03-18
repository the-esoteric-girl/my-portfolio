import { Link } from "react-router-dom";
import Button from "./Button";
import Label from "./Label";
import "./CaseStudyCard.css";

export default function CaseStudyCard({ study }) {
  return (
    <article className="cs-card">
      <div className="cs-card-image">
        <img src={study.thumbnail} alt={study.thumbnailAlt} />
      </div>
      <div className="cs-card-body">
        <div className="cs-card-top">
          <Label variant="meta">{study.meta}</Label>
          <h3>{study.title}</h3>
          <p>{study.description}</p>
          <div className="cs-card-outcomes">
            <Label variant="accent">[ Outcomes ]</Label>
            <p>{study.outcomes}</p>
          </div>
        </div>
        <div className="cs-card-bottom">
          <div className="cs-card-pills">
            {study.pills.map(({ label, variant }) => (
              <Label key={label} variant={variant}>
                {label}
              </Label>
            ))}
          </div>
          <div className="cs-card-footer">
            <Button variant="secondary" size="md" as={Link} href={study.href}>
              View Case Study →
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
