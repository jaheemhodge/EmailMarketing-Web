import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

export function MessageBubble({ from, text }: { from: "jaheem" | "visitor"; text: string }) {
  const reduceMotion = useReducedMotion();
  const isVisitor = from === "visitor";

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className={`flex ${isVisitor ? "justify-end" : "justify-start"}`}
    >
      <p
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed sm:max-w-[75%] ${
          isVisitor
            ? "rounded-br-sm bg-accent text-background"
            : "rounded-bl-sm border border-border bg-surface text-foreground"
        }`}
      >
        {text}
      </p>
    </motion.div>
  );
}
