import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import CtaButton from "../components/CtaButton";
import { fetchProjectById } from "../services/portfolioApi";
import AnimateOnScroll from "../components/AnimateOnScroll";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProject(null);
    fetchProjectById(id)
      .then((api) => {
        if (api) {
          setProject(api);
          setError(null);
        } else {
          setProject(null);
          setError("Failed to load project.");
        }
      })
      .catch(() => setError("Failed to load project."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section
        className="pt-32 pb-20 text-center"
        style={{ background: "var(--theme-bg)" }}
      >
        <p style={{ color: "var(--theme-text-muted)" }}>Loading project…</p>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section
        className="pt-32 pb-20 text-center"
        style={{ background: "var(--theme-bg)" }}
      >
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: "var(--theme-text)" }}
        >
          {error || "Project Not Found"}
        </h1>
        <CtaButton to="/portfolio" variant="primary">
          <span className="inline-flex items-center gap-2">
            <Icon icon="heroicons:arrow-left" className="w-4 h-4" /> Back
          </span>
        </CtaButton>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-12 relative overflow-hidden"
        style={{ background: "var(--theme-surface-deep)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 120%, rgba(129,140,248,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <CtaButton
              to="/portfolio"
              variant="primary"
              className="px-4! py-2! text-sm"
            >
              <span className="inline-flex items-center gap-2">
                <Icon icon="heroicons:arrow-left" className="w-4 h-4" /> Back
              </span>
            </CtaButton>
            <span
              className="inline-block font-semibold uppercase tracking-wider text-sm"
              style={{ color: "#818CF8" }}
            >
              {project.category}
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "var(--theme-text)" }}
          >
            {project.title}
          </h1>
          <p
            className="text-lg max-w-2xl mb-6"
            style={{ color: "var(--theme-text-2)" }}
          >
            {project.shortDescription}
          </p>
          <div
            className="flex flex-wrap gap-4 text-sm"
            style={{ color: "var(--theme-text-muted)" }}
          >
            <span>Client: {project.client}</span>
            <span>•</span>
            <span>Duration: {project.duration}</span>
            <span>•</span>
            <span>Team: {project.teamSize}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm rounded-lg"
                style={{
                  background: "rgba(129,140,248,0.15)",
                  color: "#818CF8",
                  border: "1px solid rgba(129,140,248,0.2)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Project image */}
      {project.image && (
        <section style={{ background: "var(--theme-surface-alt)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <img
              src={project.image}
              alt={project.title}
              className="w-full rounded-xl object-cover max-h-[480px]"
              style={{ boxShadow: "var(--theme-card-shadow-md)" }}
            />
          </div>
        </section>
      )}

      {/* Project Overview */}
      <section
        className="py-20 md:py-28"
        style={{ background: "var(--theme-surface)" }}
      >
        <AnimateOnScroll
          animation="slide-in-right"
          delay={0.4}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-6"
            style={{ color: "var(--theme-text)" }}
          >
            Project Overview
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--theme-text-muted)" }}
          >
            {project.description}
          </p>
          {project.keyFeatures && (
            <div className="mt-10">
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "var(--theme-text)" }}
              >
                Key Features
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    <span
                      className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5"
                      style={{
                        background: "rgba(129,140,248,0.15)",
                        color: "#818CF8",
                      }}
                    >
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </AnimateOnScroll>
      </section>

      {/* Challenge & Approach */}
      <section
        className="py-20 md:py-28"
        style={{ background: "var(--theme-surface-alt)" }}
      >
        <AnimateOnScroll
          animation="slide-in-left"
          delay={0.3}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid md:grid-cols-1 gap-16">
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: "var(--theme-text)" }}
              >
                The Challenge
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--theme-text-muted)" }}
              >
                {project.challenge}
              </p>
            </div>
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: "var(--theme-text)" }}
              >
                Our Approach
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--theme-text-muted)" }}
              >
                {project.approach}
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Results & Tech Stack */}
      <section
        className="py-20 md:py-28"
        style={{ background: "var(--theme-surface)" }}
      >
        <AnimateOnScroll
          animation="slide-in-up"
          delay={0.3}
          threshold={0.01}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--theme-text)" }}
              >
                Key Results
              </h2>
              <ul className="space-y-3">
                {project.results.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    <span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: "rgba(129,140,248,0.15)",
                        color: "#818CF8",
                      }}
                    >
                      ✓
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-12">
                <CtaButton to="/contact" variant="primary">
                  Start a Similar Project
                </CtaButton>
              </div>
            </div>
            <div>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--theme-text)" }}
              >
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 font-medium rounded-lg"
                    style={{
                      background: "var(--theme-surface-subtle)",
                      color: "var(--theme-text)",
                      border: "1px solid var(--theme-border-md)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <dl className="mt-8 space-y-4">
                <div>
                  <dt
                    className="text-sm font-semibold"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Client
                  </dt>
                  <dd style={{ color: "var(--theme-text-muted)" }}>
                    {project.client}
                  </dd>
                </div>
                <div>
                  <dt
                    className="text-sm font-semibold"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Duration
                  </dt>
                  <dd style={{ color: "var(--theme-text-muted)" }}>
                    {project.duration}
                  </dd>
                </div>
                <div>
                  <dt
                    className="text-sm font-semibold"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Team Size
                  </dt>
                  <dd style={{ color: "var(--theme-text-muted)" }}>
                    {project.teamSize}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Testimonial */}
          {project.testimonial && (
            <div
              className="rounded-2xl p-8 md:p-12"
              style={{
                background: "var(--theme-surface-alt)",
                border: "1px solid var(--theme-border)",
              }}
            >
              <blockquote
                className="text-lg md:text-xl italic mb-6"
                style={{ color: "var(--theme-text-2)" }}
              >
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p
                  className="font-semibold"
                  style={{ color: "var(--theme-text)" }}
                >
                  {project.testimonial.author}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  {project.testimonial.role}, {project.testimonial.company}
                </p>
              </div>
            </div>
          )}
        </AnimateOnScroll>
      </section>
    </>
  );
}
