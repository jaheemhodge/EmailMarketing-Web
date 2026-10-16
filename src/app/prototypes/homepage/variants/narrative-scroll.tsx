"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { caseStudies } from "@/lib/case-studies";
import { services, engagementTiers, process } from "@/lib/content";

const study = caseStudies[0];

export function NarrativeScroll() {
  const reduceMotion = useReducedMotion();
  const [openTier, setOpenTier] = useState(0);

  return (
    <>
      {/* No badge, no subhead paragraph, no button row — just the claim */}
      <section className="container-page pt-16 pb-10 text-center md:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="font-display mx-auto max-w-3xl text-4xl leading-[1.08] font-bold text-balance sm:text-5xl"
        >
          Your customers bought once. Here&apos;s how we get them to buy again.
        </motion.h1>
      </section>

      {/* The claim bleeds straight into real proof — the image is the evidence */}
      <div className="container-page flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
          className="relative aspect-[9/16] w-full max-w-xs overflow-hidden rounded-2xl border border-border shadow-xl"
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
        <p className="mt-3 text-center text-xs tracking-widest text-muted uppercase">
          One real email from {study.client}&apos;s welcome flow
        </p>
      </div>

      {/* Running prose — no "About" box */}
      <section className="container-page py-16 md:py-24">
       <div className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/85">
        <p>
          JAH Media is a retention marketing agency. We plan, write, and build the email &amp; SMS
          systems — flows, campaigns, and offers — that turn first purchases into repeat customers
          for ecommerce brands. Here&apos;s what that looks like in practice:
        </p>

        <ol className="mt-8 space-y-6">
          {services.map((s) => (
            <li key={s.number} className="flex gap-4">
              <span className="font-display shrink-0 text-accent-2">{s.number}</span>
              <span>
                <strong className="font-display font-bold text-foreground">{s.title}.</strong>{" "}
                <span className="text-foreground/75">{s.description}</span>
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-10 font-display text-2xl leading-snug font-bold text-balance">
          For {study.client}, that meant {study.pieces.length} real flows and campaigns — a
          welcome series, an abandoned-checkout rescue, and a running calendar of seasonal sends.
        </p>

        <div className="my-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {study.pieces.slice(1, 4).map((piece) => (
            <div
              key={piece.subject}
              className="relative aspect-[9/16] overflow-hidden rounded-xl border border-border"
            >
              {piece.image ? (
                <Image src={piece.image} alt={piece.subject} fill className="object-cover object-top" />
              ) : null}
            </div>
          ))}
        </div>

        <p>
          {study.summary}{" "}
          <Link href={`/work/${study.slug}`} className="font-semibold text-accent hover:opacity-80">
            Read the full case study →
          </Link>
        </p>
       </div>
      </section>

      {/* Pricing as an interactive stepper — one tier open at a time, not four cards */}
      <section className="container-page border-t border-border py-16 md:py-24">
        <h2 className="font-display mx-auto max-w-xl text-center text-3xl font-bold text-balance">
          Wherever you are, there&apos;s a next rung on the ladder.
        </h2>
        <div className="mx-auto mt-10 max-w-2xl divide-y divide-border border-y border-border">
          {engagementTiers.map((tier, i) => {
            const isOpen = openTier === i;
            return (
              <div key={tier.title}>
                <button
                  type="button"
                  onClick={() => setOpenTier(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-xs font-semibold tracking-widest text-accent-2 uppercase">
                      {tier.tag}
                    </span>
                    <span className="font-display text-lg font-bold">{tier.title}</span>
                  </span>
                  <Plus
                    className={`h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="pb-6">
                    <p className="leading-relaxed text-muted">{tier.tagline}</p>
                    <ul className="mt-4 space-y-1.5 text-sm text-foreground/85">
                      {tier.includes.map((item) => (
                        <li key={item}>— {item}</li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="mt-5 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-transform active:scale-[0.97]"
                    >
                      Book a Call →
                    </Link>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process folded into the closing pitch, not a separate section */}
      <section className="container-page py-16 text-center md:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="text-lg leading-relaxed text-foreground/85">
            Every engagement runs the same way:{" "}
            {process.map((step, i) => (
              <span key={step.number}>
                <strong className="font-semibold text-foreground">{step.title.toLowerCase()}</strong>
                {i < process.length - 2 ? ", " : i === process.length - 2 ? ", then " : "."}
              </span>
            ))}
          </p>
          <p className="font-display mt-8 text-3xl font-bold text-balance sm:text-4xl">
            Ready to make your list your best revenue channel?
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-background transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            Book a Free Retention Audit
          </Link>
        </div>
      </section>
    </>
  );
}
