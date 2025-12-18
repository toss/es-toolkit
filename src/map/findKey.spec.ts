import { describe, expect, it } from 'vitest';
import { findKey } from './findKey';

describe('findKey', () => {
  it('should return the key of the first entry that satisfies the predicate', () => {
    const map = new Map([
      ['pebbles', { age: 24, active: true }],
      ['barney', { age: 36, active: true }],
      ['fred', { age: 40, active: false }],
    ]);

    expect(findKey(map, value => value.age < 40)).toBe('pebbles');
  });

  it('should return the first key if all entries satisfy the predicate', () => {
    const map = new Map([
      ['pebbles', { age: 24, active: true }],
      ['barney', { age: 36, active: true }],
      ['fred', { age: 40, active: false }],
    ]);

    expect(findKey(map, value => value.age > 20)).toBe('pebbles');
  });

  it('should return undefined if no entry satisfies the predicate', () => {
    const map = new Map([
      ['pebbles', { age: 24, active: true }],
      ['barney', { age: 36, active: true }],
      ['fred', { age: 40, active: false }],
    ]);

    expect(findKey(map, value => value.age > 50)).toBeUndefined();
  });

  it('should return undefined for an empty Map', () => {
    const map = new Map<string, { age: number }>();

    expect(findKey(map, value => value.age < 40)).toBeUndefined();
  });

  it('should handle Maps with various data types', () => {
    const map = new Map([
      ['num', 42],
      ['str', 'hello'],
      ['bool', true],
    ]);

    expect(findKey(map, value => typeof value === 'string')).toBe('str');
  });

  it('should pass the key to the predicate function', () => {
    const map = new Map([
      ['barney', { age: 36, active: true }],
      ['fred', { age: 40, active: false }],
    ]);

    expect(findKey(map, (_, key) => key === 'fred')).toBe('fred');
  });

  it('should pass the key and map to the predicate function', () => {
    const map = new Map([
      ['barney', { age: 36, active: true }],
      ['fred', { age: 40, active: false }],
    ]);

    expect(findKey(map, (value, key, originalMap) => key === 'fred' && originalMap.get(key)?.active === false)).toBe(
      'fred'
    );
  });

  it('should work with number keys', () => {
    const map = new Map([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);

    expect(findKey(map, value => value === 'b')).toBe(2);
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

    expect(findKey(map, value => value > 15)).toBe(key2);
  });

  it('should return the first matching key when multiple entries match', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 2],
      ['d', 3],
    ]);

    expect(findKey(map, value => value === 2)).toBe('b');
  });

  it('should stop iterating after finding the first match', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
      ['d', 4],
    ]);

    let callCount = 0;
    const result = findKey(map, value => {
      callCount++;
      return value === 2;
    });

    expect(result).toBe('b');
    expect(callCount).toBe(2);
  });
});
