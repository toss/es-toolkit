import { describe, expect, it } from 'vitest';
import { some } from './some';

describe('some', () => {
  it('should return true when at least one element satisfies the predicate', () => {
    const set = new Set([1, 2, 3]);

    expect(some(set, value => value > 2)).toBe(true);
  });

  it('should return false when no elements satisfy the predicate', () => {
    const set = new Set([1, 2, 3]);

    expect(some(set, value => value > 10)).toBe(false);
  });

  it('should return false for an empty Set', () => {
    const set = new Set<number>();

    expect(some(set, () => true)).toBe(false);
  });

  it('should pass the set to the predicate function', () => {
    const set = new Set([1, 2, 3]);

    expect(some(set, (value, value2, originalSet) => originalSet.has(value) && value === 2)).toBe(true);
  });

  it('should return true immediately when predicate returns true', () => {
    const set = new Set([1, 2, 3, 4, 5]);

    let callCount = 0;
    const result = some(set, value => {
      callCount++;
      return value === 2;
    });

    expect(result).toBe(true);
    expect(callCount).toBe(2); // Should stop at value 2
  });

  it('should work with string values', () => {
    const set = new Set(['apple', 'banana', 'cherry']);

    expect(some(set, value => value.startsWith('b'))).toBe(true);
    expect(some(set, value => value.startsWith('z'))).toBe(false);
  });

  it('should work with complex object values', () => {
    const set = new Set([
      { age: 25, active: false },
      { age: 30, active: true },
      { age: 35, active: false },
    ]);

    expect(some(set, value => value.active)).toBe(true);
    expect(some(set, value => value.age > 40)).toBe(false);
  });

  it('should work with boolean values', () => {
    const set = new Set([false, false, true]);

    expect(some(set, value => value === true)).toBe(true);

    const allFalse = new Set([false, false]);
    expect(some(allFalse, value => value === true)).toBe(false);
  });

  it('should handle a single element Set', () => {
    const set = new Set([42]);

    expect(some(set, value => value === 42)).toBe(true);
    expect(some(set, value => value === 0)).toBe(false);
  });

  it('should find elements matching a complex condition', () => {
    const set = new Set([
      { price: 100, inStock: false },
      { price: 200, inStock: true },
      { price: 150, inStock: false },
    ]);

    expect(some(set, value => value.inStock && value.price > 100)).toBe(true);
    expect(some(set, value => value.price > 300)).toBe(false);
  });

  it('should return true when the first element matches', () => {
    const set = new Set([10, 20, 30]);

    let callCount = 0;
    const result = some(set, value => {
      callCount++;
      return value === 10;
    });

    expect(result).toBe(true);
    expect(callCount).toBe(1);
  });

  it('should check all elements when none match until the last one', () => {
    const set = new Set([1, 2, 3]);

    let callCount = 0;
    const result = some(set, value => {
      callCount++;
      return value === 3;
    });

    expect(result).toBe(true);
    expect(callCount).toBe(3);
  });

  it('should work with number values', () => {
    const set = new Set([5, 10, 15, 20]);

    expect(some(set, value => value > 15)).toBe(true);
    expect(some(set, value => value > 25)).toBe(false);
  });

  it('should handle type checking predicates', () => {
    const set = new Set([1, 'hello', true, 42]);

    expect(some(set, value => typeof value === 'string')).toBe(true);
    expect(some(set, value => typeof value === 'object')).toBe(false);
  });
});
