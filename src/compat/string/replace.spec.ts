import { describe, expect, it } from 'vitest';
import { replace } from './replace';

describe('replace', () => {
  it('should replace the matched pattern', () => {
    const string = 'abcde';
    expect(replace(string, 'de', '123')).toBe('abc123');
    expect(replace(string, /[bd]/g, '-')).toBe('a-c-e');
  });

  it('should replace the matched pattern with a function', () => {
    const string = 'abcde';
    expect(replace(string, 'de', substring => substring.toUpperCase())).toBe('abcDE');
    expect(replace(string, /[bd]/g, substring => substring.toUpperCase())).toBe('aBcDe');
  });

  it('should return empty string if the arguments are not provided', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(replace()).toBe('');
  });
});
