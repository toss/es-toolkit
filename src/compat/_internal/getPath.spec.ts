import { describe, it, expect } from 'vitest';
import { getPath } from './getPath';

describe('getPath function', () => {
  it('should return a property name from a string', () => {
    const key = 'a';
    const actual = getPath(key);
    const expected = key;

    expect(actual).toBe(expected);
  });

  it('should return an array of property names from a string', () => {
    const key = 'a.b.c';
    const actual = getPath(key);
    const expected = ['a', 'b', 'c'];

    expect(actual).toEqual(expected);
  });

  it('should return an array of property names from a string array', () => {
    const key = ['a', 'b', 'c'];
    const actual = getPath(key);
    const expected = key;

    expect(actual).toEqual(expected);
  });

  it('should return an array of property names from a string array with a nested string', () => {
    const key = ['a', 'b.c', 'd'];
    const actual = getPath(key);
    const expected = ['a', 'b', 'c', 'd'];

    expect(actual).toEqual(expected);
  });
});
