import { describe, expect, it, vi } from 'vitest';
import { forEach } from './forEach';

describe('forEach', () => {
  it('should iterate over array elements', () => {
    const array = [1, 2, 3];
    const result: number[] = [];

    forEach(array, value => {
      result.push(value);
    });

    expect(result).toEqual([1, 2, 3]);
  });

  it('should iterate over string characters', () => {
    const string = 'abc';
    const result: string[] = [];

    forEach(string, value => {
      result.push(value);
    });

    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should iterate over object properties', () => {
    const object = { a: 1, b: 2 };
    const result: Array<[number, string]> = [];

    forEach(object, (value, key) => {
      result.push([value, key]);
    });

    expect(result).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });

  it('should return the original array after iteration', () => {
    const array = [1, 2, 3];
    const result = forEach(array, value => value * 2);

    expect(result).toBe(array);
  });

  it('should return the original string after iteration', () => {
    const string = 'abc';
    const result = forEach(string, value => value.toUpperCase());

    expect(result).toBe(string);
  });

  it('should return the original object after iteration', () => {
    const object = { a: 1, b: 2 };
    const result = forEach(object, value => value + 1);

    expect(result).toBe(object);
  });

  it('should return the input collection if null or undefined is passed', () => {
    const nullValue = null;
    const undefinedValue = undefined;

    const resultForNull = forEach(nullValue, vi.fn());
    const resultForUndefined = forEach(undefinedValue, vi.fn());

    expect(resultForNull).toBe(null);
    expect(resultForUndefined).toBe(undefined);
  });

  it('should use identity function as the callback if no callback is provided', () => {
    const array = [1, 2, 3];
    const result = forEach(array);

    expect(result).toBe(array);
  });

  it('should iterate over array-like structures', () => {
    const arrayLike = { 0: 'a', 1: 'b', length: 2 };
    const result: Array<[number, string]> = [];

    forEach(arrayLike, (value, index) => {
      result.push([index, value]);
    });

    expect(result).toEqual([
      [0, 'a'],
      [1, 'b'],
    ]);
  });
});
