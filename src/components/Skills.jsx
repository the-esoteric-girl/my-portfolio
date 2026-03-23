import "./Skills.css";
import Label from "./ui/Label";

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
    skills: ["Figma", "FigJam", "Miro", "Framer", "Mixpanel", "Vercel"],
  },
  {
    heading: "Code",
    skills: ["HTML / CSS", "React", "JavaScript", "Git / GitHub", "Vite"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills" aria-label="Skills">
      <div className="container">
        <div className="skills-header">
          <h2>Skills</h2>
          <Label variant="counter">[ 04 Skills ]</Label>
        </div>

        <p className="skills-subtitle">[ What I bring to a team ]</p>

        <div className="skills-grid">
          {COLUMNS.map(({ heading, skills }) => (
            <div key={heading} className="skills-column">
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
