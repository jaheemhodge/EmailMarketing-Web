"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Picker, useRemountKey } from "./picker";
import { ProofFirst } from "./variants/proof-first";
import { Editorial } from "./variants/editorial";
import { NarrativeScroll } from "./variants/narrative-scroll";

const names = ["Proof-First", "Editorial", "Narrative Scroll"];
const variants = [ProofFirst, Editorial, NarrativeScroll];

function HomepagePrototypeInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = Math.min(
    Math.max((parseInt(searchParams.get("v") ?? "1", 10) || 1) - 1, 0),
    variants.length - 1
  );
  const [current, setCurrent] = useState(initial);
  const [remountKey, replay] = useRemountKey();

  const onSelect = useCallback(
    (i: number) => {
      if (i < 0 || i >= variants.length) return;
      setCurrent(i);
      const url = new URL(window.location.href);
      url.searchParams.set("v", String(i + 1));
      router.replace(`${url.pathname}?${url.searchParams.toString()}`, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    document.title = `Prototype: ${names[current]}`;
  }, [current]);

  const Variant = variants[current];

  return (
    <>
      <div key={`${current}-${remountKey}`}>
        <Variant />
      </div>
      <Picker names={names} current={current} onSelect={onSelect} onReplay={replay} />
    </>
  );
}

export default function HomepagePrototype() {
  return (
    <Suspense fallback={null}>
      <HomepagePrototypeInner />
    </Suspense>
  );
}
