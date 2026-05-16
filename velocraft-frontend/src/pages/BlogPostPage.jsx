import { useParams, Link } from "react-router-dom";
import CtaButton from "../components/CtaButton";
import { useState, useEffect } from "react";
import AnimateOnScroll from "../components/AnimateOnScroll";
import AnimateStagger from "../components/AnimateStagger";
import { fetchBlogPostBySlug, fetchBlogPosts } from "../services/blogApi";
import BlogCard from "../components/BlogCard";
import { Icon } from "@iconify/react";

function getRelatedFromList(posts, slug, limit = 3) {
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];
  const sameCat = posts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = posts.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
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
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <section
        className="pt-32 pb-20 min-h-screen flex items-center justify-center"
        style={{ background: "var(--theme-bg)" }}
      >
        <div style={{ color: "var(--theme-text-muted)" }}>Loading...</div>
      </section>
    );
  }

  if (!post) {
    return (
      <section
        className="pt-32 pb-20 min-h-screen"
        style={{ background: "var(--theme-bg)" }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--theme-text)" }}
          >
            Post not found
          </h1>
          <CtaButton to="/blog" variant="primary">
            <span className="inline-flex items-center gap-2">
              <Icon icon="heroicons:arrow-left" className="w-4 h-4" /> Back
            </span>
          </CtaButton>
        </div>
      </section>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const sections = post.content?.sections ?? [];

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = encodeURIComponent(post.excerpt || post.title);

    if (platform === "copy") {
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
    if (shareUrls[platform])
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-12 relative overflow-hidden"
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
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <CtaButton
            to="/blog"
            variant="primary"
            className="mb-6 !px-4 !py-2 text-sm"
          >
            <span className="inline-flex items-center gap-2">
              <Icon icon="heroicons:arrow-left" className="w-4 h-4" /> Back
            </span>
          </CtaButton>
          <div
            className="flex flex-wrap items-center gap-2 text-sm mb-4"
            style={{ color: "var(--theme-text-muted)" }}
          >
            <span>{post.author}</span>
            <span aria-hidden="true">|</span>
            <time dateTime={post.date}>{formattedDate}</time>
            <span aria-hidden="true">|</span>
            <Link
              to={`/blog?category=${encodeURIComponent(post.category)}`}
              className="font-medium hover:underline"
              style={{ color: "#818CF8" }}
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
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: "var(--theme-text)" }}
          >
            {post.title}
          </h1>
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    background: "rgba(129,140,248,0.12)",
                    color: "#818CF8",
                    border: "1px solid rgba(129,140,248,0.2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </AnimateOnScroll>
      </section>

      <article
        className="py-12 md:py-16"
        style={{ background: "var(--theme-surface)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Sidebar: Table of Contents */}
            {sections.length > 0 && (
              <aside className="lg:w-64 shrink-0 order-2 lg:order-1">
                <AnimateOnScroll
                  animation="slide-in-right"
                  delay={0.3}
                  className="lg:sticky lg:top-28"
                >
                  <div
                    className="rounded-xl p-6"
                    style={{
                      background: "var(--theme-surface-alt)",
                      border: "1px solid var(--theme-border)",
                    }}
                  >
                    <h3
                      className="text-sm font-semibold uppercase tracking-wider mb-4"
                      style={{ color: "var(--theme-text)" }}
                    >
                      In this article
                    </h3>
                    <nav className="space-y-2 mb-6" aria-label="Table of contents">
                      {sections.map((section, i) => (
                        <a
                          key={i}
                          href={`#section-${i}`}
                          className="block text-sm transition-colors hover:text-accent"
                          style={{ color: "var(--theme-text-muted)" }}
                        >
                          {section.heading}
                        </a>
                      ))}
                    </nav>
                    <h3
                      className="text-sm font-semibold uppercase tracking-wider mb-3"
                      style={{ color: "var(--theme-text)" }}
                    >
                      Share
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { platform: "twitter", icon: "ri:twitter-x-line", label: "Share on Twitter" },
                        { platform: "linkedin", icon: "mdi:linkedin", label: "Share on LinkedIn" },
                        { platform: "facebook", icon: "mdi:facebook", label: "Share on Facebook" },
                        { platform: "copy", icon: copied ? "mdi:check" : "mdi:content-copy", label: copied ? "Copied" : "Copy link" },
                      ].map(({ platform, icon, label }) => (
                        <button
                          key={platform}
                          onClick={() => handleShare(platform)}
                          className="p-2 rounded-lg hover-glass transition-colors hover:text-accent"
                          style={{
                            background: "var(--theme-surface)",
                            border: "1px solid var(--theme-border)",
                            color: "var(--theme-text-muted)",
                          }}
                          aria-label={label}
                        >
                          <Icon icon={icon} className="w-5 h-5" />
                        </button>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              </aside>
            )}

            {/* Main content */}
            <div className="flex-1 min-w-0 order-1 lg:order-2">
              <AnimateOnScroll
                animation="lift-in"
                delay={0.3}
                className="prose prose-lg max-w-none"
              >
                {post.featuredImage ? (
                  <div
                    className="aspect-video rounded-xl mb-10 overflow-hidden"
                    style={{ background: "var(--theme-surface-alt)" }}
                  >
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-fill"
                    />
                  </div>
                ) : (
                  <div
                    className="aspect-video rounded-xl mb-10 flex items-center justify-center"
                    style={{ background: "var(--theme-surface-alt)" }}
                  >
                    <svg
                      className="w-20 h-20"
                      style={{ color: "var(--theme-text-muted)", opacity: 0.3 }}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                    </svg>
                  </div>
                )}

                <p
                  className="text-lg leading-relaxed mb-10"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  {post.content.intro}
                </p>

                {/* Key points */}
                {post.keyPoints?.length > 0 && (
                  <div
                    className="mb-12 p-6 md:p-8 rounded-xl"
                    style={{
                      background: "var(--theme-surface-subtle)",
                      borderLeft: "4px solid #818CF8",
                    }}
                  >
                    <h3
                      className="text-lg font-semibold mb-4"
                      style={{ color: "var(--theme-text)" }}
                    >
                      Key takeaways
                    </h3>
                    <ul className="space-y-3">
                      {post.keyPoints.map((point, i) => (
                        <li
                          key={i}
                          className="flex gap-3"
                          style={{ color: "var(--theme-text-muted)" }}
                        >
                          <span
                            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium"
                            style={{
                              background: "rgba(129,140,248,0.15)",
                              color: "#818CF8",
                            }}
                          >
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
                      <h2
                        className="text-2xl font-semibold mt-12 mb-6"
                        style={{ color: "var(--theme-text)" }}
                      >
                        {section.heading}
                      </h2>
                      <div className="space-y-5">
                        {section.paragraphs?.map((p, j) => (
                          <p
                            key={j}
                            className="leading-relaxed"
                            style={{ color: "var(--theme-text-muted)" }}
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                {/* Quote */}
                {post.quote && (
                  <blockquote
                    className="my-12 pl-6 text-xl italic"
                    style={{
                      borderLeft: "4px solid #818CF8",
                      color: "var(--theme-text-2)",
                    }}
                  >
                    &ldquo;{post.quote}&rdquo;
                  </blockquote>
                )}

                {/* Author bio */}
                {post.authorBio && (
                  <div
                    className="mt-12 p-6 md:p-8 rounded-xl"
                    style={{
                      background: "var(--theme-surface-alt)",
                      border: "1px solid var(--theme-border)",
                    }}
                  >
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--theme-text)" }}
                    >
                      About the author
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{ color: "var(--theme-text-muted)" }}
                    >
                      {post.authorBio}
                    </p>
                  </div>
                )}

                {/* CTA */}
                <div
                  className="mt-12 p-6 md:p-8 rounded-xl relative overflow-hidden"
                  style={{ background: "var(--theme-surface-deep)" }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 0% 50%, rgba(129,140,248,0.1) 0%, transparent 60%)",
                    }}
                  />
                  <div className="relative z-10">
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: "var(--theme-text)" }}
                    >
                      Have questions?
                    </h3>
                    <p
                      className="mb-4"
                      style={{ color: "var(--theme-text-muted)" }}
                    >
                      Get in touch with our team to discuss how we can help your
                      business grow.
                    </p>
                    <CtaButton to="/contact" variant="primary" compact>
                      Contact Us
                    </CtaButton>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts?.length > 0 && (
            <section
              className="mt-20 pt-16"
              style={{ borderTop: "1px solid var(--theme-border)" }}
            >
              <AnimateOnScroll animation="slide-in-up" delay={0.2}>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-8"
                  style={{ color: "var(--theme-text)" }}
                >
                  Related articles
                </h2>
                <AnimateStagger
                  animation="soft-zoom"
                  className="grid md:grid-cols-3 gap-8"
                  staggerDelay={0.15}
                >
                  {relatedPosts.map((p) => (
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
