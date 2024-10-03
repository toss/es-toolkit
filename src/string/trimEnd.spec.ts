import { describe, expect, it } from 'vitest';
import { trimEnd } from './trimEnd.ts';

describe('trimEnd', () => {
  it('should remove trailing characters from the string', () => {
    expect(trimEnd('hello---', '-')).toEqual('hello');
  });

  it('should remove trailing characters when multiple characters are provided', () => {
    expect(trimEnd('123000', '0')).toEqual('123');
  });

  it('should return the string unchanged when there are no trailing characters to remove', () => {
    expect(trimEnd('hello', 'x')).toEqual('hello');
  });

  it('should remove trailing occurrences of a single character', () => {
    expect(trimEnd('abcabcabc', 'c')).toEqual('abcabcab');
  });

  it('should handle an empty string', () => {
    expect(trimEnd('', 'x')).toEqual('');
  });

  it('should remove trailing spaces when specified', () => {
    expect(trimEnd('hello world   ', ' ')).toEqual('hello world');
  });

  it('should handle a case where the string is already trimmed', () => {
    expect(trimEnd('trimmed', 'x')).toEqual('trimmed');
  });

  it('should return an empty string when all characters are removed', () => {
    expect(trimEnd('xxxxx', 'x')).toEqual('');
  });

  it('should remove numbers from the end of a string', () => {
    expect(trimEnd('abc123456', '6')).toEqual('abc12345');
  });

  it('should handle cases where multiple trailing characters need removal', () => {
    expect(trimEnd('abc123abc123abc', 'c')).toEqual('abc123abc123ab');
  });

  it('should trim the string without giving the second parameter, which defaults to whitespace', () => {
    expect(trimEnd('  hello world  ')).toEqual('  hello world');
  });
});
