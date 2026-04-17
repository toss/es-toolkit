import type { ColorFunction } from './types.ts';

/**
 * Returns a function that wraps text in ANSI escape codes.
 * Background colors get special newline handling because terminals
 * reset the background at line boundaries.
 */
export function createFormatter(open: string, close: string, isBackground: boolean): ColorFunction {
  return (text: string): string => {
    let result = text;

    // Re-open the outer style when a nested call with the same color
    // inserts a close code inside the text.
    if (open !== close && result.includes(close)) {
      result = result.replaceAll(close, close + open);
    }

    // Terminals reset background at line boundaries, so re-open after each
    // newline. Handle CRLF (`\r\n`) and LF (`\n`) as a single unit so the
    // close code sits outside both characters.
    if (isBackground && result.includes('\n')) {
      result = result.replaceAll(/\r?\n/g, match => close + match + open);
    }

    return open + result + close;
  };
}
