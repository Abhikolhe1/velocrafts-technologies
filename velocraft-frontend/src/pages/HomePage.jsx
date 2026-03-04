import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import HowWeWork from '../components/HowWeWork';
import PortfolioGrid from '../components/PortfolioGrid';
import TestimonialSlider from '../components/TestimonialSlider';
import AnimateOnScroll from '../components/AnimateOnScroll';
import AnimateStagger from '../components/AnimateStagger';

function AboutTeaser() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="slide-in-left" delay={0.5} className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">About Velocrafts</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We are committed to empowering businesses through innovative digital solutions. 
              Our mission is to transform ideas into scalable, high-performance applications 
              that drive growth and efficiency.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center text-accent font-semibold hover:underline"
            >
              Learn more about us
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <AnimateStagger animation="soft-zoom" className="grid grid-cols-2 gap-4" staggerDelay={0.25}>
            {[
              { value: '150+', label: 'Clients Served' },
              { value: '200+', label: 'Apps Built' },
              { value: '50+', label: 'Models Trained' },
              { value: '12', label: 'Global Partners' },
            ].map((m) => (
              <div key={m.label} className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col justify-center" style={{ height: '120px' }}>
                <div className="text-2xl font-bold text-primary">{m.value}</div>
                <p className="text-gray-600 text-sm truncate" title={m.label}>{m.label}</p>
              </div>
            ))}
          </AnimateStagger>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-14 md:py-20 bg-primary">
      <AnimateOnScroll animation="blur-in" delay={0.2} threshold={0.01} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
        <p className="text-white/90 text-lg mb-8">
          Get in touch with our team and let&apos;s turn your vision into reality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-block bg-accent text-primary font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            Request a Quote
          </Link>
          <Link
            to="/portfolio"
            className="inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
          >
            View Portfolio
          </Link>
        </div>
      </AnimateOnScroll>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <HowWeWork />
      <AboutTeaser />
      <PortfolioGrid showViewAll showFilters={false} maxItems={3} animateCards={false} headerAnimated={false} />
      <TestimonialSlider />
      <CTA />
    </>
  );
}
