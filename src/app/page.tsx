import { Hero } from "@/components/hero";
import { ServicesGrid } from "@/components/services-grid";
import { WorkPreview } from "@/components/work-preview";
import { HomePricingTable } from "@/components/home-pricing-table";
import { HomeProcessTimeline } from "@/components/home-process-timeline";
import { HomeCta } from "@/components/home-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WorkPreview />
      <HomePricingTable />
      <HomeProcessTimeline />
      <HomeCta />
    </>
  );
}
