import { getContentPosts } from "@/lib/content";
import { NextResponse } from "next/server";

import { BASE_URL } from "@/lib/config";

export async function GET() {
  const posts = getContentPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
      <title>Findoora Docs</title>
      <description>Documentation and insights on modern web development</description>
      <link>${BASE_URL}</link>
      <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <generator>Next.js</generator>
      ${posts
        .sort(
          (a, b) =>
            new Date(b.metadata.publishedAt ?? "").getTime() -
            new Date(a.metadata.publishedAt ?? "").getTime(),
        )
        .map(
          (post) => `
            <item>
                <title><![CDATA[${post.metadata.title}]]></title>
                <description><![CDATA[${post.metadata.summary}]]></description>
                <link>${BASE_URL}/${post.metadata.category}/${post.slug}</link>
                <guid>${BASE_URL}/${post.metadata.category}/${post.slug}</guid>
                <pubDate>${new Date(post.metadata.publishedAt ?? "").toUTCString()}</pubDate>
            </item>`,
        )
        .join("")}
  </channel>
  </rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
