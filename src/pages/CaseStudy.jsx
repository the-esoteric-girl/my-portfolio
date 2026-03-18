import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../components/ui/Button";
import Label from "../components/ui/Label";
import Footer from "../components/Footer";
import "./CaseStudy.css";

const TOC_ITEMS = [
  { id: "overview", num: "01", label: "Overview" },
  { id: "problem", num: "02", label: "The Problem" },
  { id: "research", num: "03", label: "Research" },
  { id: "principles", num: "04", label: "Principles" },
  {
    id: "redesign",
    num: "05",
    label: "Redesign",
    subs: [
      { id: "app-selection", num: "5.1", label: "App Selection" },
      { id: "questionnaire", num: "5.2", label: "Questionnaire" },
      { id: "doc-checklist", num: "5.3", label: "Doc Checklist" },
      { id: "filing-fee", num: "5.4", label: "Filing Fee" },
      { id: "signature", num: "5.5", label: "Signature" },
    ],
  },
  { id: "outcomes", num: "06", label: "Outcomes" },
  { id: "reflection", num: "07", label: "Reflection" },
];

const SUB_PARENT = {
  "app-selection": "redesign",
  questionnaire: "redesign",
  "doc-checklist": "redesign",
  "filing-fee": "redesign",
  signature: "redesign",
};

const ALL_OBSERVE_IDS = [
  "overview",
  "problem",
  "research",
  "principles",
  "app-selection",
  "questionnaire",
  "doc-checklist",
  "filing-fee",
  "signature",
  "outcomes",
  "reflection",
];

