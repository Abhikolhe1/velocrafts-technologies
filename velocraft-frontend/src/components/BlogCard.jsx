import { Link } from 'react-router-dom';

export default function BlogCard({ title, excerpt, category, author, date, slug, featuredImage }) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article
      className="group rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full"
      style={{
        background: "var(--theme-surface)",
        border: "1px solid var(--theme-border)",
        boxShadow: "var(--theme-card-shadow)",
      }}
    >
      <div
        className="aspect-video flex items-center justify-center overflow-hidden"
        style={{ background: "var(--theme-surface-alt)" }}
      >
        {featuredImage ? (
          <img src={featuredImage} alt={title} className="w-full h-full object-fill" />
        ) : (
          <svg
            className="w-16 h-16 text-white/30 group-hover:text-white/50 transition-colors"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
          </svg>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div
          className="flex flex-wrap items-center gap-2 text-sm mb-3"
          style={{ color: "var(--theme-text-muted)" }}
        >
          <span>{author}</span>
          <span aria-hidden="true">|</span>
          <time dateTime={date}>{formattedDate}</time>
          <span aria-hidden="true">|</span>
          <Link
            to={`/blog?category=${encodeURIComponent(category)}`}
            className="font-medium hover:underline"
            style={{ color: "#818CF8" }}
          >
            {category}
          </Link>
        </div>
        <h2
          className="text-xl font-semibold mb-3 line-clamp-2 transition-colors"
          style={{ color: "var(--theme-text)" }}
        >
          <Link to={`/blog/${slug}`} className="hover:underline group-hover:text-accent">
            {title}
          </Link>
        </h2>
        <p
          className="text-sm flex-1 line-clamp-3 mb-4"
          style={{ color: "var(--theme-text-muted)" }}
        >
          {excerpt}
        </p>
        <Link
          to={`/blog/${slug}`}
          className="inline-flex items-center font-medium hover:underline text-sm"
          style={{ color: "#818CF8" }}
        >
          Continue Reading
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
