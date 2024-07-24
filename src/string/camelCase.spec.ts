import { describe, expect, it, expectTypeOf } from 'vitest';
import { camelCase } from './camelCase';

describe('camelCase', () => {
  it('should change camel case to camel case', async () => {
    expect(camelCase('camelCase')).toEqual('camelCase');
  });

  it('should change space to underscore', async () => {
    expect(camelCase('some whitespace')).toEqual('someWhitespace');
  });

  it('should change hyphen to underscore', async () => {
    expect(camelCase('hyphen-text')).toEqual('hyphenText');
  });

  it('should change Acronyms to small letter', async () => {
    expect(camelCase('HTTPRequest')).toEqual('httpRequest');
  });

  it('should handle leading and trailing whitespace', async () => {
    expect(camelCase('    leading and trailing whitespace')).toEqual('leadingAndTrailingWhitespace');
  });

  it('should handle special characters correctly', async () => {
    expect(camelCase('special@characters!')).toEqual('specialCharacters');
  });

  it('should handle strings that are already in camel_case', async () => {
    expect(camelCase('camel_case')).toEqual('camelCase');
  });

  it('should work with an empty string', async () => {
    expect(camelCase('')).toEqual('');
  });

  it('should work with screaming camel case', async () => {
    expect(camelCase('FOO_BAR')).toEqual('fooBar');
  });

  it('handles return type properly', async () => {
    expectTypeOf(camelCase('camelCase')).toEqualTypeOf<'camelCase'>();
    expectTypeOf(camelCase('some whitespace')).toEqualTypeOf<'someWhitespace'>();
    expectTypeOf(camelCase('hyphen-text')).toEqualTypeOf<'hyphenText'>();
    expectTypeOf(camelCase('HTTPRequest')).toEqualTypeOf<'httpRequest'>();
    expectTypeOf(camelCase('    leading and trailing whitespace')).toEqualTypeOf<'leadingAndTrailingWhitespace'>();
    expectTypeOf(camelCase('special@characters!')).toEqualTypeOf<'specialCharacters'>();
    expectTypeOf(camelCase('camel_case')).toEqualTypeOf<'camelCase'>();
    expectTypeOf(camelCase('')).toEqualTypeOf<''>();
    expectTypeOf(camelCase('FOO_BAR')).toEqualTypeOf<'fooBar'>();
  });
});
