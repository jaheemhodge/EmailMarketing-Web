# 001 — Extract the repeated ease-out curve into a shared constant

- **Status**: TODO
- **Commit**: 7438092
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 2 files edited, 1 file created

## Problem

The exact same Framer Motion ease curve `[0.22, 1, 0.36, 1]` is hand-typed
verbatim 5 times with no shared constant:

```tsx
// src/components/hero.tsx:19 — current
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
// src/components/hero.tsx:29 — current
transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
// src/components/hero.tsx:39 — current
transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
// src/components/hero.tsx:50 — current
transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
// src/components/reveal.tsx:22 — current
transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
```

There is no single place to see or adjust the site's signature ease-out
curve; a future change requires editing 5 call sites by hand and risks
drift (one gets updated, another doesn't).

## Target

A single exported constant, imported everywhere the curve is used:

```ts
// src/lib/motion.ts — new file
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
```

```tsx
// src/components/reveal.tsx:22 — target
transition={{ duration: 0.6, delay, ease: EASE_OUT }}
```

```tsx
// src/components/hero.tsx:19,29,39,50 — target (each keeps its own duration/delay)
transition={{ duration: 0.6, ease: EASE_OUT }}
transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
```

## Repo conventions to follow

Shared, non-visual constants already live in flat files under `src/lib/`
(e.g. `src/lib/site.ts` for nav/contact data, `src/lib/content.ts` for
copy). Follow that exact pattern: a new flat file, one named export, no
default export, no class.

## Steps

1. Create `src/lib/motion.ts` with exactly:
   ```ts
   export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
   ```
2. In `src/components/reveal.tsx`:
   - Change the import line `import { motion } from "framer-motion";` to also pull in the new constant: add a second import line directly below it: `import { EASE_OUT } from "@/lib/motion";`
   - On line 22, change `ease: [0.22, 1, 0.36, 1]` to `ease: EASE_OUT`.
3. In `src/components/hero.tsx`:
   - Add a new import line below `import { motion } from "framer-motion";` (line 4): `import { EASE_OUT } from "@/lib/motion";`
   - On lines 19, 29, 39, and 50, change each `ease: [0.22, 1, 0.36, 1]` to `ease: EASE_OUT`. Do not change any `duration` or `delay` value on these lines.

## Boundaries

- Do NOT touch any other component — only `hero.tsx` and `reveal.tsx` currently use this curve.
- Do NOT change any duration or delay value.
- Do NOT add new dependencies.
- If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run lint` and `npm run build` succeed with no new errors or warnings.
- **Feel check**: this is a pure refactor with zero intended visual change. Open `/` before and after the change, scroll through every section, and confirm the hero entrance and every scroll-reveal look pixel-identical in timing and curve — nothing should look different.
- **Done when**: `grep -rn "0.22, 1, 0.36, 1" src/` returns exactly one match (inside `src/lib/motion.ts` itself), and zero hand-typed occurrences remain in `hero.tsx` or `reveal.tsx`.
