# 005 — Zoom via transform instead of width

- **Status**: TODO
- **Commit**: 7438092
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 1 file edited

## Problem

`src/components/lightbox-provider.tsx:71-79` simulates "zoom" by animating
the `width` CSS property:

```tsx
// src/components/lightbox-provider.tsx:71-79 — current
{item.image ? (
  // eslint-disable-next-line @next/next/no-img-element -- zoom needs a runtime-controlled width next/image's fill/fixed sizing can't express
  <img
    src={item.image}
    alt={item.title}
    className={`block transition-[width] duration-300 ${
      zoomed ? "w-[230%] max-w-none" : "h-full w-full object-contain"
    }`}
  />
) : (
```

`width` is a layout-triggering property — per the audit playbook, only
`transform` and `opacity` are composite-only. Every zoom toggle here forces
a reflow of the image box, not just a GPU composite, which can visibly drop
frames on a large screenshot, especially on lower-end devices.

## Target

Replace the `width` swap with a `transform: scale()` swap, which is
composite-only. The base sizing (`h-full w-full object-contain`) stays
active in both states; only a `scale-[2.3]` class toggles on top when
zoomed:

```tsx
// target
{item.image ? (
  // eslint-disable-next-line @next/next/no-img-element -- zoom needs a runtime-controlled transform next/image's fill/fixed sizing can't express
  <img
    src={item.image}
    alt={item.title}
    className={`block h-full w-full origin-top-left object-contain transition-transform duration-300 ${
      zoomed ? "scale-[2.3]" : ""
    }`}
  />
) : (
```

`2.3` matches the current `230%` width target exactly, so the zoomed visual
size is unchanged — only the mechanism changes from layout to composite.
`origin-top-left` keeps the scale anchored to the same corner the old
width-based growth effectively expanded from (top-left, since the
container is `overflow-auto` and the image was left-aligned by default).

## Repo conventions to follow

`src/components/email-frame.tsx:44` already uses this exact
transform-based hover-zoom pattern: `transition-transform duration-500
group-hover:scale-[1.03]`. This plan applies the same mechanism, triggered
by the `zoomed` click-state instead of `:hover`.

## Steps

1. In `src/components/lightbox-provider.tsx`, replace the `<img>` element's `className` template literal (currently spanning lines 76-78) with:
   ```tsx
   className={`block h-full w-full origin-top-left object-contain transition-transform duration-300 ${
     zoomed ? "scale-[2.3]" : ""
   }`}
   ```
   This removes the old `w-[230%] max-w-none` / `w-full` branching entirely — both states now share the same base classes, with only `scale-[2.3]` toggled conditionally.
2. Update the `eslint-disable-next-line` comment immediately above the `<img>` (currently referencing "a runtime-controlled width") to reference "a runtime-controlled transform" instead, since that's now the accurate reason for the plain `<img>` tag. Exact new comment text: `// eslint-disable-next-line @next/next/no-img-element -- zoom needs a runtime-controlled transform next/image's fill/fixed sizing can't express`.
3. Leave the surrounding `<div>` (the `overflow-auto` scroll container at lines 62-70) completely unchanged — `overflow-auto` still lets the user scroll/pan around the now-larger (via `transform: scale`) image.

## Boundaries

- Do NOT change the `onClick` handler, the `zoomed` state, or the `cursor-zoom-in`/`cursor-zoom-out` logic on the parent container.
- Do NOT change the `ZoomIn`/`ZoomOut` icon badge (lines 101-109) in this plan — that is plan 009's scope, if selected.
- Do NOT change the non-analysis/analysis layout branching elsewhere in the file.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run lint && npm run build` succeed with no new errors.
- **Feel check**: open any email with a real screenshot in the lightbox, click the image to zoom. Confirm it still visibly enlarges by the same amount as before, and the container is still scrollable/pannable. In DevTools' Performance panel, record a click-to-zoom interaction and confirm the trace shows no `Layout` event triggered by the click — only `Composite Layers`.
- **Done when**: `grep -n "w-\[230%\]" src/components/lightbox-provider.tsx` returns no matches, and clicking to zoom still visually works (image enlarges in place, remains pannable via scroll).
