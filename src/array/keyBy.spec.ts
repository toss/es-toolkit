import { describe, expect, it } from 'vitest';
import { keyBy } from './keyBy';

describe('keyBy', () => {
  it('should return the mapped object by given key', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'jake', age: 30 },
    ];

    const result = keyBy(people, person => person.age.toString());
    expect(result).toEqual({ 20: { name: 'mike', age: 20 }, 30: { name: 'jake', age: 30 } });

    const result2 = keyBy(people, person => person.name);
    expect(result2).toEqual({ mike: { name: 'mike', age: 20 }, jake: { name: 'jake', age: 30 } });
  });

  it('should overwrite the value when encountering the same key', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'mike', age: 30 },
    ];

    const result = keyBy(people, person => person.name);

    expect(result).toEqual({ mike: { name: 'mike', age: 30 } });
  });

  it('should handle empty array', () => {
    const people: Array<{ name: string; age: number }> = [];

    const result = keyBy(people, person => person.name);

    expect(result).toEqual({});
  });
});
