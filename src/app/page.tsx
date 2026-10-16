import { Hero } from "@/components/hero";
import { RetentionJourney } from "@/components/retention-journey";
import { ServicesGrid } from "@/components/services-grid";
import { WorkPreview } from "@/components/work-preview";
import { PricingTiers } from "@/components/pricing-tiers";
import { ProcessSteps } from "@/components/process-steps";
import { Faq } from "@/components/faq";
import { HomeFinalCta } from "@/components/home-final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <RetentionJourney />
      <ServicesGrid />
      <WorkPreview />
      <PricingTiers />
      <ProcessSteps />
      <Faq />
      <HomeFinalCta />
    </>
  );
}
