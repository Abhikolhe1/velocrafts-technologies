import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "We understand your goals, users, and constraints through focused workshops and detailed stakeholder discussions.",
    icon: "🔍",
  },
  {
    num: "02",
    title: "Design",
    desc: "Wireframes, prototypes, and UX flows designed to validate ideas clearly before development begins.",
    icon: "✏️",
  },
  {
    num: "03",
    title: "Develop",
    desc: "Agile sprints with continuous delivery. You see real progress every two weeks — no surprises.",
    icon: "⚙️",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Launch, optimize, and scale. We support you through go-live and beyond with ongoing maintenance.",
    icon: "🚀",
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-title", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-steps",
          start: "top 65%",
          end: "bottom 35%",
          scrub: 1.5,
        },
      });

      gsap.from(".process-step", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.22,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-steps",
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "var(--theme-surface-alt)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="process-title text-center mb-20">
          <span
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ color: "#818CF8" }}
          >
            Our Process
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--theme-text)" }}
          >
            How We Work
          </h2>
          <p
            className="max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--theme-text-muted)" }}
          >
            A proven process that takes your idea from concept to production,
            delivered on time and within budget.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto process-steps">
          {/* Vertical line background track */}
          <div
            className="absolute top-6 bottom-6 w-[2px]"
            style={{
              left: "23px",
              background: "var(--theme-border)",
            }}
          >
            {/* Animated fill line */}
            <div
              ref={lineRef}
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(to bottom, #818CF8, rgba(129,140,248,0.2))",
              }}
            />
          </div>

          {steps.map((step, i) => (
            <div
              key={step.num}
              className="process-step relative flex gap-6 mb-8 last:mb-0"
            >
              {/* Dot / Number */}
              <div
                className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: "var(--theme-surface-alt)",
                  border: "2px solid #818CF8",
                  color: "#818CF8",
                }}
              >
                {i + 1}
              </div>

              {/* Card */}
              <div
                className="flex-1 rounded-2xl p-6 mb-2"
                style={{
                  background: "var(--theme-surface)",
                  border: "1px solid var(--theme-border)",
                  boxShadow: "var(--theme-card-shadow)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{step.icon}</span>
                  <div>
                    <span
                      className="text-xs font-mono block"
                      style={{ color: "rgba(129,140,248,0.5)" }}
                    >
                      {step.num}
                    </span>
                    <h3
                      className="text-base font-bold leading-tight"
                      style={{ color: "var(--theme-text)" }}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(129,140,248,0.4)]"
            style={{ background: "#818CF8", color: "#050816" }}
          >
            Start Your Project
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
