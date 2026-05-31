import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/portfolio/Navbar';
import Footer from '../components/portfolio/Footer';
import Annotation from '../components/portfolio/Annotation';
import MarqueeStrip from '../components/portfolio/MarqueeStrip';
import BlogCard from '../components/portfolio/BlogCard';
import BlogSkeleton from '../components/portfolio/BlogSkeleton';
import { getPosts, getCategories } from '../lib/wordpress';

const PER_PAGE = 8;

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { posts: fetched, total: t, totalPages: tp } = await getPosts({
        page,
        perPage: PER_PAGE,
        search,
      });
      setPosts(fetched);
      setTotal(t);
      setTotalPages(tp);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearch('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page header */}
      <div className="pt-32 md:pt-40 px-6 md:px-12 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Annotation label="05 / WRITING & THINKING" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-4">
            <h1 className="font-display text-[12vw] md:text-[9vw] lg:text-[8vw] leading-[0.88] tracking-[-0.05em] text-foreground">
              The
              <br />
              <span className="italic">Lab</span>
            </h1>
            <div className="max-w-sm">
              <p className="font-body text-sm md:text-base text-muted-foreground leading-[1.7]">
                Technical deep-dives on SEO engineering, web performance, automation, and the craft 
                of building for search — direct from the field.
              </p>
              <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mt-4">
                Powered by coffee
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search + Filter bar */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mt-12 md:mt-16 border-t border-border pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center gap-3 border border-border px-4 py-2.5 flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search articles..."
              className="bg-transparent font-mono text-xs tracking-widest w-full outline-none text-foreground placeholder:text-muted-foreground/40"
            />
            {searchInput && (
              <button type="button" onClick={clearSearch}>
                <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            )}
          </form>

          {/* Category filters */}
          {categories.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveCategory(null)}
                className={`font-mono text-[10px] tracking-[0.18em] uppercase px-3 py-2 border transition-all duration-200 ${
                  activeCategory === null
                    ? 'border-foreground bg-foreground text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                }`}
              >
                All
              </button>
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                  className={`font-mono text-[10px] tracking-[0.18em] uppercase px-3 py-2 border transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Results count */}
        {!loading && !error && (
          <div className="mt-6">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
              {search
                ? `${total} result${total !== 1 ? 's' : ''} for "${search}"`
                : `${total} article${total !== 1 ? 's' : ''} published`}
            </span>
          </div>
        )}
      </div>

      <MarqueeStrip text="TECHNICAL SEO — CORE WEB VITALS — WEB PERFORMANCE — SCHEMA MARKUP" separator="/" />

      {/* Posts list */}
      <div className="px-6 md:px-12 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BlogSkeleton count={PER_PAGE} />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-24 md:py-40 flex flex-col items-center justify-center text-center"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent block mb-4">
                CONNECTION ERROR
              </span>
              <h2 className="font-display text-4xl md:text-5xl tracking-[-0.04em] text-foreground mb-6">
                Could not reach<br /><span className="italic">WordPress API</span>
              </h2>
              <p className="font-body text-sm text-muted-foreground max-w-md leading-relaxed mb-2">
                Make sure your WordPress site URL is configured in{' '}
                <code className="font-mono text-xs bg-muted px-1.5 py-0.5">lib/wordpress.js</code>
                {' '}and that the REST API is accessible.
              </p>
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground mt-4 border border-border px-4 py-2">
                ERROR: {error}
              </p>
              <button
                onClick={fetchPosts}
                className="mt-8 border border-foreground px-6 py-3 font-mono text-xs tracking-widest uppercase hover:bg-foreground hover:text-primary-foreground transition-all duration-300"
              >
                Retry
              </button>
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-24 text-center"
            >
              <h2 className="font-display text-4xl tracking-[-0.04em] text-foreground mb-4">
                No posts found
              </h2>
              <p className="font-body text-sm text-muted-foreground">
                {search ? `No results for "${search}". Try a different query.` : 'No posts published yet.'}
              </p>
              {search && (
                <button
                  onClick={clearSearch}
                  className="mt-6 border border-border px-5 py-2.5 font-mono text-xs tracking-widest uppercase hover:border-foreground transition-colors"
                >
                  Clear search
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div key={`posts-${page}-${search}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {posts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
              <div className="border-t border-border" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <motion.div
            className="flex items-center justify-between mt-12 md:mt-20 pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground border border-border px-5 py-3 hover:bg-foreground hover:text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Prev
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 font-mono text-xs border transition-all duration-200 ${
                    p === page
                      ? 'border-foreground bg-foreground text-primary-foreground'
                      : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                  }`}
                >
                  {String(p).padStart(2, '0')}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground border border-border px-5 py-3 hover:bg-foreground hover:text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}