import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import AnimateOnScroll from '../components/AnimateOnScroll';
import AnimateStagger from '../components/AnimateStagger';
import { fetchBlogPosts } from '../services/blogApi';

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const fromApi = await fetchBlogPosts({});
      if (cancelled) return;
      setAllPosts(fromApi ?? []);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(allPosts.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(cats).sort()];
  }, [allPosts]);

  const posts = useMemo(
    () =>
      activeCategory === 'All'
        ? allPosts
        : allPosts.filter((p) => p.category === activeCategory),
    [allPosts, activeCategory],
  );

  const handleCategoryChange = (cat) => {
    const nextParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', cat);
    }
    setSearchParams(nextParams);
  };

  return (
    <>
      <section className="pt-32 pb-12" style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #16213e 50%, #1a1f3a 100%)' }}>
        <AnimateOnScroll animation="blur-in" delay={0.2} threshold={0.01} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Blog</h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Check out our blog posts. Insights on web development, AI, cloud, design, and digital transformation.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="slide-in-right" delay={0.3} className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
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

          {loading ? (
            <div className="text-center py-16 text-gray-500">Loading...</div>
          ) : (
            <AnimateStagger
              key={activeCategory}
              animation="soft-zoom"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerDelay={0.2}
            >
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  featuredImage={post.featuredImage}
                  category={post.category}
                  author={post.author}
                  date={post.date}
                  slug={post.slug}
                />
              ))}
            </AnimateStagger>
          )}

          {!loading && posts.length === 0 && (
            <AnimateOnScroll animation="slide-in-up" className="text-center py-16">
              <p className="text-gray-600 text-lg">No posts found in this category.</p>
            </AnimateOnScroll>
          )}
        </div>
      </section>
    </>
  );
}
