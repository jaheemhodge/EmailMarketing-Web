# 002 — Give the lightbox an enter/exit animation

- **Status**: TODO
- **Commit**: 7438092
- **Severity**: HIGH
- **Category**: Physicality & origin / Missed opportunity
- **Estimated scope**: 1 file edited

## Problem

`src/components/lightbox-provider.tsx` renders the entire modal with a bare
conditional and has no Framer Motion usage anywhere in the file (it has no
`motion`/`AnimatePresence` import at all):

```tsx
// src/components/lightbox-provider.tsx:48-54 — current
return (
  <LightboxContext.Provider value={setItem}>
    {children}
    {item ? <LightboxModal item={item} onClose={close} /> : null}
  </LightboxContext.Provider>
);
```

```tsx
// src/components/lightbox-provider.tsx:113-120 — current (backdrop, no motion)
return (
  <div
    role="dialog"
    aria-modal="true"
    aria-label={item.title}
    onClick={onClose}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm sm:p-8"
  >
```

```tsx
// src/components/lightbox-provider.tsx:130-135 — current (panel, no motion)
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[88vh] w-full flex-col overflow-hidden rounded-2xl bg-surface shadow-2xl ${
          hasAnalysis ? "max-w-3xl sm:flex-row" : "max-w-md"
        }`}
      >
```

This is the single most-used interactive surface on the site — every email
card on the homepage, `/work`, every case-study page, `/audits`, and the
Concept Work section opens through this modal — and it teleports in and out
with zero transition.

## Target

Wrap the conditional in `AnimatePresence` so the exit animation plays before
unmount, and animate both the backdrop and the panel:

```tsx
// target: imports (top of file, after existing lucide-react import)
import { AnimatePresence, motion } from "framer-motion";
```

```tsx
// target: the provider's return block
return (
  <LightboxContext.Provider value={setItem}>
    {children}
    <AnimatePresence>
      {item ? <LightboxModal key={item.title} item={item} onClose={close} /> : null}
    </AnimatePresence>
  </LightboxContext.Provider>
);
```

```tsx
// target: backdrop — same props as current, tag changed to motion.div, 4 new props added
<motion.div
  role="dialog"
  aria-modal="true"
  aria-label={item.title}
  onClick={onClose}
  className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm sm:p-8"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
>
```

```tsx
// target: panel — same props as current, tag changed to motion.div, 4 new props added
<motion.div
  onClick={(e) => e.stopPropagation()}
  className={`relative flex max-h-[88vh] w-full flex-col overflow-hidden rounded-2xl bg-surface shadow-2xl ${
    hasAnalysis ? "max-w-3xl sm:flex-row" : "max-w-md"
  }`}
  initial={{ opacity: 0, scale: 0.96 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.96 }}
  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
>
```

Per the audit playbook: never `scale(0)` — `0.96` is within the `0.9–0.97`
target range. This is a centered modal, so the default `transform-origin`
(center) is correct; do not add a custom `transform-origin`.

If plan 001 has already landed, use the imported `EASE_OUT` constant from
`@/lib/motion` instead of the inline array `[0.22, 1, 0.36, 1]` in both
`transition` props above — check whether `src/lib/motion.ts` exists before
choosing which form to write.

## Repo conventions to follow

`src/components/hero.tsx:16-19` already uses this exact prop shape on a
`motion.div` — inline `initial`/`animate`/`transition`, no `variants`
object:

```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className="..."
>
```

Match that style — do not introduce a `variants` prop pattern.

## Steps

1. In `src/components/lightbox-provider.tsx`, add a new import line directly after the existing `import { Lightbulb, X, ZoomIn, ZoomOut } from "lucide-react";` (line 3): `import { AnimatePresence, motion } from "framer-motion";`.
2. Replace line 51, `{item ? <LightboxModal item={item} onClose={close} /> : null}`, with the `AnimatePresence`-wrapped version shown in Target above (note the added `key={item.title}` on `LightboxModal` — this makes each newly-opened item a fresh mount instead of a cross-fade between two different emails).
3. Change the backdrop element (currently starting `<div role="dialog" ...` at line 114 and closing `</div>` at line 174) to `<motion.div ...>` / `</motion.div>`, adding the 4 new props (`initial`, `animate`, `exit`, `transition`) shown in Target. Keep every existing prop (`role`, `aria-modal`, `aria-label`, `onClick`, `className`) exactly as-is.
4. Change the panel element (currently starting `<div onClick={(e) => e.stopPropagation()} ...` at line 130 and closing `</div>` at line 172) to `<motion.div ...>` / `</motion.div>`, adding the 4 new props shown in Target. Keep the existing `onClick` and the template-literal `className` exactly as-is.

## Boundaries

- Do NOT change the close button, the image pane (`imagePane`, lines 60-111), the zoom logic, or the analysis-panel content.
- Do NOT add a `variants` object — use inline props to match the repo's existing style.
- Do NOT set `mode="wait"` on `AnimatePresence` — only one modal instance is ever rendered, so the default mode is correct.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run lint && npm run build` succeed with no new errors.
- **Feel check**:
  - Open `/work`, click any email card. Confirm the backdrop fades in and the panel fades + scales up together — not a hard cut.
  - Click the X (or click the backdrop outside the panel) to close. Confirm it fades + scales back out before disappearing. If it still disappears instantly, check that the conditional render is inside `AnimatePresence` (not the other way around) and that `key={item.title}` is present.
  - Close one email and immediately open a different one. Confirm the new one always enters fresh (fades from `scale: 0.96`), never skips straight to `scale: 1`.
  - In DevTools' Animations panel, set playback to 10% and confirm the panel visibly scales up from 96%, not a pop to 100%.
  - Toggle `prefers-reduced-motion` (Rendering panel) — if plan 004 has landed, confirm the scale/opacity entrance still plays but position-based motion elsewhere is reduced; if plan 004 has not landed, this modal is not yet expected to respect reduced motion (that's a separate plan).
- **Done when**: opening and closing any lightbox instance on `/`, `/work`, `/work/bitter-truth-coffee`, and `/audits` shows a visible fade + scale on both open and close, with no instant pop in either direction.
