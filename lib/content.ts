import type { ContentMetadata, ContentPost } from "@/types/content.types";
import fs from "fs";
import path from "path";

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    throw new Error("No frontmatter found");
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock?.trim().split("\n");
  const metadata: Partial<ContentMetadata> = {};

  frontMatterLines?.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    if (key) {
      let value = valueArr.join(": ").trim();
      value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes

      // Handle sequence field as number
      if (key.trim() === "sequence") {
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue)) {
          (metadata as Record<string, unknown>)[key.trim()] = numValue;
        }
      }
      // Handle array fields (like tags)
      else if (
        key.trim() === "tags" &&
        value.startsWith("[") &&
        value.endsWith("]")
      ) {
        try {
          const parsedArray = JSON.parse(value);
          (metadata as Record<string, unknown>)[key.trim()] = parsedArray;
        } catch {
          // If JSON parsing fails, treat as regular string
          (metadata as Record<string, unknown>)[key.trim()] = value;
        }
      }
      // Handle boolean fields
      else if (value === "true" || value === "false") {
        (metadata as Record<string, unknown>)[key.trim()] = value === "true";
      } else {
        (metadata as Record<string, unknown>)[key.trim()] = value;
      }
    }
  });

  return { metadata: metadata as ContentMetadata, content };
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => {
    const ext = path.extname(file);
    return ext === ".mdx" || ext === ".md";
  });
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string): ContentPost[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getContentPosts(category?: string): ContentPost[] {
  try {
    const postsPath = path.join(process.cwd(), "md-content");

    if (!fs.existsSync(postsPath)) {
      console.warn("Posts directory not found, creating empty array");
      return [];
    }

    const posts = getMDXData(postsPath);

    let filteredPosts = posts;
    if (category) {
      filteredPosts = posts.filter(
        (post) => post.metadata.category === category,
      );
    }

    // Sort by sequence first (ascending), then by publishedAt (descending)
    return filteredPosts.sort((a, b) => {
      // First, sort by sequence if both have sequence numbers
      const aSequence = a.metadata.sequence;
      const bSequence = b.metadata.sequence;

      if (aSequence !== undefined && bSequence !== undefined) {
        return aSequence - bSequence; // Ascending order for sequence
      }

      // If only one has sequence, prioritize it
      if (aSequence !== undefined && bSequence === undefined) {
        return -1; // a comes first
      }
      if (aSequence === undefined && bSequence !== undefined) {
        return 1; // b comes first
      }

      // If neither has sequence, fall back to publishedAt
      const aDate = a.metadata.publishedAt
        ? new Date(a.metadata.publishedAt)
        : undefined;
      const bDate = b.metadata.publishedAt
        ? new Date(b.metadata.publishedAt)
        : undefined;

      if (aDate && bDate) {
        return bDate.getTime() - aDate.getTime(); // Descending order for dates
      }
      if (!aDate && bDate) {
        return 1; // a is undefined, goes last
      }
      if (aDate && !bDate) {
        return -1; // b is undefined, goes last
      }
      return 0; // both undefined, maintain original order
    });
  } catch (error) {
    console.error("Error loading content posts:", error);
    return [];
  }
}

export function getContentPost(slug: string): ContentPost | null {
  try {
    if (!slug || typeof slug !== "string") {
      console.warn("Invalid slug provided:", slug);
      return null;
    }

    const posts = getContentPosts();
    const post = posts.find((post) => post.slug === slug);

    if (!post) {
      console.warn(`Content post not found for slug: ${slug}`);
      return null;
    }

    return post;
  } catch (error) {
    console.error(`Error loading content post with slug: ${slug}`, error);
    return null;
  }
}

export function getContentPostMetadata(category?: string): ContentMetadata[] {
  try {
    const posts = getContentPosts(category);
    return posts.map((post) => post.metadata);
  } catch (error) {
    console.error("Error loading content post metadata:", error);
    return [];
  }
}
