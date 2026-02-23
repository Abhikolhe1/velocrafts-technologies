import { Link } from 'react-router-dom';

export default function PortfolioCard({ id, title, description, technologies, category, image }) {
  return (
    <article
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col p-6"
      style={{ height: '520px' }}
    >
      <div className="aspect-video flex-shrink-0 bg-gradient-to-br from-primary to-secondary overflow-hidden rounded-lg">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 group-hover:text-white/40 transition-colors">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-8 flex flex-col flex-1 min-h-0">
        <span className="text-xs font-semibold text-accent uppercase tracking-wider flex-shrink-0">{category}</span>
        <h3 className="text-xl font-semibold text-primary mt-2 mb-2 flex-shrink-0 line-clamp-2" title={title}>{title}</h3>
        <p
          className="text-gray-600 text-sm mb-4 overflow-y-auto flex-1 min-h-0"
          title={description}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-2 flex-shrink-0 overflow-y-auto max-h-14" title={technologies.join(', ')}>
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
          className="mt-4 flex-shrink-0 inline-flex items-center text-accent font-medium hover:underline"
        >
          View Details
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <Link
        to={`/portfolio/${id}`}
        className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10"
      >
        <span className="text-white font-semibold px-6 py-3 border-2 border-white rounded-lg">
          View Details
        </span>
      </Link>
    </article>
  );
}
