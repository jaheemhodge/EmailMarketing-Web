# 004 — Respect prefers-reduced-motion

- **Status**: TODO
- **Commit**: 7438092
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 3 files edited

## Problem

`grep -rn "prefers-reduced-motion" src/` returns zero matches. Every
scroll-reveal (`src/components/reveal.tsx`), the hero's entrance
(`src/components/hero.tsx`), the mobile nav drawer slide
(`src/components/site-header.tsx:82`), and the smooth-scroll behavior
(`src/app/globals.css:28`) all move regardless of the OS "reduce motion"
setting, with no opt-out.

```tsx
// src/components/reveal.tsx:17-23 — current
<motion.div
  initial={{ opacity: 0, y }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  className={className}
>
```

```tsx
// src/components/hero.tsx:16-19 — current (one of 4 identical-shape blocks)
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className="..."
>
```

```css
/* src/app/globals.css:27-29 — current */
html {
  scroll-behavior: smooth;
}
```

## Target

Per the audit playbook, reduced motion means fewer and gentler animations,
**not zero** — keep opacity feedback, drop position changes.

JS-driven motion (`Reveal`, `Hero`): use Framer Motion's `useReducedMotion()`
to zero out the `y` offset while keeping the opacity fade:

```tsx
// src/components/reveal.tsx — target
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

CSS-driven motion (mobile drawer, smooth scroll, and anything else using
plain CSS transitions/animations): a single global kill-switch in
`src/app/globals.css`:

```css
/* src/app/globals.css — new rule, add at end of file */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This also neutralizes `html { scroll-behavior: smooth }` (globals.css:28)
automatically — no separate edit needed for that rule.

## Repo conventions to follow

`src/components/reveal.tsx` and `src/components/hero.tsx` both already
import from `"framer-motion"` — add `useReducedMotion` to those same
import lines rather than introducing a new import style or a wrapper
hook.

## Steps

1. In `src/components/reveal.tsx`:
   - Change `import { motion } from "framer-motion";` to `import { motion, useReducedMotion } from "framer-motion";`.
   - Inside the `Reveal` function, add `const reduceMotion = useReducedMotion();` as the first line of the function body (before the `return`).
   - Change `initial={{ opacity: 0, y }}` to `initial={{ opacity: 0, y: reduceMotion ? 0 : y }}`. Leave `whileInView={{ opacity: 1, y: 0 }}` unchanged — the target is always `y: 0`; only the starting offset changes.
2. In `src/components/hero.tsx`:
   - Change `import { motion } from "framer-motion";` (line 4) to `import { motion, useReducedMotion } from "framer-motion";`.
   - Inside the `Hero` function, add `const reduceMotion = useReducedMotion();` as the first line of the function body (before `return (` on line 7).
   - For each of the 4 `motion.*` elements (the badge at lines 16-24 with `y: 12`; the h1 at lines 26-34, the p at lines 36-45, and the div at lines 47-65, each with `y: 16`), change that element's `initial={{ opacity: 0, y: N }}` to `initial={{ opacity: 0, y: reduceMotion ? 0 : N }}`, keeping each element's own `N` (12 for the first, 16 for the other three) — do not swap values between elements.
3. In `src/app/globals.css`, add the `@media (prefers-reduced-motion: reduce)` block shown in Target as a new rule at the very end of the file (after the existing `.noise-overlay` rule).

## Boundaries

- Do NOT modify `src/components/lightbox-provider.tsx` in this plan, even if plan 002's `AnimatePresence`/`motion.div` entrance has already landed — covering that is explicitly out of scope here to keep this plan's diff small and reviewable; it can be a fast follow-up if needed.
- Do NOT change any `duration` or `delay` value — only the `y` initial-offset values and the new CSS block.
- Do NOT add a reduced-motion branch to the `hover:`/`active:` scale classes from plan 003 — those are small and non-positional, which the audit playbook explicitly says is fine to leave as-is ("keep transitions that aid comprehension").
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run lint && npm run build` succeed with no new errors.
- **Feel check**:
  - In Chrome DevTools, open the **Rendering** tab and set "Emulate CSS media feature prefers-reduced-motion" to **reduce**.
  - Reload `/`. Confirm the hero's badge, heading, paragraph, and CTA row still fade in (opacity 0→1) but no longer slide up.
  - Scroll down the page and confirm every `Reveal`-wrapped section (services grid, work preview, process steps, pricing tiers, CTA band) fades in without any vertical slide.
  - Resize to mobile width, open the hamburger menu, and confirm the drawer transition is now near-instantaneous (0.01ms) rather than a visible 300ms slide.
  - Switch the emulation back to "No preference" and confirm every animation returns to its normal (non-reduced) timing and movement.
- **Done when**: with reduced-motion emulated, no element visibly translates on scroll-into-view or page load, but opacity-only feedback remains everywhere it previously existed.
