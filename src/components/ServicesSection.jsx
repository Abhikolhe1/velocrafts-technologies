import ServiceCard from './ServiceCard';
import AnimateOnScroll from './AnimateOnScroll';
import AnimateStagger from './AnimateStagger';
import {
  GlobeIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  MegaphoneIcon,
  PaintBrushIcon,
  CloudIcon,
  ChartBarIcon,
} from './icons';

const services = [
  {
    title: 'Web App Development',
    description: 'Scalable, secure web applications built with modern frameworks. From enterprise portals to SaaS platforms.',
    icon: <GlobeIcon />,
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile apps for iOS and Android. Flutter, React Native, and native development.',
    icon: <DevicePhoneMobileIcon />,
  },
  {
    title: 'AI Workflows & Model Training',
    description: 'Custom AI solutions, ML model development, and intelligent automation for your business processes.',
    icon: <CpuChipIcon />,
  },
  {
    title: 'Digital Marketing & SEO',
    description: 'Data-driven marketing strategies, SEO optimization, and growth campaigns that deliver measurable results.',
    icon: <MegaphoneIcon />,
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design that combines aesthetics with usability. Prototypes, wireframes, and design systems.',
    icon: <PaintBrushIcon />,
  },
  {
    title: 'Cloud & DevOps Solutions',
    description: 'Cloud migration, CI/CD pipelines, and infrastructure as code. AWS, Azure, and GCP expertise.',
    icon: <CloudIcon />,
  },
  {
    title: 'Analytics & Insights',
    description: 'Business intelligence, dashboards, and data analytics to drive informed decision-making.',
    icon: <ChartBarIcon />,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fade-in-up" delay={0.4} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            End-to-end digital solutions that transform your business and scale with your growth.
          </p>
        </AnimateOnScroll>

        <AnimateStagger
          animation="fade-in-up"
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
