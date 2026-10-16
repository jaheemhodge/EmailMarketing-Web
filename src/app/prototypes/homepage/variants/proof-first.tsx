"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { caseStudies } from "@/lib/case-studies";
import { services, engagementTiers, process } from "@/lib/content";
import { site } from "@/lib/site";

const study = caseStudies[0];
const hero = study.pieces[0];
const collage = [study.pieces[0], study.pieces[2], study.pieces[4]];

export function ProofFirst() {
  const reduceMotion = useReducedMotion();
  const fadeUp = (delay: number, y = 16) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  });

  return (
    <>
      {/* Opening: claim + scattered proof, not centered headline + two buttons */}
      <section className="container-page grid gap-10 pt-16 pb-20 md:grid-cols-[1fr_0.9fr] md:gap-6 md:pt-24 md:pb-28">
        <motion.div {...fadeUp(0)} className="flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-widest text-accent-2 uppercase">
            {study.pieces.length} real flows shipped for {study.client}
          </p>
          <h1 className="font-display mt-5 max-w-lg text-4xl leading-[1.05] font-bold text-balance sm:text-5xl">
            We write the emails that turn one-time buyers into repeat revenue.
          </h1>
          <p className="mt-6 max-w-md leading-relaxed text-muted">{site.description}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            Book a Free Retention Audit
          </Link>
        </motion.div>

        <div className="relative mt-4 hidden h-[460px] md:block">
          {collage.map((piece, i) => {
            const pos = [
              { top: "0%", left: "8%", rotate: -6, w: 190, z: 3 },
              { top: "14%", left: "46%", rotate: 4, w: 190, z: 2 },
              { top: "46%", left: "20%", rotate: -2, w: 190, z: 1 },
            ][i];
            return (
              <motion.div
                key={piece.subject}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 24, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: pos.rotate }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EASE_OUT }}
                className="absolute overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
                style={{ top: pos.top, left: pos.left, width: pos.w, zIndex: pos.z }}
              >
                <div className="relative aspect-[9/16] w-full">
                  {piece.image ? (
                    <Image src={piece.image} alt={piece.subject} fill className="object-cover object-top" />
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile fallback: single hero screenshot */}
        <div className="relative aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-xl border border-border md:hidden">
          {hero.image ? (
            <Image src={hero.image} alt={hero.subject} fill className="object-cover object-top" />
          ) : null}
        </div>
      </section>

      {/* Ticker instead of static logo strip */}
      <div className="overflow-hidden border-y border-border bg-surface/40 py-4">
        <div className="flex animate-[marquee_28s_linear_infinite] gap-16 whitespace-nowrap">
          {[...Array(4)].flatMap(() =>
            caseStudies.map((c) => (
              <span
                key={`${c.slug}-${Math.random()}`}
                className="font-display text-lg font-medium text-foreground/50"
              >
                {c.client} — {c.industry}
              </span>
            ))
          )}
        </div>
        <style jsx>{`
          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>

      {/* Services as a flowing numbered list, not a card grid */}
      <section className="container-page py-20 md:py-28">
        <h2 className="font-display max-w-xl text-3xl font-bold text-balance">
          Retention marketing, handled end to end.
        </h2>
        <div className="mt-12 divide-y divide-border border-t border-border">
          {services.map((s) => (
            <div key={s.number} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-8">
              <span className="font-display w-14 shrink-0 text-2xl font-bold text-accent-2">
                {s.number}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dominant single screenshot + horizontal filmstrip, not sidebar+grid */}
      <section className="border-t border-border bg-surface/40 py-20 md:py-28">
        <div className="container-page">
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">
            {study.industry}
          </p>
          <h2 className="font-display mt-3 max-w-xl text-3xl font-bold text-balance">
            {study.client}: {study.summary.split(".")[0]}.
          </h2>
        </div>

        <div className="container-page mt-10 flex flex-col gap-10 lg:flex-row">
          <div className="relative aspect-[9/16] w-full max-w-sm shrink-0 overflow-hidden rounded-2xl border border-border shadow-xl">
            {hero.image ? (
              <Image src={hero.image} alt={hero.subject} fill className="object-cover object-top" />
            ) : null}
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-5">
            <p className="leading-relaxed text-muted">{study.summary}</p>
            <div className="-mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-2">
              {study.pieces.slice(1).map((piece) => (
                <div
                  key={piece.subject}
                  className="relative aspect-[9/16] w-32 shrink-0 snap-start overflow-hidden rounded-lg border border-border"
                >
                  {piece.image ? (
                    <Image src={piece.image} alt={piece.subject} fill className="object-cover object-top" />
                  ) : null}
                </div>
              ))}
            </div>
            <Link href={`/work/${study.slug}`} className="text-sm font-semibold text-accent hover:opacity-80">
              View full case study →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing as a horizontal scroll-snap ladder, not 4 equal cards */}
      <section className="container-page py-20 md:py-28">
        <h2 className="font-display max-w-xl text-3xl font-bold text-balance">
          Pick the level of ownership that fits where you are now.
        </h2>
        <div className="-mx-6 mt-10 flex snap-x gap-5 overflow-x-auto px-6 pb-4">
          {engagementTiers.map((tier) => (
            <div
              key={tier.title}
              className={`flex w-[280px] shrink-0 snap-start flex-col rounded-2xl border p-6 ${
                tier.highlight ? "border-accent bg-foreground text-background" : "border-border"
              }`}
            >
              <p
                className={`text-xs font-semibold tracking-widest uppercase ${
                  tier.highlight ? "text-accent-2" : "text-muted"
                }`}
              >
                {tier.tag}
              </p>
              <h3 className="font-display mt-2 text-xl font-bold">{tier.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${tier.highlight ? "text-background/70" : "text-muted"}`}>
                {tier.tagline}
              </p>
              <ul className="mt-5 flex-1 space-y-2">
                {tier.includes.map((item) => (
                  <li key={item} className="text-sm leading-relaxed">
                    — {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform active:scale-[0.97] ${
                  tier.highlight ? "bg-accent text-background" : "border border-border"
                }`}
              >
                Book a Call →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Process as a connected horizontal rail */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="container-page">
          <h2 className="font-display max-w-xl text-3xl font-bold text-balance">
            A simple process, run the same way every time.
          </h2>
          <div className="relative mt-14 grid gap-10 md:grid-cols-4">
            <div className="absolute top-3 right-0 left-0 hidden h-px bg-border md:block" />
            {process.map((step) => (
              <div key={step.number} className="relative flex flex-col items-start">
                <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-background">
                  {step.number.replace("0", "")}
                </span>
                <h3 className="font-display mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA paired with proof, not isolated text */}
      <section className="container-page flex flex-col items-center gap-8 border-t border-border py-20 text-center md:py-28">
        <div className="relative aspect-[9/16] w-28 overflow-hidden rounded-lg border border-border">
          {study.pieces[1].image ? (
            <Image src={study.pieces[1].image} alt={study.pieces[1].subject} fill className="object-cover object-top" />
          ) : null}
        </div>
        <h2 className="font-display max-w-xl text-3xl font-bold text-balance sm:text-4xl">
          Ready to make your list your best revenue channel?
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-background transition-transform hover:scale-[1.03] active:scale-[0.97]"
        >
          Book a Free Retention Audit
        </Link>
      </section>
    </>
  );
}
