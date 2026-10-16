"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ShoppingBag, RefreshCw } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { caseStudies } from "@/lib/case-studies";

const study = caseStudies[0];
const welcome = study.pieces.find((p) => p.flow === "Welcome Flow") ?? study.pieces[0];
const followUp = study.pieces.find((p) => p.flow === "Abandoned Checkout") ?? study.pieces[2];

type JourneyNode =
  | { kind: "icon"; icon: typeof ShoppingBag; title: string; caption: string }
  | { kind: "email"; image?: string; alt: string; title: string; caption: string };

const journey: JourneyNode[] = [
  { kind: "icon", icon: ShoppingBag, title: "First order", caption: "Customer buys for the first time" },
  { kind: "email", image: welcome.image, alt: welcome.subject, title: "Welcome email", caption: "Real send, Bitter Truth Coffee" },
  { kind: "email", image: followUp.image, alt: followUp.subject, title: "Relevant follow-up", caption: "Real send, Bitter Truth Coffee" },
  { kind: "icon", icon: RefreshCw, title: "Repeat purchase", caption: "Customer comes back" },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-forest text-background">
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--forest-dark), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-40 h-[480px] w-[480px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--mint), transparent 72%)" }}
      />
      <div className="noise-overlay" />

      <div className="container-1200 relative grid gap-16 pt-36 pb-24 md:grid-cols-[1.05fr_1fr] md:gap-10 md:pt-44 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <p className="text-xs font-semibold tracking-[0.14em] text-mint uppercase">
            Retention marketing for ecommerce
          </p>
          <h1 className="font-display text-fluid-hero mt-6 font-light text-balance text-background">
            First purchase.
            <br />
            <span className="text-mint">Next chapter.</span>
          </h1>
          <p className="measure mt-7 text-lg leading-relaxed text-background/70">
            Email and SMS strategy, copy, and design that give your customers a reason to come
            back.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-mint px-7 py-3.5 text-sm font-semibold text-forest transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              Book a Free Retention Audit
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full border border-background/25 px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:border-background/50"
            >
              Explore Our Work
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          className="rounded-[2rem] border border-background/10 bg-background/[0.04] p-6 shadow-soft backdrop-blur-sm sm:p-8"
        >
          <p className="text-xs font-semibold tracking-widest text-background/50 uppercase">
            Illustrative — how a retention path connects
          </p>
          <div className="relative mt-6 flex flex-col gap-8">
            <motion.div
              initial={{ scaleY: reduceMotion ? 1 : 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.1, ease: EASE_OUT }}
              style={{ transformOrigin: "top" }}
              className="absolute top-6 bottom-6 left-10 w-px bg-background/15"
              aria-hidden="true"
            />
            {journey.map((node, i) => (
              <motion.div
                key={node.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: EASE_OUT }}
                className="relative flex items-center gap-5"
              >
                <div className="flex w-20 shrink-0 items-center justify-center">
                  {node.kind === "icon" ? (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-mint/40 bg-forest-dark text-mint">
                      <node.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                  ) : (
                    <div className="relative aspect-[9/16] w-[72px] overflow-hidden rounded-lg border border-background/15 shadow-soft">
                      {node.image ? (
                        <Image src={node.image} alt={node.alt} fill className="object-cover object-top" />
                      ) : null}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-display text-base font-medium text-background">{node.title}</p>
                  <p className="mt-0.5 text-xs text-background/55">{node.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
