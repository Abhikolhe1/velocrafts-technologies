import { Link } from 'react-router-dom';

export default function BlogCard({ title, excerpt, category, author, date, slug, featuredImage }) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
        {featuredImage ? (
          <img src={featuredImage} alt={title} className="w-full h-full object-fill" />
        ) : (
          <svg className="w-16 h-16 text-white/30 group-hover:text-white/50 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
          </svg>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-3">
          <span>{author}</span>
          <span aria-hidden="true">|</span>
          <time dateTime={date}>{formattedDate}</time>
          <span aria-hidden="true">|</span>
          <Link
            to={`/blog?category=${encodeURIComponent(category)}`}
            className="text-accent font-medium hover:underline"
          >
            {category}
          </Link>
        </div>
        <h2 className="text-xl font-semibold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
          <Link to={`/blog/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h2>
        <p className="text-gray-600 text-sm flex-1 line-clamp-3 mb-4">{excerpt}</p>
        <Link
          to={`/blog/${slug}`}
          className="inline-flex items-center text-accent font-medium hover:underline text-sm"
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
