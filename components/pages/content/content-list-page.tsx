import { ContentList } from "@/components/blocks/content-list";
import { CTACard } from "@/components/blocks/cta";
import { BackToTop } from "@/components/features/back-to-top";
import { GITHUB_ISSUES_URL, SUPPORT_PROJECT_URL } from "@/lib/config";
import { cn } from "@/lib/utils";
export interface ContentListPageProps {
  className?: string;
  category?: string;
}

export function ContentListPage({
  className,
  category,
}: ContentListPageProps = {}) {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "All Posts"}
      </h1>
      <article
        className={cn("grid grid-cols-1 2xl:grid-cols-10 gap-2", className)}
        role="article"
      >
        <div className="col-span-1 2xl:col-span-7 pr-0 2xl:pr-6 w-full flex justify-center items-center flex-col">
          <div className="w-full prose prose-invert dark:prose-invert max-w-none">
            <ContentList category={category} />
          </div>
          <BackToTop />
        </div>
        <CTACard
          variant="feedback"
          className="col-span-3 2xl:sticky 2xl:top-20 rounded-xl bg-muted/60 h-fit w-full hidden 2xl:block p-6"
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
