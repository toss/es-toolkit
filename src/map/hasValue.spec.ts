import { describe, expect, it } from 'vitest';
import { hasValue } from './hasValue';

describe('hasValue', () => {
  it('should return true when the Map contains the value', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    expect(hasValue(map, 2)).toBe(true);
  });

  it('should return false when the Map does not contain the value', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    expect(hasValue(map, 5)).toBe(false);
  });

  it('should return false for an empty Map', () => {
    const map = new Map<string, number>();

    expect(hasValue(map, 1)).toBe(false);
  });

  it('should work with string values', () => {
    const map = new Map([
      ['a', 'apple'],
      ['b', 'banana'],
      ['c', 'cherry'],
    ]);

    expect(hasValue(map, 'banana')).toBe(true);
    expect(hasValue(map, 'grape')).toBe(false);
  });

  it('should work with boolean values', () => {
    const map = new Map([
      ['a', true],
      ['b', false],
      ['c', true],
    ]);

    expect(hasValue(map, true)).toBe(true);
    expect(hasValue(map, false)).toBe(true);
  });

  it('should handle null values', () => {
    const map = new Map([
      ['a', 1],
      ['b', null],
      ['c', 3],
    ]);

    expect(hasValue(map, null)).toBe(true);
    expect(hasValue(map, undefined)).toBe(false);
  });

  it('should handle undefined values', () => {
    const map = new Map([
      ['a', 1],
      ['b', undefined],
      ['c', 3],
    ]);

    expect(hasValue(map, undefined)).toBe(true);
    expect(hasValue(map, null)).toBe(false);
  });

  it('should handle NaN using SameValueZero comparison', () => {
    const map = new Map([
      ['a', 1],
      ['b', NaN],
      ['c', 3],
    ]);

    expect(hasValue(map, NaN)).toBe(true);
  });

  it('should distinguish between +0 and -0 using SameValueZero comparison', () => {
    const map = new Map([
      ['a', 1],
      ['b', +0],
      ['c', 3],
    ]);

    expect(hasValue(map, +0)).toBe(true);
    expect(hasValue(map, -0)).toBe(true); // SameValueZero treats +0 and -0 as equal
  });

  it('should work with object values (reference equality)', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };

    const map = new Map([
      ['a', obj1],
      ['b', obj2],
      ['c', obj3],
    ]);

    expect(hasValue(map, obj2)).toBe(true);
    expect(hasValue(map, { id: 2 })).toBe(false); // Different reference
  });

  it('should work with array values (reference equality)', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    const map = new Map([
      ['a', arr1],
      ['b', arr2],
    ]);

    expect(hasValue(map, arr1)).toBe(true);
    expect(hasValue(map, [1, 2, 3])).toBe(false); // Different reference
  });

  it('should find the first occurrence of a value', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 2],
      ['d', 3],
    ]);

    expect(hasValue(map, 2)).toBe(true);
  });

  it('should find values at the beginning of the Map', () => {
    const map = new Map([
      ['first', 100],
      ['second', 200],
      ['third', 300],
    ]);

    expect(hasValue(map, 100)).toBe(true);
  });

  it('should find values at the end of the Map', () => {
    const map = new Map([
      ['first', 100],
      ['second', 200],
      ['third', 300],
    ]);

    expect(hasValue(map, 300)).toBe(true);
  });

  it('should work with a single entry Map', () => {
    const map = new Map([['only', 42]]);

    expect(hasValue(map, 42)).toBe(true);
    expect(hasValue(map, 0)).toBe(false);
  });

  it('should work with symbol keys', () => {
    const key1 = Symbol('key1');
    const key2 = Symbol('key2');

    const map = new Map([
      [key1, 'value1'],
      [key2, 'value2'],
    ]);

    expect(hasValue(map, 'value1')).toBe(true);
    expect(hasValue(map, 'value3')).toBe(false);
  });

  it('should work with symbol values', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');

    const map = new Map([
      ['a', sym1],
      ['b', sym2],
    ]);

    expect(hasValue(map, sym1)).toBe(true);
    expect(hasValue(map, Symbol('sym1'))).toBe(false); // Different symbol
  });

  it('should handle Maps with duplicate values', () => {
    const map = new Map([
      ['a', 'duplicate'],
      ['b', 'duplicate'],
      ['c', 'unique'],
    ]);

    expect(hasValue(map, 'duplicate')).toBe(true);
    expect(hasValue(map, 'unique')).toBe(true);
  });

  it('should work with number keys and complex values', () => {
    const map = new Map([
      [1, { name: 'Alice', age: 25 }],
      [2, { name: 'Bob', age: 30 }],
      [3, { name: 'Charlie', age: 35 }],
    ]);

    const bob = { name: 'Bob', age: 30 };
    const actualBob = map.get(2)!;

    expect(hasValue(map, actualBob)).toBe(true);
    expect(hasValue(map, bob)).toBe(false); // Different reference
  });

  it('should handle empty string values', () => {
    const map = new Map([
      ['a', ''],
      ['b', 'not empty'],
    ]);

    expect(hasValue(map, '')).toBe(true);
    expect(hasValue(map, 'not empty')).toBe(true);
  });

  it('should handle zero values', () => {
    const map = new Map([
      ['a', 0],
      ['b', 1],
      ['c', -1],
    ]);

    expect(hasValue(map, 0)).toBe(true);
    expect(hasValue(map, 1)).toBe(true);
    expect(hasValue(map, -1)).toBe(true);
  });

  it('should work with BigInt values', () => {
    const map = new Map([
      ['a', 1n],
      ['b', 2n],
      ['c', 3n],
    ]);

    expect(hasValue(map, 2n)).toBe(true);
    expect(hasValue(map, 5n)).toBe(false);
  });
});
