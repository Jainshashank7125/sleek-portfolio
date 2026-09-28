import { BlogPostPreview } from '@/types/blog';

import { BlogCard } from './BlogCard';

interface BlogListProps {
  posts: BlogPostPreview[];
  className?: string;
  startIndex?: number;
}

export function BlogList({
  posts,
  className = '',
  startIndex = 1,
}: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="border-border border-y py-12">
        <h2 className="font-editorial text-2xl">No published notes yet.</h2>
        <p className="text-muted-foreground mt-2">
          New field notes will appear here as they are ready.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {posts.map((post, offset) => (
        <BlogCard key={post.slug} post={post} index={startIndex + offset} />
      ))}
    </div>
  );
}
