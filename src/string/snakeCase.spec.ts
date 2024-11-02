import { describe, expect, it } from 'vitest';
import { snakeCase } from './snakeCase';

describe('snakeCase', () => {
  it('should change camel case to snake case', () => {
    expect(snakeCase('camelCase')).toEqual('camel_case');
  });

  it('should change space to underscore', () => {
    expect(snakeCase('some whitespace')).toEqual('some_whitespace');
  });

  it('should change hyphen to underscore', () => {
    expect(snakeCase('hyphen-text')).toEqual('hyphen_text');
  });

  it('should change Acronyms to small letter', () => {
    expect(snakeCase('HTTPRequest')).toEqual('http_request');
  });

  it('should handle leading and trailing whitespace', () => {
    expect(snakeCase('    leading and trailing whitespace    ')).toEqual('leading_and_trailing_whitespace');
  });

  it('should handle special characters correctly', () => {
    expect(snakeCase('special@characters!')).toEqual('special_characters');
  });

  it('should handle strings that are already in snake_case', () => {
    expect(snakeCase('snake_case')).toEqual('snake_case');
  });

  it('should work with an empty string', () => {
    expect(snakeCase('')).toEqual('');
  });

  it('should work with screaming snake case', () => {
    expect(snakeCase('FOO_BAR')).toEqual('foo_bar');
  });
});
