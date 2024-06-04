import { describe, expect, it } from 'vitest';
import { isNil } from './isNil';

describe('isNil', () => {
  it('returns true if the value is null or undefined', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
  });

  it('returns false if the value is not null nor undefined', () => {
    expect(isNil('')).toBe(false);
    expect(isNil(123)).toBe(false);
  });

  it('can be used with TypeScript as a type predicate', () => {
    const arr = [1, 2, null, 4, undefined];

    const result = arr.filter(isNil);

    // Here the type of result should be `null | undefined`.
    expect(result).toStrictEqual([null, undefined]);
  });
});
