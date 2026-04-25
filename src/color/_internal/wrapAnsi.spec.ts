import { describe, expect, it } from 'vitest';
import { wrapAnsi } from './wrapAnsi.ts';

const OPEN = '<O>';
const CLOSE = '<C>';
const OPEN_ALT = '<A>';
const CLOSE_ALT = '<X>';

describe('wrapAnsi', () => {
  it('should wrap text with open and close codes', () => {
    expect(wrapAnsi(OPEN, CLOSE, 'hello')).toBe(`${OPEN}hello${CLOSE}`);
  });

  it('should wrap empty string with codes', () => {
    expect(wrapAnsi(OPEN, CLOSE, '')).toBe(`${OPEN}${CLOSE}`);
  });

  it('should stack styles with distinct close codes', () => {
    expect(wrapAnsi(OPEN_ALT, CLOSE_ALT, wrapAnsi(OPEN, CLOSE, 'hi'))).toBe(`${OPEN_ALT}${OPEN}hi${CLOSE}${CLOSE_ALT}`);
  });

  it('should re-open outer style when inner shares the same close code', () => {
    expect(wrapAnsi(OPEN, CLOSE, wrapAnsi(OPEN, CLOSE, 'ds'))).toBe(`${OPEN}${OPEN}ds${CLOSE}${OPEN}${CLOSE}`);
  });

  it('should re-open outer style at every inner close in deep nesting', () => {
    expect(wrapAnsi(OPEN, CLOSE, wrapAnsi(OPEN, CLOSE, wrapAnsi(OPEN, CLOSE, 'x')))).toBe(
      `${OPEN}${OPEN}${OPEN}x${CLOSE}${OPEN}${OPEN}${CLOSE}${OPEN}${CLOSE}`
    );
  });

  it('should re-open outer when raw close code is injected in text', () => {
    expect(wrapAnsi(OPEN, CLOSE, `a${CLOSE}b`)).toBe(`${OPEN}a${CLOSE}${OPEN}b${CLOSE}`);
  });

  it('should not split styles at newlines (foreground stays across line breaks)', () => {
    expect(wrapAnsi(OPEN, CLOSE, 'a\nb')).toBe(`${OPEN}a\nb${CLOSE}`);
  });

  it('should pass multi-codepoint characters and tabs through unchanged', () => {
    expect(wrapAnsi(OPEN, CLOSE, '🎨')).toBe(`${OPEN}🎨${CLOSE}`);
    expect(wrapAnsi(OPEN, CLOSE, '👨‍👩‍👧‍👦')).toBe(`${OPEN}👨‍👩‍👧‍👦${CLOSE}`);
    expect(wrapAnsi(OPEN, CLOSE, 'a\tb')).toBe(`${OPEN}a\tb${CLOSE}`);
  });
});
