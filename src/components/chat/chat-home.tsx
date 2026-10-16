"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { chatScript, shortcuts } from "@/lib/chat-script";
import { bitterTruthShowcase, conceptShowcaseDefault, conceptShowcaseMore } from "@/lib/chat-showcase";
import { MessageBubble } from "@/components/chat/message-bubble";
import { PortfolioGroup } from "@/components/chat/portfolio-group";
import { ServiceCardsBlock } from "@/components/chat/service-cards-block";
import { ProcessBlock } from "@/components/chat/process-block";
import { CtaBlock } from "@/components/chat/cta-block";
import { TypingIndicator } from "@/components/chat/typing-indicator";

const delayForBlock = (block: (typeof chatScript)[number]) => {
  switch (block.type) {
    case "portfolio":
    case "service-cards":
      return 650;
    case "process":
      return 550;
    default:
      return 450;
  }
};

export function ChatHome() {
  const reduceMotion = useReducedMotion();
  const [revealedCount, setRevealedCount] = useState(reduceMotion ? chatScript.length : 0);
  const [typing, setTyping] = useState(false);
  const followRef = useRef(true);
  const cancelledRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const mountedOnceRef = useRef(false);

  useEffect(() => {
    if (reduceMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;

    function step() {
      if (cancelledRef.current || i >= chatScript.length) return;
      setTyping(true);
      const t = setTimeout(() => {
        if (cancelledRef.current) return;
        setTyping(false);
        setRevealedCount((c) => Math.max(c, i + 1));
        i += 1;
        timers.push(setTimeout(step, 180));
      }, delayForBlock(chatScript[i]));
      timers.push(t);
    }
    step();

    return () => {
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onScroll() {
      const distanceFromBottom =
        document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      if (distanceFromBottom > 160) followRef.current = false;
      else if (distanceFromBottom <= 80) followRef.current = true;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mountedOnceRef.current) {
      mountedOnceRef.current = true;
      return;
    }
    if (followRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "end" });
    }
  }, [revealedCount, reduceMotion]);

  function revealAll() {
    cancelledRef.current = true;
    setTyping(false);
    setRevealedCount(chatScript.length);
  }

  function jumpTo(anchor: string) {
    revealAll();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById(`block-${anchor}`)
          ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      });
    });
  }

  const visible = chatScript.slice(0, revealedCount);
  const nextBlock = chatScript[revealedCount];

  return (
    <div className="mx-auto w-full max-w-[680px] px-5 pt-14 pb-24 sm:px-6 sm:pt-20">
      <div className="text-center">
        <p className="font-display text-lg font-bold tracking-tight text-foreground">JAH Media</p>
        <p className="mt-2 text-sm text-muted">Retention marketing for ecommerce brands.</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
          Email strategy, copy, and design that give customers a reason to come back.
        </p>
      </div>

      <div className="sticky top-4 z-30 mt-6 flex flex-wrap justify-center gap-2 rounded-full bg-background/80 py-1 backdrop-blur-sm">
        {shortcuts.map((s) => (
          <button
            key={s.anchor}
            type="button"
            onClick={() => jumpTo(s.anchor)}
            className="min-h-9 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-foreground/30 sm:text-sm"
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-5">
        {visible.map((block) => {
          const anchorId = block.anchor ? `block-${block.anchor}` : undefined;
          if (block.type === "text") {
            return (
              <div key={block.id} id={anchorId}>
                <MessageBubble from={block.from} text={block.text} />
              </div>
            );
          }
          if (block.type === "portfolio") {
            const items = block.label === "client" ? bitterTruthShowcase : conceptShowcaseDefault;
            const more = block.label === "client" ? undefined : conceptShowcaseMore;
            return (
              <div key={block.id} id={anchorId}>
                <PortfolioGroup text={block.text} label={block.label} items={items} moreItems={more} />
              </div>
            );
          }
          if (block.type === "service-cards") {
            return (
              <div key={block.id} id={anchorId}>
                <ServiceCardsBlock />
              </div>
            );
          }
          if (block.type === "process") {
            return (
              <div key={block.id} id={anchorId}>
                <ProcessBlock />
              </div>
            );
          }
          return (
            <div key={block.id} id={anchorId}>
              <CtaBlock />
            </div>
          );
        })}

        {typing ? <TypingIndicator /> : null}
      </div>

      {nextBlock ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={revealAll}
            className="min-h-9 text-sm font-semibold text-muted underline underline-offset-4 hover:text-foreground"
          >
            Show full conversation
          </button>
        </div>
      ) : null}

      <div ref={bottomRef} />
    </div>
  );
}
