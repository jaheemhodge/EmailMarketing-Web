import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { caseStudies } from "@/lib/case-studies";

const study = caseStudies[0];

export function WorkPreview() {
  return (
    <section id="work" className="border-t border-border bg-surface/40 py-20 md:py-28">
      <Reveal className="container-page">
        <blockquote className="font-display max-w-2xl text-3xl leading-[1.15] font-bold text-balance sm:text-4xl">
          &ldquo;{study.summary.split(",")[0]}.&rdquo;
        </blockquote>
        <p className="mt-4 text-sm font-semibold tracking-widest text-muted uppercase">
          {study.client} — {study.industry}
        </p>
      </Reveal>

      <div className="container-page mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {study.pieces.slice(0, 4).map((piece, i) => (
          <div
            key={piece.subject}
            className={`relative aspect-[9/16] overflow-hidden rounded-xl border border-border ${
              i % 2 !== 0 ? "sm:translate-y-10" : ""
            }`}
          >
            {piece.image ? (
              <Image src={piece.image} alt={piece.subject} fill className="object-cover object-top" />
            ) : null}
          </div>
        ))}
      </div>

      <div className="container-page mt-10">
        <Link href={`/work/${study.slug}`} className="text-sm font-semibold text-accent hover:opacity-80">
          Read the full case study →
        </Link>
      </div>
    </section>
  );
}
