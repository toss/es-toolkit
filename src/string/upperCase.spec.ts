import { describe, expect, it } from 'vitest';
import { upperCase } from './upperCase';

describe('upperCase', () => {
  it('should change camel case to upper case', () => {
    expect(upperCase('camelCase')).toEqual('CAMEL CASE');
  });

  it('should change space to space', () => {
    expect(upperCase('some whitespace')).toEqual('SOME WHITESPACE');
  });

  it('should change hyphen to space', () => {
    expect(upperCase('hyphen-text')).toEqual('HYPHEN TEXT');
  });

  it('should change Acronyms to small letter', () => {
    expect(upperCase('HTTPRequest')).toEqual('HTTP REQUEST');
  });

  it('should handle leading and trailing whitespace', () => {
    expect(upperCase('    leading and trailing whitespace    ')).toEqual('LEADING AND TRAILING WHITESPACE');
  });

  it('should handle special characters correctly', () => {
    expect(upperCase('special@characters!')).toEqual('SPECIAL CHARACTERS');
  });

  it('should handle strings that are already in upper case', () => {
    expect(upperCase('upper_case')).toEqual('UPPER CASE');
  });

  it('should work with an empty string', () => {
    expect(upperCase('')).toEqual('');
  });

  it('should work with screaming snake case', () => {
    expect(upperCase('FOO_BAR')).toEqual('FOO BAR');
  });
});
