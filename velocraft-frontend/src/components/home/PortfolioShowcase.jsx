import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioShowcase() {
  const sectionRef = useRef(null);
  const featured = projects.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".port-heading", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".port-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".port-grid",
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardEnter = (e) => {
    gsap.to(e.currentTarget, { y: -8, duration: 0.4, ease: "power2.out" });
    e.currentTarget.style.borderColor = "rgba(129,140,248,0.28)";
    e.currentTarget.style.boxShadow = "0 8px 40px rgba(129,140,248,0.12), 0 0 0 1px rgba(129,140,248,0.12)";
  };

  const handleCardLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, duration: 0.4, ease: "power2.out" });
    e.currentTarget.style.borderColor = "var(--theme-border)";
    e.currentTarget.style.boxShadow = "var(--theme-card-shadow)";
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "var(--theme-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="port-heading flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
          <div>
            <span
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
              style={{ color: "#818CF8" }}
            >
              Case Studies
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "var(--theme-text)" }}
            >
              Portfolio
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
            style={{ color: "#818CF8" }}
          >
            View All Projects
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

        {/* Cards */}
        <div className="port-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.slug}`}
              className="port-card group block relative rounded-2xl overflow-hidden transition-colors duration-300"
              style={{
                background: "var(--theme-surface)",
                border: "1px solid var(--theme-border)",
                boxShadow: "var(--theme-card-shadow)",
              }}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            >
              {/* Image with overlay */}
              <div className="relative overflow-hidden" style={{ height: "220px" }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "var(--theme-img-overlay)" }}
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{
                      background: "rgba(129,140,248,0.15)",
                      color: "#818CF8",
                      border: "1px solid rgba(129,140,248,0.2)",
                    }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{
                        background: "var(--theme-border)",
                        color: "#6b7280",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <h3
                  className="text-base font-bold mb-2 transition-colors duration-200 group-hover:text-accent"
                  style={{ color: "var(--theme-text)" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm line-clamp-2 leading-relaxed"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  {project.shortDescription}
                </p>

                {/* Arrow */}
                <div
                  className="flex items-center gap-1.5 mt-4 text-xs font-semibold"
                  style={{ color: "#818CF8" }}
                >
                  View Case Study
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
