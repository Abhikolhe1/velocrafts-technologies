import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CtaButton from "../components/CtaButton";
import PortfolioCard from "../components/PortfolioCard";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { fetchPortfolios } from "../services/portfolioApi";

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPortfolios()
      .then((api) => {
        if (Array.isArray(api)) {
          setProjects(api);
          setError(null);
        } else {
          setError("Failed to load portfolio.");
          setProjects([]);
        }
      })
      .catch(() => {
        setError("Failed to load portfolio.");
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="pt-40 py-20" style={{ background: "#153A5B" }}>
        <AnimateOnScroll
          animation="blur-in"
          delay={0.2}
          threshold={0.01}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Portfolio & Studies
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Explore our recent projects and success stories across industries.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="pt-12 pb-8 md:pt-16 md:pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll
            animation="slide-in-left"
            delay={0.3}
            className="mb-12"
          >
            <div className="overflow-x-auto pb-2 -mx-1">
              <div className="flex justify-center gap-2 min-w-max px-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                      activeCategory === cat
                        ? "bg-[#153A5B] text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {loading ? (
            <div className="text-center py-16 text-gray-500">
              Loading portfolio…
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-600">{error}</div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No projects to show.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((project) => (
                <PortfolioCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.shortDescription}
                  technologies={project.technologies}
                  category={project.category}
                  image={project.image}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Have a project in mind?
            </h3>
            <p className="text-gray-600 mb-4 max-w-xl mx-auto">
              Let&apos;s discuss how we can help bring your vision to life.
            </p>
            <CtaButton to="/contact" variant="primary">
              Request Quote
            </CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
