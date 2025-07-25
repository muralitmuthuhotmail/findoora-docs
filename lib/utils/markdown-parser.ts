/**
 * Utility functions for parsing markdown content and identifying patterns
 */

export interface CodeBlock {
  start: number;
  end: number;
  type: "fenced" | "indented" | "inline";
  language?: string;
}

export interface IgnorePattern {
  start: number;
  end: number;
  type: "code" | "html" | "comment" | "frontmatter";
}

/**
 * Find all code blocks in markdown content
 */
export function findCodeBlocks(content: string): CodeBlock[] {
  const blocks: CodeBlock[] = [];
  const lines = content.split("\n");
  let inFencedBlock = false;
  let fencedBlockStart = -1;
  let fencePattern = "";

  // Find fenced code blocks (``` or ~~~)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] || "";
    const fenceMatch = line.match(/^(\s*)(```+|~~~+)(.*)$/);

    if (fenceMatch && !inFencedBlock) {
      // Start of fenced block
      inFencedBlock = true;
      fencedBlockStart =
        content.split("\n").slice(0, i).join("\n").length + (i > 0 ? 1 : 0);
      fencePattern = fenceMatch[2] ?? "";
    } else if (
      fenceMatch &&
      inFencedBlock &&
      fenceMatch[2]?.startsWith(fencePattern.charAt(0))
    ) {
      // End of fenced block
      const blockEnd = content
        .split("\n")
        .slice(0, i + 1)
        .join("\n").length;
      blocks.push({
        start: fencedBlockStart,
        end: blockEnd,
        type: "fenced",
        language: fenceMatch[3]?.trim(),
      });
      inFencedBlock = false;
      fencedBlockStart = -1;
      fencePattern = "";
    }
  }

  // Find indented code blocks (4+ spaces)
  let inIndentedBlock = false;
  let indentedBlockStart = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] || "";
    const isIndentedCode = line.match(/^ {4}/) && line.trim() !== "";
    const isEmpty = line.trim() === "";

    if (
      isIndentedCode &&
      !inIndentedBlock &&
      !isInCodeBlock(blocks, getLinePosition(content, i))
    ) {
      inIndentedBlock = true;
      indentedBlockStart = getLinePosition(content, i);
    } else if (!isIndentedCode && !isEmpty && inIndentedBlock) {
      blocks.push({
        start: indentedBlockStart,
        end: getLinePosition(content, i),
        type: "indented",
      });
      inIndentedBlock = false;
      indentedBlockStart = -1;
    }
  }

  // Find inline code (`code`)
  const inlineCodeRegex = /`([^`]+)`/g;
  let match;
  while ((match = inlineCodeRegex.exec(content)) !== null) {
    if (!isInCodeBlock(blocks, match.index)) {
      blocks.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "inline",
      });
    }
  }

  return blocks.sort((a, b) => a.start - b.start);
}

/**
 * Find all ignore patterns in markdown content
 */
export function findIgnorePatterns(content: string): IgnorePattern[] {
  const patterns: IgnorePattern[] = [];

  // Add code blocks
  const codeBlocks = findCodeBlocks(content);
  patterns.push(
    ...codeBlocks.map((block) => ({
      start: block.start,
      end: block.end,
      type: "code" as const,
    })),
  );

  // Find HTML comments
  const htmlCommentRegex = /<!--[\s\S]*?-->/g;
  let match;
  while ((match = htmlCommentRegex.exec(content)) !== null) {
    patterns.push({
      start: match.index,
      end: match.index + match[0].length,
      type: "comment",
    });
  }

  // Find HTML blocks
  const htmlBlockRegex = /<[^>]+>[\s\S]*?<\/[^>]+>/g;
  while ((match = htmlBlockRegex.exec(content)) !== null) {
    if (!isInIgnorePattern(patterns, match.index)) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "html",
      });
    }
  }

  // Find frontmatter
  const frontmatterRegex = /^---\s*\n[\s\S]*?\n---\s*\n/;
  const frontmatterMatch = content.match(frontmatterRegex);
  if (frontmatterMatch) {
    patterns.push({
      start: 0,
      end: frontmatterMatch[0].length,
      type: "frontmatter",
    });
  }

  return patterns.sort((a, b) => a.start - b.start);
}

/**
 * Check if a position is within any code block
 */
function isInCodeBlock(blocks: CodeBlock[], position: number): boolean {
  return blocks.some(
    (block) => position >= block.start && position < block.end,
  );
}

/**
 * Check if a position is within any ignore pattern
 */
function isInIgnorePattern(
  patterns: IgnorePattern[],
  position: number,
): boolean {
  return patterns.some(
    (pattern) => position >= pattern.start && position < pattern.end,
  );
}

/**
 * Get character position of a line in content
 */
function getLinePosition(content: string, lineIndex: number): number {
  const lines = content.split("\n");
  let position = 0;
  for (let i = 0; i < lineIndex && i < lines.length; i++) {
    position += (lines[i]?.length || 0) + 1; // +1 for newline character
  }
  return position;
}

/**
 * Extract headings while respecting ignore patterns
 */
export function extractHeadingsWithIgnorePatterns(content: string): Array<{
  level: number;
  text: string;
  id: string;
  position: number;
}> {
  const ignorePatterns = findIgnorePatterns(content);
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  const headings: Array<{
    level: number;
    text: string;
    id: string;
    position: number;
  }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const position = match.index;

    // Check if this heading is within any ignore pattern
    const isIgnored = ignorePatterns.some(
      (pattern) => position >= pattern.start && position < pattern.end,
    );

    if (!isIgnored) {
      const level = match[1]?.length || 1;
      const text = match[2]?.trim() || "";
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes

      if (text && id) {
        headings.push({ level, text, id, position });
      }
    }
  }

  return headings;
}

/**
 * Remove ignored patterns from content for processing
 */
export function removeIgnoredContent(content: string): string {
  const patterns = findIgnorePatterns(content);
  let cleanContent = content;

  // Remove patterns in reverse order to maintain position indexes
  for (const pattern of patterns.reverse()) {
    const before = cleanContent.substring(0, pattern.start);
    const after = cleanContent.substring(pattern.end);

    // Replace with placeholder to maintain line structure for headings
    const replacement =
      pattern.type === "code"
        ? "\n".repeat(
            (
              cleanContent.substring(pattern.start, pattern.end).match(/\n/g) ||
              []
            ).length,
          )
        : "";

    cleanContent = before + replacement + after;
  }

  return cleanContent;
}
