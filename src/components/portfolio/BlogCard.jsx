import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getFeaturedImage, getAuthor, formatDate, readingTime, stripHtml } from '../../lib/wordpress';

export default function BlogCard({ post, index }) {
  const image = getFeaturedImage(post);
  const author = getAuthor(post);
  const excerpt = stripHtml(post.excerpt?.rendered || '').slice(0, 160) + '…';
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group border-t border-border"
    >
      <Link to={`/blog/${post.slug}`} className="block py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">

          {/* Index + category */}
          <div className="md:col-span-1 flex md:flex-col items-center md:items-start gap-4 md:gap-2 pt-1">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
              {String(index + 1).padStart(2, '0')}
            </span>
            {category && (
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent border border-accent px-2 py-0.5 hidden md:block">
                {category}
              </span>
            )}
          </div>

          {/* Title + excerpt */}
          <div className="md:col-span-6">
            <h2
              className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[-0.03em] text-foreground group-hover:text-accent transition-colors duration-500 leading-[1.1] mb-4"
              dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
            />
            <p className="font-body text-sm text-muted-foreground leading-[1.7] line-clamp-3">
              {excerpt}
            </p>
          </div>

          {/* Image */}
          {image && (
            <div className="md:col-span-3 overflow-hidden aspect-[4/3] bg-muted">
              <motion.img
                src={image}
                alt={post.title?.rendered}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
          )}

          {/* Meta + arrow */}
          <div className="md:col-span-2 flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-6">
            <div className="text-right hidden md:block">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground block">
                {formatDate(post.date)}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground block mt-1">
                {readingTime(post.content?.rendered)}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground block mt-1">
                {author}
              </span>
            </div>
            <div className="w-8 h-8 border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300 flex-shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 text-foreground group-hover:text-accent-foreground transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

        </div>

        {/* Mobile meta */}
        <div className="flex md:hidden items-center gap-4 mt-4 ml-8">
          <span className="font-mono text-[10px] text-muted-foreground">{formatDate(post.date)}</span>
          <span className="font-mono text-[10px] text-muted-foreground">·</span>
          <span className="font-mono text-[10px] text-muted-foreground">{readingTime(post.content?.rendered)}</span>
          {category && (
            <>
              <span className="font-mono text-[10px] text-muted-foreground">·</span>
              <span className="font-mono text-[9px] tracking-widest uppercase text-accent">{category}</span>
            </>
          )}
        </div>
      </Link>
    </motion.article>
  );
}