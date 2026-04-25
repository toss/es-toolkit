import { describe, expect, it } from 'vitest';
import { wrapAnsiBg } from './wrapAnsiBg.ts';

const OPEN = '<O>';
const CLOSE = '<C>';

describe('wrapAnsiBg', () => {
  it('wraps text with open and close codes', () => {
    expect(wrapAnsiBg(OPEN, CLOSE, 'hello')).toBe(`${OPEN}hello${CLOSE}`);
  });

  it('wraps empty string with codes', () => {
    expect(wrapAnsiBg(OPEN, CLOSE, '')).toBe(`${OPEN}${CLOSE}`);
  });

  it('re-opens outer when raw close code is injected in text', () => {
    expect(wrapAnsiBg(OPEN, CLOSE, `a${CLOSE}b`)).toBe(`${OPEN}a${CLOSE}${OPEN}b${CLOSE}`);
  });

  it('re-opens background after newlines so color stays contiguous across lines', () => {
    expect(wrapAnsiBg(OPEN, CLOSE, 'a\nb')).toBe(`${OPEN}a${CLOSE}\n${OPEN}b${CLOSE}`);
    expect(wrapAnsiBg(OPEN, CLOSE, 'a\n\nb')).toBe(`${OPEN}a${CLOSE}\n${OPEN}${CLOSE}\n${OPEN}b${CLOSE}`);
    expect(wrapAnsiBg(OPEN, CLOSE, '\nabc')).toBe(`${OPEN}${CLOSE}\n${OPEN}abc${CLOSE}`);
    expect(wrapAnsiBg(OPEN, CLOSE, 'abc\n')).toBe(`${OPEN}abc${CLOSE}\n${OPEN}${CLOSE}`);
  });

  it('treats CRLF as a single unit', () => {
    expect(wrapAnsiBg(OPEN, CLOSE, 'a\r\nb')).toBe(`${OPEN}a${CLOSE}\r\n${OPEN}b${CLOSE}`);
    expect(wrapAnsiBg(OPEN, CLOSE, 'a\nb\r\nc')).toBe(`${OPEN}a${CLOSE}\n${OPEN}b${CLOSE}\r\n${OPEN}c${CLOSE}`);
  });

  it('passes lone carriage returns through unchanged', () => {
    expect(wrapAnsiBg(OPEN, CLOSE, 'a\rb')).toBe(`${OPEN}a\rb${CLOSE}`);
  });
});
