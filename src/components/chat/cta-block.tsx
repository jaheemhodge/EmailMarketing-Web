import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

export function CtaBlock() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="flex flex-wrap items-center gap-3 pt-1"
    >
      <Link
        href="/contact"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03] active:scale-[0.97]"
      >
        Let&apos;s talk about your brand
      </Link>
      <Link
        href="/work"
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30"
      >
        Explore more emails
      </Link>
    </motion.div>
  );
}
