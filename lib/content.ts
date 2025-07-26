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
      (metadata as Record<string, unknown>)[key.trim()] = value;
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

    if (category) {
      return posts.filter((post) => post.metadata.category === category);
    }

    return posts;
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
