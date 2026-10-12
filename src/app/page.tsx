import { CapabilityStrip } from "@/components/sections/capability-strip";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Principles } from "@/components/sections/principles";
import { Process } from "@/components/sections/process";
import { ResearchLearning } from "@/components/sections/research-learning";
import { ServicesOverview } from "@/components/sections/services-overview";
import { TechStack } from "@/components/sections/tech-stack";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <ServicesOverview />
      <FeaturedProjects />
      <Principles />
      <TechStack />
      <Process />
      <ResearchLearning />
      <FinalCta />
    </>
  );
}
