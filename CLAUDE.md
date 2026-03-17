# Portfolio — Claude Code Rules

## Stack
- React + Vite
- Plain CSS (no Tailwind, no CSS-in-JS)
- Deploy target: Vercel

## Aesthetic
Brutalist / developer. Raw, typographically strong. No decorative softness.

## Typography
- **Headings:** Geist
- **Body:** Instrument Sans
- **Labels:** DM Mono, ALL CAPS

## Color
- **Never hardcode hex values.** Always use CSS custom properties from `src/styles/tokens.css`.
- All semantic colors come from `--color-*` tokens only.

## Shadows
Hard offset, zero blur only. No soft/blurred shadows.
```
--shadow-sm:  3px 3px 0px var(--color-ink)
--shadow-md:  5px 5px 0px var(--color-ink)
--shadow-lg:  8px 8px 0px var(--color-ink)
--shadow-accent-md: 5px 5px 0px var(--color-accent)
--shadow-accent-lg: 8px 8px 0px var(--color-accent)
```

### Interactive shadow pattern
- **Hover:** shadow grows one step + `transform: translate(-2px, -2px)`
- **Active/press:** shadow collapses + `transform: translate(3px, 3px)`

## Border Radius
Sharp corners only. No softness.
```
--radius-none: 0px
--radius-sm:   2px
--radius-md:   4px
--radius-full: 9999px   ← pills only
```
Never use radius above 4px except for pill/badge components.

## Borders
2px solid minimum for all primary borders.

## Button System

Five button types. Never invent variations outside these.

### Primary
- Use: Main CTA, one per view maximum
- Style: background var(--color-accent), color var(--color-text-inverse),
  border: var(--border), box-shadow: var(--shadow-md)
- Hover: box-shadow var(--shadow-lg), transform: translate(-2px, -2px)
- Active: box-shadow: var(--shadow-pressed), transform: translate(3px, 3px)

### Secondary
- Use: Supporting actions alongside a primary
- Style: background transparent, color var(--color-text-primary),
  border: var(--border), box-shadow: var(--shadow-md)
- Same hover/active pattern as primary

### Ghost
- Use: Card-level actions only, never in hero or nav
- Style: background transparent, color var(--color-secondary),
  border: 2px solid var(--color-secondary),
  box-shadow: var(--shadow-md) but using var(--color-secondary) not ink
- Hover: shadow grows, translate(-2px, -2px)

### Icon
- Use: Compact single actions (links, close, arrow)
- Style: 40x40px square, transparent background, border: var(--border),
  box-shadow: var(--shadow-sm)
- Hover: var(--shadow-md), translate(-2px, -2px)

### Destructive
- Use: Irreversible actions only (delete, remove)
- Style: background #b91c1c, color var(--color-text-inverse), border: var(--border)

### Disabled
- Use: Unavailable state on any button type
- Style: background var(--color-surface), color var(--color-text-muted),
  border: 1px solid var(--color-border), no box-shadow, cursor: not-allowed

### Sizes
- SM: font-size var(--text-xs), padding 7px 14px, shadow-sm
- MD: font-size var(--text-sm), padding 10px 20px, shadow-md (default)
- LG: font-size var(--text-sm), padding 14px 28px, shadow-md

### All buttons
- Font: var(--font-mono), var(--weight-medium), var(--tracking-wider), uppercase
- Border radius: 0 always
- Transition: box-shadow var(--duration-fast), transform var(--duration-fast)
- prefers-reduced-motion: no transform, no transition

## Breakpoints (mobile-first)
```
480px   (xs)
768px   (sm/tablet)
1024px  (md/desktop)
1280px  (lg/wide)
```

## Naming Conventions
- CSS class names: `kebab-case`
- React components: `PascalCase`
- One component per file

## Accessibility
- WCAG AA minimum contrast
- Always `:focus-visible` with accent color outline (never remove outline)
- Semantic HTML elements throughout
- `prefers-reduced-motion` on all animations and transitions

## Never Use
- Tailwind
- Soft/blurred shadows (no `box-shadow` with blur > 0)
- `border-radius` above 4px except pills
- Inter, Roboto, or system-ui as primary fonts
- `!important`
- Lorem ipsum placeholder text

## Commit Format
```
feat:   new feature
fix:    bug fix
style:  visual/CSS only change
chore:  tooling, deps, config
```
