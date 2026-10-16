import { Reveal } from "@/components/reveal";
import { services } from "@/lib/content";

export function ServicesGrid() {
  return (
    <section id="services" className="container-page border-t border-border py-20 md:py-28">
      <Reveal className="grid gap-8 md:grid-cols-[auto_1fr]">
        <div className="hidden flex-col justify-between md:flex">
          {services.map((s) => (
            <span key={s.number} className="font-display text-6xl font-bold text-border">
              {s.number}
            </span>
          ))}
        </div>
        <div className="divide-y divide-border">
          {services.map((s) => (
            <div key={s.number} className="flex items-start gap-6 py-7">
              <span className="font-display text-sm font-bold text-accent-2 md:hidden">
                {s.number}
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-muted">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
