import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { processSteps } from "@/lib/chat-script";

export function ProcessBlock() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="flex justify-start"
    >
      <div className="flex max-w-[92%] flex-wrap items-center gap-x-2 gap-y-2 rounded-2xl rounded-bl-sm border border-border bg-surface px-4 py-3.5 sm:max-w-[85%]">
        {processSteps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{step}</span>
            {i < processSteps.length - 1 ? <span className="text-muted">→</span> : null}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
