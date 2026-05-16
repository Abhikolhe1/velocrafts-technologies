import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-child", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
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
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--theme-surface-deep)" }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 60%)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(129,140,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className="cta-child text-xs font-semibold tracking-[0.25em] uppercase mb-6 block"
          style={{ color: "#818CF8" }}
        >
          Let&apos;s Build Together
        </span>
        <h2
          className="cta-child text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ color: "var(--theme-text)" }}
        >
          Ready to Start
          <br />
          <span style={{ color: "#818CF8" }}>Your Project?</span>
        </h2>
        <p
          className="cta-child text-base md:text-lg mb-10 max-w-xl mx-auto"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Get in touch with our team and let&apos;s turn your vision into a
          world-class digital product that drives real results.
        </p>
        <div className="cta-child flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(129,140,248,0.5)]"
            style={{ background: "#818CF8", color: "#050816" }}
          >
            Request a Quote
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
          <Link
            to="/portfolio"
            className="hover-glass inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300"
            style={{
              border: "1px solid var(--theme-border-md)",
              color: "var(--theme-text)",
            }}
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
