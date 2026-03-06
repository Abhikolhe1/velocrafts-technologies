import { useParams, Link } from 'react-router-dom';
import CtaButton from '../components/CtaButton';
import { useState, useEffect } from 'react';
import AnimateOnScroll from '../components/AnimateOnScroll';
import AnimateStagger from '../components/AnimateStagger';
import { fetchBlogPostBySlug, fetchBlogPosts } from '../services/blogApi';
import BlogCard from '../components/BlogCard';

function getRelatedFromList(posts, slug, limit = 3) {
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];
  const sameCat = posts.filter((p) => p.slug !== slug && p.category === current.category);
  const others = posts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCat, ...others].slice(0, limit);
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const fromApi = await fetchBlogPostBySlug(slug);
      if (cancelled) return;
      setPost(fromApi ?? null);
      if (fromApi) {
        const list = await fetchBlogPosts({});
        if (list) setRelatedPosts(getRelatedFromList(list, slug, 3));
        else setRelatedPosts([]);
      } else {
        setRelatedPosts([]);
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <section className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="pt-32 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Post not found</h1>
          <CtaButton to="/blog" variant="primary">
            Back to Blog
          </CtaButton>
        </div>
      </section>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const sections = post.content?.sections ?? [];

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = encodeURIComponent(post.excerpt || post.title);

    if (platform === 'copy') {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };
    if (shareUrls[platform]) window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <>
      {/* Hero / Header */}
      <section className="pt-32 pb-12 bg-primary">
        <AnimateOnScroll animation="blur-in" delay={0.2} threshold={0.01} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CtaButton to="/blog" variant="primary" className="mb-6 !px-4 !py-2 text-sm">
            Back to Blog
          </CtaButton>
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/80 mb-4">
            <span>{post.author}</span>
            <span aria-hidden="true">|</span>
            <time dateTime={post.date}>{formattedDate}</time>
            <span aria-hidden="true">|</span>
            <Link
              to={`/blog?category=${encodeURIComponent(post.category)}`}
              className="text-accent font-medium hover:underline"
            >
              {post.category}
            </Link>
            {post.readTime != null && (
              <>
                <span aria-hidden="true">|</span>
                <span>{post.readTime} min read</span>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">{post.title}</h1>
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </AnimateOnScroll>
      </section>

      <article className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Sidebar: Table of Contents (sticky on desktop) */}
            {sections.length > 0 && (
              <aside className="lg:w-64 flex-shrink-0 order-2 lg:order-1">
                <AnimateOnScroll animation="slide-in-right" delay={0.3} className="lg:sticky lg:top-28">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">In this article</h3>
                    <nav className="space-y-2" aria-label="Table of contents">
                      {sections.map((section, i) => (
                        <a
                          key={i}
                          href={`#section-${i}`}
                          className="block text-gray-600 hover:text-accent text-sm transition-colors"
                        >
                          {section.heading}
                        </a>
                      ))}
                    </nav>
                  </div>
                </AnimateOnScroll>
              </aside>
            )}

            {/* Main content */}
            <div className="flex-1 min-w-0 order-1 lg:order-2">
              <AnimateOnScroll animation="lift-in" delay={0.3} className="prose prose-lg max-w-none">
                {post.featuredImage ? (
                  <div className="aspect-video rounded-xl mb-10 overflow-hidden bg-gray-100">
                    <img src={post.featuredImage} alt={post.title} className="w-full h-full object-fill" />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl mb-10 flex items-center justify-center">
                    <svg className="w-20 h-20 text-primary/30" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                    </svg>
                  </div>
                )}

                <p className="text-lg text-gray-600 leading-relaxed mb-10">{post.content.intro}</p>

                {/* Key points highlight box */}
                {post.keyPoints?.length > 0 && (
                  <div className="mb-12 p-6 md:p-8 rounded-xl bg-primary/5 border-l-4 border-accent">
                    <h3 className="text-lg font-semibold text-primary mb-4">Key takeaways</h3>
                    <ul className="space-y-3 text-gray-700">
                      {post.keyPoints.map((point, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-medium">
                            {i + 1}
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Article sections */}
                <div className="space-y-10">
                  {sections.map((section, i) => (
                    <section key={i} id={`section-${i}`} className="scroll-mt-32">
                      <h2 className="text-2xl font-semibold text-primary mt-12 mb-6">{section.heading}</h2>
                      <div className="space-y-5">
                        {section.paragraphs?.map((p, j) => (
                          <p key={j} className="text-gray-600 leading-relaxed">
                            {p}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                {/* Quote block */}
                {post.quote && (
                  <blockquote className="my-12 pl-6 border-l-4 border-accent text-xl text-gray-700 italic">
                    &ldquo;{post.quote}&rdquo;
                  </blockquote>
                )}

                {/* Share section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Share this article</h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
                    >
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
                    >
                      LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
                    >
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy link'}
                    </button>
                  </div>
                </div>

                {/* Author bio */}
                {post.authorBio && (
                  <div className="mt-12 p-6 md:p-8 rounded-xl bg-gray-50 border border-gray-100">
                    <h3 className="text-lg font-semibold text-primary mb-2">About the author</h3>
                    <p className="text-gray-600 leading-relaxed">{post.authorBio}</p>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-12 p-6 md:p-8 bg-primary rounded-xl text-white">
                  <h3 className="text-xl font-semibold mb-2">Have questions?</h3>
                  <p className="text-white/90 mb-4">
                    Get in touch with our team to discuss how we can help your business grow.
                  </p>
                  <CtaButton to="/contact" variant="primary" compact>
                    Contact Us
                  </CtaButton>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="slide-in-left" delay={0.4} className="mt-12 pt-8 border-t border-gray-200">
                <CtaButton to="/blog" variant="primary">
                  Back to Blog
                </CtaButton>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts?.length > 0 && (
            <section className="mt-20 pt-16 border-t border-gray-200">
              <AnimateOnScroll animation="slide-in-up" delay={0.2}>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Related articles</h2>
                <AnimateStagger
                  animation="soft-zoom"
                  className="grid md:grid-cols-3 gap-8"
                  staggerDelay={0.15}
                >
                  {(relatedPosts ?? []).map((p) => (
                    <BlogCard
                      key={p.id}
                      title={p.title}
                      excerpt={p.excerpt}
                      featuredImage={p.featuredImage}
                      category={p.category}
                      author={p.author}
                      date={p.date}
                      slug={p.slug}
                    />
                  ))}
                </AnimateStagger>
              </AnimateOnScroll>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
