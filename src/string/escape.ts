const htmlEscapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Converts the characters "&", "<", ">", '"', and "'" in `str` to their corresponding HTML entities.
 * For example, "<" becomes "&lt;".
 *
 * @param {string} str  The string to escape.
 * @returns {string} Returns the escaped string.
 */
export function escape(str: string): string {
  return str.replace(/[&<>"']/g, match => htmlEscapes[match]);
}
