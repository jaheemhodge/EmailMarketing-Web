"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { EASE_OUT } from "@/lib/motion";
import { site } from "@/lib/site";

const faqs = [
  {
    q: "Can you improve an existing Klaviyo setup?",
    a: "Yes — that's exactly what a Retention Audit does. We review your existing flows and campaigns, find what's underperforming, and give you a prioritized list of what to fix first.",
  },
  {
    q: "Do you handle both copy and design?",
    a: "Yes. Design and copy are built together, not handed off between people — every email is written to be clicked and designed to be read.",
  },
  {
    q: "Can we start with an audit?",
    a: "Yes — the Retention Audit is built as a standalone first step. You get a clear picture of what's working and what's leaking revenue before committing to anything larger.",
  },
  {
    q: "What is included in ongoing management?",
    a: "Depending on the tier, ongoing management covers monthly campaign planning and execution, list and segment management, and monthly reporting — or, with Full Management, complete email and SMS strategy with ongoing segmentation and testing.",
  },
  {
    q: "How do we get started?",
    a: `Book a free retention audit through the contact page, or email ${site.email} directly. From there we run through the same process every time: Audit, Strategy, Build, Optimize.`,
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="container-1200 py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-fluid-h2 font-light text-balance text-foreground">
          Questions, answered.
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-14 max-w-2xl divide-y divide-border border-y border-border">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex min-h-11 w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-base font-medium text-foreground">
                  {item.q}
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
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE_OUT }}
                className="overflow-hidden"
              >
                <p className="pb-6 leading-relaxed text-muted">{item.a}</p>
              </motion.div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
