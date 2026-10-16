import Link from "next/link";
import { Reveal } from "@/components/reveal";

export function HomeFinalCta() {
  return (
    <section className="relative overflow-hidden bg-forest py-24 text-center text-background md:py-32">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--mint), transparent 70%)" }}
      />
      <div className="noise-overlay" />
      <Reveal className="container-1200 relative">
        <h2 className="font-display text-fluid-h2 mx-auto max-w-2xl font-light text-balance">
          Give customers
          <br />
          <span className="text-mint">a reason to return.</span>
        </h2>
        <Link
          href="/contact"
          className="mt-9 inline-flex items-center justify-center rounded-full bg-mint px-8 py-4 text-sm font-semibold text-forest transition-transform hover:scale-[1.03] active:scale-[0.97]"
        >
          Book a Free Retention Audit
        </Link>
      </Reveal>
    </section>
  );
}
