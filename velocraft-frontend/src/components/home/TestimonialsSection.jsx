import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Velocrafts delivered our mobile app on time and exceeded our expectations. Their team's expertise in Flutter and attention to detail made the entire process smooth.",
    name: "Sarah Chen",
    role: "CEO",
    company: "HealthBridge",
    avatar: "SC",
  },
  {
    quote:
      "We partnered with Velocrafts for our AI-driven analytics platform. They understood our requirements deeply and built a solution that has transformed our operations.",
    name: "Michael Roberts",
    role: "CTO",
    company: "DataFlow Inc",
    avatar: "MR",
  },
  {
    quote:
      "From initial concept to deployment, Velocrafts was professional and responsive. Our e-commerce platform has seen a 60% increase in conversions since launch.",
    name: "Emma Wilson",
    role: "Marketing Director",
    company: "ShopEase",
    avatar: "EW",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const slidesRef = useRef([]);
  const [active, setActive] = useState(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testi-heading", {
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
      gsap.from(".testi-card", {
        y: 50,
        opacity: 0,
        scale: 0.97,
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

  // Initialize slides visibility
  useEffect(() => {
    slidesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { display: i === 0 ? "block" : "none", opacity: i === 0 ? 1 : 0 });
    });
  }, []);

  const goTo = useCallback(
    (idx) => {
      if (isAnimating.current || idx === active) return;
      isAnimating.current = true;

      const current = slidesRef.current[active];
      const next = slidesRef.current[idx];
      if (!current || !next) {
        isAnimating.current = false;
        return;
      }

      gsap
        .timeline({
          onComplete: () => {
            isAnimating.current = false;
          },
        })
        .to(current, { opacity: 0, y: -20, duration: 0.35, ease: "power2.in" })
        .call(() => {
          gsap.set(current, { display: "none" });
          gsap.set(next, { display: "block", opacity: 0, y: 30 });
        })
        .to(next, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });

      setActive(idx);
    },
    [active]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((active + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [active, goTo]);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "var(--theme-surface-alt)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="testi-heading text-center mb-16">
          <span
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ color: "#818CF8" }}
          >
            Testimonials
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "var(--theme-text)" }}
          >
            What Our Clients Say
          </h2>
        </div>

        {/* Card */}
        <div
          className="testi-card relative rounded-3xl p-8 md:p-14"
          style={{
            background: "var(--theme-surface)",
            border: "1px solid var(--theme-border)",
            boxShadow: "var(--theme-card-shadow-md)",
          }}
        >
          {/* Decorative large quote */}
          <div
            className="absolute top-6 right-8 text-9xl font-bold leading-none pointer-events-none select-none"
            style={{ color: "rgba(129,140,248,0.05)", fontFamily: "Georgia, serif" }}
          >
            &ldquo;
          </div>

          {/* Slides */}
          {testimonials.map((t, i) => (
            <div key={i} ref={(el) => (slidesRef.current[i] = el)}>
              <blockquote
                className="text-lg md:text-xl leading-relaxed mb-10 text-center relative z-10"
                style={{ color: "var(--theme-text-2)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "rgba(129,140,248,0.12)",
                    color: "#818CF8",
                    border: "2px solid rgba(129,140,248,0.3)",
                  }}
                >
                  {t.avatar}
                </div>
                <div className="text-center">
                  <p
                    className="font-bold text-sm"
                    style={{ color: "var(--theme-text)" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--theme-text-muted)" }}>
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "28px" : "8px",
                  height: "8px",
                  background:
                    i === active ? "#818CF8" : "var(--theme-dot)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
