import type { ContentPost } from "@/types/content.types";

export interface SearchResult {
  post: ContentPost;
  score: number;
  matchedFields: string[];
  excerpt: string;
}

const baseUrl =
  typeof window !== "undefined"
    ? ""
    : `http://localhost:${process.env.NEXT_PUBLIC_PORT || 3001}`;

/**
 * Search through content posts using API
 */
export async function searchContent(
  query: string,
  category?: string,
): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const params = new URLSearchParams({ q: query, type: "search" });
    if (category) {
      params.append("category", category);
    }
    const response = await fetch(`${baseUrl}/api/search?${params}`);
    if (!response.ok) {
      throw new Error(`Search API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

/**
 * Get search suggestions based on partial query
 */
export async function getSearchSuggestions(query: string): Promise<string[]> {
  if (!query.trim() || query.length < 2) {
    return [];
  }

  try {
    const params = new URLSearchParams({ q: query, type: "suggestions" });
    const response = await fetch(`${baseUrl}/api/search?${params}`);

    if (!response.ok) {
      throw new Error(`Suggestions API error: ${response.status}`);
    }

    const data = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.error("Suggestions error:", error);
    return [];
  }
}

/**
 * Search within a specific category
 */
export async function searchByCategory(
  query: string,
  categories: string[],
): Promise<SearchResult[]> {
  try {
    const allResults = await Promise.all(
      categories.map((category) => searchContent(query, category)),
    );

    const flatResults = allResults.flat();

    // Remove duplicates and sort by score
    const uniqueResults = flatResults.filter(
      (result, index, arr) =>
        arr.findIndex((r) => r.post.slug === result.post.slug) === index,
    );

    return uniqueResults.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error("Category search error:", error);
    return [];
  }
}

/**
 * Get popular search terms from content
 */
export async function getPopularSearchTerms(): Promise<string[]> {
  try {
    const params = new URLSearchParams({ type: "popular" });

    const response = await fetch(`${baseUrl}/api/search?${params}`);

    if (!response.ok) {
      throw new Error(`Popular terms API error: ${response.status}`);
    }

    const data = await response.json();
    return data.popularTerms || [];
  } catch (error) {
    console.error("Popular terms error:", error);
    return [];
  }
}
