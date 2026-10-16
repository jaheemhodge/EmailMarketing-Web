import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { EmailFrame } from "@/components/email-frame";
import { caseStudies } from "@/lib/case-studies";

const study = caseStudies[0];

export function WorkPreview() {
  return (
    <section id="work" className="border-t border-border bg-surface/40 py-24 md:py-32">
      <div className="container-1200 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold tracking-widest text-accent-2 uppercase">
            Featured work
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold text-balance sm:text-4xl">
            {study.client}
          </h2>
          <p className="mt-2 text-sm font-semibold tracking-widest text-muted uppercase">
            {study.industry}
          </p>
          <p className="mt-5 leading-relaxed text-muted">{study.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {study.services.map((s) => (
              <li key={s} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                {s}
              </li>
            ))}
          </ul>
          <Link
            href={`/work/${study.slug}`}
            className="mt-7 inline-flex text-sm font-semibold text-accent hover:opacity-80"
          >
            Read the Case Study →
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-3 gap-4 sm:grid-cols-4">
          {study.pieces.slice(0, 4).map((piece, i) => (
            <div key={piece.subject} className={i % 2 !== 0 ? "sm:translate-y-8" : ""}>
              <EmailFrame piece={piece} client={study.client} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
