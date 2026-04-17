// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { createFormatter } from './createFormatter.ts';

// Abstract placeholders so tests focus on createFormatter's generic behavior
// rather than any specific ANSI code. Shared close codes are modelled by
// reusing the same CLOSE string.
const OPEN = '<O>';
const CLOSE = '<C>';
const OPEN2 = '<O2>'; // different open, shares CLOSE
const OPEN_ALT = '<O3>';
const CLOSE_ALT = '<C3>'; // distinct close code
const SELF = '<S>'; // open === close

describe('createFormatter', () => {
  const style = createFormatter(OPEN, CLOSE, false);
  const sibling = createFormatter(OPEN2, CLOSE, false); // shares CLOSE with `style`
  const independent = createFormatter(OPEN_ALT, CLOSE_ALT, false); // distinct close
  const bg = createFormatter(OPEN, CLOSE, true);
  const self = createFormatter(SELF, SELF, false);

  it('should wrap text with open and close codes', () => {
    expect(style('hello')).toBe(`${OPEN}hello${CLOSE}`);
  });

  it('should wrap empty string with codes', () => {
    expect(style('')).toBe(`${OPEN}${CLOSE}`);
  });

  it('should stack styles with distinct close codes', () => {
    expect(independent(style('hi'))).toBe(`${OPEN_ALT}${OPEN}hi${CLOSE}${CLOSE_ALT}`);
  });

  it('should re-open outer style when inner shares the same close code', () => {
    expect(style(style('ds'))).toBe(`${OPEN}${OPEN}ds${CLOSE}${OPEN}${CLOSE}`);
    expect(style(sibling('hi'))).toBe(`${OPEN}${OPEN2}hi${CLOSE}${OPEN}${CLOSE}`);
  });

  it('should re-open outer style at every inner close in deep nesting', () => {
    expect(style(style(style('x')))).toBe(`${OPEN}${OPEN}${OPEN}x${CLOSE}${OPEN}${OPEN}${CLOSE}${OPEN}${CLOSE}`);
  });

  it('should re-open outer when raw close code is injected in text', () => {
    expect(style(`a${CLOSE}b`)).toBe(`${OPEN}a${CLOSE}${OPEN}b${CLOSE}`);
  });

  it('should not re-open when open === close', () => {
    expect(self(`a${SELF}b`)).toBe(`${SELF}a${SELF}b${SELF}`);
  });

  it('should wrap open===close formatter around already-styled text', () => {
    expect(self(style('foo'))).toBe(`${SELF}${OPEN}foo${CLOSE}${SELF}`);
  });

  it('should re-open background after newlines at any position', () => {
    expect(bg('a\nb')).toBe(`${OPEN}a${CLOSE}\n${OPEN}b${CLOSE}`);
    expect(bg('a\n\nb')).toBe(`${OPEN}a${CLOSE}\n${OPEN}${CLOSE}\n${OPEN}b${CLOSE}`);
    expect(bg('\nabc')).toBe(`${OPEN}${CLOSE}\n${OPEN}abc${CLOSE}`);
    expect(bg('abc\n')).toBe(`${OPEN}abc${CLOSE}\n${OPEN}${CLOSE}`);
  });

  it('should re-open background around CRLF newlines as a single unit', () => {
    expect(bg('a\r\nb')).toBe(`${OPEN}a${CLOSE}\r\n${OPEN}b${CLOSE}`);
    expect(bg('a\nb\r\nc')).toBe(`${OPEN}a${CLOSE}\n${OPEN}b${CLOSE}\r\n${OPEN}c${CLOSE}`);
  });

  it('should not split non-background styles at newlines', () => {
    expect(style('a\nb')).toBe(`${OPEN}a\nb${CLOSE}`);
  });

  it('should pass multi-codepoint characters, tabs, and lone carriage returns through unchanged', () => {
    expect(style('🎨')).toBe(`${OPEN}🎨${CLOSE}`);
    expect(style('👨‍👩‍👧‍👦')).toBe(`${OPEN}👨‍👩‍👧‍👦${CLOSE}`);
    expect(style('a\tb')).toBe(`${OPEN}a\tb${CLOSE}`);
    expect(bg('a\rb')).toBe(`${OPEN}a\rb${CLOSE}`);
  });
});
