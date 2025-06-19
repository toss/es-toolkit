import { describe, expect, it, expectTypeOf } from 'vitest';
import type { flattenArrayLike as flattenArrayLikeLodash } from 'lodash';
import { flattenArrayLike } from './flattenArrayLike';

describe('flattenArrayLike', () => {
  it('should flatten an array of array-like objects', () => {
    const input: Array<ArrayLike<string>> = [
      { length: 3, 0: 'a', 1: 'b', 2: 'c' },
      { length: 2, 0: 'd', 1: 'e' },
      { length: 0 },
    ];
    const expectedOutput = ['a', 'b', 'c', 'd', 'e'];
    expect(flattenArrayLike(input)).toEqual(expectedOutput);
  });

  it('should ignore non-array-like objects', () => {
    const input: any[] = [{ length: 2, 0: 'x', 1: 'y' }, 3, { length: 1, 0: 'z' }];
    const expectedOutput = ['x', 'y', 'z'];
    expect(flattenArrayLike(input)).toEqual(expectedOutput);
  });

  it('should return an empty array when input is empty', () => {
    const input: Array<ArrayLike<any>> = [];
    const expectedOutput: any[] = [];
    expect(flattenArrayLike(input)).toEqual(expectedOutput);
  });

  it('should handle nested array-like objects', () => {
    const input: Array<ArrayLike<number[]>> = [
      { length: 2, 0: [1, 2], 1: [3, 4] },
      { length: 1, 0: [5, 6] },
    ];
    const expectedOutput = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    expect(flattenArrayLike(input)).toEqual(expectedOutput);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(flattenArrayLike).toEqualTypeOf<typeof flattenArrayLikeLodash>();
  });
});
