import { describe, expect, it } from 'vitest';
import { pullAt } from './pullAt';

describe('pullAt', () => {
  it('should returns index searched of original array and changed original array', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const result = pullAt(array, [3, 5]);

    expect(array).toStrictEqual([0, 1, 2, 4]);
    expect(result).toStrictEqual([3, 5]);
  });

  it('even if there are duplicate index values must return an array containing duplicate index values', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const result = pullAt(array, [1, 2, 2, 4]);

    expect(array).toStrictEqual([0, 3, 5]);
    expect(result).toStrictEqual([1, 2, 2, 4]);
  });

  it('even if there are not index value must return an array containing undefined value', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const result = pullAt(array, [0, 3, 5, 6]);

    expect(array).toStrictEqual([1, 2, 4]);
    expect(result).toStrictEqual([0, 3, 5, undefined]);
  });

  it('even if there are other instance or type must return an array containing other instance or type values', () => {
    const array = [0, { a: 1 }, [2], 3, '4'];
    const result = pullAt(array, [1, 2, 4]);

    expect(array).toStrictEqual([0, 3]);
    expect(result).toStrictEqual([{ a: 1 }, [2], '4']);
  });

  it('even if index array parameter is empty must return an empty array', () => {
    const array = [0, 1, 2, 3, 4, 5];
    const result = pullAt(array, []);

    expect(array).toStrictEqual([0, 1, 2, 3, 4, 5]);
    expect(result).toStrictEqual([]);
  });

  it('should work with unsorted indexes', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const actual = pullAt(array, [1, 3, 11, 7, 5, 9]);

    expect(array).toEqual([1, 3, 5, 7, 9, 11]);
    expect(actual).toEqual([2, 4, 12, 8, 6, 10]);
  });

  it('should work with objects', () => {
    const foo = { foo: 1 };
    const bar = { foo: 2 };

    const arr = [foo, bar, foo];
    const result = pullAt(arr, [2]);

    expect(arr).toEqual([foo, bar]);
    expect(result).toEqual([foo]);
  });
});
