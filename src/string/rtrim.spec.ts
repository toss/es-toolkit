import { describe, it, expect } from 'vitest';
import { rtrim } from './rtrim.ts';

describe('rtrim', () => {
  it('should remove trailing characters from the string', async () => {
    expect(rtrim('hello---', '-')).toEqual('hello');
  });

  it('should remove trailing characters when multiple characters are provided', async () => {
    expect(rtrim('123000', '0')).toEqual('123');
  });

  it('should return the string unchanged when there are no trailing characters to remove', async () => {
    expect(rtrim('hello', 'x')).toEqual('hello');
  });

  it('should remove trailing occurrences of a single character', async () => {
    expect(rtrim('abcabcabc', 'c')).toEqual('abcabcab');
  });

  it('should handle an empty string', async () => {
    expect(rtrim('', 'x')).toEqual('');
  });

  it('should remove trailing spaces when specified', async () => {
    expect(rtrim('hello world   ', ' ')).toEqual('hello world');
  });

  it('should handle a case where the string is already trimmed', async () => {
    expect(rtrim('trimmed', 'x')).toEqual('trimmed');
  });

  it('should return an empty string when all characters are removed', async () => {
    expect(rtrim('xxxxx', 'x')).toEqual('');
  });

  it('should remove numbers from the end of a string', async () => {
    expect(rtrim('abc123456', '6')).toEqual('abc12345');
  });

  it('should handle cases where multiple trailing characters need removal', async () => {
    expect(rtrim('abc123abc123abc', 'c')).toEqual('abc123abc123ab');
  });
});
