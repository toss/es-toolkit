import { describe, expect, it } from 'vitest';
import { sentenceCase } from './sentenceCase';

describe('sentenceCase', () => {
  it('should capitalize the first word and lowercase the rest', () => {
    expect(sentenceCase('hello world')).toBe('Hello world');
    expect(sentenceCase('HELLO WORLD')).toBe('Hello world');
    expect(sentenceCase('Hello World')).toBe('Hello world');
  });

  it('should convert camelCase and PascalCase', () => {
    expect(sentenceCase('fooBar')).toBe('Foo bar');
    expect(sentenceCase('createElement')).toBe('Create element');
    expect(sentenceCase('PascalCase')).toBe('Pascal case');
    expect(sentenceCase('XMLHttpRequest')).toBe('Xml http request');
    expect(sentenceCase('iPhone')).toBe('I phone');
  });

  it('should handle various delimiters', () => {
    expect(sentenceCase('hello-world')).toBe('Hello world');
    expect(sentenceCase('hello_world')).toBe('Hello world');
    expect(sentenceCase('--foo-bar--')).toBe('Foo bar');
    expect(sentenceCase('__FOO_BAR__')).toBe('Foo bar');
    expect(sentenceCase('ABC-DEF')).toBe('Abc def');
    expect(sentenceCase('_abc_123_def')).toBe('Abc 123 def');
  });

  it('should handle empty strings', () => {
    expect(sentenceCase('')).toBe('');
  });

  it('should handle strings with only delimiters', () => {
    expect(sentenceCase('_-_-_-_')).toBe('');
  });

  it('should handle single words', () => {
    expect(sentenceCase('hello')).toBe('Hello');
    expect(sentenceCase('HELLO')).toBe('Hello');
  });

  it('should work with numbers', () => {
    expect(sentenceCase('12abc 12ABC')).toBe('12 abc 12 abc');
    expect(sentenceCase('123ABC')).toBe('123 abc');
    expect(sentenceCase('a1B2c3')).toBe('A 1 b 2 c 3');
  });

  it('should handle consecutive uppercase letters', () => {
    expect(sentenceCase('ABC')).toBe('Abc');
    expect(sentenceCase('ABCdef')).toBe('Ab cdef');
  });

  it('should handle special characters', () => {
    expect(sentenceCase('foo@bar')).toBe('Foo bar');
    expect(sentenceCase('test*case')).toBe('Test case');
  });

  it('should handle whitespace characters', () => {
    expect(sentenceCase('  foo  bar  ')).toBe('Foo bar');
    expect(sentenceCase('\tfoo\nbar')).toBe('Foo bar');
  });

  it('should handle long strings', () => {
    expect(sentenceCase('thisIsAVeryLongStringWithManyWordsAndNumbers123')).toBe(
      'This is a very long string with many words and numbers 123'
    );
  });

  it('should correctly handle accented letters', () => {
    expect(sentenceCase('lunedì 18 SET')).toBe('Lunedì 18 set');
    expect(sentenceCase('héllo wörld')).toBe('Héllo wörld');
  });
});
