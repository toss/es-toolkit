import { describe, expect, it } from 'vitest';
import { trimStart } from './trimStart.ts';

describe('trimStart', () => {
  it('should remove leading characters from the string', async () => {
    expect(trimStart('---hello', '-')).toEqual('hello');
  });

  it('should remove leading zeros from the string', async () => {
    expect(trimStart('000123', '0')).toEqual('123');
  });

  it('should return the string unchanged when there are no leading characters to remove', async () => {
    expect(trimStart('hello', 'x')).toEqual('hello');
  });

  it('should remove leading occurrences of a single character', async () => {
    expect(trimStart('abcabcabc', 'a')).toEqual('bcabcabc');
  });

  it('should handle an empty string', async () => {
    expect(trimStart('', 'x')).toEqual('');
  });

  it('should remove leading spaces when specified', async () => {
    expect(trimStart('   hello world', ' ')).toEqual('hello world');
  });

  it('should handle a case where the string is already trimmed', async () => {
    expect(trimStart('trimmed', 'x')).toEqual('trimmed');
  });

  it('should return an empty string when all characters are removed', async () => {
    expect(trimStart('xxxxx', 'x')).toEqual('');
  });

  it('should remove numbers from the start of a string', async () => {
    expect(trimStart('123456abc', '1')).toEqual('23456abc');
  });

  it('should handle cases where multiple leading characters need removal', async () => {
    expect(trimStart('aaaabbbcccc', 'a')).toEqual('bbbcccc');
  });

  it('should trim the string without giving the second parameter, which defaults to whitespace', async () => {
    expect(trimStart('  hello world  ')).toEqual('hello world  ');
  });
});
