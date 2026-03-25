import "./Skills.css";
import Label from "./ui/Label";
import { useStaggerReveal } from "../hooks/useStaggerReveal";

const COLUMNS = [
  {
    heading: "Design",
    skills: [
      "Interaction Design",
      "User Research",
      "Usability Testing",
      "Information Architecture",
      "Design Systems",
      "Prototyping",
      "Accessibility / WCAG",
    ],
  },
  {
    heading: "Tools",
    skills: [
      "Figma",
      "FigJam",
      "Miro",
      "Webflow",
      "Framer",
      "Mixpanel",
      "Vercel",
    ],
  },
  {
    heading: "Code",
    skills: ["HTML / CSS", "React", "JavaScript", "Git / GitHub", "Vite"],
  },
];

export default function Skills() {
  const gridRef = useStaggerReveal({ threshold: 0.1 });

  return (
    <section id="skills" className="skills" aria-label="Skills">
      <div className="container">
        <div className="skills-header">
          <h2>Skills</h2>
          <Label variant="counter">[ 04 Skills ]</Label>
        </div>

        <div className="skills-grid" ref={gridRef}>
          {COLUMNS.map(({ heading, skills }) => (
            <div key={heading} className="skills-column" data-stagger>
              <Label variant="eyebrow">{heading}</Label>
              <ul className="skills-list">
                {skills.map((skill) => (
                  <li key={skill} className="skills-item">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
