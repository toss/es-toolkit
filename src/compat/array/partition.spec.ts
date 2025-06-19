import { describe, expect, it, expectTypeOf } from 'vitest';
import type { partition as partitionLodash } from 'lodash';
import { partition } from './partition';
import { args } from '../_internal/args';

describe('partition', () => {
  it('should split elements into two groups by `predicate`', () => {
    const arr = [1, 2, 3, 4];
    const isEven = (n: number) => n % 2 === 0;

    expect(partition(arr, isEven)).toEqual([
      [2, 4],
      [1, 3],
    ]);
  });

  it('should use `_.identity` when `predicate` is nullish', () => {
    const arr = [0, 1, 2, null, 3, undefined, 4, false, 5, ''];

    expect(partition(arr, null)).toEqual([
      [1, 2, 3, 4, 5],
      [0, null, undefined, false, ''],
    ]);
  });

  it('should work with `matches` shorthand', () => {
    const users = [
      { user: 'barney', age: 36, active: false },
      { user: 'fred', age: 40, active: true },
    ];

    expect(partition(users, { age: 36 })).toEqual([
      [{ user: 'barney', age: 36, active: false }],
      [{ user: 'fred', age: 40, active: true }],
    ]);
    expect(partition(users, { age: 36, active: false })).toEqual([
      [{ user: 'barney', age: 36, active: false }],
      [{ user: 'fred', age: 40, active: true }],
    ]);
  });

  it('should work with `matchesProperty` shorthand', () => {
    const users = [
      { user: 'barney', age: 36, active: false },
      { user: 'fred', age: 40, active: true },
    ];

    expect(partition(users, ['active', false])).toEqual([
      [{ user: 'barney', age: 36, active: false }],
      [{ user: 'fred', age: 40, active: true }],
    ]);
  });

  it('should work with `property` shorthand', () => {
    const users = [
      { user: 'barney', age: 36, active: false },
      { user: 'fred', age: 40, active: true },
    ];

    expect(partition(users, 'active')).toEqual([
      [{ user: 'fred', age: 40, active: true }],
      [{ user: 'barney', age: 36, active: false }],
    ]);
  });

  it('should work with a number for `predicate`', () => {
    const array = [
      [1, 0],
      [0, 1],
      [1, 0],
    ];

    expect(partition(array, 0)).toEqual([
      [
        [1, 0],
        [1, 0],
      ],
      [[0, 1]],
    ]);
  });

  it('should work with objects', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };
    const isEven = (n: number) => n % 2 === 0;

    expect(partition(obj, isEven)).toEqual([
      [2, 4],
      [1, 3],
    ]);
  });

  it('should work with nested objects', () => {
    const obj = {
      item1: { a: 0, b: { c: 1 } },
      item2: { a: 1, b: { c: 2 } },
      item3: { a: 0, b: { c: 1 } },
    };

    expect(partition(obj, { b: { c: 1 } })).toEqual([
      [
        { a: 0, b: { c: 1 } },
        { a: 0, b: { c: 1 } },
      ],
      [{ a: 1, b: { c: 2 } }],
    ]);
  });

  it('should return partition objects based on key-value pair', () => {
    const obj = {
      alice: { id: 1, name: 'Alice' },
      bob: { id: 2, name: 'Bob' },
    };

    expect(partition(obj, ['name', 'Alice'])).toEqual([[{ id: 1, name: 'Alice' }], [{ id: 2, name: 'Bob' }]]);
  });

  it('should return objects that have the specified key', () => {
    const obj = {
      a: { id: 1, name: 'Alice' },
      b: { id: 2, name: 'Bob' },
      c: { id: 3, age: 28 },
    };

    expect(partition(obj, 'name')).toEqual([
      [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ],
      [{ id: 3, age: 28 }],
    ]);
  });

  it('should return [[], []] when provided `null` or `undefined`', () => {
    const isEven = (n: number) => n % 2 === 0;
    expect(partition(null, isEven)).toEqual([[], []]);
    expect(partition(undefined, isEven)).toEqual([[], []]);
  });

  it('should support array-like objects', () => {
    const isEven = (n: number) => n % 2 === 0;
    const isEven2 = (n: string) => parseInt(n) % 2 === 0;
    expect(partition({ 0: 1, 1: 2, 2: 3, length: 3 }, isEven)).toEqual([[2], [1, 3]]);
    expect(partition('123', isEven2)).toEqual([['2'], ['1', '3']]);
    expect(partition(args, isEven)).toEqual([[2], [1, 3]]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(partition).toEqualTypeOf<typeof partitionLodash>();
  });
});
