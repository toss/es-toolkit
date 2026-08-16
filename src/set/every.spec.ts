import { describe, expect, it } from 'vitest';
import { every } from './every';

describe('every', () => {
  it('should return true when all elements satisfy the predicate', () => {
    const set = new Set([1, 2, 3]);

    expect(every(set, value => value > 0)).toBe(true);
  });

  it('should return false when at least one element does not satisfy the predicate', () => {
    const set = new Set([1, -2, 3]);

    expect(every(set, value => value > 0)).toBe(false);
  });

  it('should return true for an empty Set', () => {
    const set = new Set<number>();

    expect(every(set, () => false)).toBe(true);
  });

  it('should pass the set to the predicate function', () => {
    const set = new Set([1, 2, 3]);

    expect(every(set, (value, value2, originalSet) => originalSet.has(value) && value > 0)).toBe(true);
  });

  it('should return false immediately when predicate returns false', () => {
    const set = new Set([1, 2, 3, 4, 5]);

    let callCount = 0;
    const result = every(set, value => {
      callCount++;
      return value < 3;
    });

    expect(result).toBe(false);
    expect(callCount).toBe(3); // Should stop at value 3
  });

  it('should work with string values', () => {
    const set = new Set(['apple', 'banana', 'cherry']);

    expect(every(set, value => value.length > 3)).toBe(true);
    expect(every(set, value => value.startsWith('a'))).toBe(false);
  });

  it('should work with complex object values', () => {
    const set = new Set([
      { age: 25, active: true },
      { age: 30, active: true },
      { age: 35, active: true },
    ]);

    expect(every(set, value => value.active)).toBe(true);
    expect(every(set, value => value.age > 20)).toBe(true);
    expect(every(set, value => value.age > 30)).toBe(false);
  });

  it('should work with boolean values', () => {
    const set = new Set([true, true, true]);

    expect(every(set, value => value === true)).toBe(true);

    const mixedSet = new Set([true, true, false]);
    expect(every(mixedSet, value => value === true)).toBe(false);
  });

  it('should handle a single element Set', () => {
    const set = new Set([42]);

    expect(every(set, value => value === 42)).toBe(true);
    expect(every(set, value => value === 0)).toBe(false);
  });

  it('should verify all elements match a complex condition', () => {
    const set = new Set([
      { price: 100, inStock: true },
      { price: 200, inStock: true },
      { price: 150, inStock: true },
    ]);

    expect(every(set, value => value.inStock && value.price > 50)).toBe(true);
  });
});
