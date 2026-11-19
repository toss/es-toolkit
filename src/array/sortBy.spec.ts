import { describe, expect, it } from 'vitest';
import { sortBy } from './sortBy';

describe('sortBy', () => {
  const users = [
    { user: 'foo', age: 24 },
    { user: 'bar', age: 7 },
    { user: 'foo', age: 8 },
    { user: 'bar', age: 29 },
  ];

  it('should stable sort objects by a single property in ascending order', () => {
    expect(sortBy(users, ['user'])).toEqual([
      { user: 'bar', age: 7 },
      { user: 'bar', age: 29 },
      { user: 'foo', age: 24 },
      { user: 'foo', age: 8 },
    ]);
  });

  it('should stable sort objects by multiple properties', () => {
    expect(sortBy(users, ['user', 'age'])).toEqual([
      { user: 'bar', age: 7 },
      { user: 'bar', age: 29 },
      { user: 'foo', age: 8 },
      { user: 'foo', age: 24 },
    ]);
  });

  it('should stable sort objects by iteratee function', () => {
    expect(sortBy(users, [user => user.user])).toEqual([
      { user: 'bar', age: 7 },
      { user: 'bar', age: 29 },
      { user: 'foo', age: 24 },
      { user: 'foo', age: 8 },
    ]);
  });

  it('should stable sort objects by iteratee function and property', () => {
    expect(sortBy(users, [user => user.user, user => user.age])).toEqual([
      { user: 'bar', age: 7 },
      { user: 'bar', age: 29 },
      { user: 'foo', age: 8 },
      { user: 'foo', age: 24 },
    ]);
  });

  it('should stable sort objects by mixed iteratee function and key', () => {
    expect(sortBy(users, ['user', user => user.age])).toEqual([
      { user: 'bar', age: 7 },
      { user: 'bar', age: 29 },
      { user: 'foo', age: 8 },
      { user: 'foo', age: 24 },
    ]);
  });

  it('should place null and undefined values at the end', () => {
    const items = [
      { user: 'foo', age: 3 },
      { user: 'bar', age: null },
      { user: 'baz', age: 1 },
      { user: 'qux', age: undefined },
      { user: 'quux', age: 2 },
    ];

    expect(sortBy(items, ['age'])).toEqual([
      { user: 'baz', age: 1 },
      { user: 'quux', age: 2 },
      { user: 'foo', age: 3 },
      { user: 'bar', age: null },
      { user: 'qux', age: undefined },
    ]);
  });

  it('should maintain stable order among multiple null and undefined values', () => {
    const items = [
      { user: 'a', age: null },
      { user: 'b', age: 1 },
      { user: 'c', age: undefined },
      { user: 'd', age: null },
      { user: 'e', age: undefined },
    ];

    expect(sortBy(items, ['age'])).toEqual([
      { user: 'b', age: 1 },
      { user: 'a', age: null },
      { user: 'd', age: null },
      { user: 'c', age: undefined },
      { user: 'e', age: undefined },
    ]);
  });

  it('should sort symbol values after regular values without throwing', () => {
    const symbolA = Symbol('a');
    const symbolB = Symbol('b');
    const items = [
      { name: 'a', value: symbolB },
      { name: 'b', value: 2 },
      { name: 'c', value: symbolA },
      { name: 'd', value: 1 },
      { name: 'e', value: NaN },
      { name: 'f', value: null },
      { name: 'g', value: undefined },
    ];

    expect(sortBy(items, ['value'])).toEqual([
      { name: 'd', value: 1 },
      { name: 'b', value: 2 },
      { name: 'a', value: symbolB },
      { name: 'c', value: symbolA },
      { name: 'e', value: NaN },
      { name: 'f', value: null },
      { name: 'g', value: undefined },
    ]);
  });
});