export default function CaseStudy() {
  const [activeId, setActiveId] = useState("overview");
  const [lightbox, setLightbox] = useState(null);
  const sidebarRef = useRef(null);
  const userScrollingTocRef = useRef(false);
  const userScrollTimeoutRef = useRef(null);

  /* ── Auto-scroll sidebar to keep active item visible ─────── */
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar || userScrollingTocRef.current) return;
    const activeEl = sidebar.querySelector(".cs-toc-item.active");
    if (!activeEl) return;
    const targetLeft =
      activeEl.offsetLeft - sidebar.offsetWidth / 2 + activeEl.offsetWidth / 2;
    sidebar.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, [activeId]);

  /* ── Pause auto-scroll while user is manually scrolling TOC ─ */
  const handleTocPointerDown = () => {
    userScrollingTocRef.current = true;
    clearTimeout(userScrollTimeoutRef.current);
    userScrollTimeoutRef.current = setTimeout(() => {
      userScrollingTocRef.current = false;
    }, 2000);
  };

  /* ── IntersectionObserver — active TOC item ──────────────── */
  useEffect(() => {
    const els = ALL_OBSERVE_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
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
      const navH =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--nav-height",
          ),
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

  /* ── Lightbox: close on Escape ───────────────────────────── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  /* ── Lightbox: lock body scroll ──────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const isActive = (id) => activeId === id || SUB_PARENT[activeId] === id;

  const openLightbox = (e) => {
    if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
    if (e.type === "keydown") e.preventDefault();
    const img = e.currentTarget.querySelector("img");
    if (img) setLightbox(img.src);
  };

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
            <Label variant="eyebrow">[ UI/UX REDESIGN ]</Label>
            <h1>Consulta Immigration Portal Redesign</h1>
            <p className="cs-hero-desc">
              Full-cycle redesign of an AI-powered immigration platform. Real
              users, real stakes — immigrants navigating the US immigration
              process.
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
              <span className="cs-stat-value cs-stat-value--accent">
                Shipped
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="cs-body">
        {/* Sidebar TOC */}
        <aside
          className="cs-sidebar"
          aria-label="Table of contents"
          ref={sidebarRef}
          onPointerDown={handleTocPointerDown}
        >
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
          <section
            id="overview"
            className="cs-section"
            aria-labelledby="title-overview"
          >
            <div className="cs-section-label">
              <span className="cs-section-num">01</span>
              <span>Overview</span>
            </div>
            <h2 id="title-overview" className="cs-section-title">
              A portal that needed to work as hard as the people using it.
            </h2>
            <p>
              For immigrants navigating the US legal system, confusion isn't
              just frustrating — it has real consequences. Consulta's portal was
              creating that confusion at every step, and attorneys were paying
              for it in support queues instead of legal work.
            </p>
            <p>
              Consulta Immigration is an AI-powered legal tech startup helping
              immigrants navigate the US immigration process. When I joined as
              the sole designer, their client portal was functional but broken —
              users were confused, support queues were overloaded, and the
              product didn't reflect the quality of the legal work happening
              behind it.
            </p>
            <p>
              Over seven months I led the full redesign of the portal — from the
              first screen a user sees to the final signature page. The goal
              wasn't just making it look better. It was making it work better
              for people in one of the most stressful situations of their lives.
            </p>
            <h4 className="cs-paragraph-heading">Outcomes</h4>
            <p>
              Support questions dropped significantly after launch. Attorneys
              had more time for actual legal work — instead of fielding
              preventable questions, they could focus on the cases in front of
              them. Users made fewer mistakes too: less premature submissions,
              less forgotten steps, less confusion about what came next.
            </p>
          </section>

          {/* 02 — The Problem */}
          <section
            id="problem"
            className="cs-section"
            aria-labelledby="title-problem"
          >
            <div className="cs-section-label">
              <span className="cs-section-num">02</span>
              <span>The Problem</span>
            </div>
            <h2 id="title-problem" className="cs-section-title">
              Functional but broken.
            </h2>
            <p>
              The original portal had fundamental issues that compounded across
              every screen.
            </p>
            <p>
              Users weren't confused because the immigration process is complex
              — they were confused because the product wasn't helping them
              navigate that complexity. Instructions existed but weren't
              legible. Steps were present but not sequenced. Actions were
              available but not prioritized. The interface assumed users would
              figure it out.
            </p>
            <h4 className="cs-paragraph-heading">Confusing Visual Hierarchy</h4>
            <p>
              Visual hierarchy was effectively nonexistent. Every element
              competed equally for attention — headings, body text, CTAs,
              warnings, optional fields. Nothing was clearly more important than
              anything else, which meant nothing got noticed when it needed to
              be.
            </p>
            <h4 className="cs-paragraph-heading">Lack of Accessibility</h4>
            <p>
              Accessibility had clearly never been a consideration. Font sizes
              were too small, contrast ratios failed basic WCAG standards, and
              interactive elements were ambiguous. For users already navigating
              a high-stakes, stressful process, these weren't minor
              inconveniences — they were barriers.
            </p>
            <h4 className="cs-paragraph-heading">
              No Consistent Visual Language
            </h4>
            <p>
              The inconsistency made it worse. Buttons looked different across
              screens. Spacing was arbitrary. Patterns that appeared one way on
              one page appeared differently on the next. There was no visual
              language, no system — just a collection of screens that happened
              to be part of the same product.
            </p>
            <p>
              The result was a support queue full of preventable questions.
              Attorneys were spending time on confusion that good design should
              have resolved. The redesign wasn't about aesthetics. It was about
              making the product do its actual job.
            </p>
          </section>

          {/* 03 — Research */}
          <section
            id="research"
            className="cs-section"
            aria-labelledby="title-research"
          >
            <div className="cs-section-label">
              <span className="cs-section-num">03</span>
              <span>Research</span>
            </div>
            <h2 id="title-research" className="cs-section-title">
              Start with what's known.
            </h2>
            <p>
              I didn't have direct access to users. What I had was the next best
              thing — cofounders who had been fielding support questions since
              day one and knew exactly where people were getting stuck.
            </p>
            <p>
              I started with a heuristic evaluation and full UI/UX audit of the
              existing portal — a structured assessment against established
              usability principles. It surfaced measurable failures: contrast
              ratios below WCAG standards, font sizes too small for comfortable
              reading, no consistent visual language across screens. The
              cofounder feedback confirmed the same patterns. The complaints
              clustered around the same moments in the flow, the same types of
              confusion. That consistency told me the problems were structural,
              not incidental.
            </p>
            <p>
              I also looked at how comparable platforms handled the same
              challenges. Boundless showed a clear pattern: progressive
              disclosure to manage complexity, explicit step indicators to
              reduce orientation anxiety, unambiguous calls to action at every
              decision point. None of those things existed in Consulta's portal.
            </p>
            <p>
              From that research I defined three design principles that would
              guide every decision in the redesign — information hierarchy and
              progressive disclosure, clear step indicators, and stronger visual
              clarity on actions and requirements.
            </p>
          </section>

          {/* 04 — Principles */}
          <section
            id="principles"
            className="cs-section"
            aria-labelledby="title-principles"
          >
            <div className="cs-section-label">
              <span className="cs-section-num">04</span>
              <span>Principles</span>
            </div>
            <h2 id="title-principles" className="cs-section-title">
              Three principles, every decision.
            </h2>
            <p>
              Before wireframing anything, I wrote three design principles for
              the redesign.
            </p>

            <div className="cs-principle">
              <strong>Progressive disclosure over information dumping.</strong>
              <p>
                Users were drowning in information presented all at once. I
                restructured every screen to show only what was relevant at that
                moment in the process — revealing complexity gradually as users
                moved forward, not front-loading it at the start.
              </p>
            </div>

            <div className="cs-principle">
              <strong>Orientation before action.</strong>
              <p>
                Users needed to know where they were before they could
                confidently do anything. I introduced consistent page titles,
                clear step indicators, and visible progress across every screen
                in the flow. The question "what do I do next?" should never need
                to be asked.
              </p>
            </div>

            <div className="cs-principle">
              <strong>Visual urgency for real urgency.</strong>
              <p>
                Not everything in an immigration application is equally
                important — some things are required, some are time-sensitive,
                some carry legal consequences if missed. The redesign introduced
                a consistent visual language for priority: required fields,
                flagged documents, and critical notices all looked and behaved
                differently from optional ones.
              </p>
            </div>
          </section>

          {/* 05 — Redesign */}
          <section
            id="redesign"
            className="cs-section"
            aria-labelledby="title-redesign"
          >
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
                The first screen a user sees after logging in. It should have
                been simple — pick your application type and move forward.
                Instead, the AI chatbot dominated the page visually, pulling
                attention away from the actual decision point. Users thought
                they had to use the chatbot to select their application type.
                They were typing their situation into a chat window trying to
                proceed, when the answer was a single click.
              </p>
              <p>
                I restructured the page around a single clear question: What
                kind of application are you filing? Application type cards
                became the primary element — larger, icon-led, impossible to
                miss. The chatbot moved to a persistent but unobtrusive position
                in the corner. A tab system between Family and Business
                applications added useful structure without adding visual noise.
              </p>

              <div className="cs-ba">
                <div className="cs-ba-grid">
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">Before</span>
                    <div
                      className="cs-ba-img"
                      role="button"
                      tabIndex={0}
                      aria-label="Click to enlarge"
                      onClick={openLightbox}
                      onKeyDown={openLightbox}
                    >
                      <img
                        src="/img/case-studies/app-selection-web-before.png"
                        alt="Application selection screen before redesign"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">After</span>
                    <div
                      className="cs-ba-img"
                      role="button"
                      tabIndex={0}
                      aria-label="Click to enlarge"
                      onClick={openLightbox}
                      onKeyDown={openLightbox}
                    >
                      <img
                        src="/img/case-studies/app-selection-web.png"
                        alt="Application selection screen after redesign"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p>
                After the redesign, users stopped routing through the chatbot
                and clicked directly into the questionnaire. A navigation
                problem that looked like user error turned out to be a design
                failure — and the fix proved it.
              </p>
            </div>

            {/* 5.2 Questionnaire */}
            <div id="questionnaire">
              <h3>5.2 Questionnaire</h3>
              <p>
                The questionnaire was the longest part of the application flow —
                multiple sections, dozens of fields, high stakes for every
                answer. The original design made it harder than it needed to be.
                Font sizes were too small, contrast failed accessibility
                standards, and the dense layout gave users no visual breathing
                room between questions.
              </p>
              <p>
                Navigation made it worse — back and next arrows were positioned
                at the top of the page, meaning users had to scroll back up
                after completing a section just to move forward. There was no
                page title, no context for where you were in the application,
                and no clear way back to the dashboard if you needed to stop.
              </p>
              <p>
                The redesign addressed all of it systematically. Body text
                increased to 18px minimum. Generous vertical spacing between
                fields created clear visual groups. The progress bar became a
                clean horizontal tab system showing named sections — Name, About
                You, Residence — so users always had orientation. Navigation
                moved to the bottom, following the natural completion flow. A
                back to dashboard button appeared top-left on every screen.
              </p>

              <div className="cs-ba">
                <div className="cs-ba-grid">
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">Before</span>
                    <div
                      className="cs-ba-img"
                      role="button"
                      tabIndex={0}
                      aria-label="Click to enlarge"
                      onClick={openLightbox}
                      onKeyDown={openLightbox}
                    >
                      <img
                        src="/img/case-studies/questionnaire-web-before.png"
                        alt="Questionnaire screen before redesign"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">After</span>
                    <div
                      className="cs-ba-img"
                      role="button"
                      tabIndex={0}
                      aria-label="Click to enlarge"
                      onClick={openLightbox}
                      onKeyDown={openLightbox}
                    >
                      <img
                        src="/img/case-studies/questionnaire-web.png"
                        alt="Questionnaire screen after redesign"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Drop-off through the questionnaire decreased and support
                questions fell. Giving users orientation, breathing room, and
                navigation that followed their natural flow made a long,
                high-stakes form feel completable.
              </p>
            </div>

            {/* 5.3 Doc Checklist */}
            <div id="doc-checklist">
              <h3>5.3 Documentation Checklist</h3>
              <p>
                The documentation checklist was where applications most
                frequently stalled. Users had to gather and upload a specific
                set of documents, some required, some conditional, some that
                could be flagged for attorney review. The original design
                treated all of them the same — identical visual weight,
                identical layout, no way to quickly see what needed attention
                versus what was optional.
              </p>
              <p>
                The redesign introduced a clear visual hierarchy for document
                status. Required documents were labeled explicitly. Flagged
                items — documents that needed attorney attention — got a
                distinct visual treatment that made them immediately scannable
                in a long list. Uploaded files showed confirmation. The submit
                button moved to the bottom, only reachable after working through
                the list, preventing premature submissions.
              </p>

              <div className="cs-ba">
                <div className="cs-ba-grid">
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">Before</span>
                    <div
                      className="cs-ba-img"
                      role="button"
                      tabIndex={0}
                      aria-label="Click to enlarge"
                      onClick={openLightbox}
                      onKeyDown={openLightbox}
                    >
                      <img
                        src="/img/case-studies/checklist-web-before.png"
                        alt="Documentation checklist before redesign"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">After</span>
                    <div
                      className="cs-ba-img"
                      role="button"
                      tabIndex={0}
                      aria-label="Click to enlarge"
                      onClick={openLightbox}
                      onKeyDown={openLightbox}
                    >
                      <img
                        src="/img/case-studies/checklist-web.png"
                        alt="Documentation checklist after redesign"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Stalled applications and support questions both dropped. Users
                had been uploading documents and waiting for review instead of
                submitting — not because they weren't paying attention, but
                because the design never made the intended flow clear. Once it
                did, they followed it.
              </p>
            </div>

            {/* 5.4 Filing Fee */}
            <div id="filing-fee">
              <h3>5.4 Filing Fee</h3>
              <p>
                Payment pages carry a specific kind of user anxiety — especially
                when the amounts involved are significant. USCIS filing fees for
                immigration applications can run into the hundreds of dollars,
                and users needed to understand exactly what they were paying and
                why before entering card details.
              </p>
              <p>
                The original page buried the cost breakdown alongside the
                payment form, mixing "here's what you owe" with "here's how to
                pay" in a way that felt rushed and untrustworthy. Additional
                fees for card payments appeared as an afterthought. The payment
                method options lacked clear explanations of their differences.
              </p>
              <p>
                The redesign separated the page into two distinct sections —
                Cost Breakdown first, Payment second. Users could see the full
                fee breakdown, understand what each line item was, and opt into
                express shipping before touching the payment form. Each payment
                method came with a clear explanation of additional fees and
                processing times. The primary action — Pay Now — appeared only
                after all the information needed to make that decision
                confidently.
              </p>

              <div className="cs-ba">
                <div className="cs-ba-grid">
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">Before</span>
                    <div
                      className="cs-ba-img"
                      role="button"
                      tabIndex={0}
                      aria-label="Click to enlarge"
                      onClick={openLightbox}
                      onKeyDown={openLightbox}
                    >
                      <img
                        src="/img/case-studies/fee-web-before.png"
                        alt="Filing fee screen before redesign"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">After</span>
                    <div
                      className="cs-ba-img"
                      role="button"
                      tabIndex={0}
                      aria-label="Click to enlarge"
                      onClick={openLightbox}
                      onKeyDown={openLightbox}
                    >
                      <img
                        src="/img/case-studies/fee-web-after.png"
                        alt="Filing fee screen after redesign"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Fewer users reached out with questions about fees or payment
                options.
              </p>
            </div>

            {/* 5.5 Signature */}
            <div id="signature">
              <h3>5.5 Signature Page</h3>
              <p>
                The signature page was the last step before submitting an
                application — a moment that should have felt like a clear finish
                line. Instead the original design opened with a raw PDF viewer
                taking up most of the screen, a submit button prominently placed
                at the top before users had completed the required signing
                steps, and signature requirements buried in small text below.
              </p>
              <p>
                Users were missing critical signing instructions not because
                they weren't paying attention — they were. The design just
                wasn't directing that attention in the right order. Incomplete
                submissions were generating support tickets that shouldn't have
                existed.
              </p>
              <p>
                The redesign established a clear top-to-bottom flow: review the
                PDF, understand the signature requirements, upload signed forms,
                then submit. The submit button moved to the bottom — only
                reachable after completing the steps above it. Signature
                requirements for each party — Petitioner and Beneficiary — were
                broken out into distinct, clearly labeled cards with explicit
                instructions and upload actions.
              </p>

              <div className="cs-ba">
                <div className="cs-ba-grid">
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">Before</span>
                    <div
                      className="cs-ba-img"
                      role="button"
                      tabIndex={0}
                      aria-label="Click to enlarge"
                      onClick={openLightbox}
                      onKeyDown={openLightbox}
                    >
                      <img
                        src="/img/case-studies/signature-web-before.png"
                        alt="Signature page before redesign"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="cs-ba-col">
                    <span className="cs-ba-label">After</span>
                    <div
                      className="cs-ba-img"
                      role="button"
                      tabIndex={0}
                      aria-label="Click to enlarge"
                      onClick={openLightbox}
                      onKeyDown={openLightbox}
                    >
                      <img
                        src="/img/case-studies/signature-web-after.png"
                        alt="Signature page after redesign"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Support tickets about signing decreased. Users were failing
                because the design was sending them in the wrong order. Fixing
                the sequence fixed the problem.
              </p>
            </div>
          </section>

          {/* 06 — Outcomes */}
          <section
            id="outcomes"
            className="cs-section"
            aria-labelledby="title-outcomes"
          >
            <div className="cs-section-label">
              <span className="cs-section-num">06</span>
              <span>Outcomes</span>
            </div>
            <h2 id="title-outcomes" className="cs-section-title">
              The work shipped.
            </h2>
            <p>
              The redesigned portal shipped to real users. The cofounders
              confirmed the new design felt authentically Consulta — modern,
              approachable, and genuinely useful. Support questions dropped
              noticeably. Users reported finding the experience significantly
              less confusing.
            </p>
            <p>
              It's worth being honest about the context: the company closed
              seven months after I joined. But the product worked while it ran,
              and the design work contributed to that. For users navigating one
              of the most bureaucratically complex processes in American life,
              that mattered.
            </p>
          </section>

          {/* 07 — Reflection */}
          <section
            id="reflection"
            className="cs-section"
            aria-labelledby="title-reflection"
          >
            <div className="cs-section-label">
              <span className="cs-section-num">07</span>
              <span>Reflection</span>
            </div>
            <h2 id="title-reflection" className="cs-section-title">
              What I learned.
            </h2>
            <h4 className="cs-paragraph-heading">
              Prioritize usability testing and user feedback.
            </h4>
            <p>
              The hardest part was designing without a feedback loop or
              usability testing. No design team means no design critique, no one
              to pressure-test your decisions. I relied heavily on founder
              feedback, but that's not the same as talking to users. I should
              have pushed harder for direct access to user feedback — even a
              single conversation with someone navigating the platform would
              have been worth more than a week of assumptions.
            </p>
            <h4 className="cs-paragraph-heading">
              Working solo on a fast-moving team pushed me toward a
              component-library-first approach — which had real tradeoffs.
            </h4>
            <p>
              The pace of a startup means you're always making tradeoffs.
              Working solo on a fast-moving engineering team taught me a lot
              about what modularity actually means in practice. The founders
              were making product decisions daily, and the design needed to be
              structured so individual screens could ship without waiting for
              the full system. That pushed me toward the component-library-first
              approach earlier than I might have otherwise — which meant some
              cross-screen consistency issues I would have caught sooner with a
              more typical review cadence.
            </p>
            <h4 className="cs-paragraph-heading">
              Learning to speak engineer made me a better designer.
            </h4>
            <p>
              Working directly with engineers was one of the best parts of this
              role. Learning to translate design decisions into implementation
              terms is a skill I use every day now.
            </p>
          </section>
        </div>
      </div>
      <Footer />

      {lightbox !== null &&
        createPortal(
          <div
            className="cs-lightbox"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <img
              src={lightbox}
              alt="Enlarged case study screenshot"
              className="cs-lightbox-img"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="cs-lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </div>,
          document.body
        )}
    </main>
  );
}
