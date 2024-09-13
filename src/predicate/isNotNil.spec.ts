import { describe, expect, it } from 'vitest';
import { isNotNil } from './isNotNil';

describe('isNotNil', () => {
  it('returns false if the value is null or undefined', () => {
    expect(isNotNil(null)).toBe(false);
    expect(isNotNil(undefined)).toBe(false);
  });

  it('returns true if the value is not null nor undefined', () => {
    expect(isNotNil('')).toBe(true);
    expect(isNotNil(123)).toBe(true);
    expect(isNotNil(0)).toBe(true);
    expect(isNotNil(false)).toBe(true);
    expect(isNotNil(true)).toBe(true);
    expect(isNotNil([])).toBe(true);
  });

  it('can be used with TypeScript as a type predicate', () => {
    const arr1 = [1, 2, null, 4, undefined];
    const arr2 = [1, 2, null];
    const arr3 = [1, 2, 4, undefined];

    const result1 = arr1.filter(isNotNil);
    const result2 = arr2.filter(isNotNil);
    const result3 = arr3.filter(isNotNil);

    // Here the type of result should be `number[]`.
    expect(result1).toStrictEqual([1, 2, 4]);
    expect(result2).toStrictEqual([1, 2]);
    expect(result3).toStrictEqual([1, 2, 4]);
  });
});
