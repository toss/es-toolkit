import { describe, expect, it } from 'vitest';
import { split } from './split';

describe('split', () => {
  it('should split a string by `separator`', () => {
    const string = 'abcde';
    expect(split(string, 'c')).toEqual(['ab', 'de']);
    expect(split(string, /[bd]/)).toEqual(['a', 'c', 'e']);
    expect(split(string, '', 2)).toEqual(['a', 'b']);
  });

  it('should return an array containing an empty string for empty values', () => {
    const values = [undefined, null, ''] as const;
    const expected = values.map(() => ['']);

    const actual = values.map(value => split(value));

    expect(actual).toEqual(expected);
    expect(split()).toEqual(['']);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const strings = ['abc', 'def', 'ghi'];
    const actual = strings.map(str => split(str));

    expect(actual).toEqual([['abc'], ['def'], ['ghi']]);
  });

  it('should allow mixed string and array prototype methods', () => {
    const result = split('abc', 'b').join(',');
    expect(result).toBe('a,c');
  });
});
