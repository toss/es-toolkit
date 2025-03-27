import { describe, expect, it } from 'vitest';
import { orderBy } from './orderBy';

describe('orderBy', () => {
  const users = [
    { user: 'fred', age: 48 },
    { user: 'barney', age: 34 },
    { user: 'fred', age: 40 },
    { user: 'barney', age: 36 },
  ];

  const users1 = ['Tom', 'Jason', 'Paul', 'Andy'];
  const usersIds = [1, 2, 3, 4];

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

  it('should order strings by customized functions', () => {
    const order: { [key: string]: number } = {
      Tom: 5,
      Jason: 3,
      Paul: 1,
      Andy: 2,
    };

    expect(orderBy(users1, [obj => order[obj]], ['asc'])).toEqual(['Paul', 'Andy', 'Jason', 'Tom']);
  });

  it('should order numbers by customized functions', () => {
    const order: { [key: string]: number } = {
      1: 5,
      2: 3,
      3: 1,
      4: 2,
    };

    expect(orderBy(usersIds, [obj => order[obj]], ['asc'])).toEqual([3, 4, 2, 1]);
  });
});
