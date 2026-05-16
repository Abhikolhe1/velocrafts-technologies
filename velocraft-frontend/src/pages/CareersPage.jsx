import AnimateOnScroll from '../components/AnimateOnScroll';

export default function CareersPage() {
  return (
    <>
      <section
        className="pt-40 py-20 relative overflow-hidden"
        style={{ background: "var(--theme-surface-deep)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 120%, rgba(129,140,248,0.12) 0%, transparent 60%)",
          }}
        />
        <AnimateOnScroll
          animation="blur-in"
          delay={0.2}
          threshold={0.01}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "var(--theme-text)" }}
            >
              Join Our Team
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: "var(--theme-text-2)" }}
            >
              We&apos;re always looking for talented individuals passionate about
              technology and innovation.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      <section
        className="py-20 md:py-28"
        style={{ background: "var(--theme-surface)" }}
      >
        <AnimateOnScroll
          animation="slide-in-right"
          delay={0.4}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--theme-text)" }}
          >
            Why Velocrafts?
          </h2>
          <p
            className="text-lg leading-relaxed mb-12"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Join a team that values innovation, quality, and growth. We offer
            competitive benefits, flexible work arrangements, and opportunities
            to work on cutting-edge projects.
          </p>
          <a
            href="mailto:careers@velocrafts.tech"
            className="inline-block font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
            style={{ background: "#818CF8", color: "#050816" }}
          >
            View Open Positions
          </a>
        </AnimateOnScroll>
      </section>
    </>
  );
}
