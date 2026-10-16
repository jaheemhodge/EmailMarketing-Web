# 006 — Strong easing for the mobile drawer and hamburger morph

- **Status**: TODO
- **Commit**: 7438092
- **Severity**: LOW
- **Category**: Easing & duration
- **Estimated scope**: 2 files edited

## Problem

```tsx
// src/components/site-header.tsx:81-84 — current (mobile nav drawer)
<div
  className={`md:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 bg-background transition-transform duration-300 ease-out ${
    open ? "translate-x-0" : "translate-x-full"
  }`}
>
```

This uses Tailwind's built-in `ease-out` (`cubic-bezier(0, 0, 0.2, 1)`),
which the audit playbook calls too weak for deliberate UI motion.

```tsx
// src/components/site-header.tsx:68-71 — current (first hamburger span)
<span
  className={`h-[1.5px] w-6 bg-foreground transition-transform duration-300 ${
    open ? "translate-y-[3.5px] rotate-45" : ""
  }`}
/>
```
```tsx
// src/components/site-header.tsx:73-76 — current (second hamburger span)
<span
  className={`h-[1.5px] w-6 bg-foreground transition-transform duration-300 ${
    open ? "-translate-y-[3.5px] -rotate-45" : ""
  }`}
/>
```

Both hamburger spans specify no easing class at all, falling back to the
browser default `ease` (`cubic-bezier(0.25, 0.1, 0.25, 1)`) — also weak.

## Target

The audit playbook's iOS-like drawer curve, `cubic-bezier(0.32, 0.72, 0,
1)`, added as a CSS custom property and applied via Tailwind's
arbitrary-value easing syntax:

```css
/* src/app/globals.css — add inside the existing :root block */
:root {
  --background: #f7f5f0;
  --surface: #efebe1;
  --surface-2: #e4ded0;
  --foreground: #121210;
  --muted: #6c6a62;
  --accent: #121210;
  --accent-2: #b3410f;
  --border: #ddd7c8;
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
```

```tsx
// site-header.tsx:81-84 — target
<div
  className={`md:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 bg-background transition-transform duration-300 ease-[var(--ease-drawer)] ${
    open ? "translate-x-0" : "translate-x-full"
  }`}
>
```

```tsx
// site-header.tsx:68-71 — target
<span
  className={`h-[1.5px] w-6 bg-foreground transition-transform duration-300 ease-[var(--ease-drawer)] ${
    open ? "translate-y-[3.5px] rotate-45" : ""
  }`}
/>
```

```tsx
// site-header.tsx:73-76 — target
<span
  className={`h-[1.5px] w-6 bg-foreground transition-transform duration-300 ease-[var(--ease-drawer)] ${
    open ? "-translate-y-[3.5px] -rotate-45" : ""
  }`}
/>
```

## Repo conventions to follow

`src/app/globals.css` already defines all custom properties inside a
single `:root { }` block (`--background`, `--surface`, `--foreground`,
etc. — currently 8 variables). Add `--ease-drawer` as a 9th line in that
same block; do not create a second `:root` block or a separate file.

## Steps

1. In `src/app/globals.css`, inside the existing `:root { }` block, add a new line `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);` immediately after the existing `--border: #ddd7c8;` line.
2. In `src/components/site-header.tsx`, on the mobile drawer `<div>` (the one with `md:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 bg-background ...`), change `transition-transform duration-300 ease-out` to `transition-transform duration-300 ease-[var(--ease-drawer)]`.
3. In `src/components/site-header.tsx`, on the first hamburger `<span>` (the one whose open-state ternary produces `"translate-y-[3.5px] rotate-45"`), change `transition-transform duration-300` to `transition-transform duration-300 ease-[var(--ease-drawer)]`.
4. In `src/components/site-header.tsx`, on the second hamburger `<span>` (the one whose open-state ternary produces `"-translate-y-[3.5px] -rotate-45"`), make the same change: `transition-transform duration-300` to `transition-transform duration-300 ease-[var(--ease-drawer)]`.

## Boundaries

- Do NOT change any `duration-300` value — only the easing.
- Do NOT touch the desktop nav links, the "Book a Call" buttons, or any other transition in this file.
- This plan's CSS edit and plan 004's CSS edit both touch `src/app/globals.css` but at different locations (this one inside the existing `:root` block near the top; plan 004 appends a new block at the end of the file) — if both are being executed, do them as separate, sequential edits to avoid a merge conflict, not simultaneously.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run lint && npm run build` succeed with no new errors.
- **Feel check**: resize the viewport to mobile width, click the hamburger icon. Confirm the drawer still slides in from the right and the two lines still morph into an X, both now with a snappier, more deliberate deceleration than before (less of a long, linear-feeling tail). In DevTools' Animations panel, set playback to 10% and confirm the drawer's slide decelerates more sharply near the start of the motion than the old `ease-out` did.
- **Done when**: `grep -n "ease-out" src/components/site-header.tsx` returns no matches on the drawer's className, and `grep -c "ease-\[var(--ease-drawer)\]" src/components/site-header.tsx` returns `3` (drawer + both hamburger spans).
