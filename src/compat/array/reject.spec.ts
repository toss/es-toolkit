import { describe, expect, it } from 'vitest';
import { reject } from './reject';
import { args } from '../_internal/args';
import { isEven } from '../_internal/isEven';

describe('reject', () => {
  it('should return elements the `predicate` returns falsey for', () => {
    const array = [1, 2, 3];
    expect(reject(array, isEven)).toEqual([1, 3]);
  });
  it('should return an empty array when no predicate is provided.', () => {
    const arr = [1, 2, 3];

    expect(reject(arr)).toEqual([]);
  });

  it('should return an array of elements from the array', () => {
    const arr = [1, 2, 3];

    expect(reject(arr, isEven)).toEqual([1, 3]);
  });

  it(`should work with \`matches\` shorthands`, () => {
    const arr = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    expect(reject(arr, { name: 'Bob' })).toEqual([{ id: 1, name: 'Alice' }]);
  });

  it(`should work with \`matchesProperty\` shorthands`, () => {
    const arr = [
      { id: 1, name: 'Alice', 0: 1, [Symbol.for('key')]: 1 },
      { id: 2, name: 'Bob', 0: 2, [Symbol.for('key')]: 2 },
    ];

    expect(reject(arr, ['name', 'Alice'])).toEqual([{ id: 2, name: 'Bob', 0: 2, [Symbol.for('key')]: 2 }]);
    expect(reject(arr, [0, 1])).toEqual([{ id: 2, name: 'Bob', 0: 2, [Symbol.for('key')]: 2 }]);
    expect(reject(arr, [Symbol.for('key'), 1])).toEqual([{ id: 2, name: 'Bob', 0: 2, [Symbol.for('key')]: 2 }]);

    const users = [
      { user: 'barney', age: 36, active: true },
      { user: 'fred', age: 40, active: false },
    ];

    expect(reject(users, ['active', false])).toEqual([{ user: 'barney', age: 36, active: true }]);
  });

  it(`should work with \`property\` shorthands`, () => {
    const arr = [
      { id: 1, name: 'Alice', 0: 1, [Symbol.for('key')]: 1 },
      { id: 2, name: 'Bob', 0: 2, [Symbol.for('key')]: 2 },
      { id: 3, age: 28, 0: 3 },
    ];

    expect(reject(arr, 'name')).toEqual([{ id: 3, age: 28, 0: 3 }]);

    expect(reject(arr, 0)).toEqual([]);

    expect(reject(arr, Symbol.for('key'))).toEqual([{ id: 3, age: 28, 0: 3 }]);
  });

  it(`should return an array of elements from the object`, () => {
    const obj: { [key: string]: number } = {
      a: 1,
      b: 2,
      c: 3,
    };

    expect(reject(obj, (value, key) => value >= 2 && key === 'b')).toEqual([1, 3]);
  });

  it(`should work with \`matches\` shorthands for objects.`, () => {
    const obj = {
      item1: { a: 0 },
      item2: { a: 1 },
      item3: { a: 2 },
    };

    expect(reject(obj, { a: 1 })).toEqual([{ a: 0 }, { a: 2 }]);
  });

  it(`should work with \`matches\` shorthands for nested objects.`, () => {
    const obj = {
      item1: { a: 0, b: { c: 1 } },
      item2: { a: 1, b: { c: 2 } },
      item3: { a: 0, b: { c: 1 } },
    };

    expect(reject(obj, { b: { c: 1 } })).toEqual([{ a: 1, b: { c: 2 } }]);
  });

  it(`should work when looking for values inside nested objects`, () => {
    const obj: Record<string, unknown> = {
      item1: { a: 0, b: { c: 1 } },
      item2: { a: 1, b: { c: 2 } },
      item3: { a: 0, b: { c: 1 } },
    };

    expect(reject(obj, ['b.c', 2])).toEqual([
      { a: 0, b: { c: 1 } },
      { a: 0, b: { c: 1 } },
    ]);
  });

  it('should match nested object properties using key-value pair shorthand.', () => {
    const obj: { [key: string]: { [key: string]: unknown } } = {
      alice: { id: 1, name: 'Alice' },
      bob: { id: 2, name: 'Bob' },
    };

    expect(reject(obj, ['name', 'Alice'])).toEqual([{ id: 2, name: 'Bob' }]);
  });

  it('should return objects that have the specified key.', () => {
    const obj: { [key: string]: { [key: string]: unknown } } = {
      a: { id: 1, name: 'Alice' },
      b: { id: 2, name: 'Bob' },
      c: { id: 3, age: 28 },
    };

    expect(reject(obj, 'name')).toEqual([{ id: 3, age: 28 }]);
  });

  it('should return `[]` when provided `null` or `undefined`', () => {
    expect(reject(null as any, isEven)).toEqual([]);
    expect(reject(undefined as any, isEven)).toEqual([]);
  });

  it('should return `[]` when provided none array-like object', () => {
    expect(reject(1 as any, isEven)).toEqual([]);
    expect(reject('' as any, isEven)).toEqual([]);
    expect(reject(true as any, isEven)).toEqual([]);
    expect(reject(Symbol() as any, isEven)).toEqual([]);
  });

  it('should support array-like objects', () => {
    expect(reject({ 0: 1, 1: 2, 2: 3, length: 3 }, isEven)).toEqual([1, 3]);
    expect(reject('123', value => isEven(parseInt(value)))).toEqual(['1', '3']);
    expect(reject(args, isEven)).toEqual([1, 3]);
  });

  it('should not modify the resulting value from within `predicate`', () => {
    const actual = reject([0], (value, index, array) => {
      // @ts-expect-error - testing
      array[index] = 1;
      return false;
    });

    expect(actual).toEqual([0]);
  });
});
