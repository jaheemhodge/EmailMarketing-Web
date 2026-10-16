import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { serviceFlows } from "@/lib/chat-script";

export function ServiceCardsBlock() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="flex justify-start"
    >
      <div className="grid w-full max-w-[92%] gap-2.5 sm:max-w-[85%] sm:grid-cols-2">
        {serviceFlows.map((flow) => (
          <div key={flow.title} className="rounded-xl border border-border bg-surface p-4">
            <p className="font-display text-sm font-bold text-foreground">{flow.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">{flow.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
