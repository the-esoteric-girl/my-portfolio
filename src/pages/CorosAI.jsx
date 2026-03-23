import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../components/ui/Button";
import Label from "../components/ui/Label";
import Footer from "../components/Footer";
import "./CorosAI.css";

const TOC_ITEMS = [
  { id: "overview", num: "01", label: "Overview" },
  { id: "problem", num: "02", label: "The Problem" },
  { id: "discovery", num: "03", label: "Discovery" },
  {
    id: "process",
    num: "04",
    label: "Process",
    subs: [
      { id: "phase-1", num: "4.1", label: "Phase 1" },
      { id: "phase-2", num: "4.2", label: "Phase 2" },
      { id: "phase-3", num: "4.3", label: "Phase 3" },
      { id: "phase-4", num: "4.4", label: "Phase 4" },
      { id: "phase-5", num: "4.5", label: "Phase 5" },
    ],
  },
  { id: "outcomes", num: "05", label: "Outcomes" },
  { id: "reflection", num: "06", label: "Reflection" },
];

const SUB_PARENT = {
  "phase-1": "process",
  "phase-2": "process",
  "phase-3": "process",
  "phase-4": "process",
  "phase-5": "process",
};

const ALL_OBSERVE_IDS = [
  "overview",
  "problem",
  "discovery",
  "phase-1",
  "phase-2",
  "phase-3",
  "phase-4",
  "phase-5",
  "outcomes",
  "reflection",
];

