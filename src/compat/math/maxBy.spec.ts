import { describe, expect, it } from 'vitest';
import { maxBy } from './maxBy';

describe('maxBy', () => {
  it('maxBy selects one max value in array', () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 20 },
    ];
    const result = maxBy(people, person => person.age);
    expect(result).toEqual({ name: 'Nunu', age: 30 });
  });

  it('if there are two max values, first one is selected', () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 30 },
    ];
    const result = maxBy(people, person => person.age);
    expect(result).toEqual({ name: 'Nunu', age: 30 });
  });

  it('if array is single-element, return unique element of array', () => {
    const people = [{ name: 'Mark', age: 25 }];
    const result = maxBy(people, person => person.age);
    expect(result).toEqual({ name: 'Mark', age: 25 });
  });

  it('if array is empty, return undefined', () => {
    type Person = { name: string; age: number };
    const people: Person[] = [];
    const result = maxBy(people, person => person.age);
    expect(result).toBeUndefined();
  });

  it('supports iteratee as a string', () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 20 },
    ];
    expect(maxBy(people, 'age')).toEqual({ name: 'Nunu', age: 30 });
  });

  it('supports iteratee as an object matcher', () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 20 },
    ];
    expect(maxBy(people, { age: 30 })).toEqual({ name: 'Nunu', age: 30 });
  });

  it('supports iteratee as a key-value pair', () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 20 },
    ];
    expect(maxBy(people, ['age', 30])).toEqual({ name: 'Nunu', age: 30 });
  });

  it('works with an array of numbers', () => {
    const numbers = [1, 2, 3, 10, 4, 5];
    expect(maxBy(numbers, x => x)).toBe(10);
  });

  it('works with an array of negative numbers', () => {
    const numbers = [-10, -5, -20, -1];
    expect(maxBy(numbers, x => x)).toBe(-1);
  });

  it('works with an array containing Infinity and NaN', () => {
    const numbers = [5, Infinity, 10, NaN, 7];
    expect(maxBy(numbers, x => x)).toBe(Infinity);
  });

  it('ignores undefined values in objects', () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: undefined },
      { name: 'Overmars', age: 30 },
    ];
    expect(maxBy(people, 'age')).toEqual({ name: 'Overmars', age: 30 });
  });

  it('returns undefined if all values are undefined', () => {
    const people = [
      { name: 'Mark', age: undefined },
      { name: 'Nunu', age: undefined },
    ];
    expect(maxBy(people, 'age')).toBeUndefined();
  });

  it('works with objects missing the iteratee property', () => {
    const data = [{ name: 'Mark', age: 25 }, { name: 'Nunu' }, { name: 'Overmars', age: 30 }];
    expect(maxBy(data, 'age')).toEqual({ name: 'Overmars', age: 30 });
  });

  it('returns the first element if all values are equal', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 30 },
    ];
    expect(maxBy(people, 'age')).toEqual({ name: 'Mark', age: 30 });
  });

  it('returns the correct object when comparing floating-point numbers', () => {
    const items = [
      { name: 'Mark', score: 3.1 },
      { name: 'Nunu', score: 2.7 },
      { name: 'Overmars', score: 1.6 },
    ];
    expect(maxBy(items, 'score')).toEqual({ name: 'Mark', score: 3.1 });
  });

  it('returns undefined if all values are NaN', () => {
    const items = [NaN, NaN, NaN];
    expect(maxBy(items, x => x)).toBeUndefined();
  });
});
