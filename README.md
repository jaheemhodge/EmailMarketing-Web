# JAH Media

Marketing site for JAH Media, a retention marketing (email & SMS) agency for
ecommerce brands. Built with Next.js (App Router), TypeScript, Tailwind CSS,
and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app` — pages: home, `/work` (+ `/work/[slug]` case studies), `/audits`, `/services`, `/contact`
- `src/components` — UI building blocks (header, footer, hero, sections, email mockup frame, lightbox)
- `src/lib/case-studies.ts` — client case study data (flows, email pieces) for `/work`
- `src/lib/general-designs.ts` — standalone pieces (no case-study treatment) for `/work`
- `src/lib/concepts.ts` — self-initiated / non-client concept work for `/work`
- `src/lib/audits.ts` — before/after audit comparisons for `/audits`
- `src/lib/content.ts` — services, pricing tiers & process copy
- `src/lib/site.ts` — nav links, contact info, site metadata

## Adding real screenshots

Pieces in `case-studies.ts`, `general-designs.ts`, `concepts.ts`, and
`audits.ts` show a styled placeholder until they have a real screenshot.
To swap one in:

1. Drop the image under `public/work/...` (there's already a
   subfolder per client/project — follow the existing pattern)
2. Set that piece's `image` field (or `before.image` / `after.image`
   for an audit) to the matching `/work/...` path

The placeholder disappears automatically once `image` is set.

### Adding an audit (before/after)

Each entry in `audits.ts` is an `AuditProject` with a `pieces` array.
To add a before/after comparison:

```ts
{
  name: "Welcome Email",
  issue: "No incentive to open past email #1",
  before: { image: "/work/audits/bitter-truth-coffee/welcome-before.png", accent: "#..." },
  after: { image: "/work/audits/bitter-truth-coffee/welcome-after.png", accent: "#..." },
  whatChanged: ["...", "..."],
}
```

`whatChanged` is optional-in-spirit but should usually be filled in —
it's the strategist rationale shown under each comparison.

## Deploying

Deploys cleanly to [Vercel](https://vercel.com/new) — connect the repo and it
will detect the Next.js app automatically.
