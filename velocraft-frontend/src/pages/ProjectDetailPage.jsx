import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../data/projects';
import AnimateOnScroll from '../components/AnimateOnScroll';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = getProjectById(id);

  if (!project) {
    return (
      <section className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Project Not Found</h1>
        <Link to="/portfolio" className="text-accent hover:underline">Back to Portfolio</Link>
      </section>
    );
  }

  return (
    <>
      {/* Section 1: Hero */}
      <section className="pt-32 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center text-white/90 hover:text-white mb-6 text-sm font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
          <span className="inline-block text-accent font-semibold uppercase tracking-wider text-sm mb-4">
            {project.category}
          </span>
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

      {/* Section 2: Project Overview */}
      <section className="py-20 md:py-28 bg-white">
        <AnimateOnScroll animation="fade-in-up" delay={0.4} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Project Overview</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{project.description}</p>
        </AnimateOnScroll>
      </section>

      {/* Section 3: The Challenge & Our Approach */}
      <section className="py-20 md:py-28 bg-gray-50">
        <AnimateOnScroll animation="fade-in-down" delay={0.3} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <AnimateOnScroll animation="slide-in-up" delay={0.4} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Link
              to="/contact"
              className="inline-block bg-accent text-primary font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              Start a Similar Project
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
