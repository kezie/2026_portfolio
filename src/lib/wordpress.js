/**
 * WordPress Headless CMS — API utility
 *
 * Set your WordPress site URL below (no trailing slash).
 * The WordPress REST API must be enabled (it is by default on WP 4.7+).
 *
 * For local dev you can proxy via a CORS-anywhere service or enable CORS
 * on your WordPress install with a plugin (e.g. "WP CORS").
 */

export const WP_BASE_URL = 'https://chikezie.com.ng'; // ← change this

const API = `${WP_BASE_URL}/wp-json/wp/v2`;

/** Fetch a paginated list of posts */
export async function getPosts({ page = 1, perPage = 10, search = '' } = {}) {
  const params = new URLSearchParams({
    page,
    per_page: perPage,
    _embed: 1, // includes featured media + author
    ...(search ? { search } : {}),
  });
  const res = await fetch(`${API}/posts?${params}`);
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  const posts = await res.json();
  const total = parseInt(res.headers.get('X-WP-Total') || '0', 10);
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
  return { posts, total, totalPages };
}

/** Fetch a single post by slug */
export async function getPostBySlug(slug) {
  const params = new URLSearchParams({ slug, _embed: 1 });
  const res = await fetch(`${API}/posts?${params}`);
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  const posts = await res.json();
  if (!posts.length) return null;
  return posts[0];
}

/** Extract the featured image URL from an embedded post */
export function getFeaturedImage(post, size = 'large') {
  try {
    const media = post?._embedded?.['wp:featuredmedia']?.[0];
    if (!media) return null;
    return (
      media?.media_details?.sizes?.[size]?.source_url ||
      media?.media_details?.sizes?.full?.source_url ||
      media?.source_url ||
      null
    );
  } catch {
    return null;
  }
}

/** Extract the author name from an embedded post */
export function getAuthor(post) {
  try {
    return post?._embedded?.author?.[0]?.name || 'Anonymous';
  } catch {
    return 'Anonymous';
  }
}

/** Strip HTML tags from excerpt/content */
export function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, '').trim();
}

/** Format a WP date string */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Estimated reading time */
export function readingTime(content = '') {
  const words = stripHtml(content).split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins} min read`;
}

/** Fetch categories */
export async function getCategories() {
  const res = await fetch(`${API}/categories?per_page=50`);
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  return res.json();
}