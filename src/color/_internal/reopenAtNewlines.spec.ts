import { describe, expect, it } from 'vitest';
import { reopenAtNewlines } from './reopenAtNewlines.ts';

const OPEN = '<O>';
const CLOSE = '<C>';

describe('reopenAtNewlines', () => {
  it('returns text unchanged when no newline is present', () => {
    expect(reopenAtNewlines(OPEN, CLOSE, 'abc')).toBe('abc');
    expect(reopenAtNewlines(OPEN, CLOSE, '')).toBe('');
    expect(reopenAtNewlines(OPEN, CLOSE, 'a\rb')).toBe('a\rb');
  });

  it('inserts close+open around each LF', () => {
    expect(reopenAtNewlines(OPEN, CLOSE, 'a\nb')).toBe(`a${CLOSE}\n${OPEN}b`);
    expect(reopenAtNewlines(OPEN, CLOSE, 'a\n\nb')).toBe(`a${CLOSE}\n${OPEN}${CLOSE}\n${OPEN}b`);
    expect(reopenAtNewlines(OPEN, CLOSE, '\nabc')).toBe(`${CLOSE}\n${OPEN}abc`);
    expect(reopenAtNewlines(OPEN, CLOSE, 'abc\n')).toBe(`abc${CLOSE}\n${OPEN}`);
  });

  it('treats CRLF as a single unit', () => {
    expect(reopenAtNewlines(OPEN, CLOSE, 'a\r\nb')).toBe(`a${CLOSE}\r\n${OPEN}b`);
    expect(reopenAtNewlines(OPEN, CLOSE, 'a\nb\r\nc')).toBe(`a${CLOSE}\n${OPEN}b${CLOSE}\r\n${OPEN}c`);
  });
});
