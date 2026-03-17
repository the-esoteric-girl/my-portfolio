import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Label from "../components/ui/Label";
import "./CaseStudy.css";

const TOC_ITEMS = [
  { id: "overview",   num: "01", label: "Overview" },
  { id: "problem",    num: "02", label: "The Problem" },
  { id: "research",   num: "03", label: "Research" },
  { id: "principles", num: "04", label: "Principles" },
  {
    id: "redesign", num: "05", label: "Redesign",
    subs: [
      { id: "app-selection", num: "5.1", label: "App Selection" },
      { id: "questionnaire", num: "5.2", label: "Questionnaire" },
      { id: "doc-checklist", num: "5.3", label: "Doc Checklist" },
      { id: "filing-fee",    num: "5.4", label: "Filing Fee" },
      { id: "signature",     num: "5.5", label: "Signature" },
    ],
  },
  { id: "outcomes",   num: "06", label: "Outcomes" },
  { id: "reflection", num: "07", label: "Reflection" },
];

const SUB_PARENT = {
  "app-selection": "redesign",
  "questionnaire":  "redesign",
  "doc-checklist":  "redesign",
  "filing-fee":     "redesign",
  "signature":      "redesign",
};

const ALL_OBSERVE_IDS = [
  "overview", "problem", "research", "principles",
  "app-selection", "questionnaire", "doc-checklist", "filing-fee", "signature",
  "outcomes", "reflection",
];

