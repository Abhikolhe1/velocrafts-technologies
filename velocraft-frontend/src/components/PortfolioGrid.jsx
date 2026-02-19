import { useState } from 'react';
import { Link } from 'react-router-dom';
import PortfolioCard from './PortfolioCard';
import AnimateOnScroll from './AnimateOnScroll';
import AnimateStagger from './AnimateStagger';
import { projects } from '../data/projects';

const categories = ['All', 'Web App', 'Mobile', 'AI/ML', 'E-commerce', 'SaaS'];

export default function PortfolioGrid({ showViewAll = false }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const displayProjects = showViewAll ? filteredProjects.slice(0, 6) : filteredProjects;

  return (
    <section id="portfolio" className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fade-in-up" delay={0.4} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Portfolio & Case Studies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
            Explore our recent projects and success stories across industries.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
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
          </div>
        </AnimateOnScroll>

        <AnimateStagger animation="fade-in-up" className="grid md:grid-cols-2 lg:grid-cols-3 gap-10" staggerDelay={0.2}>
          {displayProjects.map((project) => (
            <PortfolioCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.shortDescription}
              technologies={project.technologies}
              category={project.category}
            />
          ))}
        </AnimateStagger>

        {showViewAll && (
          <AnimateOnScroll animation="fade-in" delay={0.2} className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center text-accent font-semibold hover:underline"
            >
              View All Projects
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
