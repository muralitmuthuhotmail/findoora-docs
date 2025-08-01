import { CustomMDX } from "@/components/blocks/mdx/custom-mdx";
import { TableOfContents } from "@/components/blocks/table-of-contents";
import { BackToTop } from "@/components/features/back-to-top";
import { SocialShare } from "@/components/features/social-share";
import { StructuredData } from "@/components/seo/structured-data";
import { LazyImage } from "@/components/ui/lazy-image";
import { BASE_URL } from "@/lib/config";
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
              className="block 2xl:hidden pt-0"
              scrollable={false}
              content={sanitizedContent}
              title={post.metadata.menuTitle}
              summary={post.metadata.summary}
            />
            <div className="relative w-full shadow-lg rounded-xl dark:border dark:border-border-1">
              <LazyImage
                src={
                  post.metadata.banner ||
                  post.metadata.thumbnail ||
                  BASE_URL + `/og?title=`
                }
                alt={`${post.metadata.title} thumbnail`}
                width={1200}
                height={830}
                priority
                quality={100}
                loading="eager"
                className="w-full h-68 object-cover rounded-xl"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 backdrop-blur-3xl bg-card/90 rounded-b-xl">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-start justify-start space-x-2">
                    {post.metadata.author && (
                      <span className="text-base text-muted-foreground">
                        Written by <b>{post.metadata.author}</b>
                      </span>
                    )}
                    {post.metadata.publishedAt && (
                      <time
                        dateTime={post.metadata.publishedAt}
                        className="text-base text-muted-foreground"
                        aria-label={`Published on ${formatDate(post.metadata.publishedAt)}`}
                      >
                        Posted on {formatDate(post.metadata.publishedAt)}
                      </time>
                    )}
                  </div>

                  <SocialShare
                    url={postUrl}
                    title={post.metadata.title}
                    description={post.metadata.summary}
                  />
                </div>
              </div>
            </div>
            <h1 className="title font-semibold text-2xl md:text-3xl tracking-tighter mt-6">
              {post.metadata.title}
            </h1>
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
