import { NextRequest, NextResponse } from "next/server";
import { getContentPosts } from "@/lib/content";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "content";

  try {
    if (type === "content") {
      const contentPosts = getContentPosts();
      const navigationData = contentPosts.map((post) => ({
        title: post.metadata.menuTitle || post.metadata.title,
        description: post.metadata.summary,
        url: `/${post.metadata.category}/${post.slug}`,
        publishedTime: post.metadata.publishedAt,
        image:
          post.metadata.banner ||
          post.metadata.thumbnail ||
          `${process.env.NEXT_PUBLIC_BASE_URL}/og?title=${encodeURIComponent(post.metadata.title)}`,
      }));

      return NextResponse.json({ navigationData });
    }
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Navigation API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
