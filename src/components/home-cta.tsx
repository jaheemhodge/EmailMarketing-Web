import Link from "next/link";
import { Reveal } from "@/components/reveal";

export function HomeCta() {
  return (
    <section className="container-page border-t border-border py-20 md:py-28">
      <Reveal>
        <h2 className="font-display max-w-3xl text-4xl leading-[1.05] font-bold text-balance sm:text-5xl">
          Ready to make your list your best revenue channel?{" "}
          <Link href="/contact" className="text-accent underline underline-offset-8">
            Let&apos;s talk →
          </Link>
        </h2>
      </Reveal>
    </section>
  );
}
