"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { caseStudies } from "@/lib/case-studies";

const study = caseStudies[0];
const collage = [
  {
    piece: study.pieces[0],
    rotate: -3,
    z: 3,
    className: "right-0 top-0 w-[200px] md:w-[230px]",
  },
  {
    piece: study.pieces[2],
    rotate: 6,
    z: 2,
    className: "hidden sm:block right-[150px] top-16 w-[140px] md:right-[175px] md:w-[160px]",
  },
  {
    piece: study.pieces[4],
    rotate: -8,
    z: 1,
    className: "hidden lg:block right-[300px] top-6 w-[130px]",
  },
];

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

      <div className="relative h-[300px] w-full md:-mb-10 md:h-[340px]">
        {collage.map(({ piece, rotate, z, className }, i) => (
          <motion.div
            key={piece.subject}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: reduceMotion ? 0 : rotate }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EASE_OUT }}
            className={`absolute aspect-[9/16] overflow-hidden rounded-xl border border-border shadow-xl ${className}`}
            style={{ zIndex: z }}
          >
            {piece.image ? (
              <Image
                src={piece.image}
                alt={piece.subject}
                fill
                className="object-cover object-top"
                priority={i === 0}
              />
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
