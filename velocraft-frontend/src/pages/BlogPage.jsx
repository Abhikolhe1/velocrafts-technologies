import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import AnimateOnScroll from "../components/AnimateOnScroll";
import AnimateStagger from "../components/AnimateStagger";
import { fetchBlogPosts } from "../services/blogApi";

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 768px)").matches;
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const fromApi = await fetchBlogPosts({});
      if (cancelled) return;
      setAllPosts(fromApi ?? []);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = (event) => setIsDesktop(event.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(allPosts.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(cats).sort()];
  }, [allPosts]);

  const posts = useMemo(
    () =>
      activeCategory === "All"
        ? allPosts
        : allPosts.filter((p) => p.category === activeCategory),
    [allPosts, activeCategory],
  );

  const handleCategoryChange = (cat) => {
    const nextParams = new URLSearchParams(searchParams);
    if (cat === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", cat);
    }
    setSearchParams(nextParams);
  };

  return (
    <>
      <section
        className="pt-40 py-20 relative overflow-hidden"
        style={{ background: "var(--theme-surface-deep)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 120%, rgba(129,140,248,0.12) 0%, transparent 60%)",
          }}
        />
        <AnimateOnScroll
          animation="blur-in"
          delay={0.2}
          threshold={0.01}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "var(--theme-text)" }}
            >
              Our Blog
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--theme-text-2)" }}
            >
              Check out our blog posts. Insights on web development, AI, cloud,
              design, and digital transformation.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      <section
        className="py-12 md:py-16"
        style={{ background: "var(--theme-surface-alt)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll
            animation="slide-in-right"
            delay={0.3}
            className="mb-12"
          >
            <div className="overflow-x-auto pb-2 -mx-1">
              <div className="flex justify-center gap-2 min-w-max px-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`shrink-0 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap${
                      activeCategory !== cat ? " hover-glass" : ""
                    }`}
                    style={
                      activeCategory === cat
                        ? { background: "#818CF8", color: "#050816" }
                        : {
                            background: "var(--theme-surface)",
                            color: "var(--theme-text-muted)",
                            border: "1px solid var(--theme-border)",
                          }
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {loading ? (
            <div
              className="text-center py-16"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Loading...
            </div>
          ) : isDesktop ? (
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
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            </div>
          )}

          {!loading && posts.length === 0 && (
            <AnimateOnScroll
              animation="slide-in-up"
              className="text-center py-16"
            >
              <p
                className="text-lg"
                style={{ color: "var(--theme-text-muted)" }}
              >
                No posts found in this category.
              </p>
            </AnimateOnScroll>
          )}
        </div>
      </section>
    </>
  );
}
