import { describe, expect, it } from 'vitest';
import { isBoolean } from './isBoolean';

describe('isNull', () => {
  it('returns true if the value is boolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  it('returns false if the value is not boolean', () => {
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean('abc')).toBe(false);
    expect(isBoolean(123)).toBe(false);
    expect(isBoolean({ a: 1 })).toBe(false);
    expect(isBoolean([1, 2, 3])).toBe(false);
  });

  it('can be used with Typescript as a type predicate', () => {
    const arr = [1, 2, true, 4, false];

    const result = arr.filter(isBoolean);

    // Here the type of result should be `boolean[]`.
    expect(result).toStrictEqual([true, false]);
  });
});
