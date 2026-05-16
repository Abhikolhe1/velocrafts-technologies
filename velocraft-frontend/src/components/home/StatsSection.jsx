import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: 30,
    suffix: "+",
    label: "Clients Served",
    desc: "Businesses empowered globally",
  },
  {
    value: 20,
    suffix: "+",
    label: "Apps Shipped",
    desc: "Production-grade applications",
  },
  {
    value: 10,
    suffix: "+",
    label: "AI Models Trained",
    desc: "Custom ML solutions deployed",
  },
  {
    value: 5,
    suffix: "+",
    label: "Global Partners",
    desc: "Strategic alliances worldwide",
  },
];

export default function StatsSection() {
  const sectionRef = useRef(null);
  const tweenRefs  = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance — one time only
      gsap.from(".stats-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Re-run counters every time the section enters the viewport
      const runCounters = () => {
        tweenRefs.current.forEach((t) => t?.kill());
        tweenRefs.current = STATS.map((stat, i) => {
          const el = sectionRef.current?.querySelector(`.sv-${i}`);
          if (!el) return null;
          el.textContent = `0${stat.suffix}`;
          const obj = { val: 0 };
          return gsap.to(obj, {
            val: stat.value,
            duration: 2.2,
            ease: "power2.out",
            onUpdate() {
              el.textContent = `${Math.round(obj.val)}${stat.suffix}`;
            },
          });
        });
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter:     runCounters,
        onEnterBack: runCounters,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--theme-surface-deep)",
        borderTop: "1px solid var(--theme-border-sm)",
        borderBottom: "1px solid var(--theme-border-sm)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "var(--theme-border-sm)" }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stats-card text-center py-12 px-6"
              style={{ background: "var(--theme-surface-deep)" }}
            >
              <div
                className={`sv-${i} text-5xl md:text-6xl font-bold mb-3`}
                style={{ color: "#818CF8", fontVariantNumeric: "tabular-nums" }}
              >
                0{stat.suffix}
              </div>
              <div
                className="text-sm font-semibold uppercase tracking-wider mb-1"
                style={{ color: "var(--theme-text)" }}
              >
                {stat.label}
              </div>
              <div className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
