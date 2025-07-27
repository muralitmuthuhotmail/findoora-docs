import { getContentPosts } from "@/lib/content";
import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getContentPosts();

  const contentPosts = posts.map((post) => ({
    url: `${BASE_URL}/${post.metadata.category}/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt ?? Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const routes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...contentPosts,
  ];

  return routes;
}