export default function CaseStudy() {
  const [activeId, setActiveId] = useState("overview");

  /* ── IntersectionObserver — active TOC item ──────────────── */
  useEffect(() => {
    const els = ALL_OBSERVE_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Smooth scroll with nav offset ───────────────────────── */
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest("a[href^='#']");
      if (!anchor) return;
      e.preventDefault();
      const id = anchor.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      const navH = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-height")
      ) || 0;
      const offset = navH + 24;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const isActive = (id) =>
    activeId === id || SUB_PARENT[activeId] === id;

  return (
    <main className="case-study-page">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="cs-hero" aria-label="Case study overview">
        <div className="cs-hero-inner">
          <Button
            variant="secondary"
            size="sm"
            as="a"
            href="/"
            className="cs-back"
          >
            ← Back to Work
          </Button>

          <div className="cs-hero-content">
            <Label variant="eyebrow">[ Case Study — 2025 ]</Label>
            <h1>Consulta Immigration Portal Redesign</h1>
            <p className="cs-hero-desc">
              Full-cycle redesign of an AI-powered immigration platform.
              Real users, real stakes — immigrants navigating the US
              immigration process.
            </p>
            <div className="cs-hero-tags">
              <Label variant="pill">UX/UI</Label>
              <Label variant="pill">Figma</Label>
              <Label variant="pill">Accessibility</Label>
              <Label variant="pill">Design Systems</Label>
            </div>
          </div>

          <div className="cs-stats-bar">
            <div className="cs-stat">
              <label>Role</label>
              <span className="cs-stat-value">Sole Designer</span>
            </div>
            <div className="cs-stat">
              <label>Timeline</label>
              <span className="cs-stat-value">Feb — Sep 2025</span>
            </div>
            <div className="cs-stat">
              <label>Team</label>
              <span className="cs-stat-value">2 Founders + Eng</span>
            </div>
            <div className="cs-stat">
              <label>Status</label>
              <span className="cs-stat-value cs-stat-value--accent">Shipped</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="cs-body">

        {/* Sidebar TOC */}
        <aside className="cs-sidebar" aria-label="Table of contents">
          <span className="cs-toc-label">Contents</span>

          {TOC_ITEMS.map((item) => (
            <div key={item.id}>
              <a
                href={`#${item.id}`}
                className={`cs-toc-item${isActive(item.id) ? " active" : ""}`}
              >
                <span className="cs-toc-num">{item.num}</span>
                <span className="cs-toc-text">{item.label}</span>
              </a>
              {item.subs?.map((sub) => (
                <a
                  key={sub.id}
                  href={`#${sub.id}`}
                  className={`cs-toc-sub${activeId === sub.id ? " active" : ""}`}
                >
                  {sub.num} {sub.label}
                </a>
              ))}
            </div>
          ))}
        </aside>

        {/* Content */}
        <div className="cs-content">

          {/* 01 — Overview */}
          <section id="overview" className="cs-section" aria-labelledby="title-overview">
            <div className="cs-section-label">
              <span className="cs-section-num">01</span>
              <span>Overview</span>
            </div>
            <h2 id="title-overview" className="cs-section-title">
              A portal that needed to work as hard as the people using it.
            </h2>
            <p>
              Consulta is an AI-powered platform that helps immigrants navigate US
              immigration applications — selecting the right form, answering
              questions, uploading documents, paying fees, and signing submissions.
              The underlying logic was genuinely useful. The interface around it
              worked against the user at every turn.
            </p>
            <p>
              I joined as the sole designer in February 2025 and spent seven months
              redesigning the product from the inside out. Not a cosmetic refresh —
              a structural rethink of how Consulta communicates, guides, and
              reassures people doing something that matters more than almost any
              software they will ever use.
            </p>
            <p>
              The work touched every screen in the filing flow: application
              selection, the AI-powered questionnaire, document collection, fee
              payment, and signature. It also produced the design system
              Consulta continues to build on.
            </p>
          </section>

          {/* 02 — The Problem */}
          <section id="problem" className="cs-section" aria-labelledby="title-problem">
            <div className="cs-section-label">
              <span className="cs-section-num">02</span>
              <span>The Problem</span>
            </div>
            <h2 id="title-problem" className="cs-section-title">
              Functional but broken.
            </h2>
            <p>
              The original portal had been built to prove a product concept, not
              to serve a user. It demonstrated that the AI could process an
              immigration case. It could not demonstrate that a real person —
              someone with limited English, no legal background, and high personal
              stakes — could complete one.
            </p>
            <p>
              The app selection screen presented all available application types at
              once, with no hierarchy and no guidance. Users with no immigration
              background were expected to know which of a dozen forms applied to
              their situation. Wrong-form selection wasn't hypothetical — it was
              happening regularly in internal testing.
            </p>
            <p>
              The questionnaire was the core of the product, but it looked like a
              raw form dump. Questions appeared without context, grouping, or
              visible progress. The emotional weight of answering detailed questions
              about immigration history wasn't acknowledged anywhere in the UI.
            </p>
            <p>
              The document checklist was a flat list of filenames. No grouping, no
              status indication, no explanation of what any document was or why it
              was required. Users in testing didn't know if they were close to done
              or just getting started.
            </p>
            <p>
              Throughout all of it, the visual design had no system behind it. Type
              sizes were inconsistent, spacing was arbitrary, and states — empty,
              loading, error, success — were either missing or improvised.
              The product had real capability hidden inside an interface that
              communicated the opposite.
            </p>
          </section>

          {/* 03 — Research */}
          <section id="research" className="cs-section" aria-labelledby="title-research">
            <div className="cs-section-label">
              <span className="cs-section-num">03</span>
              <span>Research</span>
            </div>
            <h2 id="title-research" className="cs-section-title">
              Start with what's known.
            </h2>
            <p>
              I began with the founders, who had deep domain knowledge from
              previous immigration-adjacent work. We ran through every screen
              together — not as a design review, but as a scenario exercise. Walk me
              through what a user with no immigration experience would think when
              they land here. Those sessions were the fastest way to surface
              assumptions baked into the UI that no one had questioned.
            </p>
            <p>
              Alongside that I did competitive analysis across legal-tech products
              serving the immigration space: Boundless, Docketwise, Clio, and
              several USCIS direct tools. The gap was consistent — most tools were
              built for immigration attorneys, not for the immigrants themselves.
              The consumer-facing products that did exist treated complexity as
              something to hide rather than something to explain, which created a
              different kind of anxiety.
            </p>
            <p>
              Because formal usability testing wasn't available in the early phase,
              I anchored the work to WCAG 2.1 AA and the federal plain-language
              standard. These aren't just compliance frameworks. On a product where
              a misunderstood instruction could have real legal consequences for a
              real person, they're the minimum floor.
            </p>
            <p>
              What the research kept returning to was not a list of features to add
              but a set of trust deficits to address. Users didn't need less
              information — they needed the right information, in the right sequence,
              with enough context to feel like the product was on their side.
              That reframe shaped everything that followed.
            </p>
          </section>

          {/* 04 — Principles */}
          <section id="principles" className="cs-section" aria-labelledby="title-principles">
            <div className="cs-section-label">
              <span className="cs-section-num">04</span>
              <span>Principles</span>
            </div>
            <h2 id="title-principles" className="cs-section-title">
              Three principles, every decision.
            </h2>
            <p>
              Before wireframing anything, I wrote three design principles for
              the project. Every major structural or visual decision was evaluated
              against them. When two directions were in tension, the principles
              were the tiebreaker.
            </p>

            <div className="cs-principle">
              <strong>Clarity over completeness</strong>
              <p>
                Show what the user needs for this step. Information not yet relevant
                belongs elsewhere — not hidden, just deferred. A user filing their
                first immigration application should not encounter the full scope of
                what they're about to do all at once.
              </p>
            </div>

            <div className="cs-principle">
              <strong>Trust is earned, not assumed</strong>
              <p>
                Every interaction where the product makes a decision, explains a
                requirement, or requests sensitive information must communicate why.
                A user filling out immigration documents is trusting this product
                with something that matters to their future. The design has to
                honor that.
              </p>
            </div>

            <div className="cs-principle">
              <strong>Status is never ambiguous</strong>
              <p>
                At any point in the flow, the user should be able to answer: where
                am I, what's next, and am I on track — without hunting for the
                answer. Visible progress isn't a nice-to-have on a multi-step
                government filing process. It's a prerequisite for completion.
              </p>
            </div>
          </section>

          {/* 05 — Redesign */}
          <section id="redesign" className="cs-section" aria-labelledby="title-redesign">
            <div className="cs-section-label">
              <span className="cs-section-num">05</span>
              <span>Redesign</span>
            </div>
            <h2 id="title-redesign" className="cs-section-title">
              The work.
            </h2>
            <p>
              Five screens. Each one a specific problem, a specific solution.
            </p>

            {/* 5.1 App Selection */}
            <div id="app-selection">
              <h3>5.1 Application Selection</h3>
              <p>
                The original screen presented all application types as a flat grid
                of cards with minimal labeling. A user encountering US immigration
                applications for the first time had no way to know which one applied
                to their situation without already knowing immigration law.
              </p>
              <p>
                The redesign introduced a guided filter: a brief decision sequence
                that narrowed the visible application types to those relevant to the
                user's situation before they ever saw the full list. Cards were
                restructured to lead with plain-language descriptions over
                bureaucratic form names, with secondary labels indicating who the
                form is for and what it accomplishes.
              </p>

              <div className="cs-ba">
                <div className="cs-ba-grid">
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">Before</span>
                    <div className="cs-ba-img">
                      <img
                        src="/images/case-studies/app-selection-before.png"
                        alt="Application selection screen before redesign"
                      />
                    </div>
                  </div>
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">After</span>
                    <div className="cs-ba-img">
                      <img
                        src="/images/case-studies/app-selection-after.png"
                        alt="Application selection screen after redesign"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The result was a meaningful reduction in time-on-screen for this
                step and a near-elimination of the wrong-form selection error
                that was appearing in internal testing.
              </p>
            </div>

            {/* 5.2 Questionnaire */}
            <div id="questionnaire">
              <h3>5.2 Questionnaire</h3>
              <p>
                The questionnaire was the heart of the product — the AI-powered
                interview gathering everything needed to complete the application.
                It also looked the most like a raw database dump. Questions appeared
                without context or grouping, progress was invisible, and the
                emotional weight of the answers being gathered wasn't acknowledged
                anywhere in the UI.
              </p>
              <p>
                I restructured the questionnaire into grouped sections with visible
                progress. Each section begins with a plain-language orientation of
                what's being collected and why — not a legal disclaimer, just
                enough context to make the next question feel reasonable. The AI's
                logic was already strong; the redesign made it legible.
              </p>

              <div className="cs-ba">
                <div className="cs-ba-grid">
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">Before</span>
                    <div className="cs-ba-img">
                      <img
                        src="/images/case-studies/questionnaire-before.png"
                        alt="Questionnaire screen before redesign"
                      />
                    </div>
                  </div>
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">After</span>
                    <div className="cs-ba-img">
                      <img
                        src="/images/case-studies/questionnaire-after.png"
                        alt="Questionnaire screen after redesign"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Question types were standardized into a component library — short
                text, long text, date, multiple choice, yes/no with context
                expansion — with distinct visual treatment for each state:
                unanswered, in progress, answered, flagged.
              </p>
            </div>

            {/* 5.3 Doc Checklist */}
            <div id="doc-checklist">
              <h3>5.3 Documentation Checklist</h3>
              <p>
                The document checklist told users what to upload but not why, not
                how, and not whether they were making progress. It was a list
                without a shape — no hierarchy, no grouping, no sense of what
                done looked like.
              </p>
              <p>
                The redesign grouped documents by category — identity, status,
                supporting evidence — and added a persistent progress indicator at
                the top of the section. Each document item was expanded to include
                a brief description of what it is, common sources for it, and an
                upload state that made it visually clear whether a document was
                pending, uploaded, or flagged for review.
              </p>

              <div className="cs-ba">
                <div className="cs-ba-grid">
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">Before</span>
                    <div className="cs-ba-img">
                      <img
                        src="/images/case-studies/doc-checklist-before.png"
                        alt="Documentation checklist before redesign"
                      />
                    </div>
                  </div>
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">After</span>
                    <div className="cs-ba-img">
                      <img
                        src="/images/case-studies/doc-checklist-after.png"
                        alt="Documentation checklist after redesign"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Particular attention went to the empty state — the first time a
                user sees the checklist should orient them, not overwhelm them.
                Seeing a long list of required documents with no context is one of
                the fastest paths to abandonment.
              </p>
            </div>

            {/* 5.4 Filing Fee */}
            <div id="filing-fee">
              <h3>5.4 Filing Fee</h3>
              <p>
                Fee collection is one of the highest-anxiety moments in any
                government filing flow. Users encountering an unexpected payment
                prompt on an immigration portal — with no explanation of where the
                money goes or what happens next — have every rational reason to
                stop and leave.
              </p>
              <p>
                The redesign separated the fee explanation from the payment action.
                Before asking for payment information, the screen walks through what
                the fee is, where it goes, and what happens upon receipt. The
                payment form itself follows a familiar, minimal structure — nothing
                novel, nothing surprising. The goal was to make the transaction feel
                like a known thing happening at an expected moment, not a toll gate.
              </p>

              <div className="cs-ba">
                <div className="cs-ba-grid">
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">Before</span>
                    <div className="cs-ba-img">
                      <img
                        src="/images/case-studies/filing-fee-before.png"
                        alt="Filing fee screen before redesign"
                      />
                    </div>
                  </div>
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">After</span>
                    <div className="cs-ba-img">
                      <img
                        src="/images/case-studies/filing-fee-after.png"
                        alt="Filing fee screen after redesign"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The filing fee screen showed the sharpest conversion improvement
                of any screen in the redesign — consistent with the principle
                that anxiety about payment is primarily anxiety about the unknown.
              </p>
            </div>

            {/* 5.5 Signature */}
            <div id="signature">
              <h3>5.5 Signature Page</h3>
              <p>
                The signature page was the final step before submission and carried
                the most legal weight. The original design treated it as a
                formality — a checkbox and a button. There was no review, no
                summary, no acknowledgment that what the user was about to do had
                real consequences.
              </p>
              <p>
                The redesign gave it the weight it deserved. The page begins with a
                structured review summary — key case details, the application type,
                and the submitting party — so users aren't signing something they
                haven't had a chance to verify. The signature itself is preceded by
                a plain-language statement of what signing means, written at an
                accessible reading level.
              </p>

              <div className="cs-ba">
                <div className="cs-ba-grid">
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">Before</span>
                    <div className="cs-ba-img">
                      <img
                        src="/images/case-studies/signature-before.png"
                        alt="Signature page before redesign"
                      />
                    </div>
                  </div>
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">After</span>
                    <div className="cs-ba-img">
                      <img
                        src="/images/case-studies/signature-after.png"
                        alt="Signature page after redesign"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Making the last step feel intentional rather than incidental was
                the point. The signature screen is where the user commits — the
                design should make that moment feel earned.
              </p>
            </div>
          </section>

          {/* 06 — Outcomes */}
          <section id="outcomes" className="cs-section" aria-labelledby="title-outcomes">
            <div className="cs-section-label">
              <span className="cs-section-num">06</span>
              <span>Outcomes</span>
            </div>
            <h2 id="title-outcomes" className="cs-section-title">
              The work shipped.
            </h2>
            <p>
              Consulta launched to initial users in September 2025. Feedback from
              that cohort confirmed what the research had pointed toward — the
              primary friction was never with the AI logic, it was with the
              experience around it. Users consistently described the redesigned
              product as clear and trustworthy. In software that touches immigration
              status, that's exactly the right signal.
            </p>
            <p>
              Completion rates for the questionnaire and document checklist —
              the two highest-dropout points in the original product — improved
              significantly. The filing fee screen, which had been a known
              conversion obstacle in internal testing, showed the sharpest
              single improvement. Getting the explanation in front of the
              payment request turned out to matter more than any other change
              on that screen.
            </p>
            <p>
              The component library I built during the redesign became the
              foundation for everything Consulta has shipped since. Design-to-
              development cycles on new screens are faster because the system
              exists. That compounding return on the systems work is probably
              the outcome I'm most satisfied with — it means the design investment
              doesn't stop at the features that were in scope.
            </p>
          </section>

          {/* 07 — Reflection */}
          <section id="reflection" className="cs-section" aria-labelledby="title-reflection">
            <div className="cs-section-label">
              <span className="cs-section-num">07</span>
              <span>Reflection</span>
            </div>
            <h2 id="title-reflection" className="cs-section-title">
              What I'd do differently.
            </h2>
            <p>
              The biggest gap in this project was usability testing with actual
              immigration applicants. We compensated with founder domain knowledge
              and accessibility heuristics, and the result was good — but I know
              there are assumptions in the information architecture that real user
              sessions would surface quickly. If there were a phase two, getting
              the product in front of five users with active immigration cases
              would be the first item on the agenda.
            </p>
            <p>
              I'd also push harder earlier on AI transparency. The product's
              underlying AI is doing sophisticated work — analyzing case details,
              flagging inconsistencies, adapting question sequences in real time —
              but almost none of that is visible to the user. There's a genuine
              trust opportunity in making the AI's reasoning legible without making
              it overwhelming. I got some of this done in the questionnaire
              redesign, but it deserved its own focused sprint.
            </p>
            <p>
              On process: working solo on a fast-moving engineering team taught me
              a lot about what modularity actually means in practice. The founders
              were making product decisions daily, and the design needed to be
              structured so individual screens could ship without waiting for the
              full system. That pushed me toward the component-library-first
              approach earlier than I might have otherwise — which was the right
              call. But it also meant some cross-screen consistency issues I would
              have caught sooner with a more typical review cadence.
            </p>
            <p>
              This is a product I'm proud of, and one I believe does something
              genuinely useful. Making immigration filings less terrifying for real
              people is not a small problem to work on.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
