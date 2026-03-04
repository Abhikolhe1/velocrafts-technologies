import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { teamMembers } from '../data/team'; // Used in Our Team section (commented)
import AnimateOnScroll from '../components/AnimateOnScroll';
import AnimateStagger from '../components/AnimateStagger';

const metrics = [
  { value: 150, suffix: '+', label: 'Clients Served' },
  { value: 200, suffix: '+', label: 'Apps Built' },
  { value: 50, suffix: '+', label: 'Models Trained' },
  { value: 12, suffix: '', label: 'Global Partners' },
];

function AnimatedCounter({ end, suffix }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end]);

  return <span>{count}{suffix}</span>;
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary">
        <AnimateOnScroll animation="blur-in" delay={0.2} threshold={0.01} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Velocrafts Technologies</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Empowering businesses with cutting-edge digital solutions since day one.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-28 bg-white">
        <AnimateOnScroll animation="slide-in-right" delay={0.4} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">Our Story</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Velocrafts Technologies was founded with a simple belief: every business deserves access 
              to world-class technology. We started as a small team of engineers and designers who 
              were frustrated by the gap between enterprise-grade solutions and accessible development.
            </p>
            <p>
              Today, we partner with startups and enterprises alike to build web applications, 
              mobile apps, AI workflows, and growth strategies that scale. Our approach combines 
              deep technical expertise with a commitment to understanding our clients&apos; unique challenges.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="slide-in-left" delay={0.3}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">Mission & Values</h2>
          </AnimateOnScroll>
          <AnimateStagger animation="soft-zoom" className="grid md:grid-cols-3 gap-8" staggerDelay={0.2}>
            <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col" style={{ height: '260px' }}>
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 flex-shrink-0">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2 flex-shrink-0">Innovation</h3>
              <p className="text-gray-600 overflow-y-auto flex-1 min-h-0" title="We embrace new technologies and methodologies to deliver solutions that stay ahead of the curve.">We embrace new technologies and methodologies to deliver solutions that stay ahead of the curve.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col" style={{ height: '260px' }}>
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 flex-shrink-0">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2 flex-shrink-0">Quality</h3>
              <p className="text-gray-600 overflow-y-auto flex-1 min-h-0" title="We deliver robust, maintainable code and design that meets the highest standards.">We deliver robust, maintainable code and design that meets the highest standards.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col" style={{ height: '260px' }}>
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 flex-shrink-0">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2 flex-shrink-0">Partnership</h3>
              <p className="text-gray-600 overflow-y-auto flex-1 min-h-0" title="We work alongside our clients as true partners, invested in their success.">We work alongside our clients as true partners, invested in their success.</p>
            </div>
          </AnimateStagger>
        </div>
      </section>

      {/* Team Section - commented out
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="slide-in-up" delay={0.3}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">Our Team</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Meet the people behind Velocrafts. Experts in technology, design, and delivery.
            </p>
          </AnimateOnScroll>
          <AnimateStagger animation="slide-in-up" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.25}>
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-accent/30 transition-colors flex flex-col"
                style={{ height: '320px' }}
              >
                <div className="w-20 h-20 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white font-bold text-xl mb-4">
                  {member.initials}
                </div>
                <span className="inline-block px-2 py-1 bg-accent/20 text-accent text-xs font-semibold rounded mb-2 uppercase flex-shrink-0 w-fit">
                  {member.type === 'owner' ? 'Founder' : member.type === 'leadership' ? 'Leadership' : 'Team'}
                </span>
                <h3 className="text-xl font-semibold text-primary flex-shrink-0 line-clamp-1" title={member.name}>{member.name}</h3>
                <p className="text-accent font-medium text-sm mb-2 flex-shrink-0">{member.role}</p>
                <p
                  className="text-gray-600 text-sm leading-relaxed overflow-y-auto flex-1 min-h-0"
                  title={member.bio}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>
      */}

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-white">
        <AnimateOnScroll animation="mask-reveal" delay={0.2} threshold={0.01} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">Our Impact</h2>
          <AnimateStagger animation="lift-in" className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.22}>
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter end={m.value} suffix={m.suffix} />
                </div>
                <p className="text-gray-600">{m.label}</p>
              </div>
            ))}
          </AnimateStagger>
          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-block bg-accent text-primary font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
