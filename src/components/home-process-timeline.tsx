import { Reveal } from "@/components/reveal";
import { process } from "@/lib/content";

export function HomeProcessTimeline() {
  return (
    <section className="container-page border-t border-border py-20 md:py-28">
      <Reveal>
        <h2 className="font-display max-w-xl text-3xl font-bold text-balance">How it works.</h2>
        <div className="relative mt-12 max-w-2xl border-l border-border pl-10">
          {process.map((step) => (
            <div key={step.number} className="relative pb-12 last:pb-0">
              <span className="font-display absolute top-0 -left-[3.3rem] text-2xl font-bold text-accent">
                {step.number}
              </span>
              <span className="absolute top-2 -left-[2.65rem] h-2 w-2 rounded-full bg-accent" />
              <h3 className="font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
