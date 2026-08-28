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
    // 'a' vs serialized {b:1} => 'a' < '{b:1}'
    expect(compareValues('a', { b: 1 }, new Map())).toBeLessThan(0);
    // 3 => '3' vs 'a'
    expect(compareValues(3, 'a', new Map())).toBeLessThan(0);
  });

  it('should compare strings without quotes', () => {
    // If quotes were included, `'a'` would sort before `1`.
    expect(compareValues(1, 'a', new Map())).toBeLessThan(0);
  });

  it('should sort in a stable order usable by Array.prototype.sort', () => {
    // `Array.prototype.sort` always places undefined elements last,
    // without consulting the comparator.
    const values = [3, 'a', { b: 1 }, null, undefined];
    const sorted = [...values].sort((a, b) => compareValues(a, b, new Map()));
    expect(sorted).toEqual([3, 'a', null, { b: 1 }, undefined]);
  });
});
