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
        My Portfolio
      </h1>
      <p className="mb-4">
        {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
        Vim's keystroke commands and tabs' flexibility for personal viewing
        preferences. This extends to my support for static typing, where its
        early error detection ensures cleaner code, and my preference for dark
        mode, which eases long coding sessions by reducing eye strain.`}
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