export default function CorosAI() {
  const [activeId, setActiveId] = useState("overview");
  const [lightbox, setLightbox] = useState(null);
  const sidebarRef = useRef(null);
  const userScrollingTocRef = useRef(false);
  const userScrollTimeoutRef = useRef(null);

  /* ── Cleanup pending TOC scroll-pause timeout on unmount ─── */
  useEffect(() => {
    return () => clearTimeout(userScrollTimeoutRef.current);
  }, []);

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
  // Runs once on mount — observed elements are static; no dep needed
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
  // Runs once on mount — delegated click handler, no deps required
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest("a[href^='#']");
      if (!anchor) return;
      e.preventDefault();
      const id = anchor.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      const navEl = document.querySelector("nav");
      const navH = navEl ? navEl.getBoundingClientRect().height : 0;
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
  // Runs once on mount — setLightbox is a stable setState reference
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
            href="/work"
            className="cs-back"
          >
            ← Back to Work
          </Button>

          <div className="cs-hero-content">
            <Label variant="eyebrow">[ PRODUCT &amp; UI/UX REDESIGN ]</Label>
            <h1>COROS AI Platform Redesign</h1>
            <p className="cs-hero-desc">
              Leading the product and UI/UX redesign of an AI coaching platform
              — rebuilding the design system from the foundation up and closing
              the gap between design and engineering.
            </p>
            <div className="cs-hero-tags">
              <Label variant="pill">Product Design</Label>
              <Label variant="pill">UI/UX</Label>
              <Label variant="pill">Design Systems</Label>
              <Label variant="pill">Figma</Label>
              <Label variant="pill">shadcn</Label>
            </div>
          </div>

          <div className="cs-stats-bar">
            <div className="cs-stat">
              <label>Role</label>
              <span className="cs-stat-value">Product &amp; UX Designer</span>
            </div>
            <div className="cs-stat">
              <label>Timeline</label>
              <span className="cs-stat-value">Oct 2025 — Ongoing</span>
            </div>
            <div className="cs-stat">
              <label>Team</label>
              <span className="cs-stat-value">Design Lead + Eng</span>
            </div>
            <div className="cs-stat">
              <label>Status</label>
              <span className="cs-stat-value cs-stat-value--accent">
                In Progress
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
              More than a visual refresh — a system rebuilt from the ground up.
            </h2>
            <p>
              COROS AI is an AI coaching platform that helps high-performing
              professionals navigate the human side of work — building trust,
              managing high-stakes conversations, and developing interpersonal
              skills that AI can't replace. The platform needed a full UI/UX
              redesign to modernize the experience and address underlying design
              system inconsistencies that were undermining the product's
              credibility.
            </p>
            <p>
              I worked alongside a design lead as a product and UI/UX designer,
              contributing to the redesign of onboarding, chat, settings, and
              navigation, as well as the migration from MUI to a new component
              system built on shadcn.
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
              Inconsistent UI was undermining a product built around trust.
            </h2>
            <p>
              The existing COROS AI interface had two compounding problems. On
              the surface, the UI felt inconsistent and unpolished — color was
              used decoratively rather than functionally, meaning some elements
              appeared significant without actually being interactive. Users
              were also confused about whether their actions had registered,
              pointing to missing or unclear feedback states.
            </p>
            <p>
              Underneath the visual layer, the root cause was structural:
              although MUI had been implemented as a design system, engineers
              had been hardcoding style values rather than using the token
              system. This meant visual inconsistencies were baked into the
              codebase, not just the design files. A surface-level visual
              refresh alone wouldn't fix it.
            </p>
            <p>
              For a product built around trust and high-stakes professional
              conversations, an interface that felt unreliable or unpolished was
              especially damaging — credibility is core to what COROS AI
              promises its users.
            </p>
            <div className="cs-ba-direction">
              <span className="cs-ba-label">Dimensions — Onboarding</span>
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
                        src="/img/case-studies/coros-ai/dimensions-before.png"
                        alt="Dimensions section in onboarding before redesign"
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
                        src="/img/case-studies/coros-ai/dimensions-after.png"
                        alt="Dimensions section in onboarding after redesign"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs-ba-direction">
              <span className="cs-ba-label">Dimensions — Settings</span>
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
                        src="/img/case-studies/coros-ai/personalization-menu-before.png"
                        alt="Dimensions settings modal before redesign"
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
                        src="/img/case-studies/coros-ai/personalization-menu-after.png"
                        alt="Dimensions settings modal after redesign"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 03 — Discovery */}
          <section
            id="discovery"
            className="cs-section"
            aria-labelledby="title-discovery"
          >
            <div className="cs-section-label">
              <span className="cs-section-num">03</span>
              <span>Discovery</span>
            </div>
            <h2 id="title-discovery" className="cs-section-title">
              Three interconnected problems. None solvable in isolation.
            </h2>
            <p>
              Before jumping into redesign, I audited the existing product to
              map the scope of inconsistencies — reviewing color usage,
              component states, and interaction patterns across screens. I also
              synthesized existing user feedback shared by the team, which
              surfaced a recurring pain point: users were unsure whether their
              interactions had registered, particularly around selection states.
            </p>
            <p>
              The team also flagged that the existing design felt outdated and
              didn't reflect the COROS AI brand — the aesthetic wasn't
              communicating the credibility and sophistication the product
              needed to convey.
            </p>
            <p>
              Together these inputs pointed to three interconnected problems: a
              usability issue, a design system issue, and a brand alignment
              issue. Solving any one in isolation wouldn't be enough.
            </p>
          </section>

          {/* 04 — Process */}
          <section
            id="process"
            className="cs-section"
            aria-labelledby="title-process"
          >
            <div className="cs-section-label">
              <span className="cs-section-num">04</span>
              <span>Process</span>
            </div>
            <h2 id="title-process" className="cs-section-title">
              Five phases, from quick wins to full system migration.
            </h2>
            <p>
              The redesign unfolded in phases rather than a clean linear process
              — which reflected the reality of working on a live product with
              evolving priorities.
            </p>

            {/* 4.1 — Immediate Improvements */}
            <div id="phase-1">
              <h3>4.1 Immediate Improvements</h3>
              <p>
                We began by making targeted improvements to the existing design
                — tightening spacing, addressing the most glaring
                inconsistencies, and clarifying feedback states. This gave the
                team quick wins while we evaluated the scope of what a deeper
                redesign would require.
              </p>
            </div>

            {/* 4.2 — Brand Exploration */}
            <div id="phase-2">
              <h3>4.2 Brand Exploration</h3>
              <p>
                As it became clear that the product needed more than surface
                fixes, I prototyped and ideated on a fuller brand redesign
                direction. The explorations pushed toward a more premium
                aesthetic — stripping back decorative color usage, locking down
                a consistent spacing system, and elevating the overall visual
                language to better match the credibility COROS AI needed to
                convey.
              </p>
              <div className="cs-ba">
                <div className="cs-ba-direction">
                  <span className="cs-ba-label">Direction A</span>
                  <div
                    className="cs-ba-img"
                    role="button"
                    tabIndex={0}
                    aria-label="Click to enlarge"
                    onClick={openLightbox}
                    onKeyDown={openLightbox}
                  >
                    <img
                      src="/img/case-studies/coros-ai/brand-exploration-a-desktop.png"
                      alt="Brand exploration direction A — desktop"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="cs-ba-direction">
                  <span className="cs-ba-label">Direction B</span>
                  <div
                    className="cs-ba-img"
                    role="button"
                    tabIndex={0}
                    aria-label="Click to enlarge"
                    onClick={openLightbox}
                    onKeyDown={openLightbox}
                  >
                    <img
                      src="/img/case-studies/coros-ai/brand-exploration-b-mobile.png"
                      alt="Brand exploration direction B — mobile screens"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div
                    className="cs-ba-img"
                    role="button"
                    tabIndex={0}
                    aria-label="Click to enlarge"
                    onClick={openLightbox}
                    onKeyDown={openLightbox}
                  >
                    <img
                      src="/img/case-studies/coros-ai/brand-exploration-b-desktop-1.png"
                      alt="Brand exploration direction B — desktop view 1"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div
                    className="cs-ba-img"
                    role="button"
                    tabIndex={0}
                    aria-label="Click to enlarge"
                    onClick={openLightbox}
                    onKeyDown={openLightbox}
                  >
                    <img
                      src="/img/case-studies/coros-ai/brand-exploration-b-desktop-2.png"
                      alt="Brand exploration direction B — desktop view 2"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
              <p>
                Ultimately, the team decided to retain the existing brand colors
                and fonts — using these explorations to inform direction rather
                than overhaul the identity.
              </p>
            </div>

            {/* 4.3 — Design System Migration */}
            <div id="phase-3">
              <h3>4.3 Design System Migration</h3>
              <h4 className="cs-paragraph-heading">Why shadcn over MUI</h4>
              <p>
                The decision came down to two factors. First, the version of MUI
                in use was heavily pre-styled — engineers were constantly
                overriding default styles to match designs, which was the root
                cause of the hardcoding problem. Second, shadcn offered sensible
                defaults with more flexibility, making it easier for engineers
                to implement designs accurately without fighting the component
                system. The goal was a single source of truth that both
                designers and engineers could actually work from.
              </p>
            </div>

            {/* 4.4 — Redesign */}
            <div id="phase-4">
              <h3>4.4 Redesign</h3>
              <p>
                Working in Figma, I went directly to hi-fi design rather than
                wireframing — grounded in the constraints and patterns already
                established by the new design system. Key screens included
                settings pages and onboarding.
              </p>
              <p>
                One decision I'm particularly proud of: replacing the
                personality selector slider with a toggle. The original slider
                implied a spectrum, but the interaction is actually binary —
                users choose between Supportive or Provocative. A toggle
                accurately represents that mental model. Small change,
                meaningful reason.
              </p>
            </div>

            {/* 4.5 — Engineering Handoff */}
            <div id="phase-5">
              <h3>4.5 Engineering Handoff</h3>
              <p>
                Handoff was collaborative and ongoing — a mix of meetings and
                back-and-forth with the engineering team. A key part of my role
                was walking engineers through Figma Dev Mode so they could pull
                values directly from the design file rather than eyeballing or
                hardcoding. The goal was to make the design system the single
                source of truth for both teams.
              </p>
            </div>
          </section>

          {/* 05 — Outcomes */}
          <section
            id="outcomes"
            className="cs-section"
            aria-labelledby="title-outcomes"
          >
            <div className="cs-section-label">
              <span className="cs-section-num">05</span>
              <span>Outcomes</span>
            </div>
            <h2 id="title-outcomes" className="cs-section-title">
              A design system both teams can actually work from.
            </h2>
            <p>
              The redesign established a more consistent and credible visual
              foundation for COROS AI — clearer feedback states, a unified
              component system, and a design-to-engineering workflow that
              eliminated the hardcoding issues that had caused inconsistencies
              in the first place. The product now has a design system that both
              teams can actually work from.
            </p>
          </section>

          {/* 06 — Reflection */}
          <section
            id="reflection"
            className="cs-section"
            aria-labelledby="title-reflection"
          >
            <div className="cs-section-label">
              <span className="cs-section-num">06</span>
              <span>Reflection</span>
            </div>
            <h2 id="title-reflection" className="cs-section-title">
              Next time, define success before designing anything.
            </h2>
            <p>
              Looking back, the biggest thing I'd do differently is defining
              success metrics at the start of the project. Much of the redesign
              was driven by user feedback and team intuition — both valid inputs
              — but we didn't establish clear criteria for what a successful
              redesign would look like.
            </p>
            <p>
              Specific usability benchmarks, like task completion rates on key
              flows or user confidence ratings, would have given us a more
              rigorous way to evaluate decisions and demonstrate impact. That's
              something I'm actively working to incorporate as we continue the
              redesign and migration to shadcn — defining clearer success
              criteria so we can evaluate decisions with more rigor going
              forward.
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
          document.body,
        )}
    </main>
  );
}
