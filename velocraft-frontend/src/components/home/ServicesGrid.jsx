import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GlobeIcon,
  DevicePhoneMobileIcon,
  CommandLineIcon,
  CpuChipIcon,
  MegaphoneIcon,
  PaintBrushIcon,
  CloudIcon,
  ChartBarIcon,
} from "../icons";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Web App Development",
    desc: "Secure, scalable web applications for enterprises and SaaS platforms using modern frameworks.",
    icon: <GlobeIcon />,
  },
  {
    num: "02",
    title: "Mobile App Development",
    desc: "Native and cross-platform apps for iOS and Android using Flutter, React Native, and more.",
    icon: <DevicePhoneMobileIcon />,
  },
  {
    num: "03",
    title: "Generative & Agentic AI",
    desc: "LLM-powered apps, AI copilots, autonomous agents, and RAG systems for enterprise automation.",
    icon: <CommandLineIcon />,
  },
  {
    num: "04",
    title: "AI Workflows & Training",
    desc: "Custom AI solutions, ML model development, and intelligent automation for your business.",
    icon: <CpuChipIcon />,
  },
  {
    num: "05",
    title: "Digital Marketing & SEO",
    desc: "Data-driven marketing strategies, SEO optimization, and growth campaigns with measurable results.",
    icon: <MegaphoneIcon />,
  },
  {
    num: "06",
    title: "UI/UX Design",
    desc: "User-centered design blending aesthetics with usability — wireframes, prototypes, design systems.",
    icon: <PaintBrushIcon />,
  },
  {
    num: "07",
    title: "Cloud & DevOps",
    desc: "Cloud migration, CI/CD pipelines, and infrastructure as code across AWS, Azure, and GCP.",
    icon: <CloudIcon />,
  },
  {
    num: "08",
    title: "Analytics & Insights",
    desc: "Business intelligence, dashboards, and data analytics for smarter, informed decisions.",
    icon: <ChartBarIcon />,
  },
];

export default function ServicesGrid() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-heading", {
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

      gsap.from(".svc-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: { amount: 0.8, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".svc-grid",
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, { y: -6, duration: 0.3, ease: "power2.out" });
    e.currentTarget.style.borderColor = "rgba(129,140,248,0.35)";
    e.currentTarget.style.boxShadow = "0 8px 40px rgba(129,140,248,0.1), 0 0 0 1px rgba(129,140,248,0.15)";
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: "power2.out" });
    e.currentTarget.style.borderColor = "var(--theme-border)";
    e.currentTarget.style.boxShadow = "var(--theme-card-shadow)";
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "var(--theme-surface-alt)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="svc-heading text-center mb-16">
          <span
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ color: "#818CF8" }}
          >
            What We Do
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--theme-text)" }}
          >
            Our Services
          </h2>
          <p
            className="max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Complete digital solutions designed to transform your business and
            support long-term growth at every stage.
          </p>
        </div>

        {/* Grid */}
        <div className="svc-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((svc) => (
            <div
              key={svc.num}
              className="svc-card relative rounded-2xl p-6 cursor-default transition-colors duration-300"
              style={{
                background: "var(--theme-surface)",
                border: "1px solid var(--theme-border)",
                boxShadow: "var(--theme-card-shadow)",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center p-2 flex-shrink-0"
                  style={{ background: "rgba(129,140,248,0.1)" }}
                >
                  <span className="text-accent block w-full h-full">
                    {svc.icon}
                  </span>
                </div>
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: "var(--theme-border-md)" }}
                >
                  {svc.num}
                </span>
              </div>
              <h3
                className="text-sm font-semibold mb-2 leading-snug"
                style={{ color: "var(--theme-text)" }}
              >
                {svc.title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--theme-text-muted)" }}
              >
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
