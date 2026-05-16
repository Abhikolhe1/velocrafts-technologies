import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    num: "01",
    title: "Agile Delivery",
    desc: "Iterative sprints with regular demos and clear milestones. You see progress every two weeks — no black-box development.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Enterprise Security",
    desc: "Bank-grade security, compliance-ready architecture, and rigorous testing ensure your data stays protected.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Ongoing Support",
    desc: "Post-launch maintenance, regular updates, and scaling support so your product grows smoothly long after launch.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Dedicated Team",
    desc: "A team that's fully aligned with your goals — consistent ownership, deep context, no handoffs or knowledge loss.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function WhyChooseUsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-header", {
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

      gsap.from(".why-row", {
        x: -40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-rows",
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".why-aside", {
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
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
      style={{ background: "var(--theme-surface-deep)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="why-header mb-16">
          <span
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ color: "#818CF8" }}
          >
            Why Velocrafts
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "var(--theme-text)" }}
            >
              Why Choose Us
            </h2>
            <p
              className="text-base max-w-md leading-relaxed"
              style={{ color: "var(--theme-text-muted)" }}
            >
              We combine strong technical expertise with a client-first mindset
              — that&apos;s what truly sets us apart.
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: numbered feature rows (3 col span) */}
          <div className="why-rows lg:col-span-3 divide-y" style={{ borderColor: "var(--theme-border)" }}>
            {features.map((f, i) => (
              <div
                key={f.num}
                className="why-row group flex gap-6 py-8 first:pt-0 last:pb-0"
              >
                {/* Large decorative number */}
                <span
                  className="hidden sm:block text-4xl font-bold leading-none select-none flex-shrink-0 w-12 pt-1"
                  style={{ color: "rgba(129,140,248,0.1)", fontVariantNumeric: "tabular-nums" }}
                >
                  {f.num}
                </span>

                {/* Icon */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(129,140,248,0.1)",
                    color: "#818CF8",
                    border: "1px solid rgba(129,140,248,0.15)",
                  }}
                >
                  {f.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-base font-bold mb-2 transition-colors duration-200 group-hover:text-accent"
                    style={{ color: "var(--theme-text)" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: stats / proof panel (2 col span) */}
          <div className="why-aside lg:col-span-2">
            <div
              className="rounded-2xl p-8 sticky top-28"
              style={{
                background: "var(--theme-surface)",
                border: "1px solid rgba(129,140,248,0.12)",
                boxShadow: "var(--theme-card-shadow-md), 0 0 40px rgba(129,140,248,0.05)",
              }}
            >
              {/* Top accent */}
              <div
                className="h-px w-full mb-8"
                style={{
                  background:
                    "linear-gradient(90deg, #818CF8, rgba(129,140,248,0.1))",
                }}
              />

              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block"
                style={{ color: "#818CF8" }}
              >
                Our Track Record
              </span>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "var(--theme-text-muted)" }}
              >
                Numbers that reflect the trust businesses place in us to deliver excellence.
              </p>

              {/* Mini stat grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { val: "30+", label: "Clients" },
                  { val: "20+", label: "Apps" },
                  { val: "10+", label: "AI Models" },
                  { val: "100%", label: "Satisfaction" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-4 text-center"
                    style={{ background: "var(--theme-surface-subtle)" }}
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: "#818CF8" }}
                    >
                      {s.val}
                    </div>
                    <div className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="hover-glass flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  border: "1px solid var(--theme-border-md)",
                  color: "var(--theme-text)",
                }}
              >
                About Velocrafts
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
