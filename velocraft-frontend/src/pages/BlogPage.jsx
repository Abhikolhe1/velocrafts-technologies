import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import AnimateOnScroll from '../components/AnimateOnScroll';
import AnimateStagger from '../components/AnimateStagger';
import { blogPosts, blogCategories } from '../data/blogPosts';
import { fetchBlogPosts } from '../services/blogApi';

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [posts, setPosts] = useState(blogPosts);
  const [loading, setLoading] = useState(!!import.meta.env.VITE_API_URL);

  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const fromApi = await fetchBlogPosts({ category: activeCategory });
      if (cancelled) return;
      if (fromApi != null) {
        setPosts(fromApi);
      } else {
        setPosts(blogPosts);
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [activeCategory]);

  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      <section className="pt-32 pb-12 bg-primary">
        <AnimateOnScroll animation="fade-in" delay={0.2} threshold={0.01} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <AnimateOnScroll animation="fade-in-down" delay={0.3} className="flex flex-wrap justify-center gap-2 mb-12">
            {blogCategories.map((cat) => (
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
              animation="fade-in-up"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerDelay={0.2}
            >
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.category}
                  author={post.author}
                  date={post.date}
                  slug={post.slug}
                />
              ))}
            </AnimateStagger>
          )}

          {!loading && filteredPosts.length === 0 && (
            <AnimateOnScroll animation="fade-in" className="text-center py-16">
              <p className="text-gray-600 text-lg">No posts found in this category.</p>
            </AnimateOnScroll>
          )}
        </div>
      </section>
    </>
  );
}
