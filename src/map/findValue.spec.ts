import { describe, expect, it } from 'vitest';
import { findValue } from './findValue';

describe('findValue', () => {
  it('should return the value of the first entry that satisfies the predicate', () => {
    const map = new Map([
      ['pebbles', { age: 24, active: true }],
      ['barney', { age: 36, active: true }],
      ['fred', { age: 40, active: false }],
    ]);

    expect(findValue(map, value => value.age < 40)).toEqual({ age: 24, active: true });
  });

  it('should return the first value if all entries satisfy the predicate', () => {
    const map = new Map([
      ['pebbles', { age: 24, active: true }],
      ['barney', { age: 36, active: true }],
      ['fred', { age: 40, active: false }],
    ]);

    expect(findValue(map, value => value.age > 20)).toEqual({ age: 24, active: true });
  });

  it('should return undefined if no entry satisfies the predicate', () => {
    const map = new Map([
      ['pebbles', { age: 24, active: true }],
      ['barney', { age: 36, active: true }],
      ['fred', { age: 40, active: false }],
    ]);

    expect(findValue(map, value => value.age > 50)).toBeUndefined();
  });

  it('should return undefined for an empty Map', () => {
    const map = new Map<string, { age: number }>();

    expect(findValue(map, value => value.age < 40)).toBeUndefined();
  });

  it('should handle Maps with various data types', () => {
    const map = new Map<string, unknown>([
      ['num', 42],
      ['str', 'hello'],
      ['bool', true],
    ]);

    expect(findValue(map, value => typeof value === 'string')).toBe('hello');
  });

  it('should pass the key to the predicate function', () => {
    const map = new Map([
      ['barney', { age: 36, active: true }],
      ['fred', { age: 40, active: false }],
    ]);

    expect(findValue(map, (_, key) => key === 'fred')).toEqual({ age: 40, active: false });
  });

  it('should pass the key and map to the predicate function', () => {
    const map = new Map([
      ['barney', { age: 36, active: true }],
      ['fred', { age: 40, active: false }],
    ]);

    expect(
      findValue(map, (value, key, originalMap) => key === 'fred' && originalMap.get(key)?.active === false)
    ).toEqual({ age: 40, active: false });
  });

  it('should work with number values', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    expect(findValue(map, value => value > 2)).toBe(3);
  });

  it('should work with string values', () => {
    const map = new Map([
      [1, 'apple'],
      [2, 'banana'],
      [3, 'cherry'],
    ]);

    expect(findValue(map, value => value.startsWith('b'))).toBe('banana');
  });

  it('should return the first matching value when multiple entries match', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 2],
      ['d', 3],
    ]);

    expect(findValue(map, value => value === 2)).toBe(2);
  });

  it('should stop iterating after finding the first match', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
      ['d', 4],
    ]);

    let callCount = 0;
    const result = findValue(map, value => {
      callCount++;
      return value === 2;
    });

    expect(result).toBe(2);
    expect(callCount).toBe(2);
  });

  it('should handle complex object values', () => {
    const map = new Map([
      ['user1', { name: 'Alice', score: 100 }],
      ['user2', { name: 'Bob', score: 85 }],
      ['user3', { name: 'Charlie', score: 95 }],
    ]);

    expect(findValue(map, value => value.score > 90)).toEqual({ name: 'Alice', score: 100 });
  });
});
