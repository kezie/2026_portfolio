import React from 'react';

function SkeletonLine({ className = '' }) {
  return <div className={`bg-border animate-pulse ${className}`} />;
}

function BlogCardSkeleton() {
  return (
    <div className="border-t border-border py-8 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        <div className="md:col-span-1">
          <SkeletonLine className="h-3 w-6" />
        </div>
        <div className="md:col-span-6 space-y-3">
          <SkeletonLine className="h-8 w-4/5" />
          <SkeletonLine className="h-4 w-full" />
          <SkeletonLine className="h-4 w-3/4" />
        </div>
        <div className="md:col-span-3">
          <div className="aspect-[4/3] bg-border animate-pulse" />
        </div>
        <div className="md:col-span-2 hidden md:flex flex-col items-end gap-2">
          <SkeletonLine className="h-3 w-20" />
          <SkeletonLine className="h-3 w-16" />
          <SkeletonLine className="h-3 w-14" />
        </div>
      </div>
    </div>
  );
}

export default function BlogSkeleton({ count = 5 }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}