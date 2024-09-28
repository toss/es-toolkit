import { describe, expect, it } from 'vitest';
import { trimStart } from './trimStart.ts';

describe('trimStart', () => {
  it('should remove leading characters from the string', () => {
    expect(trimStart('---hello', '-')).toEqual('hello');
  });

  it('should remove leading zeros from the string', () => {
    expect(trimStart('000123', '0')).toEqual('123');
  });

  it('should return the string unchanged when there are no leading characters to remove', () => {
    expect(trimStart('hello', 'x')).toEqual('hello');
  });

  it('should remove leading occurrences of a single character', () => {
    expect(trimStart('abcabcabc', 'a')).toEqual('bcabcabc');
  });

  it('should handle an empty string', () => {
    expect(trimStart('', 'x')).toEqual('');
  });

  it('should remove leading spaces when specified', () => {
    expect(trimStart('   hello world', ' ')).toEqual('hello world');
  });

  it('should handle a case where the string is already trimmed', () => {
    expect(trimStart('trimmed', 'x')).toEqual('trimmed');
  });

  it('should return an empty string when all characters are removed', () => {
    expect(trimStart('xxxxx', 'x')).toEqual('');
  });

  it('should remove numbers from the start of a string', () => {
    expect(trimStart('123456abc', '1')).toEqual('23456abc');
  });

  it('should handle cases where multiple leading characters need removal', () => {
    expect(trimStart('aaaabbbcccc', 'a')).toEqual('bbbcccc');
  });

  it('should trim the string without giving the second parameter, which defaults to whitespace', () => {
    expect(trimStart('  hello world  ')).toEqual('hello world  ');
  });
});
