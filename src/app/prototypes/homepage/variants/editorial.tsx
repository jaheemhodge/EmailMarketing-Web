"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { caseStudies } from "@/lib/case-studies";
import { services, engagementTiers, process } from "@/lib/content";

const study = caseStudies[0];

export function Editorial() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* Split, asymmetric hero — no badge pill, no two-button row */}
      <section className="container-page grid gap-10 pt-14 pb-16 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-8 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <h1 className="font-display text-[15vw] leading-[0.92] font-bold tracking-tight sm:text-[9vw] md:text-[6.2vw]">
            Repeat
            <br />
            revenue,
            <br />
            written.
          </h1>
          <p className="mt-8 max-w-md leading-relaxed text-muted">
            JAH Media plans, writes, and builds the email &amp; SMS systems that turn first
            purchases into repeat customers for ecommerce brands. No templates —{" "}
            <Link href="/contact" className="font-semibold text-foreground underline underline-offset-4">
              book a free retention audit
            </Link>
            .
          </p>
          <p className="mt-6 text-xs tracking-widest text-muted uppercase">
            Trusted by {study.client} and growing
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          className="relative ml-auto aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-xl border border-border shadow-xl md:-mb-10 md:max-w-[260px]"
        >
          {study.pieces[0].image ? (
            <Image
              src={study.pieces[0].image}
              alt={study.pieces[0].subject}
              fill
              className="object-cover object-top"
            />
          ) : null}
        </motion.div>
      </section>

      {/* Services: magazine table-of-contents, no cards */}
      <section className="container-page border-t border-border py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-[auto_1fr]">
          <div className="hidden flex-col justify-between md:flex">
            {services.map((s) => (
              <span key={s.number} className="font-display text-6xl font-bold text-border">
                {s.number}
              </span>
            ))}
          </div>
          <div className="divide-y divide-border">
            {services.map((s) => (
              <div key={s.number} className="flex items-start gap-6 py-7">
                <span className="font-display text-sm font-bold text-accent-2 md:hidden">
                  {s.number}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study: pull quote + asymmetric masonry, not a uniform grid */}
      <section className="border-t border-border bg-surface/40 py-20 md:py-28">
        <div className="container-page">
          <blockquote className="font-display max-w-2xl text-3xl leading-[1.15] font-bold text-balance sm:text-4xl">
            &ldquo;{study.summary.split(",")[0]}.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm font-semibold tracking-widest text-muted uppercase">
            {study.client} — {study.industry}
          </p>
        </div>

        <div className="container-page mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {study.pieces.slice(0, 4).map((piece, i) => (
            <div
              key={piece.subject}
              className={`relative overflow-hidden rounded-xl border border-border ${
                i % 2 === 0 ? "aspect-[9/16] sm:translate-y-0" : "aspect-[9/16] sm:translate-y-10"
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

      {/* Pricing: a real comparison table, not four boxes */}
      <section className="container-page py-20 md:py-28">
        <h2 className="font-display max-w-xl text-3xl font-bold text-balance">
          Four ways to work together.
        </h2>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="w-40 border-b border-border pb-4 font-normal text-muted"> </th>
                {engagementTiers.map((tier) => (
                  <th key={tier.title} className="border-b border-border px-4 pb-4 align-bottom">
                    <p className="text-xs font-semibold tracking-widest text-accent-2 uppercase">
                      {tier.tag}
                    </p>
                    <p className="font-display mt-1 text-lg font-bold text-foreground">{tier.title}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-border py-4 text-xs font-semibold tracking-widest text-muted uppercase align-top">
                  Best for
                </td>
                {engagementTiers.map((tier) => (
                  <td key={tier.title} className="border-b border-border px-4 py-4 align-top text-foreground/85">
                    {tier.bestFor}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border-b border-border py-4 text-xs font-semibold tracking-widest text-muted uppercase align-top">
                  You get
                </td>
                {engagementTiers.map((tier) => (
                  <td key={tier.title} className="border-b border-border px-4 py-4 align-top">
                    <ul className="space-y-1.5 text-foreground/85">
                      {tier.includes.map((item) => (
                        <li key={item}>— {item}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-5"> </td>
                {engagementTiers.map((tier) => (
                  <td key={tier.title} className="px-4 py-5">
                    <Link
                      href="/contact"
                      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform active:scale-[0.97] ${
                        tier.highlight ? "bg-accent text-background" : "border border-border text-foreground"
                      }`}
                    >
                      Book a Call →
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Process: vertical connected timeline, not a 4-up grid */}
      <section className="container-page border-t border-border py-20 md:py-28">
        <h2 className="font-display max-w-xl text-3xl font-bold text-balance">
          How it works.
        </h2>
        <div className="relative mt-12 max-w-2xl border-l border-border pl-10">
          {process.map((step) => (
            <div key={step.number} className="relative pb-12 last:pb-0">
              <span className="font-display absolute top-0 -left-[3.3rem] text-2xl font-bold text-accent">
                {step.number}
              </span>
              <span className="absolute top-2 -left-[2.65rem] h-2 w-2 rounded-full bg-accent" />
              <h3 className="font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA: typographic statement, no pill button */}
      <section className="container-page border-t border-border py-20 md:py-28">
        <h2 className="font-display max-w-3xl text-4xl leading-[1.05] font-bold text-balance sm:text-5xl">
          Ready to make your list your best revenue channel?{" "}
          <Link href="/contact" className="text-accent underline underline-offset-8">
            Let&apos;s talk →
          </Link>
        </h2>
      </section>
    </>
  );
}
