import ServiceCard from "./ServiceCard";
import AnimateOnScroll from "./AnimateOnScroll";
import AnimateStagger from "./AnimateStagger";
import {
  GlobeIcon,
  DevicePhoneMobileIcon,
  CommandLineIcon,
  CpuChipIcon,
  MegaphoneIcon,
  PaintBrushIcon,
  CloudIcon,
  ChartBarIcon,
} from "./icons";

const services = [
  {
    title: "Web App Development",
    description:
      "We build secure, scalable web applications for enterprises and SaaS platforms using modern frameworks.",
    icon: <GlobeIcon />,
  },
  {
    title: "Mobile App Development",
    description:
      "We develop native and cross platform mobile apps for iOS and Android using Flutter, React Native, and other modern technologies.",
    icon: <DevicePhoneMobileIcon />,
  },
  {
    title: "Generative & Agentic AI Development",
    description:
      "LLM powered applications, AI copilots, autonomous agents, and RAG systems designed for enterprise and SaaS automation needs.",
    icon: <CommandLineIcon />,
  },
  {
    title: "AI Workflows & Model Training",
    description:
      "Custom AI solutions, ML model development, and intelligent automation for your business processes.",
    icon: <CpuChipIcon />,
  },
  {
    title: "Digital Marketing & SEO",
    description:
      "Data driven marketing strategies, SEO optimization, and growth campaigns focused on delivering real, measurable results.",
    icon: <MegaphoneIcon />,
  },
  {
    title: "UI/UX Design",
    description:
      "User centered design blending aesthetics with usability, including wireframes, prototypes, and complete design systems.",
    icon: <PaintBrushIcon />,
  },
  {
    title: "Cloud & DevOps Solutions",
    description:
      "Cloud migration, CI CD pipelines, and infrastructure as code with strong expertise across AWS, Azure, and GCP.",
    icon: <CloudIcon />,
  },
  {
    title: "Analytics & Insights",
    description:
      "Business intelligence, interactive dashboards, and data analytics that help you make smarter, informed decisions.",
    icon: <ChartBarIcon />,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll
          animation="blur-in"
          delay={0.4}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Complete digital solutions designed to transform your business and
            support long term growth at every stage.
          </p>
        </AnimateOnScroll>

        <AnimateStagger
          animation="lift-in"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          staggerDelay={0.2}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </AnimateStagger>
      </div>
    </section>
  );
}
