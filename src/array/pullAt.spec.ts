import { describe, expect, it } from 'vitest';
import { pullAt } from './pullAt';

describe('pullAt', () => {
  it('should remove elements at specified indices and return the removed elements', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const result = pullAt(array, [3, 5]);

    expect(array).toStrictEqual([0, 1, 2, 4]);
    expect(result).toStrictEqual([3, 5]);
  });

  it('should preserve duplicate values in the returned array when removing at duplicate indices', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const result = pullAt(array, [1, 2, 2, 4]);

    expect(array).toStrictEqual([0, 3, 5]);
    expect(result).toStrictEqual([1, 2, 2, 4]);
  });

  it('should return undefined for out-of-bounds indices while still removing valid indices', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const result = pullAt(array, [0, 3, 5, 6]);

    expect(array).toStrictEqual([1, 2, 4]);
    expect(result).toStrictEqual([0, 3, 5, undefined]);
  });

  it('should properly handle non-primitive values in the array', () => {
    const array = [0, { a: 1 }, [2], 3, '4'];
    const result = pullAt(array, [1, 2, 4]);

    expect(array).toStrictEqual([0, 3]);
    expect(result).toStrictEqual([{ a: 1 }, [2], '4']);
  });

  it('should return an empty array when no indices are provided', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const result = pullAt(array, []);

    expect(array).toStrictEqual([0, 1, 2, 3, 4, 5]);
    expect(result).toStrictEqual([]);
  });

  it('should handle unsorted indices correctly', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const actual = pullAt(array, [1, 3, 11, 7, 5, 9]);

    expect(array).toEqual([1, 3, 5, 7, 9, 11]);
    expect(actual).toEqual([2, 4, 12, 8, 6, 10]);
  });

  it('should maintain object references correctly', () => {
    const foo = { foo: 1 };
    const bar = { foo: 2 };

    const arr = [foo, bar, foo];
    const result = pullAt(arr, [2]);

    expect(arr).toEqual([foo, bar]);
    expect(result).toEqual([foo]);
  });

  it('should retrieve elements at negative indices but only remove elements at valid positive indices', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const result = pullAt(array, [0, -1, 3]);

    expect(array).toStrictEqual([1, 2, 4, 5]);
    expect(result).toStrictEqual([0, 5, 3]);
  });

  it('should not modify the array when all indices are invalid', () => {
    const array = [0, 1, 2, 3];
    const result = pullAt(array, [-5, 6, 7]);

    expect(array).toStrictEqual([0, 1, 2, 3]);
    expect(result).toStrictEqual([undefined, undefined, undefined]);
  });

  it('should remove each valid index only once even if it appears multiple times', () => {
    const array = [0, 1, 2, 3, 4];
    const result = pullAt(array, [1, 1, 3]);

    expect(array).toStrictEqual([0, 2, 4]);
    expect(result).toStrictEqual([1, 1, 3]);
  });
});
