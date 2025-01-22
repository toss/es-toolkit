import { describe, expect, it } from 'vitest';
import { sortBy } from './sortBy';

type User = {
  user: string;
  age: number;
};

describe('sortBy', () => {
  const users: User[] = [
    { user: 'foo', age: 24 },
    { user: 'bar', age: 7 },
    { user: 'foo', age: 8 },
    { user: 'bar', age: 29 },
  ];

  it(
    "(non-curried) should stable sort objects by a single property in ascending order",
    () => {
      expect(sortBy(users, ['user'])).toEqual([
        { user: 'bar', age: 7 },
        { user: 'bar', age: 29 },
        { user: 'foo', age: 24 },
        { user: 'foo', age: 8 },
      ]);
    }
  );

  it("(curried) should stable sort objects by a single property in ascending order", () => {
    expect(sortBy(['user'])(users)).toEqual([
      { user: 'bar', age: 7 },
      { user: 'bar', age: 29 },
      { user: 'foo', age: 24 },
      { user: 'foo', age: 8 },
    ]);
  });

  it("(non-curried) should stable sort objects by multiple properties", () => {
    expect(sortBy(users, ['user', 'age'])).toEqual([
      { user: 'bar', age: 7 },
      { user: 'bar', age: 29 },
      { user: 'foo', age: 8 },
      { user: 'foo', age: 24 },
    ]);
  });

  it("(curried) should stable sort objects by multiple properties", () => {
    expect(sortBy(['user', 'age'])(users)).toEqual([
      { user: 'bar', age: 7 },
      { user: 'bar', age: 29 },
      { user: 'foo', age: 8 },
      { user: 'foo', age: 24 },
    ]);
  });

  it("(non-curried) should stable sort objects by iteratee function", () => {
    expect(sortBy(users, [user => user.user])).toEqual([
      { user: 'bar', age: 7 },
      { user: 'bar', age: 29 },
      { user: 'foo', age: 24 },
      { user: 'foo', age: 8 },
    ]);
  });

  it("(curried) should stable sort objects by iteratee function", () => {
    expect(sortBy<User>([user => user.user])(users)).toEqual([
      { user: 'bar', age: 7 },
      { user: 'bar', age: 29 },
      { user: 'foo', age: 24 },
      { user: 'foo', age: 8 },
    ]);
  });

  it(
    "(non-curried) should stable sort objects by iteratee function and property",
    () => {
      expect(sortBy(users, [user => user.user, user => user.age])).toEqual([
        { user: 'bar', age: 7 },
        { user: 'bar', age: 29 },
        { user: 'foo', age: 8 },
        { user: 'foo', age: 24 },
      ]);
    }
  );

  it("(curried) should stable sort objects by iteratee function and property", () => {
    expect(sortBy<User>([user => user.user, user => user.age])(users)).toEqual([
      { user: 'bar', age: 7 },
      { user: 'bar', age: 29 },
      { user: 'foo', age: 8 },
      { user: 'foo', age: 24 },
    ]);
  });

  it(
    "(non-curried) should stable sort objects by mixed iteratee function and key",
    () => {
      expect(sortBy(users, ['user', user => user.age])).toEqual([
        { user: 'bar', age: 7 },
        { user: 'bar', age: 29 },
        { user: 'foo', age: 8 },
        { user: 'foo', age: 24 },
      ]);
    }
  );

  it("(curried) should stable sort objects by mixed iteratee function and key", () => {
    expect(sortBy<User>(['user', user => user.age])(users)).toEqual([
      { user: 'bar', age: 7 },
      { user: 'bar', age: 29 },
      { user: 'foo', age: 8 },
      { user: 'foo', age: 24 },
    ]);
  });
});
