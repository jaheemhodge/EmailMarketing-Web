import Link from "next/link";
import { Mail, MessageSquare, GitBranch, PenTool } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { services } from "@/lib/content";

const icons = [Mail, MessageSquare, GitBranch, PenTool];

export function ServicesGrid() {
  return (
    <section id="services" className="container-1200 py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-fluid-h2 font-light text-balance text-foreground">
          Every message.
          <br />
          <span className="text-accent-2">Part of a bigger plan.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={service.number} delay={i * 0.07}>
              <Link
                href="/services"
                className="group flex h-full flex-col rounded-2xl border border-border bg-background p-7 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-accent-2/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-accent transition-colors group-hover:border-accent-2/50">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="font-display mt-5 text-lg font-bold">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
