"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { EASE_OUT } from "@/lib/motion";
import { caseStudies } from "@/lib/case-studies";

const study = caseStudies[0];
const welcome = study.pieces.find((p) => p.flow === "Welcome Flow");
const abandoned = study.pieces.find((p) => p.flow === "Abandoned Checkout");

const stages = [
  {
    label: "Welcome",
    purpose:
      "The first email a new customer gets — introduces the brand, confirms the order, and sets expectations for what's next.",
    image: welcome?.image,
    alt: welcome?.subject ?? "Welcome email",
  },
  {
    label: "Abandoned Checkout",
    purpose:
      "A timely nudge when someone leaves without finishing checkout — removes friction and brings them back to complete the order.",
    image: abandoned?.image,
    alt: abandoned?.subject ?? "Abandoned checkout email",
  },
  {
    label: "Post-Purchase",
    purpose:
      "Follows up after delivery to confirm satisfaction, offer care tips, and open the door to a second purchase.",
    image: undefined,
    alt: "Post-purchase email",
  },
  {
    label: "Win-Back",
    purpose:
      "Re-engages customers who've gone quiet, usually with a reason to return rather than a generic discount blast.",
    image: undefined,
    alt: "Win-back email",
  },
];

export function RetentionJourney() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % stages.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + stages.length) % stages.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = stages.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const stage = stages[active];

  return (
    <section className="container-1200 py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-fluid-h2 font-light text-balance text-foreground">
          Keep the conversation going.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Build a connected experience from the first signup to the next order.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-14 rounded-[2rem] border border-border bg-surface p-6 shadow-soft sm:p-10">
        <div
          role="tablist"
          aria-label="Retention journey stage"
          onKeyDown={onKeyDown}
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {stages.map((s, i) => (
            <button
              key={s.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={`min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5 ${
                active === i
                  ? "bg-accent text-background"
                  : "border border-border bg-background text-foreground/75 hover:border-foreground/30"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              <p className="text-xs font-semibold tracking-widest text-accent-2 uppercase">
                Stage {active + 1} of {stages.length}
              </p>
              <h3 className="font-display mt-3 text-2xl font-bold">{stage.label}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted">{stage.purpose}</p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={stage.label + "-visual"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="relative mx-auto aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-2xl border border-border shadow-soft"
            >
              {stage.image ? (
                <Image src={stage.image} alt={stage.alt} fill className="object-cover object-top" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-2 p-6 text-center">
                  <p className="text-xs font-semibold tracking-widest text-muted uppercase">
                    Illustrative
                  </p>
                  <p className="text-sm text-muted">Screenshot coming soon</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
