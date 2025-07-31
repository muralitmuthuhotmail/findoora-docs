import { ContentList } from "@/components/blocks/content-list";
import { CTACard } from "@/components/blocks/cta";
import { BackToTop } from "@/components/features/back-to-top";
import { GITHUB_ISSUES_URL, SUPPORT_PROJECT_URL } from "@/lib/config";
import { getContentPosts } from "@/lib/content";
import { cn } from "@/lib/utils";

export function HomePage() {
  const contentPosts = getContentPosts();
  const categories = Array.from(
    new Set(
      contentPosts.map((post) => post.metadata.category || "Uncategorized"),
    ),
  );

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Findoora Docs
      </h1>
      <article
        className={cn("grid grid-cols-1 2xl:grid-cols-10 gap-2")}
        role="article"
      >
        <div className="col-span-1 2xl:col-span-7 pr-0 2xl:pr-6 w-full flex justify-center items-center flex-col">
          <div className="w-full prose prose-invert dark:prose-invert max-w-none">
            <p className="mb-4">
              Explore our comprehensive documentation, tutorials, and guides on
              modern web development, TypeScript, React, and software
              engineering best practices.
            </p>
            {categories.map((category) => (
              <div key={category} className="flex flex-col">
                <h2 className="mb-4 text-xl font-semibold">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
                <ContentList
                  key={`cl-${category}`}
                  category={category}
                  className="mb-12"
                />
              </div>
            ))}
          </div>
          <BackToTop />
        </div>
        <CTACard
          variant="feedback"
          className="col-span-1 2xl:col-span-3 shadow-xl 2xl:mt-0 2xl:sticky 2xl:top-20 mt-5 rounded-xl bg-muted/60 h-fit w-full flex"
          title="Contact Us"
          description={
            "Have questions or feedback? We’d love to hear from you!"
          }
          actions={[
            {
              label: "Get in Touch",
              href: GITHUB_ISSUES_URL,
              external: true,
              variant: "outline",
            },
            {
              label: "Support Us",
              href: SUPPORT_PROJECT_URL,
              external: true,
              variant: "default",
            },
          ]}
        />
      </article>
    </section>
  );
}
