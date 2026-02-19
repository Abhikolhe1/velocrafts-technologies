import { Link } from 'react-router-dom';
import AnimateOnScroll from './AnimateOnScroll';
import AnimateStagger from './AnimateStagger';

const steps = [
  { number: '01', title: 'Discover', desc: 'We understand your goals, users, and constraints through workshops and stakeholder interviews.' },
  { number: '02', title: 'Design', desc: 'Wireframes, prototypes, and UX flows. We validate before we build.' },
  { number: '03', title: 'Develop', desc: 'Agile sprints with continuous delivery. You see progress every two weeks.' },
  { number: '04', title: 'Deploy', desc: 'Launch, optimize, and scale. We support you through go-live and beyond.' },
];

export default function HowWeWork() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="slide-in-up" delay={0.4} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">How We Work</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A proven process that brings your idea from concept to production—on time and on budget.
          </p>
        </AnimateOnScroll>
        <AnimateStagger animation="slide-in-up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.2}>
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col"
                style={{ height: '220px' }}
              >
                <span className="text-4xl font-bold text-accent/30 flex-shrink-0">{step.number}</span>
                <h3 className="text-xl font-semibold text-primary mt-2 mb-3 flex-shrink-0 line-clamp-1" title={step.title}>{step.title}</h3>
                <p
                  className="text-gray-600 text-sm leading-relaxed overflow-y-auto flex-1 min-h-0"
                  title={step.desc}
                >
                  {step.desc}
                </p>
              </div>
              {step.number !== '04' && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30 -translate-y-1/2" aria-hidden="true" />
              )}
            </div>
          ))}
        </AnimateStagger>
        <AnimateOnScroll animation="fade-in" delay={0.2} className="text-center mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center text-accent font-semibold hover:underline"
          >
            Start your project
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
