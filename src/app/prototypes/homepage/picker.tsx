"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./picker.css";

export function Picker({
  names,
  current,
  onSelect,
  onReplay,
}: {
  names: string[];
  current: number;
  onSelect: (i: number) => void;
  onReplay: () => void;
}) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const pickerRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  const moveHighlight = () => {
    const el = itemRefs.current[current];
    const highlight = highlightRef.current;
    if (!el || !highlight) return;
    highlight.style.width = `${el.offsetWidth}px`;
    highlight.style.transform = `translateX(${el.offsetLeft}px)`;
  };

  useLayoutEffect(() => {
    moveHighlight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    moveHighlight();
    window.addEventListener("resize", moveHighlight);
    const raf1 = requestAnimationFrame(() =>
      requestAnimationFrame(() => setReady(true))
    );
    return () => {
      window.removeEventListener("resize", moveHighlight);
      cancelAnimationFrame(raf1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= names.length) onSelect(num - 1);
      else if (e.key === "ArrowRight") onSelect((current + 1) % names.length);
      else if (e.key === "ArrowLeft") onSelect((current - 1 + names.length) % names.length);
      else if (e.key === "r" || e.key === "R") onReplay();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [current, names.length, onSelect, onReplay]);

  return (
    <nav
      ref={pickerRef}
      className="proto-picker"
      aria-label="Prototype variants"
      data-ready={ready ? "" : undefined}
    >
      <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true" />
      {names.map((name, i) => (
        <button
          key={name}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          type="button"
          className="proto-picker-item"
          data-active={i === current ? "" : undefined}
          aria-current={i === current ? "true" : undefined}
          onClick={() => onSelect(i)}
        >
          {name}
        </button>
      ))}
      <span className="proto-picker-divider" aria-hidden="true" />
      <button
        type="button"
        className="proto-picker-item proto-picker-replay"
        aria-label="Replay animation (R)"
        onClick={onReplay}
      >
        ↻
      </button>
    </nav>
  );
}

export function useRemountKey() {
  const [key, setKey] = useState(0);
  return [key, () => setKey((k) => k + 1)] as const;
}
