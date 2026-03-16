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
