import { getContentPosts } from "@/lib/content";
import type { ContentPost } from "@/types/content.types";
import { NextRequest, NextResponse } from "next/server";

export interface SearchResult {
  post: ContentPost;
  score: number;
  matchedFields: string[];
  excerpt: string;
}

/**
 * Calculate relevance score for search results
 */
function calculateRelevanceScore(post: ContentPost, query: string): number {
  let score = 0;
  const { metadata, content, slug } = post;

  // Title matches get highest score
  if (metadata.title?.toLowerCase().includes(query)) {
    score += 100;
  }

  // Menu title matches
  if (metadata.menuTitle?.toLowerCase().includes(query)) {
    score += 80;
  }

  // Summary matches
  if (metadata.summary?.toLowerCase().includes(query)) {
    score += 60;
  }

  // Slug matches
  if (slug?.toLowerCase().includes(query)) {
    score += 40;
  }

  // Tag matches
  if (
    Array.isArray(metadata.tags) &&
    metadata.tags.some((tag) => tag.toLowerCase().includes(query))
  ) {
    score += 50;
  }

  // Content matches (lower priority)
  const contentMatches = (
    content.toLowerCase().match(new RegExp(query, "g")) || []
  ).length;
  score += Math.min(contentMatches * 2, 30); // Cap content score

  // Exact phrase matches get bonus
  if (metadata.title.toLowerCase() === query) {
    score += 50;
  }

  return score;
}

/**
 * Identify which fields matched the search query
 */
function getMatchedFields(post: ContentPost, query: string): string[] {
  const fields: string[] = [];
  const { metadata, content, slug } = post;

  if (metadata.title.toLowerCase().includes(query)) {
    fields.push("title");
  }
  if (metadata.menuTitle?.toLowerCase().includes(query)) {
    fields.push("menuTitle");
  }
  if (metadata.summary?.toLowerCase().includes(query)) {
    fields.push("summary");
  }
  if (slug.toLowerCase().includes(query)) {
    fields.push("slug");
  }
  if (
    Array.isArray(metadata.tags) &&
    metadata.tags.some((tag) => tag.toLowerCase().includes(query))
  ) {
    fields.push("tags");
  }
  if (content.toLowerCase().includes(query)) {
    fields.push("content");
  }

  return fields;
}

/**
 * Extract relevant excerpt from content around the matched query
 */
function extractExcerpt(
  content: string,
  query: string,
  maxLength: number = 150,
): string {
  const normalizedContent = content.toLowerCase();
  const queryIndex = normalizedContent.indexOf(query);

  if (queryIndex === -1) {
    // If query not found in content, return beginning
    return (
      content.substring(0, maxLength).trim() +
      (content.length > maxLength ? "..." : "")
    );
  }

  // Extract text around the match
  const start = Math.max(0, queryIndex - 50);
  const end = Math.min(content.length, queryIndex + query.length + 100);

  let excerpt = content.substring(start, end).trim();

  // Add ellipsis if we truncated
  if (start > 0) {
    excerpt = "..." + excerpt;
  }
  if (end < content.length) {
    excerpt += "...";
  }

  return excerpt;
}

/**
 * Search through content posts
 */
function searchContent(query: string, category?: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const posts = getContentPosts(category);
  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const post of posts) {
    const { metadata, content, slug } = post;
    const searchableText = [
      metadata.title,
      metadata.summary,
      metadata.menuTitle,
      content,
      slug,
      ...(Array.isArray(metadata.tags) ? metadata.tags : []),
    ]
      .join(" ")
      .toLowerCase();

    if (searchableText.includes(normalizedQuery)) {
      const score = calculateRelevanceScore(post, normalizedQuery);
      const matchedFields = getMatchedFields(post, normalizedQuery);
      const excerpt = extractExcerpt(content, normalizedQuery);

      results.push({
        post,
        score,
        matchedFields,
        excerpt,
      });
    }
  }

  // Sort by relevance score (highest first)
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Get search suggestions based on partial query
 */
function getSearchSuggestions(query: string, limit: number = 5): string[] {
  if (!query.trim() || query.length < 2) {
    return [];
  }

  const posts = getContentPosts();
  const suggestions = new Set<string>();

  for (const post of posts) {
    const { metadata } = post;

    // Add title words that start with the query
    const titleWords = metadata.title.toLowerCase().split(/\s+/);
    titleWords.forEach((word) => {
      if (
        word.startsWith(query.toLowerCase()) &&
        word !== query.toLowerCase()
      ) {
        suggestions.add(word);
      }
    });

    // Add tags that start with the query
    if (Array.isArray(metadata.tags)) {
      metadata.tags.forEach((tag) => {
        if (
          tag.toLowerCase().startsWith(query.toLowerCase()) &&
          tag.toLowerCase() !== query.toLowerCase()
        ) {
          suggestions.add(tag.toLowerCase());
        }
      });
    }

    if (suggestions.size >= limit) {
      break;
    }
  }

  return Array.from(suggestions).slice(0, limit);
}

/**
 * Get popular search terms from content
 */
function getPopularSearchTerms(limit: number = 10): string[] {
  const posts = getContentPosts();
  const wordFreq = new Map<string, number>();

  posts.forEach((post) => {
    const text =
      `${post.metadata.title} ${post.metadata.summary}`.toLowerCase();
    const words = text.match(/\b[a-z]{3,}\b/g) || [];

    words.forEach((word) => {
      // Skip common words
      if (
        ![
          "the",
          "and",
          "for",
          "are",
          "but",
          "not",
          "you",
          "all",
          "can",
          "had",
          "her",
          "was",
          "one",
          "our",
          "out",
          "day",
          "get",
          "has",
          "him",
          "his",
          "how",
          "its",
          "may",
          "new",
          "now",
          "old",
          "see",
          "two",
          "way",
          "who",
          "boy",
          "did",
          "she",
          "use",
          "her",
          "now",
          "air",
          "any",
          "may",
          "say",
        ].includes(word)
      ) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
      }
    });
  });

  return Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const category = searchParams.get("category") || undefined;
    const type = searchParams.get("type") || "search";

    if (!query && type === "search") {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 },
      );
    }

    switch (type) {
      case "search": {
        const results = searchContent(query!, category);
        return NextResponse.json({ results });
      }

      case "suggestions": {
        const suggestions = getSearchSuggestions(query || "", 5);
        return NextResponse.json({ suggestions });
      }

      case "popular": {
        const popularTerms = getPopularSearchTerms(10);
        return NextResponse.json({ popularTerms });
      }

      default:
        return NextResponse.json(
          { error: "Invalid type parameter" },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
