# 007 — Give ClientStrip the same scroll-reveal as every other section

- **Status**: TODO
- **Commit**: 7438092
- **Severity**: LOW (missed opportunity)
- **Category**: Cohesion / Missed opportunity
- **Estimated scope**: 1 file edited

## Problem

`src/components/client-strip.tsx` renders with zero animation — it's a
plain `<section>` with no `Reveal` wrapper:

```tsx
// src/components/client-strip.tsx — current, full file
import { caseStudies } from "@/lib/case-studies";

export function ClientStrip() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="container-page flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Real client work
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {caseStudies.map((c) => (
            <span
              key={c.slug}
              className="font-display text-lg font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {c.client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

On the homepage, `ClientStrip` sits directly between the `Hero` (which
animates in on page load) and `ServicesGrid` (whose cards each fade/slide
in via `Reveal` on scroll, per `src/components/services-grid.tsx:16`). It's
the only section on that page with no entrance motion at all — it just
appears flat, breaking the otherwise-consistent reveal pattern.

## Target

Wrap the section's content in the existing `Reveal` component, the same
way every sibling section already does:

```tsx
// target
import { Reveal } from "@/components/reveal";
import { caseStudies } from "@/lib/case-studies";

export function ClientStrip() {
  return (
    <section className="border-y border-border bg-surface/40">
      <Reveal className="container-page flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          Real client work
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {caseStudies.map((c) => (
            <span
              key={c.slug}
              className="font-display text-lg font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {c.client}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
```

`Reveal` accepts a `className` prop and forwards it to its inner
`motion.div` (see `src/components/reveal.tsx`), so moving the existing
`container-page flex ...` classes from the `<div>` onto `Reveal` and
dropping the now-redundant inner `<div>` is a direct, structure-preserving
swap — the rendered DOM nesting stays the same depth (`section > div`
becomes `section > motion.div`).

## Repo conventions to follow

`src/components/services-grid.tsx:16` shows the simplest existing example
of this exact pattern — a single `Reveal` wrapping one block of markup with
no per-item stagger, just `className` passed through. `ClientStrip` should
follow that same minimal form (no `delay` prop needed — this is a single
block, not a list of staggered items).

## Steps

1. In `src/components/client-strip.tsx`, add a new import line: `import { Reveal } from "@/components/reveal";` (above or below the existing `caseStudies` import — either position is fine).
2. Change the opening `<div className="container-page flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">` to `<Reveal className="container-page flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">`, and its matching closing `</div>` to `</Reveal>`. Keep the `<section className="border-y border-border bg-surface/40">` wrapper and everything inside unchanged.

## Boundaries

- Do NOT add a `delay` prop or per-client stagger — this is a single revealed block, not a staggered list.
- Do NOT change the `<section>` element's own className or remove the `border-y`/`bg-surface/40` styling.
- Do NOT touch `src/lib/case-studies.ts` or any other file.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run lint && npm run build` succeed with no new errors.
- **Feel check**: open `/`, scroll down slowly past the hero. Confirm the "Real client work" strip now fades + slides up into view on scroll, matching the timing and feel of the `ServicesGrid` cards immediately below it — it should no longer just pop into view fully-formed on initial page load (since it starts below the fold on most viewports, it should visibly animate in as you scroll to it, not before).
- **Done when**: the client strip's content has the same `opacity`/`y` entrance behavior as any other `Reveal`-wrapped section, confirmed visually.
