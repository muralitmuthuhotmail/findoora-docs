import { getContentPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils/date";
import type { ContentPost } from "@/types/content.types";
import { LazyImage } from "@/components/ui/lazy-image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export interface ContentListPageProps {
  className?: string;
  category?: string;
}

export function ContentList({
  className,
  category,
}: ContentListPageProps = {}) {
  const allContent = getContentPosts(category || undefined);

  if (allContent.length === 0) {
    return redirect(`/not-found`);
  }

  return (
    <section aria-labelledby="content-posts-heading" className={cn(className)}>
      <h2 id="content-posts-heading" className="sr-only">
        {category ? `Content posts in ${category}` : "All content posts"}
      </h2>
      <div role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {allContent.map((post: ContentPost) => (
          // <AnimatedComponent animationType="slideUp" key={post.slug} delay={0.1}>
          <ContentPostCard key={post.slug} post={post} />
          // </AnimatedComponent>
        ))}
      </div>
    </section>
  );
}

interface ContentPostCardProps {
  post: ContentPost;
}

function ContentPostCard({ post }: ContentPostCardProps) {
  const thumbnail = post.metadata.thumbnail;
  return (
    <Link
      href={`/${post.metadata.category}/${post.slug}`}
      className={`group col-span-1 bg-card/70 rounded-xl shadow-sm border border-border flex flex-row h-32 transition-all hover:shadow-lg hover:border-primary focus:outline-none focus:ring-primary items-stretch`}
      role="listitem"
      aria-describedby={`post-summary-${post.slug}`}
      tabIndex={0}
    >
      <div className="relative h-full w-28 flex-shrink-0 rounded-l-xl overflow-hidden flex justify-center items-center p-2 bg-gradient-to-br from-accent/20 to-primary/10">
        {thumbnail && (
          <LazyImage
            src={thumbnail}
            alt={`${post.metadata.title} thumbnail`}
            width={80}
            height={80}
            loading="lazy"
            className="h-24 w-24 rounded-lg object-cover"
            placeholder="blur"
          />
        )}
      </div>
      <div className="flex flex-col flex-1 p-3 md:p-4 space-y-1 justify-between min-w-0">
        <h3
          className="text-sm md:text-base font-semibold tracking-tight text-ellipsis overflow-hidden whitespace-nowrap group-hover:text-primary transition-colors"
          title={post.metadata.title}
        >
          {post.metadata.title.length > 60
            ? post.metadata.title.slice(0, 57) + "..."
            : post.metadata.title}
        </h3>
        <p
          id={`post-summary-${post.slug}`}
          className="text-muted-foreground text-xs line-clamp-2 mb-1"
        >
          {post.metadata.summary
            ? post.metadata.summary
            : "No summary available."}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-primary font-medium group-hover:underline">
            Read more
          </span>
          {post.metadata.publishedAt && (
            <time
              dateTime={post.metadata.publishedAt}
              className="text-xs text-muted-foreground"
              aria-label={`Published on ${formatDate(post.metadata.publishedAt)}`}
            >
              {formatDate(post.metadata.publishedAt)}
            </time>
          )}
        </div>
      </div>
    </Link>
  );
}
