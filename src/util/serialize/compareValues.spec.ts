import { describe, expect, it } from 'vitest';
import { compareValues } from './compareValues';

describe('compareValues', () => {
  it('should compare numbers numerically', () => {
    expect(compareValues(1, 2, new Map())).toBeLessThan(0);
    expect(compareValues(10, 9, new Map())).toBeGreaterThan(0);
    expect(compareValues(1, 1, new Map())).toBe(0);
  });

  it('should compare strings by code unit', () => {
    expect(compareValues('a', 'b', new Map())).toBeLessThan(0);
    expect(compareValues('b', 'a', new Map())).toBeGreaterThan(0);
    expect(compareValues('a', 'a', new Map())).toBe(0);
  });

  it('should not depend on the locale', () => {
    // In Slovak, the digraph `ch` is a single letter sorted after `h`.
    expect(compareValues('chz', 'hz', new Map())).toBeLessThan(0);
  });

  it('should compare mixed types by their serialized form', () => {
    // "'a'" vs "{'b':1}"
    expect(compareValues('a', { b: 1 }, new Map())).toBeLessThan(0);
    // "3" vs "'a'" — the quote sorts before digits, so strings come first
    expect(compareValues(3, 'a', new Map())).toBeGreaterThan(0);
  });

  it('should sort strings before numbers, numbers before bigints, and bigints before other values', () => {
    const values = [{ b: 1 }, 2n, 3, 'a', null, true];
    const sorted = [...values].sort((a, b) => compareValues(a, b, new Map()));
    expect(sorted).toEqual(['a', 3, 2n, null, true, { b: 1 }]);
  });

  it('should place NaN after every other number', () => {
    const sorted = [3, NaN, -Infinity, 1, Infinity].sort((a, b) => compareValues(a, b, new Map()));
    expect(sorted).toEqual([-Infinity, 1, 3, Infinity, NaN]);
    expect(compareValues(NaN, NaN, new Map())).toBe(0);
  });

  it('should compare bigints numerically', () => {
    const sorted = [10n, 9n, 100n, -1n].sort((a, b) => compareValues(a, b, new Map()));
    expect(sorted).toEqual([-1n, 9n, 10n, 100n]);
  });

  it('should produce the same order from every insertion order', () => {
    const values = [10, 9, NaN, 2n, 'b', 'a', 100, null];

    for (let i = 0; i < 50; i++) {
      const shuffled = [...values].sort(() => Math.random() - 0.5);
      const sorted = shuffled.sort((a, b) => compareValues(a, b, new Map()));
      expect(sorted).toEqual(['a', 'b', 9, 10, 100, NaN, 2n, null]);
    }
  });

  it('should sort in a stable order usable by Array.prototype.sort', () => {
    // `Array.prototype.sort` always places undefined elements last,
    // without consulting the comparator.
    const values = [3, 'a', { b: 1 }, null, undefined];
    const sorted = [...values].sort((a, b) => compareValues(a, b, new Map()));
    expect(sorted).toEqual(['a', 3, null, { b: 1 }, undefined]);
  });
});
