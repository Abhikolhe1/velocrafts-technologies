import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section
      className="min-h-[60vh] flex items-center justify-center px-4"
      style={{ background: "var(--theme-bg)" }}
    >
      <div className="text-center">
        <h1
          className="text-6xl font-bold mb-4"
          style={{ color: "#818CF8" }}
        >
          404
        </h1>
        <p
          className="text-xl mb-8"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Page not found
        </p>
        <Link
          to="/"
          className="inline-block font-semibold px-6 py-3 rounded-lg transition-opacity hover:opacity-90"
          style={{ background: "#818CF8", color: "#050816" }}
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
