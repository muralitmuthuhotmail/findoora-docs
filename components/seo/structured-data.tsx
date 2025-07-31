import { SCHEMA_ORG_URL, SITE_NAME } from "@/lib/config";
import type { ContentPost } from "@/types/content.types";

interface StructuredDataProps {
  post: ContentPost;
  baseUrl: string;
}

export function StructuredData({ post, baseUrl }: StructuredDataProps) {
  const structuredData = {
    "@context": SCHEMA_ORG_URL,
    "@type": post.metadata.category || "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.summary,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.publishedAt,
    author: {
      "@type": "Organization",
      name: "Findoora Team",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: { SITE_NAME },
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    image: post.metadata.banner
      ? `${baseUrl}${post.metadata.banner}`
      : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
    url: `${baseUrl}/${post.metadata.category}/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${post.metadata.category}/${post.slug}`,
    },
    keywords: [
      "web development",
      "programming",
      "tutorial",
      "blog",
      "technology",
    ],
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
