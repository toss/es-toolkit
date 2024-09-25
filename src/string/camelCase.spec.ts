import { describe, expect, it } from 'vitest';
import { camelCase } from './camelCase';

describe('camelCase', () => {
  it('should change camel case to camel case', () => {
    expect(camelCase('camelCase')).toEqual('camelCase');
  });

  it('should change space to camel case', () => {
    expect(camelCase('some whitespace')).toEqual('someWhitespace');
  });

  it('should change hyphen to camel case', () => {
    expect(camelCase('hyphen-text')).toEqual('hyphenText');
  });

  it('should change Acronyms to small letter', () => {
    expect(camelCase('HTTPRequest')).toEqual('httpRequest');
  });

  it('should handle leading and trailing whitespace', () => {
    expect(camelCase('    leading and trailing whitespace    ')).toEqual('leadingAndTrailingWhitespace');
  });

  it('should handle special characters correctly', () => {
    expect(camelCase('special@characters!')).toEqual('specialCharacters');
  });

  it('should work with an empty string', () => {
    expect(camelCase('')).toEqual('');
  });

  it('should work with screaming camel case', () => {
    expect(camelCase('FOO_BAR')).toEqual('fooBar');
  });

  it('should support emojis', () => {
    expect(camelCase('Keep unicode 😅')).toEqual('keepUnicode😅');
  });
});
