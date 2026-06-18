import { describe, expect, it } from 'vitest';
import { filter } from './filter';

describe('filter', () => {
  it('should filter elements based on the predicate', () => {
    const set = new Set([1, 2, 3, 4]);

    const result = filter(set, value => value > 2);

    expect(result).toEqual(new Set([3, 4]));
  });

  it('should pass the original set to the predicate function', () => {
    const set = new Set([1, 2, 3]);

    const result = filter(set, (value, value2, originalSet) => {
      expect(originalSet).toBe(set);
      return value >= originalSet.size;
    });

    expect(result).toEqual(new Set([3]));
  });

  it('should return an empty Set when no elements match', () => {
    const set = new Set([1, 2, 3]);

    const result = filter(set, value => value > 10);

    expect(result).toEqual(new Set());
  });

  it('should return all elements when all match the predicate', () => {
    const set = new Set([1, 2, 3]);

    const result = filter(set, value => value > 0);

    expect(result).toEqual(set);
  });

  it('should handle an empty Set', () => {
    const set = new Set<number>();

    const result = filter(set, value => value > 0);

    expect(result).toEqual(new Set());
  });

  it('should not modify the original Set', () => {
    const set = new Set([1, 2, 3]);

    const originalSize = set.size;
    const originalValues = Array.from(set);

    filter(set, value => value > 1);

    expect(set.size).toBe(originalSize);
    expect(Array.from(set)).toEqual(originalValues);
  });

  it('should work with string values', () => {
    const set = new Set(['apple', 'banana', 'cherry', 'date']);

    const result = filter(set, value => value.length > 5);

    expect(result).toEqual(new Set(['banana', 'cherry']));
  });

  it('should work with complex predicates', () => {
    const set = new Set([
      { age: 25, active: true },
      { age: 30, active: false },
      { age: 35, active: true },
      { age: 40, active: false },
    ]);

    const result = filter(set, value => value.active && value.age >= 30);

    expect(result).toEqual(new Set([{ age: 35, active: true }]));
  });

  it('should handle boolean values', () => {
    const set = new Set([true, false, true, false]);

    const result = filter(set, value => value === true);

    expect(result).toEqual(new Set([true]));
  });

  it('should filter based on value properties', () => {
    const set = new Set([
      { name: 'apple', quantity: 5 },
      { name: 'banana', quantity: 3 },
      { name: 'cherry', quantity: 8 },
      { name: 'date', quantity: 2 },
    ]);

    const result = filter(set, value => value.quantity > 2);

    expect(result).toEqual(
      new Set([
        { name: 'apple', quantity: 5 },
        { name: 'banana', quantity: 3 },
        { name: 'cherry', quantity: 8 },
      ])
    );
  });
});
