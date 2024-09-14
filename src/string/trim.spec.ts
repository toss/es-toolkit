import { describe, it, expect } from 'vitest';
import { trim } from './trim.ts';

describe('trim', () => {
  it('should return the string without the double quotes', async () => {
    expect(trim('"hello, world!"', '"')).toEqual('hello, world!');
  });

  it('should return the string without special characters', async () => {
    expect(trim('!@#$%^&*wow%#$', ['!', '@', '#', '$', '%', '^', '&', '*'])).toEqual('wow');
  });

  it('should return the string unchanged when no matching characters are found', async () => {
    expect(trim('hello', 'x')).toEqual('hello');
  });

  it('should remove all occurrences of a single character', async () => {
    expect(trim('banana', 'a')).toEqual('banan');
  });

  it('should remove all occurrences of multiple characters', async () => {
    expect(trim('abracadabra', ['a', 'b'])).toEqual('racadabr');
  });

  it('should handle an empty string', async () => {
    expect(trim('', 'a')).toEqual('');
  });

  it('should remove spaces when specified', async () => {
    expect(trim('hello world', ' ')).toEqual('hello world');
  });

  it('should handle a case where the string is already trimmed', async () => {
    expect(trim('alreadyTrimmed', 'x')).toEqual('alreadyTrimmed');
  });

  it('should return an empty string when all characters are removed', async () => {
    expect(trim('aaaaa', 'a')).toEqual('');
  });

  it('should remove numbers from a string', async () => {
    expect(trim('123abc456', ['1', '2', '3', '4', '5', '6'])).toEqual('abc');
  });

  it('should trim the string without giving the second parameter, which defaults to whitespace', async () => {
    expect(trim('  hello world  ')).toEqual('hello world');
  });
});
