import { describe, expect, it } from 'vitest';
import { lowerCase } from './lowerCase';

describe('lowerCase', () => {
  it('should change camel case to lower case', () => {
    expect(lowerCase('camelCase')).toEqual('camel case');
  });

  it('should change space to space', () => {
    expect(lowerCase('some whitespace')).toEqual('some whitespace');
  });

  it('should change hyphen to space', () => {
    expect(lowerCase('hyphen-text')).toEqual('hyphen text');
  });

  it('should change Acronyms to small letter', () => {
    expect(lowerCase('HTTPRequest')).toEqual('http request');
  });

  it('should handle leading and trailing whitespace', () => {
    expect(lowerCase('    leading and trailing whitespace    ')).toEqual('leading and trailing whitespace');
  });

  it('should handle special characters correctly', () => {
    expect(lowerCase('special@characters!')).toEqual('special characters');
  });

  it('should handle strings that are already in lower case', () => {
    expect(lowerCase('lower_case')).toEqual('lower case');
  });

  it('should work with an empty string', () => {
    expect(lowerCase('')).toEqual('');
  });

  it('should work with screaming snake case', () => {
    expect(lowerCase('FOO_BAR')).toEqual('foo bar');
  });
});
