import { describe, expect, it } from 'vitest';
import { flatMap } from './flatMap';

describe('flatMap', () => {
  const originArr = [1, 2, 3];

  it('should map and flatten array of numbers with default depth', () => {
    const iteratee = (item: number) => [item, item];
    const expectedArr = [1, 1, 2, 2, 3, 3];

    expect(flatMap(originArr, iteratee)).toEqual(expectedArr);
  });

  it('should map and flatten array of numbers with specified depth', () => {
    const iteratee = (item: number) => [[[item, item]]];

    const expectedArr1 = [[[1, 1]], [[2, 2]], [[3, 3]]];
    expect(flatMap(originArr, iteratee, 1)).toEqual(expectedArr1);

    const expectedArr2 = [
      [1, 1],
      [2, 2],
      [3, 3],
    ];
    expect(flatMap(originArr, iteratee, 2)).toEqual(expectedArr2);

    const expectedArr3 = [1, 1, 2, 2, 3, 3];
    expect(flatMap(originArr, iteratee, 3)).toEqual(expectedArr3);
  });

  it('should handle empty array', () => {
    const emptyArr: number[] = [];
    const result = flatMap(emptyArr, item => [item, item]);
    expect(result).toEqual([]);
  });

  it('should return type is flatten array without depth prop', () => {
    const arr: string[] = ['1', '2'];
    const result = flatMap(arr, item => [item, item]);
    expect(result).toEqual(['1', '1', '2', '2']);
    result[0].substring(0, 1);
  });
});
