import { describe, it, expect } from 'vitest';
import { constantCase } from './constantCase';

describe('constantCase', () => {
  it('should change camel case to constant case', async () => {
    expect(constantCase('camelCase')).toEqual('CAMEL_CASE');
  });

  it('should change space to underscore', async () => {
    expect(constantCase('some whitespace')).toEqual('SOME_WHITESPACE');
  });

  it('should change hyphen to underscore', async () => {
    expect(constantCase('hyphen-text')).toEqual('HYPHEN_TEXT');
  });

  it('should change Acronyms to small letter', async () => {
    expect(constantCase('HTTPRequest')).toEqual('HTTP_REQUEST');
  });

  it('should handle leading and trailing whitespace', async () => {
    expect(constantCase('    leading and trailing whitespace')).toEqual('LEADING_AND_TRAILING_WHITESPACE');
  });

  it('should handle special characters correctly', async () => {
    expect(constantCase('special@characters!')).toEqual('SPECIAL_CHARACTERS');
  });

  it('should handle strings that are already in CONSTANT_CASE', async () => {
    expect(constantCase('CONSTANT_CASE')).toEqual('CONSTANT_CASE');
  });

  it('should work with an empty string', async () => {
    expect(constantCase('')).toEqual('');
  });

  it('should work with screaming constant case', async () => {
    expect(constantCase('foo_bar')).toEqual('FOO_BAR');
  });
});
