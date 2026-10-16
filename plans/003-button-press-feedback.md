# 003 — Add press feedback to every primary CTA

- **Status**: TODO
- **Commit**: 7438092
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 5 files edited, one class addition each

## Problem

Six buttons/links across the site scale up on `:hover` but have no
`:active` state at all, so clicking never visually registers as a press —
only hovering does:

```tsx
// src/components/site-header.tsx:55 — current
className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
```
```tsx
// src/components/hero.tsx:55 — current
className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
```
```tsx
// src/components/cta-band.tsx:21 — current
className="mt-9 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
```
```tsx
// src/components/contact-form.tsx:82 — current
className="inline-flex w-full items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02] sm:w-auto"
```
```tsx
// src/components/pricing-tiers.tsx:63-67 — current (template literal)
className={`mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
  tier.highlight
    ? "bg-accent text-background"
    : "border border-border text-foreground"
}`}
```
```tsx
// src/components/lightbox-provider.tsx:125 — current
className="fixed top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-background text-foreground transition-transform hover:scale-105 sm:top-6 sm:right-6"
```

Per the audit playbook, press feedback should be `transform: scale(0.97)`
with `transition: transform 160ms ease-out`. All six elements already have
`transition-transform`, and Tailwind's default transition duration (150ms)
is close enough to the 160ms target that no explicit duration class is
needed.

## Target

Each gets an `active:scale-*` class added immediately after its existing
`hover:scale-*` class:

```tsx
// site-header.tsx:55, hero.tsx:55, cta-band.tsx:21 — target
hover:scale-[1.03] active:scale-[0.97]
```
```tsx
// contact-form.tsx:82, pricing-tiers.tsx:63 — target
hover:scale-[1.02] active:scale-[0.97]
```
```tsx
// lightbox-provider.tsx:125 — target (this button uses Tailwind's named
// scale steps already, not arbitrary values — match that convention)
hover:scale-105 active:scale-95
```

## Repo conventions to follow

`src/components/hero.tsx:55` shows the exact pattern to extend —
`transition-transform hover:scale-[...]` as consecutive classes in the
`className` string. Add `active:scale-[...]` immediately after
`hover:scale-[...]` in that same string, in every file, so the ordering
stays consistent across the codebase.

## Steps

1. `src/components/site-header.tsx:55` — in the "Book a Call" `<Link>` className, change `hover:scale-[1.03]` to `hover:scale-[1.03] active:scale-[0.97]`.
2. `src/components/hero.tsx:55` — in the "Book a Free Retention Audit" `<Link>` className, change `hover:scale-[1.03]` to `hover:scale-[1.03] active:scale-[0.97]`.
3. `src/components/cta-band.tsx:21` — in the "Book a Free Retention Audit" `<Link>` className, change `hover:scale-[1.03]` to `hover:scale-[1.03] active:scale-[0.97]`.
4. `src/components/contact-form.tsx:82` — in the "Send it over" `<button>` className, change `hover:scale-[1.02]` to `hover:scale-[1.02] active:scale-[0.97]`.
5. `src/components/pricing-tiers.tsx:63` — inside the template literal, change `hover:scale-[1.02]` to `hover:scale-[1.02] active:scale-[0.97]`. Leave the `${tier.highlight ? ... : ...}` expression immediately after it completely untouched.
6. `src/components/lightbox-provider.tsx:125` — in the close-button className, change `hover:scale-105` to `hover:scale-105 active:scale-95`.

## Boundaries

- Do NOT touch any other class on these elements (padding, color, border-radius, etc.).
- Do NOT add `active:scale` to buttons/links that currently have no `hover:scale` (e.g. `src/components/hero.tsx:61`, "See Our Work", which only has `hover:border-foreground/40` — leave it alone, out of scope).
- Do NOT touch `src/components/services-grid.tsx`, `src/components/site-footer.tsx`, or any other file not listed in Steps.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run lint && npm run build` succeed with no new errors.
- **Feel check**: on each of the 6 locations, press and hold with a mouse (don't release) and confirm the element visibly shrinks (to 97%, or 95% for the lightbox close button) while held, springing back to its hover size on release. Repeat with a touch tap if a touch-capable device/emulator is available.
- **Done when**: all 6 locations listed in Steps have both a `hover:scale-*` and an `active:scale-*` class present, and no other element in the codebase gained an `active:scale` class.
