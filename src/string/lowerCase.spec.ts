import { describe, it, expect, expectTypeOf } from 'vitest';
import { lowerCase } from './lowerCase';

describe('lowerCase', () => {
  it('should change camel case to lower case', async () => {
    expect(lowerCase('camelCase')).toEqual('camel case');
  });

  it('should change space to space', async () => {
    expect(lowerCase('some whitespace')).toEqual('some whitespace');
  });

  it('should change hyphen to space', async () => {
    expect(lowerCase('hyphen-text')).toEqual('hyphen text');
  });

  it('should change Acronyms to small letter', async () => {
    expect(lowerCase('HTTPRequest')).toEqual('http request');
  });

  it('should handle leading and trailing whitespace', async () => {
    expect(lowerCase('    leading and trailing whitespace')).toEqual('leading and trailing whitespace');
  });

  it('should handle special characters correctly', async () => {
    expect(lowerCase('special@characters!')).toEqual('special characters');
  });

  it('should handle strings that are already in lower case', async () => {
    expect(lowerCase('lower_case')).toEqual('lower case');
  });

  it('should work with an empty string', async () => {
    expect(lowerCase('')).toEqual('');
  });

  it('should work with screaming snake case', async () => {
    expect(lowerCase('FOO_BAR')).toEqual('foo bar');
  });

  it('handles return type properly', async () => {
    expectTypeOf(lowerCase('camelCase')).toEqualTypeOf<'camel case'>();
    expectTypeOf(lowerCase('some whitespace')).toEqualTypeOf<'some whitespace'>();
    expectTypeOf(lowerCase('hyphen-text')).toEqualTypeOf<'hyphen text'>();
    expectTypeOf(lowerCase('HTTPRequest')).toEqualTypeOf<'http request'>();
    expectTypeOf(lowerCase('    leading and trailing whitespace')).toEqualTypeOf<'leading and trailing whitespace'>();
    expectTypeOf(lowerCase('special@characters!')).toEqualTypeOf<'special characters'>();
    expectTypeOf(lowerCase('lower_case')).toEqualTypeOf<'lower case'>();
    expectTypeOf(lowerCase('')).toEqualTypeOf<''>();
    expectTypeOf(lowerCase('FOO_BAR')).toEqualTypeOf<'foo bar'>();
  });
});
