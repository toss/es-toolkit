import { describe, expect, it } from 'vitest';
import { wrapAnsi } from './wrapAnsi.ts';
import { wrapAnsiBg } from './wrapAnsiBg.ts';

const OPEN = '<O>';
const CLOSE = '<C>';

describe('wrapAnsiBg', () => {
  it('should wrap text with open and close codes', () => {
    expect(wrapAnsiBg(OPEN, CLOSE, 'hello')).toBe(`${OPEN}hello${CLOSE}`);
  });

  it('should wrap empty string with codes', () => {
    expect(wrapAnsiBg(OPEN, CLOSE, '')).toBe(`${OPEN}${CLOSE}`);
  });

  it('should re-open outer when raw close code is injected in text', () => {
    expect(wrapAnsiBg(OPEN, CLOSE, `a${CLOSE}b`)).toBe(`${OPEN}a${CLOSE}${OPEN}b${CLOSE}`);
  });

  it('should re-open background after newlines so color stays contiguous across lines', () => {
    expect(wrapAnsiBg(OPEN, CLOSE, 'a\nb')).toBe(`${OPEN}a${CLOSE}\n${OPEN}b${CLOSE}`);
    expect(wrapAnsiBg(OPEN, CLOSE, 'a\n\nb')).toBe(`${OPEN}a${CLOSE}\n${OPEN}${CLOSE}\n${OPEN}b${CLOSE}`);
    expect(wrapAnsiBg(OPEN, CLOSE, '\nabc')).toBe(`${OPEN}${CLOSE}\n${OPEN}abc${CLOSE}`);
    expect(wrapAnsiBg(OPEN, CLOSE, 'abc\n')).toBe(`${OPEN}abc${CLOSE}\n${OPEN}${CLOSE}`);
  });

  it('should treat CRLF as a single unit', () => {
    expect(wrapAnsiBg(OPEN, CLOSE, 'a\r\nb')).toBe(`${OPEN}a${CLOSE}\r\n${OPEN}b${CLOSE}`);
    expect(wrapAnsiBg(OPEN, CLOSE, 'a\nb\r\nc')).toBe(`${OPEN}a${CLOSE}\n${OPEN}b${CLOSE}\r\n${OPEN}c${CLOSE}`);
  });

  it('should pass lone carriage returns through unchanged', () => {
    expect(wrapAnsiBg(OPEN, CLOSE, 'a\rb')).toBe(`${OPEN}a\rb${CLOSE}`);
  });

  it('should compose deeply with foreground and modifier wraps in mixed nesting', () => {
    // Simulates a real-world case like `bold(yellow(bgRed(italic('hi'))))`
    // where bold/italic (modifier), yellow (fg), and bgRed (bg) each have
    // distinct close codes — none should trigger another's re-open path.
    const O_BOLD = '<B>';
    const C_BOLD = '<b>';
    const O_FG = '<F>';
    const C_FG = '<f>';
    const O_ITAL = '<I>';
    const C_ITAL = '<i>';
    const result = wrapAnsi(
      O_BOLD,
      C_BOLD,
      wrapAnsi(O_FG, C_FG, wrapAnsiBg(OPEN, CLOSE, wrapAnsi(O_ITAL, C_ITAL, 'hi')))
    );
    expect(result).toBe(`${O_BOLD}${O_FG}${OPEN}${O_ITAL}hi${C_ITAL}${CLOSE}${C_FG}${C_BOLD}`);
  });
});
