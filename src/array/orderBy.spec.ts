import { describe, it, expect } from 'vitest';
import { orderBy } from './orderBy';

describe('orderBy', () => {
  it('should order objects by a single property in ascending order', () => {
    const users = [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 34 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 36 },
    ];

    const result = orderBy(users, ['user'], ['asc']);

    expect(result).toEqual([
      { user: 'barney', age: 34 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 48 },
      { user: 'fred', age: 40 },
    ]);
  });

  it('should order objects by a single property in descending order', () => {
    const users = [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 34 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 36 },
    ];

    const result = orderBy(users, ['user'], ['desc']);

    expect(result).toEqual([
      { user: 'fred', age: 48 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 34 },
      { user: 'barney', age: 36 },
    ]);
  });

  it('should order objects by multiple properties', () => {
    const users = [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 34 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 36 },
    ];

    const result = orderBy(users, ['user', 'age'], ['asc', 'desc']);

    expect(result).toEqual([
      { user: 'barney', age: 36 },
      { user: 'barney', age: 34 },
      { user: 'fred', age: 48 },
      { user: 'fred', age: 40 },
    ]);
  });

  it('should extend orders if orders length is less than keys length', () => {
    const users = [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 34 },
    ];

    const result = orderBy(users, ['user', 'age'], ['asc']);

    expect(result).toEqual([
      { user: 'barney', age: 34 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
      { user: 'fred', age: 48 },
    ]);
  });

  it('should order object has mixed value that is string and number', () => {
    const actual1 = orderBy(
      [
        { id: 1, value: 'a' },
        { id: 2, value: 2 },
        { id: 12, value: 1 },
        { id: 5, value: 'b' },
        { id: 4, value: 2 },
        { id: 43, value: 'c' },
        { id: 24, value: 3 },
        { id: 3, value: '3a' },
        { id: 6, value: '2a' },
        { id: 7, value: '1cs' },
      ],
      ['value', 'id'],
      ['asc', 'asc']
    );
    const expected1 = [
      { id: 12, value: 1 },
      { id: 7, value: '1cs' },
      { id: 2, value: 2 },
      { id: 4, value: 2 },
      { id: 6, value: '2a' },
      { id: 24, value: 3 },
      { id: 3, value: '3a' },
      { id: 1, value: 'a' },
      { id: 5, value: 'b' },
      { id: 43, value: 'c' },
    ];

    const actual2 = orderBy(
      [
        { id: 1, value: 'apple' },
        { id: 2, value: 'banana' },
        { id: 3, value: 'cherry' },
        { id: 4, value: 10 },
        { id: 5, value: 5 },
        { id: 6, value: 'banana' },
        { id: 7, value: 20 },
      ],
      ['value', 'id'],
      ['asc', 'asc']
    );
    const expected2 = [
      { id: 5, value: 5 },
      { id: 4, value: 10 },
      { id: 7, value: 20 },
      { id: 1, value: 'apple' },
      { id: 2, value: 'banana' },
      { id: 6, value: 'banana' },
      { id: 3, value: 'cherry' },
    ];

    expect(actual1).toEqual(expected1);
    expect(actual2).toEqual(expected2);
  });
});
