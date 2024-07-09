import { describe, expect, it } from 'vitest';
import { flatten } from '.';

describe('flatten', () => {
  const originArr = [1, [2, [3, [4]]]];

  it('should flatten a array to the default depth of 1', () => {
    const expectedArr = [1, 2, [3, [4]]];

    expect(flatten(originArr)).toEqual(expectedArr);
    expect(originArr.flat()).toEqual(expectedArr);
  });

  it('should flatten a deeply nested array to the specified depth', () => {
    const expectedArr1 = [1, 2, [3, [4]]];
    expect(flatten(originArr, 1)).toEqual(expectedArr1);
    expect(originArr.flat(1)).toEqual(expectedArr1);

    const expectedArr2 = [1, 2, 3, [4]];
    expect(flatten(originArr, 2)).toEqual(expectedArr2);
    expect(originArr.flat(2)).toEqual(expectedArr2);

    const expectedArr3 = [1, 2, 3, 4];
    expect(flatten(originArr, 3)).toEqual(expectedArr3);
    expect(originArr.flat(3)).toEqual(expectedArr3);

    expect(flatten(originArr, Infinity)).toEqual(expectedArr3);
    expect(originArr.flat(Infinity)).toEqual(expectedArr3);
  });

  it('should return the same array if depth is 0 or NaN or negative', () => {
    const expectedArr = [1, [2, [3, [4]]]];

    expect(flatten(originArr, 0)).toEqual(expectedArr);
    expect(originArr.flat(0)).toEqual(expectedArr);

    expect(flatten(originArr, NaN)).toEqual(expectedArr);
    expect(originArr.flat(NaN)).toEqual(expectedArr);

    expect(flatten(originArr, -1)).toEqual(expectedArr);
    expect(originArr.flat(-1)).toEqual(expectedArr);
  });

  it('should flatten arrays to the specified depth considering floating point values', () => {
    const expectedArr1 = [1, 2, [3, [4]]];
    expect(flatten(originArr, 1.3)).toEqual(expectedArr1);
    expect(originArr.flat(1.3)).toEqual(expectedArr1);

    const expectedArr2 = [1, 2, 3, [4]];
    expect(flatten(originArr, 2.5)).toEqual(expectedArr2);
    expect(originArr.flat(2.5)).toEqual(expectedArr2);

    const expectedArr3 = [1, 2, 3, 4];
    expect(flatten(originArr, 3.9)).toEqual(expectedArr3);
    expect(originArr.flat(3.9)).toEqual(expectedArr3);
  });

  it('should handle empty array', () => {
    const originArr: number[] = [];

    expect(flatten(originArr, 2)).toEqual([]);
  });
});
