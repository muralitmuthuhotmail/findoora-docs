import { CustomMDX } from "@/components/blocks/mdx/custom-mdx";
import { TableOfContents } from "@/components/blocks/table-of-contents";
import { BackToTop } from "@/components/features/back-to-top";
import { SocialShare } from "@/components/features/social-share";
import { StructuredData } from "@/components/seo/structured-data";
import { LazyImage } from "@/components/ui/lazy-image";
import { formatDate } from "@/lib/utils/date";
import { sanitizeHtml } from "@/lib/utils/security";
import type { ContentPost } from "@/types/content.types";

interface BlogPostPageProps {
  post: ContentPost;
  baseUrl: string;
}

export function ContentPage({ post, baseUrl }: BlogPostPageProps) {
  const content = post?.content || "";
  const sanitizedContent = sanitizeHtml(content);
  const postUrl = `${baseUrl}/${post.metadata.category}/${post.slug}`;

  return (
    <section>
      <StructuredData post={post} baseUrl={baseUrl} />

      <article
        className="grid grid-cols-1 2xl:grid-cols-10 gap-2"
        role="article"
      >
        <div className="col-span-1 2xl:col-span-7 pr-0 2xl:pr-6 w-full flex justify-center items-center flex-col">
          <header className="mb-8 w-full items-start">
            <TableOfContents
              className="block 2xl:hidden border-b border-border pt-0"
              scrollable={false}
              content={sanitizedContent}
              title={post.metadata.menuTitle}
              summary={post.metadata.summary}
            />
            {(post.metadata.banner || post.metadata.thumbnail) && (
              <LazyImage
                src={
                  post.metadata.banner ||
                  post.metadata.thumbnail ||
                  "/placeholder-thumbnail.png"
                }
                alt={`${post.metadata.title} thumbnail`}
                width={1200}
                height={630}
                priority
                quality={100}
                loading="eager"
                className="w-full h-68 object-cover rounded-xl mb-4"
              />
            )}
            <h1 className="title font-semibold text-2xl md:text-3xl tracking-tighter my-4">
              {post.metadata.title}
            </h1>
            <div className="flex justify-between items-center mb-4">
              {post.metadata.publishedAt && (
                <time
                  dateTime={post.metadata.publishedAt}
                  className="text-base text-muted-foreground"
                  aria-label={`Published on ${formatDate(post.metadata.publishedAt)}`}
                >
                  {formatDate(post.metadata.publishedAt)}
                </time>
              )}
              <SocialShare
                url={postUrl}
                title={post.metadata.title}
                description={post.metadata.summary}
              />
            </div>
          </header>
          <div className="w-full prose prose-invert dark:prose-invert max-w-none">
            <CustomMDX source={sanitizedContent} />
          </div>
          <BackToTop />
        </div>
        <TableOfContents
          className="col-span-3 2xl:sticky 2xl:top-20 rounded-xl bg-muted/60 h-fit w-full hidden 2xl:block p-6"
          content={sanitizedContent}
          title={post.metadata.menuTitle}
          summary={post.metadata.summary}
        />
      </article>
    </section>
  );
}
