# Portfolio — Claude Code Rules

## Stack

React + Vite, plain CSS, deploy on Vercel.
No Tailwind. No CSS-in-JS. No utility frameworks.

## Aesthetic

Brutalist / developer. Raw, typographically strong.
No decorative softness. Everything shown must mean something.

## Design system

All values (colors, spacing, shadows, typography, z-index,
breakpoints) live in src/styles/tokens.css.
Read that file first. Never hardcode any value that has a token.

## Typography rules

- Headings: var(--font-heading) — Geist, always var(--tracking-tight)
- Body: var(--font-body) — Instrument Sans
- Labels/tags/metadata: var(--font-mono) — DM Mono,
  always uppercase, always var(--tracking-wider)

## Color rules

- Never hardcode hex values — always use --color-\* semantic tokens
- --color-accent = primary actions, CTAs, links, focus rings
- --color-secondary = captions, metadata, tags, secondary labels (lavender)
- --color-status = available/live indicators only (green)
- --color-ink = shadows and primary borders

## Shadow rules

- Hard offset only — zero blur, zero spread, always
- Use --shadow-sm / --shadow-md / --shadow-lg from tokens
- Interactive pattern: hover → shadow grows one step + translate(-2px,-2px)
- Active/press → --shadow-pressed + translate(3px,3px)
- prefers-reduced-motion: no transform, no transition

## Border rules

- Primary borders: var(--border) — 2px solid var(--color-ink)
- Dividers and subtle edges: var(--border-subtle)
- Never use border-radius above --radius-md (4px) except pills (--radius-full)

## Button rules

Never write custom button styles in component CSS.
Always use src/components/ui/Button.jsx.
Props: variant (primary|secondary|ghost|icon|destructive),
size (sm|md|lg), as (button|a), href, disabled.
Full styles in src/components/ui/Button.css.

## Label rules

Never write custom label/tag/pill styles in component CSS.
Always use src/components/ui/Label.jsx.

Props: variant (eyebrow|meta|pill|pill-accent|status|accent|counter|footer|nav),
as (any HTML element).

Usage examples:
- `<Label variant="eyebrow">[ UX / UI Designer ]</Label>`
- `<Label variant="pill">Figma</Label>`
- `<Label variant="pill-accent">UX/UI</Label>`
- `<Label variant="status">Available for work</Label>`
- `<Label variant="accent">[ Outcomes ]</Label>`
- `<Label variant="counter">[ 01 Case Studies ]</Label>`

## Component rules

- One component per file
- CSS co-located: ComponentName.jsx + ComponentName.css
- Reusable primitives live in src/components/ui/
- Page sections live in src/components/

## Naming

- CSS classes: kebab-case
- Components: PascalCase
- Variables: camelCase
- Constants: SCREAMING_SNAKE_CASE

## Accessibility — non-negotiable

- WCAG AA contrast minimum on all text
- :focus-visible always present, never removed
- Semantic HTML — header, nav, main, section, article, footer
- All sections have aria-label or a visible heading
- All images have alt text
- prefers-reduced-motion respected on every animation

## Never

- Hardcode colors, spacing, or shadow values
- Use soft/blurred box-shadows
- Use border-radius above 4px except pills
- Use !important
- Use Lorem ipsum — ask for real content instead
- Write button styles outside Button.css

## Commits

feat: / fix: / style: / chore:
Commit after every completed component or meaningful change.
