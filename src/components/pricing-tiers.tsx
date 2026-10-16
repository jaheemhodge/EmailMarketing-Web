import Link from "next/link";
import { Calendar, Crown, Layers, Search } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { engagementTiers } from "@/lib/content";

const icons = { search: Search, layers: Layers, calendar: Calendar, crown: Crown };

export function PricingTiers() {
  return (
    <section id="tiers" className="container-1200 py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-fluid-h2 font-light text-balance text-foreground">
          The right support.
          <br />
          <span className="text-accent-2">For your next stage.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {engagementTiers.map((tier, i) => {
          const Icon = icons[tier.icon];
          return (
            <Reveal key={tier.title} delay={i * 0.07} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <p className="mt-5 text-xs font-semibold tracking-widest text-accent-2 uppercase">
                  {tier.tag}
                </p>
                <h3 className="font-display mt-1 text-xl font-bold">{tier.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tier.tagline}</p>

                <p className="mt-5 text-xs font-semibold tracking-widest text-muted uppercase">
                  Best for
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{tier.bestFor}</p>

                <ul className="mt-5 flex-1 space-y-2">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-transform active:scale-[0.97]"
                >
                  Book a Call →
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
