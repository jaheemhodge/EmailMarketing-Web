# 009 — Crossfade the lightbox's ZoomIn/ZoomOut icon swap

- **Status**: TODO
- **Commit**: 7438092
- **Severity**: LOW (missed opportunity)
- **Category**: Missed opportunity
- **Estimated scope**: 1 file edited

## Problem

```tsx
// src/components/lightbox-provider.tsx:101-109 — current
{item.image ? (
  <span className="pointer-events-none absolute top-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-sm">
    {zoomed ? (
      <ZoomOut className="h-4 w-4 text-foreground" strokeWidth={2} />
    ) : (
      <ZoomIn className="h-4 w-4 text-foreground" strokeWidth={2} />
    )}
  </span>
) : null}
```

The `zoomed ? <ZoomOut/> : <ZoomIn/>` ternary swaps the two icon components
instantly on every click — one unmounts, the other mounts, with no
transition between them, so the badge's icon just snaps to the other
glyph.

## Target

Render both icons at all times, stacked on top of each other, and
crossfade between them with opacity — this is independent of whether
`AnimatePresence`/`motion` has been added elsewhere in this file by plan
002, so it works whether or not that plan has landed:

```tsx
// target
{item.image ? (
  <span className="pointer-events-none absolute top-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-sm">
    <span className="relative flex h-4 w-4 items-center justify-center">
      <ZoomIn
        className={`absolute h-4 w-4 text-foreground transition-opacity duration-150 ${
          zoomed ? "opacity-0" : "opacity-100"
        }`}
        strokeWidth={2}
      />
      <ZoomOut
        className={`absolute h-4 w-4 text-foreground transition-opacity duration-150 ${
          zoomed ? "opacity-100" : "opacity-0"
        }`}
        strokeWidth={2}
      />
    </span>
  </span>
) : null}
```

Both icon components are always mounted (no conditional rendering), each
absolutely positioned inside a small `relative` wrapper sized to match the
icon (`h-4 w-4`), with only their `opacity` toggling based on `zoomed`.
150ms is within the audit playbook's "tooltips, small popovers: 125–200ms"
duration budget — this badge is the same scale as a small popover icon.

## Repo conventions to follow

`src/components/site-header.tsx:68-76` already uses the pattern of two
always-mounted elements whose visibility is toggled by swapping classes
based on a boolean (the two hamburger spans morphing via `open ? ... :
""`), rather than conditionally mounting/unmounting. This plan applies
that same "always mounted, toggle classes" approach to the two icons.

## Steps

1. In `src/components/lightbox-provider.tsx`, replace the badge block (currently lines 101-109):
   ```tsx
   {item.image ? (
     <span className="pointer-events-none absolute top-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-sm">
       {zoomed ? (
         <ZoomOut className="h-4 w-4 text-foreground" strokeWidth={2} />
       ) : (
         <ZoomIn className="h-4 w-4 text-foreground" strokeWidth={2} />
       )}
     </span>
   ) : null}
   ```
   with the Target block shown above, verbatim.

## Boundaries

- Do NOT change the outer `<span>`'s position/sizing (`absolute top-3 left-3 inline-flex h-9 w-9 ...`) or the `bg-background/90 shadow-sm` styling.
- Do NOT add a scale or any transform to this crossfade — opacity-only, per the 125–200ms "small popover" budget which doesn't call for added motion here.
- Do NOT touch the zoom-trigger `onClick` handler or the `zoomed` state itself.
- If a step doesn't match the code you find (drift since the commit stamp — e.g. if plan 002 has changed surrounding lines), STOP and report instead of improvising; this edit only touches the badge block itself and should apply cleanly regardless of unrelated changes elsewhere in the file.

## Verification

- **Mechanical**: `npm run lint && npm run build` succeed with no new errors.
- **Feel check**: open any email in the lightbox, click the image to toggle zoom several times in a row. Confirm the icon badge now crossfades between the magnifying-glass-with-plus and magnifying-glass-with-minus glyphs instead of snapping instantly, and that rapid repeated clicking never shows both icons fully visible at once or a flash of neither.
- **Done when**: both `ZoomIn` and `ZoomOut` are unconditionally rendered in the JSX (no `{zoomed ? ... : ...}` component-swap ternary remains for these two icons), with only their `opacity` classes toggling.
