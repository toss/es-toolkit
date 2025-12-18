import { describe, expect, it } from 'vitest';
import { some } from './some';

describe('some', () => {
  it('should return true when at least one entry satisfies the predicate', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    expect(some(map, value => value > 2)).toBe(true);
  });

  it('should return false when no entries satisfy the predicate', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    expect(some(map, value => value > 10)).toBe(false);
  });

  it('should return false for an empty Map', () => {
    const map = new Map<string, number>();

    expect(some(map, () => true)).toBe(false);
  });

  it('should pass the key to the predicate function', () => {
    const map = new Map([
      ['apple', 5],
      ['banana', 6],
      ['cherry', 6],
    ]);

    expect(some(map, (_, key) => key === 'banana')).toBe(true);
    expect(some(map, (_, key) => key === 'grape')).toBe(false);
  });

  it('should pass the key, value, and map to the predicate function', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    expect(some(map, (value, key, originalMap) => originalMap.has(key) && value === 2)).toBe(true);
  });

  it('should return true immediately when predicate returns true', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
      ['d', 4],
      ['e', 5],
    ]);

    let callCount = 0;
    const result = some(map, value => {
      callCount++;
      return value === 2;
    });

    expect(result).toBe(true);
    expect(callCount).toBe(2); // Should stop at 'b' which has value 2
  });

  it('should work with number keys', () => {
    const map = new Map([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);

    expect(some(map, (_, key) => key === 2)).toBe(true);
    expect(some(map, (_, key) => key > 5)).toBe(false);
  });

  it('should work with complex object values', () => {
    const map = new Map([
      ['user1', { age: 25, active: false }],
      ['user2', { age: 30, active: true }],
      ['user3', { age: 35, active: false }],
    ]);

    expect(some(map, value => value.active)).toBe(true);
    expect(some(map, value => value.age > 40)).toBe(false);
  });

  it('should work with boolean values', () => {
    const map = new Map([
      ['a', false],
      ['b', false],
      ['c', true],
    ]);

    expect(some(map, value => value === true)).toBe(true);

    const allFalse = new Map([
      ['a', false],
      ['b', false],
    ]);
    expect(some(allFalse, value => value === true)).toBe(false);
  });

  it('should handle a single entry Map', () => {
    const map = new Map([['only', 42]]);

    expect(some(map, value => value === 42)).toBe(true);
    expect(some(map, value => value === 0)).toBe(false);
  });

  it('should work with symbol keys', () => {
    const key1 = Symbol('key1');
    const key2 = Symbol('key2');
    const key3 = Symbol('key3');

    const map = new Map([
      [key1, 10],
      [key2, 20],
      [key3, 30],
    ]);

    expect(some(map, value => value > 25)).toBe(true);
    expect(some(map, value => value > 50)).toBe(false);
  });

  it('should find entries matching a complex condition', () => {
    const map = new Map([
      ['item1', { price: 100, inStock: false }],
      ['item2', { price: 200, inStock: true }],
      ['item3', { price: 150, inStock: false }],
    ]);

    expect(some(map, (value, key) => value.inStock && key.startsWith('item'))).toBe(true);
    expect(some(map, value => value.price > 300)).toBe(false);
  });

  it('should return true when the first entry matches', () => {
    const map = new Map([
      ['a', 10],
      ['b', 20],
      ['c', 30],
    ]);

    let callCount = 0;
    const result = some(map, value => {
      callCount++;
      return value === 10;
    });

    expect(result).toBe(true);
    expect(callCount).toBe(1);
  });

  it('should check all entries when none match until the last one', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    let callCount = 0;
    const result = some(map, value => {
      callCount++;
      return value === 3;
    });

    expect(result).toBe(true);
    expect(callCount).toBe(3);
  });
});
