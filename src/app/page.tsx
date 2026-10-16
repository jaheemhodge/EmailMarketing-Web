import { Hero } from "@/components/hero";
import { ServicesGrid } from "@/components/services-grid";
import { WorkPreview } from "@/components/work-preview";
import { PricingTiers } from "@/components/pricing-tiers";
import { ProcessSteps } from "@/components/process-steps";
import { CtaBand } from "@/components/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WorkPreview />
      <PricingTiers />
      <ProcessSteps />
      <CtaBand />
    </>
  );
}
