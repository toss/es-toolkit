import { describe, expect, it } from 'vitest';
import { upperSnakeCase } from './upperSnakeCase';

describe('upperSnakeCase', () => {
  it('should convert camelCase to upper snake case', () => {
    expect(upperSnakeCase('camelCase')).toBe('CAMEL_CASE');
  });

  it('should convert PascalCase to upper snake case', () => {
    expect(upperSnakeCase('PascalCase')).toBe('PASCAL_CASE');
  });

  it('should convert strings with whitespace to upper snake case', () => {
    expect(upperSnakeCase('some whitespace')).toBe('SOME_WHITESPACE');
  });

  it('should convert hyphenated strings to upper snake case', () => {
    expect(upperSnakeCase('hyphen-text')).toBe('HYPHEN_TEXT');
  });

  it('should convert strings with mixed delimiters to upper snake case', () => {
    expect(upperSnakeCase('mixed-case_string withSpaces')).toBe('MIXED_CASE_STRING_WITH_SPACES');
  });

  it('should handle strings with consecutive uppercase letters', () => {
    expect(upperSnakeCase('HTTPRequest')).toBe('HTTP_REQUEST');
  });

  it('should handle empty strings', () => {
    expect(upperSnakeCase('')).toBe('');
  });

  it('should handle single words', () => {
    expect(upperSnakeCase('word')).toBe('WORD');
  });

  it('should handle strings with numbers', () => {
    expect(upperSnakeCase('version2')).toBe('VERSION_2');
    expect(upperSnakeCase('getHTML5Parser')).toBe('GET_HTML_5_PARSER');
  });

  it('should handle strings with special characters', () => {
    expect(upperSnakeCase('hello@world')).toBe('HELLO_WORLD');
    expect(upperSnakeCase('test.file')).toBe('TEST_FILE');
  });

  it('should handle already upper snake case strings', () => {
    expect(upperSnakeCase('ALREADY_UPPER_SNAKE')).toBe('ALREADY_UPPER_SNAKE');
  });

  it('should handle strings with unicode characters', () => {
    expect(upperSnakeCase('Keep unicode 😅')).toBe('KEEP_UNICODE_😅');
  });
});
