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

  it('should work with various types of values', () => {
    const strings = ['abc', 'def', 'ghi'];
    const actual = strings.map(str => split(str));

    expect(actual).toEqual([['abc'], ['def'], ['ghi']]);
  });

  it('should split string with multiple characters', () => {
    expect(split('a-b-c', '-')).toEqual(['a', 'b', 'c']);
    expect(split('a-b-c', '-', 2)).toEqual(['a', 'b']);
  });
});
