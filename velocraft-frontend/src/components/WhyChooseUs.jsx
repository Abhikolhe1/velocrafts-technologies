import AnimateOnScroll from './AnimateOnScroll';
import AnimateStagger from './AnimateStagger';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Agile Delivery',
    description: 'Iterative sprints with regular demos. Get visibility and feedback at every stage—no surprises at launch.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Enterprise Security',
    description: 'Bank-grade security, compliance-ready architectures, and rigorous testing. Your data stays protected.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Ongoing Support',
    description: 'Post-launch maintenance, updates, and scaling. We stay with you as your product grows.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Dedicated Team',
    description: 'A dedicated team aligned to your goals. No handoffs, no context loss—consistent ownership.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="slide-in-right" delay={0.4} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We combine technical excellence with a client-first approach. Here&apos;s what sets us apart.
          </p>
        </AnimateOnScroll>
        <AnimateStagger animation="soft-zoom" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.25}>
          {features.map((item) => (
            <div
              key={item.title}
              className="group text-center flex flex-col"
              style={{ height: '220px' }}
            >
              <div className="w-14 h-14 mx-auto mb-4 flex-shrink-0 rounded-xl bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2 flex-shrink-0 line-clamp-1" title={item.title}>{item.title}</h3>
              <p
                className="text-gray-600 text-sm leading-relaxed overflow-y-auto flex-1 min-h-0"
                title={item.description}
              >
                {item.description}
              </p>
            </div>
          ))}
        </AnimateStagger>
      </div>
    </section>
  );
}
