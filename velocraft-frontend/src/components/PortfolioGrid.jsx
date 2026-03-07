import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CtaButton from './CtaButton';
import { motion as Motion, useMotionValueEvent, useScroll } from 'framer-motion';
import PortfolioCard from './PortfolioCard';
import AnimateOnScroll from './AnimateOnScroll';
import AnimateStagger from './AnimateStagger';
import { fetchPortfolios } from '../services/portfolioApi';

const stickyCardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function PortfolioHeader({
  activeCategory,
  categories,
  onCategoryChange,
  showFilters = true,
  animated = true,
}) {
  const content = (
    <>
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Portfolio & Case Studies</h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
        Explore our recent projects and success stories across industries.
      </p>

      {showFilters && (
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
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
      )}
    </>
  );

  if (!animated) {
    return <div className={showFilters ? 'text-center mb-12' : 'text-center mb-8'}>{content}</div>;
  }

  return (
    <AnimateOnScroll animation="mask-reveal" delay={0.3} className={showFilters ? 'text-center mb-12' : 'text-center mb-8'}>
      {content}
    </AnimateOnScroll>
  );
}

export default function PortfolioGrid({
  showViewAll = false,
  stickyReveal = false,
  showFilters = true,
  maxItems,
  animateCards = true,
  headerAnimated = true,
}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isDesktop, setIsDesktop] = useState(false);
  const [revealedCount, setRevealedCount] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchPortfolios()
      .then((api) => setProjects(Array.isArray(api) ? api : []))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(projects.map((project) => project.category))];
  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const displayProjects = (() => {
    if (typeof maxItems === 'number') return filteredProjects.slice(0, maxItems);
    if (showViewAll) return filteredProjects.slice(0, 6);
    return filteredProjects;
  })();
  const stickyProjects = displayProjects.slice(0, 3);
  const shouldUseStickyReveal = stickyReveal && isDesktop && stickyProjects.length > 1 && !loading;
  const stickyScrollRef = useRef(null);
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setRevealedCount(1);
  };

  const { scrollYProgress } = useScroll({
    target: stickyScrollRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleMediaChange = () => setIsDesktop(mediaQuery.matches);

    handleMediaChange();
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!shouldUseStickyReveal || stickyProjects.length === 0) return;

    // Keep the section pinned after the 3rd card appears
    // so the user can fully see the final state before leaving.
    const revealStart = 0.2;
    const revealEnd = 0.72;
    const normalized = Math.min(
      1,
      Math.max(0, (latest - revealStart) / (revealEnd - revealStart)),
    );
    const nextCount = Math.min(
      stickyProjects.length,
      Math.max(1, Math.floor(normalized * stickyProjects.length) + 1),
    );

    setRevealedCount((prevCount) => (prevCount === nextCount ? prevCount : nextCount));
  });

  const stickyScrollHeight = `${Math.max(320, stickyProjects.length * 130)}vh`;

  return (
    <section id="portfolio" className="py-16 md:py-20 bg-white">
      {loading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 text-gray-500">Loading portfolio…</div>
        </div>
      ) : shouldUseStickyReveal ? (
        <div ref={stickyScrollRef} className="relative" style={{ height: stickyScrollHeight }}>
          <div className="sticky top-20 h-[calc(100vh-5rem)] py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
              <PortfolioHeader
                activeCategory={activeCategory}
                categories={categories}
                onCategoryChange={handleCategoryChange}
                showFilters={showFilters}
                animated={false}
              />

              <div className="flex-1 flex items-center overflow-visible">
                <div className="w-full">
                  <div className="grid grid-cols-3 gap-8">
                    {stickyProjects.map((project, index) => {
                      const isVisible = index < revealedCount;

                      return (
                        <Motion.div
                          key={project.id}
                          initial="hidden"
                          animate={isVisible ? 'visible' : 'hidden'}
                          variants={stickyCardVariants}
                          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            visibility: isVisible ? 'visible' : 'hidden',
                            pointerEvents: isVisible ? 'auto' : 'none',
                          }}
                          aria-hidden={!isVisible}
                        >
                          <PortfolioCard
                            id={project.id}
                            title={project.title}
                            description={project.shortDescription}
                            technologies={project.technologies}
                            category={project.category}
                            image={project.image}
                            compact
                          />
                        </Motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioHeader
            activeCategory={activeCategory}
            categories={categories}
            onCategoryChange={handleCategoryChange}
            showFilters={showFilters}
            animated={headerAnimated}
          />

          {displayProjects.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No projects to show.</div>
          ) : animateCards ? (
            <AnimateStagger key={activeCategory} animation="soft-zoom" className="grid md:grid-cols-2 lg:grid-cols-3 gap-10" staggerDelay={0.2}>
              {displayProjects.map((project) => (
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
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {displayProjects.map((project) => (
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
      )}

      {showViewAll && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="slide-in-up" delay={0.2} className="text-center mt-12">
            <CtaButton to="/portfolio" variant="primary">
              View All Projects
            </CtaButton>
          </AnimateOnScroll>
        </div>
      )}
    </section>
  );
}
