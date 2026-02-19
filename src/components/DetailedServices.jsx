import { GlobeIcon, DevicePhoneMobileIcon, CpuChipIcon } from './icons';

const services = [
  {
    title: 'Web App Development',
    description: 'We build scalable, secure web applications using modern stacks like React, Next.js, Vue, and Node.js. Our solutions range from enterprise portals to SaaS platforms, with emphasis on performance, SEO, and maintainability.',
    features: ['Responsive Design', 'API Integration', 'CMS Integration', 'Progressive Web Apps'],
    icon: <GlobeIcon />,
    imageSide: 'right',
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile apps for iOS and Android. We use Flutter, React Native, and Swift/Kotlin to deliver apps that perform beautifully across all devices.',
    features: ['iOS & Android', 'Offline Support', 'Push Notifications', 'App Store Deployment'],
    icon: <DevicePhoneMobileIcon />,
    imageSide: 'left',
  },
  {
    title: 'AI Workflows & Model Training',
    description: 'Custom AI solutions including NLP, computer vision, and predictive analytics. We design, train, and deploy ML models that integrate seamlessly with your existing systems.',
    features: ['Custom ML Models', 'LLM Integration', 'Automation Pipelines', 'Data Engineering'],
    icon: <CpuChipIcon />,
    imageSide: 'right',
  },
];

export default function DetailedServices() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Deep-Dive Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive solutions tailored to your business needs.
          </p>
        </div>

        {services.map((service, index) => (
          <div
            key={service.title}
            className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 last:mb-0 ${
              service.imageSide === 'left' ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className={service.imageSide === 'left' ? 'lg:order-2' : ''}>
              <div className="w-16 h-16 mb-6 text-primary">{service.icon}</div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">{service.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{service.description}</p>
              <ul className="grid grid-cols-2 gap-3 mb-8">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-block bg-accent text-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Get a Quote
              </a>
            </div>
            <div className={`bg-gradient-to-br from-primary to-secondary rounded-2xl aspect-video flex items-center justify-center ${service.imageSide === 'left' ? 'lg:order-1' : ''}`}>
              <div className="text-white/20">
                {service.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
