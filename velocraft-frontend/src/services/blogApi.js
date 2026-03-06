/**
 * Blog API service - fetches from LoopBack 4 backend when VITE_API_URL is set.
 * Falls back to static data when API is unavailable or not configured.
 */

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
const API_ORIGIN = API_URL ? new URL(API_URL).origin : '';

/**
 * @returns {Promise<Array>|null} List of blog posts or null if API disabled
 */
export async function fetchBlogPosts(filter = {}) {
  if (!API_URL) return null;
  try {
    const params = new URLSearchParams();
    if (filter.category && filter.category !== 'All') {
      params.set('filter[where][category]', filter.category);
    }
    params.set('filter[where][published]', 'true');
    params.set('filter[order]', 'date DESC');
    const res = await fetch(`${API_URL}/blog-posts?${params}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.map(apiToPost);
  } catch {
    return null;
  }
}

/**
 * @returns {Promise<Object|null>} Single post by slug or null
 */
export async function fetchBlogPostBySlug(slug) {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/blog-posts/slug/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return apiToDetailPost(data);
  } catch {
    return null;
  }
}

function apiToPost(api) {
  return {
    id: String(api.id),
    title: api.title,
    excerpt: api.excerpt,
    featuredImage: resolveMediaUrl(api.featuredMedia?.fileUrl ?? null),
    category: api.category,
    author: api.author,
    date: api.date,
    slug: api.slug,
  };
}

function apiToDetailPost(api) {
  return {
    id: String(api.id),
    title: api.title,
    excerpt: api.excerpt,
    featuredImage: resolveMediaUrl(api.featuredMedia?.fileUrl ?? null),
    category: api.category,
    author: api.author,
    date: api.date,
    slug: api.slug,
    readTime: api.readTime,
    tags: api.tags ?? [],
    quote: api.quote,
    keyPoints: api.keyPoints ?? [],
    authorBio: api.authorBio,
    content: {
      intro: api.contentIntro,
      sections: api.contentSections ?? [],
    },
  };
}

function resolveMediaUrl(value) {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  if (!API_ORIGIN) return value;
  return value.startsWith('/') ? `${API_ORIGIN}${value}` : `${API_ORIGIN}/${value}`;
}
