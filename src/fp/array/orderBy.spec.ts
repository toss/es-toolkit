import { describe, expect, it } from 'vitest';
import { orderBy } from './orderBy';

type User = { name: string; age: number };

describe('orderBy', () => {
  it('(non-curried) should sort by single property ascending', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: 34 },
      { name: 'fred', age: 40 },
    ];
    const result = orderBy(users, [user => user.age], ['asc']);
    expect(result).toEqual([
      { name: 'barney', age: 34 },
      { name: 'fred', age: 40 },
      { name: 'fred', age: 48 },
    ]);
  });

  it('(curried) should sort by single property ascending', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: 34 },
      { name: 'fred', age: 40 },
    ];
    const result = orderBy<User[], number | string>([user => user.age], ['asc'])(users);
    expect(result).toEqual([
      { name: 'barney', age: 34 },
      { name: 'fred', age: 40 },
      { name: 'fred', age: 48 },
    ]);
  });

  it('(non-curried) should sort by multiple properties with different orders', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: 34 },
      { name: 'fred', age: 40 },
    ];
    const result = orderBy(
      users,
      [user => user.name, user => user.age],
      ['asc', 'desc']
    );
    expect(result).toEqual([
      { name: 'barney', age: 34 },
      { name: 'fred', age: 48 },
      { name: 'fred', age: 40 },
    ]);
  });

  it('(curried) should sort by multiple properties with different orders', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: 34 },
      { name: 'fred', age: 40 },
    ];
    const result = orderBy<User[], number | string>(
      [user => user.name, user => user.age],
      ['asc', 'desc']
    )(users);
    expect(result).toEqual([
      { name: 'barney', age: 34 },
      { name: 'fred', age: 48 },
      { name: 'fred', age: 40 },
    ]);
  });

  it('(non-curried) should handle empty array', () => {
    const users: User[] = [];
    const result = orderBy(users, [user => user.age], ['asc']);
    expect(result).toEqual([]);
  });

  it('(curried) should handle empty array', () => {
    const users: User[] = [];
    const result = orderBy<User[], number>([user => user.age], ['asc'])(users);
    expect(result).toEqual([]);
  });

  it('(non-curried) should not modify original array', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: 34 },
    ];
    const original = [...users];
    orderBy(users, [user => user.age], ['asc']);
    expect(users).toEqual(original);
  });

  it('(curried) should not modify original array', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: 34 },
    ];
    const original = [...users];
    orderBy<User[], number>([user => user.age], ['asc'])(users);
    expect(users).toEqual(original);
  });
});
