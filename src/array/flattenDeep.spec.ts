import { describe, expect, it } from 'vitest';
import { flattenDeep } from './flattenDeep';

describe('flattenDeep', () => {
  it('should flatten a deeply nested array of numbers', () => {
    const originArr = [1, [2, [3, [4, [5]]]]];
    const expectedArr = [1, 2, 3, 4, 5];

    expect(flattenDeep(originArr)).toEqual(expectedArr);
  });

  it('should flatten a deeply nested array with mixed types', () => {
    const originArr = [1, ['str', [3, [4, [false, [{ id: 1 }]]]]]];
    const expectedArr = [1, 'str', 3, 4, false, { id: 1 }];

    expect(flattenDeep(originArr)).toEqual(expectedArr);
  });
});
