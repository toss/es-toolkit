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

  it('should remove trailing characters when chars is an array', () => {
    expect(trimEnd('hello---', ['-', 'o'])).toEqual('hell');
  });

  it('should remove trailing characters from the string when multiple characters are provided in an array', () => {
    expect(trimEnd('123000', ['0', '3'])).toEqual('12');
  });

  it('should return the string unchanged when none of the trailing characters in the array match', () => {
    expect(trimEnd('hello', ['x', 'y', 'z'])).toEqual('hello');
  });

  it('should handle cases where multiple trailing characters in the array need removal', () => {
    expect(trimEnd('abcabcabc', ['c', 'b'])).toEqual('abcabca');
  });

  it('should throw an error when chars is a string with multiple characters', () => {
    expect(() => trimEnd('hello', 'ab')).toThrow(`The 'chars' parameter should be a single character string.`);
  });

  it('should match String.prototype.trimEnd for every whitespace character', () => {
    const whitespace = '\t\n\v\f\r \u00a0\u1680\u2000\u200a\u2028\u2029\u202f\u205f\u3000\ufeff';
    expect(trimEnd(`abc${whitespace}`)).toEqual('abc');
    expect(trimEnd(whitespace)).toEqual('');
  });

  it('should trim long runs of trailing whitespace in linear time', () => {
    const str = `abc${' '.repeat(100_000)}x`;
    const start = Date.now();
    expect(trimEnd(str)).toEqual(str);
    expect(Date.now() - start).toBeLessThan(1000);
  });
});
