import { describe, expect, it } from 'vitest';
import { every } from './every';

describe('every', () => {
  it('should return true when all entries satisfy the predicate', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    expect(every(map, value => value > 0)).toBe(true);
  });

  it('should return false when at least one entry does not satisfy the predicate', () => {
    const map = new Map([
      ['a', 1],
      ['b', -2],
      ['c', 3],
    ]);

    expect(every(map, value => value > 0)).toBe(false);
  });

  it('should return true for an empty Map', () => {
    const map = new Map<string, number>();

    expect(every(map, () => false)).toBe(true);
  });

  it('should pass the key to the predicate function', () => {
    const map = new Map([
      ['apple', 5],
      ['banana', 6],
      ['cherry', 6],
    ]);

    expect(every(map, (_, key) => key.length > 3)).toBe(true);
  });

  it('should pass the key, value, and map to the predicate function', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    expect(every(map, (value, key, originalMap) => originalMap.has(key) && value > 0)).toBe(true);
  });

  it('should return false immediately when predicate returns false', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
      ['d', 4],
      ['e', 5],
    ]);

    let callCount = 0;
    const result = every(map, value => {
      callCount++;
      return value < 3;
    });

    expect(result).toBe(false);
    expect(callCount).toBe(3); // Should stop at 'c' which has value 3
  });

  it('should work with number keys', () => {
    const map = new Map([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);

    expect(every(map, (_, key) => key > 0)).toBe(true);
    expect(every(map, (_, key) => key < 3)).toBe(false);
  });

  it('should work with complex object values', () => {
    const map = new Map([
      ['user1', { age: 25, active: true }],
      ['user2', { age: 30, active: true }],
      ['user3', { age: 35, active: true }],
    ]);

    expect(every(map, value => value.active)).toBe(true);
    expect(every(map, value => value.age > 20)).toBe(true);
    expect(every(map, value => value.age > 30)).toBe(false);
  });

  it('should work with boolean values', () => {
    const map = new Map([
      ['a', true],
      ['b', true],
      ['c', true],
    ]);

    expect(every(map, value => value === true)).toBe(true);

    map.set('d', false);
    expect(every(map, value => value === true)).toBe(false);
  });

  it('should handle a single entry Map', () => {
    const map = new Map([['only', 42]]);

    expect(every(map, value => value === 42)).toBe(true);
    expect(every(map, value => value === 0)).toBe(false);
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

    expect(every(map, value => value >= 10)).toBe(true);
    expect(every(map, value => value > 15)).toBe(false);
  });

  it('should verify all entries match a complex condition', () => {
    const map = new Map([
      ['item1', { price: 100, inStock: true }],
      ['item2', { price: 200, inStock: true }],
      ['item3', { price: 150, inStock: true }],
    ]);

    expect(every(map, (value, key) => value.inStock && key.startsWith('item'))).toBe(true);
  });
});
