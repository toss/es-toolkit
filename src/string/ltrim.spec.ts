import { describe, it, expect } from 'vitest';
import { ltrim } from './ltrim.ts';

describe('ltrim', () => {
  it('should remove leading characters from the string', async () => {
    expect(ltrim('---hello', '-')).toEqual('hello');
  });

  it('should remove leading zeros from the string', async () => {
    expect(ltrim('000123', '0')).toEqual('123');
  });

  it('should return the string unchanged when there are no leading characters to remove', async () => {
    expect(ltrim('hello', 'x')).toEqual('hello');
  });

  it('should remove leading occurrences of a single character', async () => {
    expect(ltrim('abcabcabc', 'a')).toEqual('bcabcabc');
  });

  it('should handle an empty string', async () => {
    expect(ltrim('', 'x')).toEqual('');
  });

  it('should remove leading spaces when specified', async () => {
    expect(ltrim('   hello world', ' ')).toEqual('hello world');
  });

  it('should handle a case where the string is already trimmed', async () => {
    expect(ltrim('trimmed', 'x')).toEqual('trimmed');
  });

  it('should return an empty string when all characters are removed', async () => {
    expect(ltrim('xxxxx', 'x')).toEqual('');
  });

  it('should remove numbers from the start of a string', async () => {
    expect(ltrim('123456abc', '1')).toEqual('23456abc');
  });

  it('should handle cases where multiple leading characters need removal', async () => {
    expect(ltrim('aaaabbbcccc', 'a')).toEqual('bbbcccc');
  });
});
