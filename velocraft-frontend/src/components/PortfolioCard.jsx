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
      className={`group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col ${
        compact ? "p-5" : "p-6"
      }`}
      style={{ height: compact ? "480px" : "520px" }}
    >
      <Link
        to={`/portfolio/${id}`}
        className="flex-shrink-0 bg-gray-50 rounded-xl block"
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
        <span className="text-xs font-semibold text-accent uppercase tracking-wider flex-shrink-0">
          {category}
        </span>
        <h3
          className="text-xl font-semibold text-primary mt-2 mb-2 flex-shrink-0 line-clamp-2"
          title={title}
        >
          {title}
        </h3>
        <div
          className={`flex flex-wrap gap-2 flex-shrink-0 pr-1 ${compact ? "overflow-y-auto max-h-12" : "overflow-y-auto max-h-14"}`}
          title={technologies.join(", ")}
        >
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          to={`/portfolio/${id}`}
          className="mt-auto pt-4 flex-shrink-0 inline-flex items-center text-accent font-medium hover:underline"
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
