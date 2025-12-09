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

  it('should sort strings with criteria', () => {
    const strings = ['banana', 'apple', 'cherry'];
    expect(sortBy(strings, [x => x])).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should sort numbers with criteria', () => {
    const numbers = [3, 1, 4, 1, 5];
    expect(sortBy(numbers, [x => x])).toEqual([1, 1, 3, 4, 5]);
  });

  it('should sort strings by length', () => {
    const strings = ['apple', 'banana', 'cherry'];
    expect(sortBy(strings, [x => x.length, x => x])).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should sort strings without criteria', () => {
    const strings = ['banana', 'apple', 'cherry'];
    expect(sortBy(strings)).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should sort numbers without criteria', () => {
    const numbers = [3, 1, 4, 1, 5];
    expect(sortBy(numbers)).toEqual([1, 1, 3, 4, 5]);
  });

  it('should sort strings with empty criteria array', () => {
    const strings = ['banana', 'apple', 'cherry'];
    expect(sortBy(strings, [])).toEqual(['apple', 'banana', 'cherry']);
  });
});
