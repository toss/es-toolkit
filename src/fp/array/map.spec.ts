import { describe, expect, it } from 'vitest';
import { map } from './map';

describe('map', () => {
  it('should return mapped value by mapper function', () => {
    expect(map([1, 2, 3], value => value * 2)).toEqual([2, 4, 6]);
    expect(map<number[], number>(value => value * 2)([1, 2, 3])).toEqual([2, 4, 6]);
  });

  it('should not change value of original array', () => {
    const arr = [1, 2, 3];
    const arr2 = [1, 2, 3];

    map(arr, value => value * 2);
    map<number[], number>(value => value * 2)(arr2);

    expect(arr).toEqual([1, 2, 3]);
    expect(arr2).toEqual([1, 2, 3]);
  });
});
