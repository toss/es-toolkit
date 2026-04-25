/**
 * Inserts `close` then `open` around every newline in the text.
 *
 * Used by background color wrappers because terminals reset the background
 * color at line boundaries — re-opening after each newline keeps the color
 * contiguous across lines. Treats CRLF as a single unit so the close code
 * sits outside both characters.
 */
export function reopenAtNewlines(open: string, close: string, text: string): string {
  if (!text.includes('\n')) {
    return text;
  }
  return text.replaceAll(/\r?\n/g, match => close + match + open);
}
