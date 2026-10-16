"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { EmailFrame } from "@/components/email-frame";
import type { ShowcaseItem } from "@/lib/chat-showcase";

export function PortfolioGroup({
  text,
  label,
  items,
  moreItems,
}: {
  text: string;
  label: "client" | "concept";
  items: ShowcaseItem[];
  moreItems?: ShowcaseItem[];
}) {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const shown = expanded && moreItems ? [...items, ...moreItems] : items;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="flex justify-start"
    >
      <div className="max-w-[92%] sm:max-w-[85%]">
        <p className="rounded-2xl rounded-bl-sm border border-border bg-surface px-4 py-3 text-[15px] leading-relaxed text-foreground">
          {text}
        </p>

        <span
          className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${
            label === "client" ? "bg-accent-2/15 text-accent-2" : "bg-surface-2 text-muted"
          }`}
        >
          {label === "client" ? "Client work" : "Concept work — self-initiated, not commissioned by the brand"}
        </span>

        <div className="mt-4 flex flex-wrap gap-4">
          {shown.map((item) => (
            <div key={item.subject} className="w-[150px] sm:w-[180px]">
              <EmailFrame
                piece={{
                  subject: item.subject,
                  flow: item.workType,
                  image: item.image,
                  accent: item.accent,
                }}
                client={item.brand}
              />
              <p className="mt-2 text-xs font-semibold text-foreground">
                {item.brand} — {item.workType}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-muted">{item.purpose}</p>
            </div>
          ))}
        </div>

        {moreItems && !expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-4 inline-flex min-h-9 items-center text-sm font-semibold text-accent hover:opacity-80"
          >
            View more designs →
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}
