import { describe, expect, it } from 'vitest';
import { isNull } from './isNull';

describe('isNull', () => {
  it('returns true if the value is null', () => {
    expect(isNull(null)).toBe(true);
  });

  it('returns false if the value is not null', () => {
    expect(isNull(undefined)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull(123)).toBe(false);
  });

  it('can be used with TypeScript as a type predicate', () => {
    const arr = [1, 2, null, 4, undefined];

    const result = arr.filter(isNull);

    // Here the type of result should be `null[]`.
    expect(result).toStrictEqual([null]);
  });
});
