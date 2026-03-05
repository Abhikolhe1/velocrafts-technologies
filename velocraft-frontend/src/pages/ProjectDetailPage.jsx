import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CtaButton from '../components/CtaButton';
import { fetchProjectById } from '../services/portfolioApi';
import AnimateOnScroll from '../components/AnimateOnScroll';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProject(null);
    fetchProjectById(id)
      .then((api) => {
        if (api) {
          setProject(api);
          setError(null);
        } else {
          setProject(null);
          setError('Failed to load project.');
        }
      })
      .catch(() => setError('Failed to load project.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="pt-32 pb-20 text-center">
        <p className="text-gray-500">Loading project…</p>
      </section>
    );
  }
  if (error || !project) {
    return (
      <section className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">{error || 'Project Not Found'}</h1>
        <CtaButton to="/portfolio" variant="primary">
          Back to Portfolio
        </CtaButton>
      </section>
    );
  }

  return (
    <>
      {/* Section 1: Hero */}
      <section className="pt-32 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <CtaButton to="/portfolio" variant="primary" className="!px-4 !py-2 text-sm">
              Back to Portfolio
            </CtaButton>
            <span className="inline-block text-accent font-semibold uppercase tracking-wider text-sm">
              {project.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{project.title}</h1>
          <p className="text-white/90 text-lg max-w-2xl mb-6">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-4 text-white/80 text-sm">
            <span>Client: {project.client}</span>
            <span>•</span>
            <span>Duration: {project.duration}</span>
            <span>•</span>
            <span>Team: {project.teamSize}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/20 text-white text-sm rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {project.image && (
        <section className="bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <img src={project.image} alt={project.title} className="w-full rounded-xl shadow-lg object-cover max-h-[480px]" />
          </div>
        </section>
      )}

      {/* Section 2: Project Overview */}
      <section className="py-20 md:py-28 bg-white">
        <AnimateOnScroll animation="slide-in-right" delay={0.4} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Project Overview</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{project.description}</p>
          {project.keyFeatures && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-primary mb-4">Key Features</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </AnimateOnScroll>
      </section>

      {/* Section 3: The Challenge & Our Approach */}
      <section className="py-20 md:py-28 bg-gray-50">
        <AnimateOnScroll animation="slide-in-left" delay={0.3} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-1 gap-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">The Challenge</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Our Approach</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{project.approach}</p>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Section 4: Key Results & Tech Stack */}
      <section className="py-20 md:py-28 bg-white">
        <AnimateOnScroll animation="slide-in-up" delay={0.3} threshold={0.01} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Key Results</h2>
              <ul className="space-y-3">
                {project.results.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-gray-600">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">✓</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-primary/5 text-primary font-medium rounded-lg border border-primary/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <dl className="mt-8 space-y-4">
                <div>
                  <dt className="text-sm font-semibold text-primary">Client</dt>
                  <dd className="text-gray-600">{project.client}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-primary">Duration</dt>
                  <dd className="text-gray-600">{project.duration}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-primary">Team Size</dt>
                  <dd className="text-gray-600">{project.teamSize}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Client Testimonial */}
          {project.testimonial && (
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
              <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-primary">{project.testimonial.author}</p>
                <p className="text-gray-600 text-sm">
                  {project.testimonial.role}, {project.testimonial.company}
                </p>
              </div>
            </div>
          )}

          <div className="mt-12">
            <CtaButton to="/contact" variant="primary">
              Start a Similar Project
            </CtaButton>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
