import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { BeforeAfterCard } from "@/components/before-after-card";
import { CtaBand } from "@/components/cta-band";
import { audits } from "@/lib/audits";

export const metadata: Metadata = {
  title: "Audits — JAH Media",
  description:
    "Real before-and-after examples from JAH Media retention audits — see exactly what gets caught and rebuilt.",
};

export default function AuditsPage() {
  return (
    <>
      <section className="container-page pt-20 pb-16 md:pt-28">
        <SectionHeading
          eyebrow="Audits"
          title="See exactly what an audit catches."
          description="A retention audit isn't a report nobody reads — it's a rebuild. Here are real before-and-after examples: what a flow looked like, what was costing it revenue, and what it became."
        />
      </section>

      <section className="container-page space-y-24 pb-24 md:pb-32">
        {audits.map((project) => (
          <Reveal key={project.slug}>
            <div>
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">
                {project.industry}
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold">{project.client}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                {project.summary}
              </p>

              {project.pieces.length > 0 ? (
                <div className="mt-12 space-y-16">
                  {project.pieces.map((piece) => (
                    <BeforeAfterCard key={piece.name} piece={piece} client={project.client} />
                  ))}
                </div>
              ) : (
                <p className="mt-10 text-sm text-muted">
                  Audit comparisons for {project.client} are on the way.
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </section>

      <CtaBand />
    </>
  );
}
