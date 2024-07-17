import { describe, it, expect } from 'vitest';
import { startCase } from './startCase';

describe('startCase', function () {
  it('should capitalize each word', function () {
    expect(startCase('--foo-bar--')).toBe('Foo Bar');
    expect(startCase('fooBar')).toBe('Foo Bar');
    expect(startCase('__FOO_BAR__')).toBe('FOO BAR');
  });

  it('should handle compound words', function () {
    expect(startCase('createElement')).toBe('Create Element');
    expect(startCase('iPhone')).toBe('I Phone');
    expect(startCase('XMLHttpRequest')).toBe('XML Http Request');
  });

  it('should handle various delimiters', function () {
    expect(startCase('_abc_123_def')).toBe('Abc 123 Def');
    expect(startCase('__abc__123__def__')).toBe('Abc 123 Def');
    expect(startCase('ABC-DEF')).toBe('ABC DEF');
    expect(startCase('ABC DEF')).toBe('ABC DEF');
  });

  it('should handle empty strings', function () {
    expect(startCase('')).toBe('');
  });

  it('should handle strings with only delimiters', function () {
    expect(startCase('_-_-_-_')).toBe('');
  });

  it('should work with numbers', function () {
    expect(startCase('12abc 12ABC')).toBe('12 Abc 12 ABC');
  });

  it('should handle consecutive uppercase letters', function () {
    expect(startCase('ABC')).toBe('ABC');
    expect(startCase('ABCdef')).toBe('AB Cdef');
  });

  it('should handle combinations of numbers and letters', function () {
    expect(startCase('123ABC')).toBe('123 ABC');
    expect(startCase('a1B2c3')).toBe('A 1 B 2 C 3');
  });

  it('should handle special characters', function () {
    expect(startCase('foo@bar')).toBe('Foo Bar');
    expect(startCase('test*case')).toBe('Test Case');
  });

  it('should handle long strings', function () {
    expect(startCase('thisIsAVeryLongStringWithManyWordsAndNumbers123')).toBe(
      'This Is A Very Long String With Many Words And Numbers 123'
    );
  });

  it('should handle whitespace characters', function () {
    expect(startCase('  foo  bar  ')).toBe('Foo Bar');
    expect(startCase('\tfoo\nbar')).toBe('Foo Bar');
  });
});
