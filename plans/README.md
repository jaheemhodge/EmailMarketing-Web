# Animation improvement plans

Audited at commit `7438092` with the `improve-animations` skill (JAH Media
marketing site: Next.js + Tailwind v4 + Framer Motion). One finding from
the initial audit — ungated `hover:` states on touch devices — was
retracted after verifying against the installed `tailwindcss@4.3.3`
source: Tailwind v4's `hover` variant already compiles to `&:hover`
wrapped in `@media (hover: hover)` automatically, so no fix was needed
there.

| # | Title | Severity | Status |
| --- | --- | --- | --- |
| [001](001-shared-easing-tokens.md) | Extract the repeated ease-out curve into a shared constant | LOW | TODO |
| [002](002-lightbox-enter-exit.md) | Give the lightbox an enter/exit animation | HIGH | TODO |
| [003](003-button-press-feedback.md) | Add press feedback to every primary CTA | MEDIUM | TODO |
| [004](004-reduced-motion-support.md) | Respect prefers-reduced-motion | MEDIUM | TODO |
| [005](005-lightbox-zoom-transform.md) | Zoom via transform instead of width | MEDIUM | TODO |
| [006](006-drawer-strong-easing.md) | Strong easing for the mobile drawer and hamburger morph | LOW | TODO |
| [007](007-client-strip-reveal.md) | Give ClientStrip the same scroll-reveal as every other section | LOW | TODO |
| [008](008-zoom-badge-scale-in.md) | Scale-in the hover zoom-hint badge, not just fade it | LOW | TODO |
| [009](009-zoom-icon-crossfade.md) | Crossfade the lightbox's ZoomIn/ZoomOut icon swap | LOW | TODO |

## Recommended execution order

1. **001** first — it's a pure refactor (zero visual change) that 002 can
   optionally consume (`EASE_OUT` instead of a hand-typed array). Low risk,
   do it early so later plans have the token available.
2. **002** — the highest-leverage fix on the site; the lightbox is used
   everywhere. No dependency on 001 (it can use the inline array if 001
   hasn't landed), but reads cleaner after it.
3. **003**, **005** — independent of everything else and each other; safe
   to run in parallel with 002 or back-to-back after it. 005 touches the
   same file as 002 (`lightbox-provider.tsx`) but a different, non-adjacent
   block (the `<img>` inside `imagePane` vs. the outer modal wrappers) — low
   conflict risk, but do them sequentially rather than simultaneously to be
   safe.
4. **004** and **006** both edit `src/app/globals.css`, at different
   locations (004 appends a new block at the end of the file; 006 adds one
   line inside the existing `:root` block near the top). Run them
   sequentially, not simultaneously, to avoid a merge conflict on the same
   file.
5. **007**, **008**, **009** — fully independent of each other and of
   everything above; the lowest-risk, lowest-effort batch, safe to batch
   together or run in any order.

## Dependencies

- 002 and 004 both touch `lightbox-provider.tsx`'s top-level structure
  (002 wraps the return in `AnimatePresence` and adds `motion` to the two
  outer `<div>`s; 004 does not touch this file at all in its current
  scope — see 004's Boundaries). No actual conflict, listed for awareness
  only.
- 005 and 009 both touch `lightbox-provider.tsx` but in non-overlapping
  blocks (005: the `<img>`'s className; 009: the icon-badge `<span>`
  block). Safe to run in either order.
- No other cross-plan dependencies. Every plan lists its own Boundaries
  section — respect those over anything implied here.

## Running a plan

Each plan is self-contained (exact file:line citations, exact target
code, exact verification steps) and can be executed by any agent —
including a cheaper model — with no additional context from this
conversation. Hand a plan's file directly to an executor, or run it via
this skill's `execute <plan>` variant, which will implement it in an
isolated worktree and review the resulting diff before reporting back.
