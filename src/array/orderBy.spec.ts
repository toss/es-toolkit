import { describe, expect, it } from 'vitest';
import { orderBy } from './orderBy';

describe('orderBy', () => {
  const users = [
    { user: 'fred', age: 48 },
    { user: 'barney', age: 34 },
    { user: 'fred', age: 40 },
    { user: 'barney', age: 36 },
  ];

  it('should order objects by a single property in ascending order', () => {
    expect(orderBy(users, ['user'], ['asc'])).toEqual([
      { user: 'barney', age: 34 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 48 },
      { user: 'fred', age: 40 },
    ]);
  });

  it('should order objects by a single property in descending order', () => {
    expect(orderBy(users, ['user'], ['desc'])).toEqual([
      { user: 'fred', age: 48 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 34 },
      { user: 'barney', age: 36 },
    ]);
  });

  it('should order objects by multiple properties', () => {
    expect(orderBy(users, ['user', 'age'], ['asc', 'desc'])).toEqual([
      { user: 'barney', age: 36 },
      { user: 'barney', age: 34 },
      { user: 'fred', age: 48 },
      { user: 'fred', age: 40 },
    ]);
  });

  const users2 = [
    { user: 'fred', age: 48 },
    { user: 'barney', age: 36 },
    { user: 'fred', age: 40 },
    { user: 'barney', age: 34 },
  ];

  it('should extend orders if orders length is less than keys length', () => {
    expect(orderBy(users2, ['user', 'age'], ['asc'])).toEqual([
      { user: 'barney', age: 34 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
      { user: 'fred', age: 48 },
    ]);
  });

  it('should order objects by criteria functions', () => {
    expect(orderBy(users2, [obj => obj.user, obj => obj.age], ['asc'])).toEqual([
      { user: 'barney', age: 34 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
      { user: 'fred', age: 48 },
    ]);
  });

  it('should place null and undefined values at the end when ascending', () => {
    const items = [
      { name: 'a', value: 3 },
      { name: 'b', value: null },
      { name: 'c', value: 1 },
      { name: 'd', value: undefined },
      { name: 'e', value: 2 },
    ];

    expect(orderBy(items, ['value'], ['asc'])).toEqual([
      { name: 'c', value: 1 },
      { name: 'e', value: 2 },
      { name: 'a', value: 3 },
      { name: 'b', value: null },
      { name: 'd', value: undefined },
    ]);
  });

  it('should place null and undefined values at the beginning when descending', () => {
    const items = [
      { name: 'a', value: 3 },
      { name: 'b', value: null },
      { name: 'c', value: 1 },
      { name: 'd', value: undefined },
      { name: 'e', value: 2 },
    ];

    expect(orderBy(items, ['value'], ['desc'])).toEqual([
      { name: 'd', value: undefined },
      { name: 'b', value: null },
      { name: 'a', value: 3 },
      { name: 'e', value: 2 },
      { name: 'c', value: 1 },
    ]);
  });
});
