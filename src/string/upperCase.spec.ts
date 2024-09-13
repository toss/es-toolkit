import { describe, it, expect } from 'vitest';
import { upperCase } from './upperCase';

describe('upperCase', () => {
  it('should change camel case to upper case', async () => {
    expect(upperCase('camelCase')).toEqual('CAMEL CASE');
  });

  it('should change space to space', async () => {
    expect(upperCase('some whitespace')).toEqual('SOME WHITESPACE');
  });

  it('should change hyphen to space', async () => {
    expect(upperCase('hyphen-text')).toEqual('HYPHEN TEXT');
  });

  it('should change Acronyms to small letter', async () => {
    expect(upperCase('HTTPRequest')).toEqual('HTTP REQUEST');
  });

  it('should handle leading and trailing whitespace', async () => {
    expect(upperCase('    leading and trailing whitespace')).toEqual('LEADING AND TRAILING WHITESPACE');
  });

  it('should handle special characters correctly', async () => {
    expect(upperCase('special@characters!')).toEqual('SPECIAL CHARACTERS');
  });

  it('should handle strings that are already in upper case', async () => {
    expect(upperCase('upper_case')).toEqual('UPPER CASE');
  });

  it('should work with an empty string', async () => {
    expect(upperCase('')).toEqual('');
  });

  it('should work with screaming snake case', async () => {
    expect(upperCase('FOO_BAR')).toEqual('FOO BAR');
  });
});
