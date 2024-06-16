import { describe, expect, it } from 'vitest';
import { isUndefined } from './isUndefined';

describe('isUndefined', () => {
  it('returns true if the value is undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it('returns false if the value is not undefined', () => {
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined(123)).toBe(false);
  });

  it('can be used with TypeScript as a type predicate', () => {
    const arr = [1, 2, null, 4, undefined];

    const result = arr.filter(isUndefined);

    // Here the type of result should be `null[]`.
    expect(result).toStrictEqual([undefined]);
  });
});
