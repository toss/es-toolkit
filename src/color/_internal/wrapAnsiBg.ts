/**
 * Wraps text with ANSI background open/close codes.
 *
 * Handles two cases beyond the basic open/close wrap:
 * 1. If the text contains the close code (from a nested style sharing the
 *    same close), re-opens the outer style after each occurrence.
 * 2. Re-opens the background after every newline because terminals reset
 *    background color at line boundaries. CRLF is treated as a single unit.
 *
 * The close-injection step runs before the newline split so the close codes
 * the newline step itself emits don't get re-opened twice.
 */
export function wrapAnsiBg(open: string, close: string, text: string): string {
  if (text.includes(close)) {
    text = text.replaceAll(close, close + open);
  }
  if (text.includes('\n')) {
    text = text.replaceAll(/\r?\n/g, match => close + match + open);
  }
  return open + text + close;
}
