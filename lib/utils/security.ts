/**
 * Sanitize HTML content to prevent XSS attacks
 * For now, this is a basic implementation. In production, consider using a library like DOMPurify
 */
export function sanitizeHtml(html: string): string {
  // Basic sanitization - remove script tags and javascript: protocols
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "");
}

/**
 * Sanitize URL to prevent XSS via href attributes
 */
export function sanitizeUrl(url: string): string {
  if (!url) return "";

  // Remove javascript: and data: protocols
  if (
    url.toLowerCase().startsWith("javascript:") ||
    url.toLowerCase().startsWith("data:")
  ) {
    return "";
  }

  // Allow relative URLs, http, https, mailto, tel
  const allowedProtocols = ["http:", "https:", "mailto:", "tel:", "/", "#"];
  const hasProtocol = url.includes(":");

  if (hasProtocol) {
    const protocol = url.split(":")[0]?.toLowerCase() + ":";
    if (!allowedProtocols.includes(protocol)) {
      return "";
    }
  }

  return url;
}

/**
 * Escape HTML entities
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return text.replace(/[&<>"']/g, (match) => map[match] || match);
}

export function onlyAalphaNumeric(str: string, level: string): string {
  return (
    "heading" +
    level +
    str
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/^\d+/, "")
      .toLowerCase()
  );
}

export function getAlphaNumeric(str: string): string {
  // Remove markdown formatting but keep specific symbols
  return str
    .replace(/[*`#>]/g, "") // Remove common markdown formatting characters
    .replace(/[^a-zA-Z0-9\s?_\-:]/g, "") // Keep alphanumeric, spaces, and specific symbols
    .replace(/^\d+/, "") // Remove leading numbers
    .trim();
}
