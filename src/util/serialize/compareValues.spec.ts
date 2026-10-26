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

  it('should sort NaN after every other number', () => {
    expect(compareValues(NaN, Infinity, new Map())).toBeGreaterThan(0);
    expect(compareValues(-Infinity, NaN, new Map())).toBeLessThan(0);
    expect(compareValues(NaN, NaN, new Map())).toBe(0);
    expect(compareValues(NaN, 1n, new Map())).toBeGreaterThan(0);
  });

  it('should compare numbers and bigints numerically', () => {
    expect(compareValues(2, 10n, new Map())).toBeLessThan(0);
    expect(compareValues(11n, 10, new Map())).toBeGreaterThan(0);
    expect(compareValues(9n, 10n, new Map())).toBeLessThan(0);
    // A number sorts before a bigint of the same value.
    expect(compareValues(1, 1n, new Map())).toBeLessThan(0);
    expect(compareValues(1n, 1, new Map())).toBeGreaterThan(0);
  });

  it('should sort strings before numbers and numbers before other values', () => {
    expect(compareValues(3, 'a', new Map())).toBeGreaterThan(0);
    expect(compareValues('a', 3n, new Map())).toBeLessThan(0);
    expect(compareValues(3, null, new Map())).toBeLessThan(0);
    expect(compareValues(true, 3n, new Map())).toBeGreaterThan(0);
  });

  it('should compare other types by their serialized form', () => {
    // "'a'" vs "{'b':1}"
    expect(compareValues('a', { b: 1 }, new Map())).toBeLessThan(0);
    // "[1]" vs "null"
    expect(compareValues([1], null, new Map())).toBeLessThan(0);
    expect(compareValues({ a: 1 }, { a: 1 }, new Map())).toBe(0);
  });

  it('should sort in a stable order usable by Array.prototype.sort', () => {
    // `Array.prototype.sort` always places undefined elements last,
    // without consulting the comparator.
    const values = [3, 'a', { b: 1 }, null, undefined];
    const sorted = [...values].sort((a, b) => compareValues(a, b, new Map()));
    expect(sorted).toEqual(['a', 3, null, { b: 1 }, undefined]);
  });
});
