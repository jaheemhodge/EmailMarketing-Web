# 008 — Scale-in the hover zoom-hint badge, not just fade it

- **Status**: TODO
- **Commit**: 7438092
- **Severity**: LOW (missed opportunity)
- **Category**: Physicality & origin / Missed opportunity
- **Estimated scope**: 2 files edited

## Problem

Both card components that show a hover "you can zoom this" hint only
animate `opacity` on that badge, with no accompanying scale — it fades in
flat rather than reading as something appearing:

```tsx
// src/components/email-frame.tsx:66-68 — current
<span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
  <Maximize2 className="h-3.5 w-3.5 text-foreground" strokeWidth={2} />
</span>
```

```tsx
// src/components/general-designs-grid.tsx:55-57 — current (identical markup)
<span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
  <Maximize2 className="h-3.5 w-3.5 text-foreground" strokeWidth={2} />
</span>
```

## Target

Add a subtle scale alongside the existing opacity fade — per the audit
playbook, never `scale(0)`; `0.9` is within the `0.9–0.97` target range for
an appearing element:

```tsx
// target (both files, identical change)
<span className="absolute top-3 right-3 flex h-8 w-8 scale-90 items-center justify-center rounded-full bg-background/90 opacity-0 shadow-sm transition-[opacity,transform] duration-200 group-hover:scale-100 group-hover:opacity-100">
  <Maximize2 className="h-3.5 w-3.5 text-foreground" strokeWidth={2} />
</span>
```

Two changes to the existing class string: add `scale-90` next to the base
`opacity-0`, add `group-hover:scale-100` next to `group-hover:opacity-100`,
and widen `transition-opacity` to `transition-[opacity,transform]` so both
properties animate together over the same 200ms.

## Repo conventions to follow

This exact badge markup is duplicated verbatim in both files already (that
duplication is pre-existing and out of scope to refactor here) — apply the
identical class-string edit to both copies so they stay in sync with each
other, matching the current convention of keeping them identical.

## Steps

1. In `src/components/email-frame.tsx`, on the badge `<span>` (lines 66-68), change the className from:
   ```
   absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100
   ```
   to:
   ```
   absolute top-3 right-3 flex h-8 w-8 scale-90 items-center justify-center rounded-full bg-background/90 opacity-0 shadow-sm transition-[opacity,transform] duration-200 group-hover:scale-100 group-hover:opacity-100
   ```
2. In `src/components/general-designs-grid.tsx`, on the equivalent badge `<span>` (lines 55-57), make the exact same className change as Step 1.

## Boundaries

- Do NOT change the `Maximize2` icon itself, its size, or its color.
- Do NOT touch the parent `<div className="relative aspect-[9/16] ...">` container in either file.
- Do NOT deduplicate the two copies of this badge markup into a shared component — that's a separate refactor, not part of this plan.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run lint && npm run build` succeed with no new errors.
- **Feel check**: hover over any email card on `/work` or the homepage preview. Confirm the zoom-hint badge now grows in from slightly smaller (90%) to full size while fading in, rather than just fading in at full size. Move the mouse away and confirm it shrinks back down to 90% while fading out, symmetrically.
- **Done when**: both `email-frame.tsx` and `general-designs-grid.tsx` have identical `scale-90`/`group-hover:scale-100` additions on their badge `<span>`, and hovering any card shows the combined scale+fade.
