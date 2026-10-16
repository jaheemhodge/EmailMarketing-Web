import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { engagementTiers } from "@/lib/content";

export function PricingTiers() {
  return (
    <section id="tiers" className="container-page py-20 md:py-28">
      <Reveal>
        <h2 className="font-display max-w-xl text-3xl font-bold text-balance sm:text-4xl">
          Pick the level of ownership that fits where you are now.
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          Every brand needs something different from a retention partner. Start where you are,
          and move up the ladder when you&apos;re ready.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="w-40 border-b border-border pb-4 font-normal text-muted"> </th>
                {engagementTiers.map((tier) => (
                  <th key={tier.title} className="border-b border-border px-4 pb-4 align-bottom">
                    <p className="text-xs font-semibold tracking-widest text-accent-2 uppercase">
                      {tier.tag}
                    </p>
                    <p className="font-display mt-1 text-lg font-bold text-foreground">
                      {tier.title}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-border py-4 align-top text-xs font-semibold tracking-widest text-muted uppercase">
                  Best for
                </td>
                {engagementTiers.map((tier) => (
                  <td
                    key={tier.title}
                    className="border-b border-border px-4 py-4 align-top text-foreground/85"
                  >
                    {tier.bestFor}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border-b border-border py-4 align-top text-xs font-semibold tracking-widest text-muted uppercase">
                  You get
                </td>
                {engagementTiers.map((tier) => (
                  <td key={tier.title} className="border-b border-border px-4 py-4 align-top">
                    <ul className="space-y-1.5 text-foreground/85">
                      {tier.includes.map((item) => (
                        <li key={item}>— {item}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-5"> </td>
                {engagementTiers.map((tier) => (
                  <td key={tier.title} className="px-4 py-5">
                    <Link
                      href="/contact"
                      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform active:scale-[0.97] ${
                        tier.highlight
                          ? "bg-accent text-background"
                          : "border border-border text-foreground"
                      }`}
                    >
                      Book a Call →
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
