import {
  extractHeadingsWithIgnorePatterns,
  findIgnorePatterns,
} from "@/lib/utils/markdown-parser";

/**
 * Process content for table of contents generation
 */
export function processContentForTOC(content: string) {
  const headings = extractHeadingsWithIgnorePatterns(content);

  return {
    headings: headings.map((h) => ({
      level: h.level,
      text: h.text,
      id: h.id,
    })),
    hasValidHeadings: headings.length > 0,
    deepestLevel: Math.max(...headings.map((h) => h.level), 1),
    shallowestLevel: Math.min(...headings.map((h) => h.level), 6),
  };
}

/**
 * Validate heading structure and suggest improvements
 */
export function validateHeadingStructure(content: string) {
  const headings = extractHeadingsWithIgnorePatterns(content);
  const issues: string[] = [];

  if (headings.length === 0) {
    issues.push("No headings found for table of contents");
    return { isValid: false, issues };
  }

  // Check for proper heading hierarchy
  let prevLevel = 0;
  for (const heading of headings) {
    if (heading.level > prevLevel + 1 && prevLevel > 0) {
      issues.push(
        `Heading level jump from h${prevLevel} to h${heading.level}: "${heading.text}"`,
      );
    }
    prevLevel = heading.level;
  }

  // Check for duplicate IDs
  const ids = new Set();
  const duplicates = new Set();

  for (const heading of headings) {
    if (ids.has(heading.id)) {
      duplicates.add(heading.id);
    }
    ids.add(heading.id);
  }

  if (duplicates.size > 0) {
    issues.push(
      `Duplicate heading IDs found: ${Array.from(duplicates).join(", ")}`,
    );
  }

  return {
    isValid: issues.length === 0,
    issues,
    headingCount: headings.length,
    levelDistribution: headings.reduce(
      (acc, h) => {
        acc[h.level] = (acc[h.level] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    ),
  };
}

/**
 * Generate heading anchors that avoid conflicts
 */
export function generateUniqueHeadingId(
  text: string,
  existingIds: Set<string>,
): string {
  let baseId = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!baseId) {
    baseId = "heading";
  }

  let uniqueId = baseId;
  let counter = 1;

  while (existingIds.has(uniqueId)) {
    uniqueId = `${baseId}-${counter}`;
    counter++;
  }

  existingIds.add(uniqueId);
  return uniqueId;
}

/**
 * Extract content summary while ignoring code blocks
 */
export function extractContentSummary(
  content: string,
  maxLength: number = 200,
): string {
  const patterns = findIgnorePatterns(content);
  let cleanContent = content;

  // Remove frontmatter, code blocks, and HTML
  for (const pattern of patterns.reverse()) {
    const before = cleanContent.substring(0, pattern.start);
    const after = cleanContent.substring(pattern.end);
    cleanContent = before + after;
  }

  // Remove markdown formatting
  cleanContent = cleanContent
    .replace(/#{1,6}\s+/g, "") // Remove heading markers
    .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold
    .replace(/\*([^*]+)\*/g, "$1") // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links
    .replace(/>\s+/g, "") // Remove blockquotes
    .replace(/^\s*[-*+]\s+/gm, "") // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, "") // Remove ordered list markers
    .replace(/\n{2,}/g, " ") // Replace multiple newlines with space
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  return cleanContent.length > maxLength
    ? cleanContent.substring(0, maxLength).trim() + "..."
    : cleanContent;
}
