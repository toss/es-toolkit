import { describe, expect, it } from 'vitest';
import { isString } from './isString';

describe('isString', () => {
  it('returns true if the value is string', () => {
    expect(isString('abc')).toBe(true);
  });

  it('returns false if the value is not string', () => {
    expect(isString(123)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString([1, 2, 3])).toBe(false);
    expect(isString({ a: 1 })).toBe(false);
  });

  it('can be used with TypeScript as a type predicate', () => {
    const arr = [1, 2, 'a', 4, 'b'];

    const result = arr.filter(isString);

    // Here the type of result should be `string[]`
    expect(result).toStrictEqual(['a', 'b']);
  });
});
