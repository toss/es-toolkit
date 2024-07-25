import { describe, it, expect, expectTypeOf } from 'vitest';
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

  it('should handle leading and trailing whitespace', async () => {
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

  it('should work with screaming snake case', async () => {
    expect(snakeCase('FOO_BAR')).toEqual('foo_bar');
  });

  it('handles return type properly', async () => {
    expectTypeOf(snakeCase('camelCase')).toEqualTypeOf<'camel_case'>();
    expectTypeOf(snakeCase('some whitespace')).toEqualTypeOf<'some_whitespace'>();
    expectTypeOf(snakeCase('hyphen-text')).toEqualTypeOf<'hyphen_text'>();
    expectTypeOf(snakeCase('HTTPRequest')).toEqualTypeOf<'http_request'>();
    expectTypeOf(snakeCase('    leading and trailing whitespace')).toEqualTypeOf<'leading_and_trailing_whitespace'>();
    expectTypeOf(snakeCase('special@characters!')).toEqualTypeOf<'special_characters'>();
    expectTypeOf(snakeCase('snake_case')).toEqualTypeOf<'snake_case'>();
    expectTypeOf(snakeCase('')).toEqualTypeOf<''>();
    expectTypeOf(snakeCase('FOO_BAR')).toEqualTypeOf<'foo_bar'>();
    expectTypeOf(snakeCase('FOO_BAR' as string)).toEqualTypeOf<string>();
  });
});
