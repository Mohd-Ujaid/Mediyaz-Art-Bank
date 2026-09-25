/**
 * Escape special HTML characters to prevent XSS and HTML injection in emails and rendered HTML.
 */
export function escapeHtml(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Sanitize strings for MongoDB queries to prevent NoSQL operator injection.
 * Ensures the value is strictly a primitive string and contains no raw object queries.
 */
export function sanitizeString(val: any): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "object") {
    return "";
  }
  return String(val).trim();
}
