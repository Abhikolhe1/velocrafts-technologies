/**
 * Portfolio API service - fetches from LoopBack 4 backend.
 * Same shape as frontend project objects (id, slug, title, image, order, etc.).
 */

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

/**
 * @returns {Promise<Array>|null} List of portfolios ordered by order ASC
 */
export async function fetchPortfolios() {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/portfolios`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data.map(apiToProject) : null;
  } catch {
    return null;
  }
}

/**
 * @returns {Promise<Object|null>} Single project by id
 */
export async function fetchProjectById(id) {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/portfolios/${encodeURIComponent(id)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return apiToProject(data);
  } catch {
    return null;
  }
}

/**
 * @returns {Promise<Object|null>} Single project by slug
 */
export async function fetchProjectBySlug(slug) {
  if (!API_URL) return null;
  try {
    const res = await fetch(
      `${API_URL}/portfolios/slug/${encodeURIComponent(slug)}`,
    );
    if (!res.ok) return null;
    const data = await res.json();
    return apiToProject(data);
  } catch {
    return null;
  }
}

function apiToProject(api) {
  return {
    id: api.id,
    order: api.order,
    slug: api.slug,
    title: api.title,
    image: api.image,
    shortDescription: api.shortDescription,
    description: api.description,
    challenge: api.challenge,
    approach: api.approach,
    technologies: api.technologies ?? [],
    category: api.category,
    results: api.results ?? [],
    client: api.client,
    duration: api.duration,
    teamSize: api.teamSize,
    keyFeatures: api.keyFeatures ?? [],
  };
}
