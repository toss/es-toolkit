import { describe, expect, it } from 'vitest';
import { intersection } from './intersection';
import { randomInt } from 'crypto';

describe('intersection', () => {
  it('should return the intersection of two arrays', () => {
    expect(intersection([1, 2], [1, 3])).toEqual([1]);
    expect(intersection([1, 2], [3, 1])).toEqual([1]);
    expect(intersection([1, 2], [3, 4])).toEqual([]);
    expect(intersection([], [1, 2])).toEqual([]);
  });

  it('handles large arrays', () => {
    const array1 = Array.from({ length: 130 }, () => randomInt(0, 1000));
    expect(intersection(array1, array1)).toEqual(array1);

    const array2 = Array.from({ length: 130 }, () => randomInt(0, 1000));
    expect(intersection(array1, array2)).toEqual(array1.filter(x => array2.includes(x)));
  });
});
