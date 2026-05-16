import { Link } from "react-router-dom";
import CtaButton from "../components/CtaButton";
import { useEffect, useRef, useState } from "react";
import AnimateOnScroll from "../components/AnimateOnScroll";
import AnimateStagger from "../components/AnimateStagger";

const metrics = [
  { value: 30, suffix: "+", label: "Clients Served" },
  { value: 20, suffix: "+", label: "Apps Built" },
  { value: 10, suffix: "+", label: "Models Trained" },
  { value: 5, suffix: "", label: "Global Partners" },
];

function AnimatedCounter({ end, suffix }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    const duration = 2000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
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
              About Velocrafts Technologies
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: "var(--theme-text-2)" }}
            >
              Empowering businesses with cutting edge digital solutions from day
              one.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Our Story Section */}
      <section
        className="py-20 md:py-28"
        style={{ background: "var(--theme-surface)" }}
      >
        <AnimateOnScroll
          animation="slide-in-right"
          delay={0.4}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            style={{ color: "var(--theme-text)" }}
          >
            Our Story
          </h2>
          <div
            className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed"
            style={{ color: "var(--theme-text-muted)" }}
          >
            <p>
              Velocrafts Technologies was founded with a simple belief: every
              business deserves access to world-class technology. We started as
              a small team of engineers and designers who were frustrated by the
              gap between enterprise-grade solutions and accessible development.
            </p>
            <p>
              Today, we partner with startups and enterprises alike to build web
              applications, mobile apps, AI workflows, and growth strategies
              that scale. Our approach combines deep technical expertise with a
              commitment to understanding our clients&apos; unique challenges.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Mission & Values Section */}
      <section
        className="py-20 md:py-28"
        style={{ background: "var(--theme-surface-alt)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="slide-in-left" delay={0.3}>
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              style={{ color: "var(--theme-text)" }}
            >
              Mission &amp; Values
            </h2>
          </AnimateOnScroll>
          <AnimateStagger
            animation="soft-zoom"
            className="grid md:grid-cols-3 gap-8"
            staggerDelay={0.2}
            threshold={0.01}
          >
            {[
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Innovation",
                text: "We embrace new technologies and methodologies to deliver solutions that stay ahead of the curve.",
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Quality",
                text: "We deliver robust, maintainable code and design that meets the highest standards.",
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                title: "Partnership",
                text: "We work alongside our clients as true partners, invested in their success.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl p-8 flex flex-col"
                style={{
                  height: "270px",
                  background: "var(--theme-surface)",
                  border: "1px solid var(--theme-border)",
                  boxShadow: "var(--theme-card-shadow)",
                }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={card.icon}
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-2 flex-shrink-0"
                  style={{ color: "var(--theme-text)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="overflow-y-auto flex-1 min-h-0"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  {card.text}
                </p>
              </div>
            ))}
          </AnimateStagger>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-20 md:py-28"
        style={{ background: "var(--theme-surface)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="blur-in" delay={0.2} threshold={0.01}>
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              style={{ color: "var(--theme-text)" }}
            >
              Our Impact
            </h2>
          </AnimateOnScroll>
          <AnimateStagger
            animation="lift-in"
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            staggerDelay={0.22}
            threshold={0.01}
          >
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: "#818CF8" }}
                >
                  <AnimatedCounter end={m.value} suffix={m.suffix} />
                </div>
                <p style={{ color: "var(--theme-text-muted)" }}>{m.label}</p>
              </div>
            ))}
          </AnimateStagger>
          <div className="text-center mt-12">
            <CtaButton to="/contact" variant="primary">
              Get in Touch
            </CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
