import { Link } from "react-router-dom";

export default function PortfolioCard({
  id,
  title,
  technologies,
  category,
  image,
  compact = false,
}) {
  return (
    <article
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${
        compact ? "p-5" : "p-6"
      }`}
      style={{
        height: compact ? "480px" : "520px",
        background: "var(--theme-surface)",
        border: "1px solid var(--theme-border)",
        boxShadow: "var(--theme-card-shadow)",
      }}
    >
      <Link
        to={`/portfolio/${id}`}
        className="shrink-0 rounded-xl block"
        style={{ background: "var(--theme-surface-alt)" }}
      >
        <div className="aspect-video overflow-hidden rounded-lg">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-fill"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white/20 group-hover:text-white/40 transition-colors">
              <svg
                className="w-24 h-24"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
          )}
        </div>
      </Link>
      <div
        className={`flex flex-col flex-1 min-h-0 ${compact ? "p-6" : "p-8"}`}
      >
        <span className="text-xs font-semibold text-accent uppercase tracking-wider shrink-0">
          {category}
        </span>
        <h3
          className="text-xl font-semibold mt-2 mb-2 shrink-0 line-clamp-2"
          style={{ color: "var(--theme-text)" }}
          title={title}
        >
          {title}
        </h3>
        <div
          className={`flex flex-wrap gap-2 shrink-0 pr-1 ${compact ? "overflow-y-auto max-h-12" : "overflow-y-auto max-h-14"}`}
          title={technologies.join(", ")}
        >
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded"
              style={{
                background: "var(--theme-border)",
                color: "var(--theme-text-muted)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          to={`/portfolio/${id}`}
          className="mt-auto pt-4 shrink-0 inline-flex items-center font-medium hover:underline"
          style={{ color: "#818CF8" }}
        >
          View Details
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
