import { describe, expect, it } from 'vitest';
import { find } from './find';

describe('find', () => {
  it('should return the first element that satisfies the predicate', () => {
    const set = new Set([
      { age: 24, active: true },
      { age: 36, active: true },
      { age: 40, active: false },
    ]);

    expect(find(set, value => value.age < 40)).toEqual({ age: 24, active: true });
  });

  it('should return the first element if all elements satisfy the predicate', () => {
    const set = new Set([
      { age: 24, active: true },
      { age: 36, active: true },
      { age: 40, active: false },
    ]);

    expect(find(set, value => value.age > 20)).toEqual({ age: 24, active: true });
  });

  it('should return undefined if no element satisfies the predicate', () => {
    const set = new Set([
      { age: 24, active: true },
      { age: 36, active: true },
      { age: 40, active: false },
    ]);

    expect(find(set, value => value.age > 50)).toBeUndefined();
  });

  it('should return undefined for an empty Set', () => {
    const set = new Set<{ age: number }>();

    expect(find(set, value => value.age < 40)).toBeUndefined();
  });

  it('should handle Sets with various data types', () => {
    const set = new Set([42, 'hello', true]);

    expect(find(set, value => typeof value === 'string')).toBe('hello');
  });

  it('should pass the set to the predicate function', () => {
    const set = new Set([
      { age: 36, active: true },
      { age: 40, active: false },
    ]);

    expect(find(set, (value, value2, originalSet) => value.active && originalSet.has(value))).toEqual({
      age: 36,
      active: true,
    });
  });

  it('should work with number values', () => {
    const set = new Set([1, 2, 3, 4, 5]);

    expect(find(set, value => value > 3)).toBe(4);
  });

  it('should work with string values', () => {
    const set = new Set(['apple', 'banana', 'cherry']);

    expect(find(set, value => value.startsWith('b'))).toBe('banana');
  });

  it('should return the first matching element when multiple elements match', () => {
    const set = new Set([1, 2, 2, 3]);

    expect(find(set, value => value === 2)).toBe(2);
  });

  it('should stop iterating after finding the first match', () => {
    const set = new Set([1, 2, 3, 4]);

    let callCount = 0;
    const result = find(set, value => {
      callCount++;
      return value === 2;
    });

    expect(result).toBe(2);
    expect(callCount).toBe(2);
  });

  it('should work with complex objects', () => {
    const set = new Set([
      { name: 'apple', quantity: 10 },
      { name: 'banana', quantity: 5 },
      { name: 'grape', quantity: 15 },
    ]);

    expect(find(set, value => value.quantity > 10)).toEqual({ name: 'grape', quantity: 15 });
  });

  it('should handle boolean values', () => {
    const set = new Set([false, false, true, false]);

    expect(find(set, value => value === true)).toBe(true);
  });
});
