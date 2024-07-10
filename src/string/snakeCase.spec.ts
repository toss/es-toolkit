import { describe, it, expect } from 'vitest';
import { snakeCase } from './snakeCase';

describe('snakeCase', () => {
  it('should change camel case to snake case', async () => {
    expect(snakeCase('camelCase')).toEqual('camel_case');
  });

  it('should change space to underscore', async () => {
    expect(snakeCase('some whitespace')).toEqual('some_whitespace');
  });

  it('should change hyphen to underscore', async () => {
    expect(snakeCase('hyphen-text')).toEqual('hyphen_text');
  });

  it('should change Acronyms to small letter', async () => {
    expect(snakeCase('HTTPRequest')).toEqual('http_request');
  });

  it('should handle leading and trailing whitepspace', async () => {
    expect(snakeCase('    leading and trailing whitespace')).toEqual('leading_and_trailing_whitespace');
  });

  it('should handle special characters correctly', async () => {
    expect(snakeCase('special@characters!')).toEqual('special_characters');
  });

  it('should handle strings that are already in snake_case', async () => {
    expect(snakeCase('snake_case')).toEqual('snake_case');
  });

  it('should work with an empty string', async () => {
    expect(snakeCase('')).toEqual('');
  });
});
