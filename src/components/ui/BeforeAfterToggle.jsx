import { useState } from "react";
import "./BeforeAfterToggle.css";

export default function BeforeAfterToggle({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  label,
  onImageClick,
}) {
  const [active, setActive] = useState("after");

  const src = active === "before" ? beforeSrc : afterSrc;
  const alt = active === "before" ? beforeAlt : afterAlt;

  const handleImageClick = () => {
    if (onImageClick) onImageClick(src);
  };

  const handleImageKeyDown = (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    if (onImageClick) onImageClick(src);
  };

  return (
    <div className="ba-toggle">
      <div className="ba-toggle-header">
        {label && <span className="ba-toggle-label">{label}</span>}
        <div
          className="ba-toggle-pill"
          role="group"
          aria-label="Toggle before/after view"
        >
          <button
            className={`ba-pill-btn${active === "before" ? " active" : ""}`}
            onClick={() => setActive("before")}
            aria-pressed={active === "before"}
          >
            Before
          </button>
          <button
            className={`ba-pill-btn${active === "after" ? " active" : ""}`}
            onClick={() => setActive("after")}
            aria-pressed={active === "after"}
          >
            After
          </button>
        </div>
      </div>
      <div
        className="ba-toggle-img"
        role="button"
        tabIndex={0}
        aria-label="Click to enlarge"
        onClick={handleImageClick}
        onKeyDown={handleImageKeyDown}
      >
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}
