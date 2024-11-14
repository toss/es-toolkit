import { describe, expect, it } from 'vitest';
import { uniqBy } from './uniqBy';
import { LARGE_ARRAY_SIZE } from '../_internal/LARGE_ARRAY_SIZE';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/uniqBy-methods.spec.js
 */
describe('uniqBy', () => {
  const objects = [{ a: 2 }, { a: 3 }, { a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }];

  it('should work with a `mapper`', () => {
    expect(uniqBy([2.1, 1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
    expect(uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor)).toEqual([1.2, 2.1, 3.2, 5.7, 7.19]);
  });

  it('should work with an iteratee function', () => {
    const expected = objects.slice(0, 3);
    const actual = uniqBy(objects, (object: { a: any }) => object.a);
    expect(actual).toEqual(expected);
  });

  it('should work with property shorthands (string)', () => {
    const expected = objects.slice(0, 3);
    const actual = uniqBy(objects, 'a');
    expect(actual).toEqual(expected);
  });

  it('should work with property shorthands (number)', () => {
    const arrays = [[2], [3], [1], [2], [3], [1]];
    const expected = arrays.slice(0, 3);
    const actual = uniqBy(arrays, 0);
    expect(actual).toEqual(expected);
  });

  it('should work with large arrays', () => {
    const largeArray = Array.from({ length: LARGE_ARRAY_SIZE }, () => [1, 2]);
    const actual = uniqBy(largeArray, JSON.stringify);
    expect(actual.length).toBe(1);
    expect(actual[0]).toEqual([1, 2]);
  });

  it('should provide correct iteratee arguments', () => {
    let args: any;
    uniqBy(objects, (...params: any[]) => {
      if (!args) {
        args = params;
      }
    });
    expect(args).toEqual([objects[0]]);
  });

  it('should return an array with the first element when iteratee returns the same value for all elements', () => {
    const actual = uniqBy(objects, () => 'same');
    expect(actual).toEqual([objects[0]]);
  });

  describe('should return an empty array when iteratee returns various types', () => {
    const testCases = {
      'an array': [0, 'a'],
      'an object': { '0': 'a' },
      'a number': 0,
      'a string': '0',
    };

    Object.entries(testCases).forEach(([key, value]) => {
      it(`should return an empty array when iteratee returns ${key}`, () => {
        const actual = uniqBy(objects, () => value);

        expect(actual).toEqual([objects[0]]);
      });
    });
  });

  it('should return an empty array if the first array is null or undefined', () => {
    expect(uniqBy(null as any, 'a')).toEqual([]);
    expect(uniqBy(undefined as any, 'a')).toEqual([]);
  });

  it('should handle empty arrays correctly', () => {
    expect(uniqBy([], 'a')).toEqual([]);
    expect(uniqBy([], Math.floor)).toEqual([]);
  });

  it('should handle single-element arrays correctly', () => {
    const singleElement = [{ a: 1 }];
    expect(uniqBy(singleElement, 'a')).toEqual(singleElement);
    expect(uniqBy(singleElement, (obj: { a: any }) => obj.a)).toEqual(singleElement);
  });

  it('should not mutate the original array', () => {
    const original = [...objects];
    uniqBy(objects, 'a');
    expect(objects).toEqual(original);
  });

  it('should work with no iteratee', () => {
    expect(uniqBy([1, 2, 3, 4, 1, 2, 3])).toEqual([1, 2, 3, 4]);
  });
});
