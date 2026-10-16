"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, Route, Hammer, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { EASE_OUT } from "@/lib/motion";
import { process } from "@/lib/content";

const icons = [Search, Route, Hammer, TrendingUp];

const deliverables = [
  ["Full flow & campaign review", "Prioritized fix list, ranked by revenue impact", "A clear action plan you can hand to any team"],
  ["Flow & segmentation map", "Offer and incentive plan", "Lifecycle roadmap"],
  ["Welcome, abandoned cart/checkout & post-purchase flows", "Full flow strategy & architecture", "Copy + design, built and QA'd inside Klaviyo"],
  ["Monthly campaign planning & execution", "List & segment management", "Monthly reporting & performance reviews"],
];

export function ProcessSteps() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % process.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + process.length) % process.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = process.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const step = process[active];
  const Icon = icons[active];

  return (
    <section id="process" className="border-t border-border bg-surface/40 py-24 md:py-32">
      <div className="container-1200">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-fluid-h2 font-light text-balance text-foreground">
            A simple process,
            <br />
            <span className="text-accent-2">run the same way every time.</span>
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-14 rounded-[2rem] border border-border bg-background p-6 shadow-soft sm:p-10"
        >
          <div
            role="tablist"
            aria-label="Process steps"
            onKeyDown={onKeyDown}
            className="flex gap-2 overflow-x-auto sm:justify-center sm:gap-3"
          >
            {process.map((s, i) => (
              <button
                key={s.number}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={`min-h-11 shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5 ${
                  active === i
                    ? "bg-accent text-background"
                    : "border border-border text-foreground/75 hover:border-foreground/30"
                }`}
              >
                {s.number} {s.title}
              </button>
            ))}
          </div>

          <div className="mt-10 grid min-h-[320px] gap-10 md:min-h-[260px] md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              >
                <h3 className="font-display text-2xl font-bold">{step.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{step.description}</p>
                <ul className="mt-5 space-y-2">
                  {deliverables[active].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={step.number + "-visual"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-surface-2 text-accent md:h-48 md:w-48"
              >
                <Icon className="h-14 w-14" strokeWidth={1.25} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
