import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/portfolio/Navbar';
import Footer from '../components/portfolio/Footer';
import Annotation from '../components/portfolio/Annotation';
import { getPostBySlug, getPosts, getFeaturedImage, getAuthor, formatDate, readingTime } from '../lib/wordpress';

function PostSkeleton() {
  return (
    <div className="animate-pulse space-y-8 px-6 md:px-12 pt-32 pb-20">
      <div className="h-3 w-40 bg-border" />
      <div className="h-16 w-3/4 bg-border" />
      <div className="h-16 w-1/2 bg-border" />
      <div className="aspect-[21/9] bg-border w-full mt-12" />
      <div className="grid grid-cols-12 gap-8 mt-16">
        <div className="col-span-7 space-y-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className={`h-4 bg-border ${i % 3 === 2 ? 'w-3/4' : 'w-full'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);

    getPostBySlug(slug)
      .then((data) => {
        if (!data) throw new Error('Post not found');
        setPost(data);
        // fetch next post
        return getPosts({ page: 1, perPage: 3 });
      })
      .then(({ posts }) => {
        // pick a different post as "next"
        const other = posts.find((p) => p.slug !== slug);
        setNextPost(other || null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PostSkeleton />
    </div>
  );

  if (error || !post) return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <Annotation label="ERROR / POST NOT FOUND" />
        <h1 className="font-display text-5xl md:text-7xl tracking-[-0.05em] mt-4 mb-6">
          Not<br /><span className="italic">Found</span>
        </h1>
        <p className="font-mono text-xs text-muted-foreground mb-8">{error}</p>
        <Link to="/blog" className="border border-foreground px-6 py-3 font-mono text-xs tracking-widest uppercase hover:bg-foreground hover:text-primary-foreground transition-all">
          Back to Blog
        </Link>
      </div>
      <Footer />
    </div>
  );

  const image = getFeaturedImage(post);
  const author = getAuthor(post);
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name;
  const tags = post._embedded?.['wp:term']?.[1] || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Back */}
      <div className="pt-24 px-6 md:px-12">
        <Link
          to="/blog"
          className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Lab
        </Link>
      </div>

      {/* Post header */}
      <motion.header
        className="px-6 md:px-12 pt-10 md:pt-16 pb-12 md:pb-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {category && (
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent border border-accent px-2 py-1">
              {category}
            </span>
          )}
          <Annotation label={`${formatDate(post.date)} — ${readingTime(post.content?.rendered)}`} />
        </div>

        <h1
          className="font-display text-[8vw] md:text-[6vw] lg:text-[5.5vw] leading-[0.9] tracking-[-0.04em] text-foreground max-w-5xl"
          dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
        />

        <div className="flex items-center gap-6 mt-8 border-t border-border pt-6">
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground block mb-1">Author</span>
            <span className="font-body text-sm text-foreground">{author}</span>
          </div>
          {tags.length > 0 && (
            <div className="border-l border-border pl-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground block mb-1">Tags</span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag.id} className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground border border-border px-2 py-0.5">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.header>

      {/* Featured image */}
      {image && (
        <motion.div
          className="px-6 md:px-12 mb-16 md:mb-24"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="overflow-hidden">
            <img
              src={image}
              alt={post.title?.rendered}
              className="w-full aspect-video md:aspect-[21/9] object-cover"
            />
          </div>
          {post.featured_media_caption && (
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground mt-2">
              {post.featured_media_caption}
            </p>
          )}
        </motion.div>
      )}

      {/* Content grid: body + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 px-6 md:px-12 pb-20 md:pb-32">

        {/* Body */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div
            className="
              font-body text-base md:text-lg text-foreground leading-[1.8]
              prose-headings:font-display prose-headings:tracking-[-0.04em] prose-headings:text-foreground
              [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:mt-12 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:mb-6 [&_p]:text-foreground
              [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground
              [&_strong]:text-foreground [&_strong]:font-semibold
              [&_code]:font-mono [&_code]:text-sm [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-accent
              [&_pre]:bg-foreground [&_pre]:text-primary-foreground [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:my-6
              [&_pre_code]:bg-transparent [&_pre_code]:text-primary-foreground [&_pre_code]:p-0
              [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-6 [&_blockquote]:my-8 [&_blockquote]:font-display [&_blockquote]:italic [&_blockquote]:text-xl [&_blockquote]:text-muted-foreground
              [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:mb-6 [&_ul_li]:pl-4 [&_ul_li]:relative [&_ul_li]:before:content-['—'] [&_ul_li]:before:absolute [&_ul_li]:before:left-0 [&_ul_li]:before:text-accent [&_ul_li]:before:font-mono
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-6
              [&_img]:w-full [&_img]:my-8
              [&_hr]:border-border [&_hr]:my-12
              [&_table]:w-full [&_table]:border-collapse [&_table]:mb-8
              [&_th]:border [&_th]:border-border [&_th]:p-3 [&_th]:text-left [&_th]:font-mono [&_th]:text-xs [&_th]:tracking-widest [&_th]:uppercase [&_th]:bg-muted
              [&_td]:border [&_td]:border-border [&_td]:p-3 [&_td]:text-sm
            "
            dangerouslySetInnerHTML={{ __html: post.content?.rendered }}
          />
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          className="lg:col-span-4 lg:col-start-9"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="sticky top-28 space-y-8">
            {/* Article meta */}
            <div className="border border-border p-6 space-y-5">
              <Annotation label="ARTICLE METADATA" className="block mb-2" />
              {[
                { label: 'Published', value: formatDate(post.date) },
                { label: 'Reading Time', value: readingTime(post.content?.rendered) },
                { label: 'Author', value: author },
                ...(category ? [{ label: 'Category', value: category }] : []),
              ].map((item) => (
                <div key={item.label}>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground block mb-1">
                    {item.label}
                  </span>
                  <span className="font-body text-sm text-foreground">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="border border-border p-6">
                <Annotation label="TAGS" className="block mb-4" />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag.id} className="font-mono text-[9px] tracking-widest uppercase border border-border px-2 py-1 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share nudge */}
            <div className="border-t border-border pt-6">
              <Annotation label="SHARE THIS POST" className="block mb-4" />
              <div className="flex gap-3">
                {[
                  { label: 'Twitter/X', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title?.rendered || '')}` },
                  { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase border border-border px-3 py-2 text-muted-foreground hover:border-foreground hover:text-foreground transition-all"
                  >
                    {s.label}
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Next post */}
      {nextPost && (
        <Link to={`/blog/${nextPost.slug}`} className="block border-t border-border group">
          <div className="px-6 md:px-12 py-16 md:py-28 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <Annotation label="NEXT ARTICLE" className="block mb-4" />
              <motion.h2
                className="font-display text-4xl md:text-6xl lg:text-[6vw] tracking-[-0.04em] text-foreground group-hover:text-accent transition-colors duration-500 leading-none max-w-3xl"
                whileHover={{ x: 20 }}
                transition={{ duration: 0.4 }}
                dangerouslySetInnerHTML={{ __html: nextPost.title?.rendered }}
              />
            </div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0">
              Read Article
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      )}

      <Footer />
    </div>
  );
}