/**
 * Wraps text with ANSI open/close codes.
 *
 * If the text already contains the close code (from a nested style sharing
 * the same close), re-opens the outer style after each occurrence so the
 * remainder keeps its color.
 */
export function wrapAnsi(open: string, close: string, text: string): string {
  if (text.includes(close)) {
    text = text.replaceAll(close, close + open);
  }
  return open + text + close;
}
