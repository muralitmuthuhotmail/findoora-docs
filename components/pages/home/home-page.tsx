import { ContentList } from "@/components/blocks/content-list";
import { getContentPosts } from "@/lib/content";

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
      <p className="mb-4">
        {`Explore our comprehensive documentation, tutorials, and guides on modern web development, TypeScript, React, and software engineering best practices.`}
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
    </section>
  );
}
