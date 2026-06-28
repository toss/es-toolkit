import { describe, expect, it } from 'vitest';
import { sortBy } from './sortBy.ts';
import { pipe } from '../pipe.ts';

interface User {
  user: string;
  age: number;
}

const users: User[] = [
  { user: 'foo', age: 24 },
  { user: 'bar', age: 7 },
  { user: 'foo', age: 8 },
  { user: 'bar', age: 29 },
];

describe('sortBy', () => {
  it('sorts by a single key in ascending order', () => {
    expect(pipe(users, sortBy(['age']))).toEqual([
      { user: 'bar', age: 7 },
      { user: 'foo', age: 8 },
      { user: 'foo', age: 24 },
      { user: 'bar', age: 29 },
    ]);
  });

  it('sorts by multiple criteria, breaking ties with later ones', () => {
    expect(pipe(users, sortBy(['user', 'age']))).toEqual([
      { user: 'bar', age: 7 },
      { user: 'bar', age: 29 },
      { user: 'foo', age: 8 },
      { user: 'foo', age: 24 },
    ]);
  });

  it('accepts selector functions as criteria', () => {
    expect(pipe(users, sortBy([(item: User) => item.age]))).toEqual([
      { user: 'bar', age: 7 },
      { user: 'foo', age: 8 },
      { user: 'foo', age: 24 },
      { user: 'bar', age: 29 },
    ]);
  });

  it('does not mutate the input array', () => {
    const input = [...users];
    pipe(input, sortBy(['age']));
    expect(input).toEqual(users);
  });
});
