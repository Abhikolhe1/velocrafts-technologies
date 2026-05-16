import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import ServicesGrid from "../components/home/ServicesGrid";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import ProcessTimeline from "../components/home/ProcessTimeline";
import PortfolioShowcase from "../components/home/PortfolioShowcase";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTASection from "../components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesGrid />
      <WhyChooseUsSection />
      <ProcessTimeline />
      <PortfolioShowcase />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
