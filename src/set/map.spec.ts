import { describe, expect, it } from 'vitest';
import { map } from './map';

describe('map', () => {
  it('should transform elements with the provided function', () => {
    const set = new Set([1, 2, 3]);

    const result = map(set, value => value * 2);

    expect(result).toEqual(new Set([2, 4, 6]));
  });

  it('should pass the set to the transform function', () => {
    const set = new Set([1, 2, 3]);

    const result = map(set, (value, value2, originalSet) => {
      expect(originalSet).toBe(set);
      return value + originalSet.size;
    });

    expect(result).toEqual(new Set([4, 5, 6]));
  });

  it('should handle an empty Set', () => {
    const set = new Set<number>();

    const result = map(set, value => value * 2);

    expect(result).toEqual(new Set());
  });

  it('should not modify the original Set', () => {
    const set = new Set([1, 2, 3]);

    const originalSize = set.size;
    const originalValues = Array.from(set);

    map(set, value => value * 2);

    expect(set.size).toBe(originalSize);
    expect(Array.from(set)).toEqual(originalValues);
  });

  it('should work with string values', () => {
    const set = new Set(['a', 'b', 'c']);

    const result = map(set, value => value.toUpperCase());

    expect(result).toEqual(new Set(['A', 'B', 'C']));
  });

  it('should work with type transformations', () => {
    const set = new Set([1, 2, 3]);

    const result = map(set, value => String(value));

    expect(result).toEqual(new Set(['1', '2', '3']));
  });

  it('should work with complex object transformations', () => {
    const set = new Set([
      { name: 'apple', price: 1 },
      { name: 'banana', price: 2 },
    ]);

    const result = map(set, value => ({ ...value, price: value.price * 2 }));

    expect(result).toEqual(
      new Set([
        { name: 'apple', price: 2 },
        { name: 'banana', price: 4 },
      ])
    );
  });

  it('should handle a single element Set', () => {
    const set = new Set([42]);

    const result = map(set, value => value + 1);

    expect(result).toEqual(new Set([43]));
  });

  it('should work with boolean values', () => {
    const set = new Set([true, false]);

    const result = map(set, value => !value);

    expect(result).toEqual(new Set([false, true]));
  });

  it('should handle duplicate results correctly', () => {
    const set = new Set([1, 2, 3, 4]);

    const result = map(set, value => Math.floor(value / 2));

    // Set automatically deduplicates: [0, 1, 1, 2] -> [0, 1, 2]
    expect(result).toEqual(new Set([0, 1, 2]));
  });

  it('should work with object property extraction', () => {
    const set = new Set([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);

    const result = map(set, value => value.name);

    expect(result).toEqual(new Set(['Alice', 'Bob', 'Charlie']));
  });

  it('should transform numbers to objects', () => {
    const set = new Set([1, 2, 3]);

    const result = map(set, value => ({ id: value, squared: value * value }));

    expect(result).toEqual(
      new Set([
        { id: 1, squared: 1 },
        { id: 2, squared: 4 },
        { id: 3, squared: 9 },
      ])
    );
  });
});
