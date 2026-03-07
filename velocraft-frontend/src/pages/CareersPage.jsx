import AnimateOnScroll from '../components/AnimateOnScroll';

export default function CareersPage() {
  return (
    <>
      <section className="pt-32 pb-20" style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #16213e 50%, #1a1f3a 100%)' }}>
        <AnimateOnScroll animation="blur-in" delay={0.2} threshold={0.01} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join Our Team</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              We&apos;re always looking for talented individuals passionate about technology and innovation.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <AnimateOnScroll animation="slide-in-right" delay={0.4} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-6">Why Velocrafts?</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            Join a team that values innovation, quality, and growth. We offer competitive benefits, 
            flexible work arrangements, and opportunities to work on cutting-edge projects.
          </p>
          <a
            href="mailto:careers@velocrafts.tech"
            className="inline-block bg-accent text-primary font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            View Open Positions
          </a>
        </AnimateOnScroll>
      </section>
    </>
  );
}
