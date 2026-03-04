import { useState } from 'react';
import { Link } from 'react-router-dom';
import PortfolioCard from '../components/PortfolioCard';
import AnimateOnScroll from '../components/AnimateOnScroll';
import AnimateStagger from '../components/AnimateStagger';
import { projects } from '../data/projects';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...new Set(projects.map((project) => project.category))];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="pt-32 pb-12 bg-primary">
        <AnimateOnScroll animation="blur-in" delay={0.2} threshold={0.01} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Portfolio & Case Studies</h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Explore our recent projects and success stories across industries.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="pt-12 pb-8 md:pt-16 md:pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="slide-in-left" delay={0.3} className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </AnimateOnScroll>

          <AnimateStagger key={activeCategory} animation="lift-in" className="grid md:grid-cols-2 lg:grid-cols-3 gap-10" staggerDelay={0.2}>
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
          </AnimateStagger>
        </div>

        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="text-center py-8 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-2">Have a project in mind?</h3>
            <p className="text-gray-600 mb-4 max-w-xl mx-auto">Let&apos;s discuss how we can help bring your vision to life.</p>
            <Link
              to="/contact"
              className="inline-flex items-center text-accent font-semibold hover:underline"
            >
              Get in touch
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
