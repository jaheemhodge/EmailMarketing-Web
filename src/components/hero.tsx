"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { caseStudies } from "@/lib/case-studies";

const study = caseStudies[0];
const heroPiece = study.pieces[0];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
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
        animate={{ opacity: 1, y: 0, rotate: reduceMotion ? 0 : -3 }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
        className="relative ml-auto aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-xl border border-border shadow-xl md:-mb-10 md:max-w-[260px]"
      >
        {heroPiece.image ? (
          <Image
            src={heroPiece.image}
            alt={heroPiece.subject}
            fill
            className="object-cover object-top"
            priority
          />
        ) : null}
      </motion.div>
    </section>
  );
}
