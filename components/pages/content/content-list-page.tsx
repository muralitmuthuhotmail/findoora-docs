import { ContentList } from "@/components/blocks/content-list";

export interface ContentListPageProps {
  className?: string;
  category?: string;
}

export function ContentListPage({
  className,
  category,
}: ContentListPageProps = {}) {
  return (
    <section className={className}>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "All Posts"}
      </h1>
      <ContentList category={category} />
    </section>
  );
}
