import { SCHEMA_ORG_URL } from "@/lib/config";
import type { ContentPost } from "@/types/content.types";

interface StructuredDataProps {
  post: ContentPost;
  baseUrl: string;
}

export function StructuredData({ post, baseUrl }: StructuredDataProps) {
  const structuredData = {
    "@context": SCHEMA_ORG_URL,
    "@type": "BlogPosting",
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
      name: "Findoora Inc.",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    image: post.metadata.image
      ? `${baseUrl}${post.metadata.image}`
      : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
    url: `${baseUrl}/${post.metadata.banner}/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${post.metadata.banner}/${post.slug}`,
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
