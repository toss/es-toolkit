import { describe, expect, it } from 'vitest';
import { minBy } from './minBy';

type Person = { name: string; age: number };

describe('minBy', () => {
  it('(non-curried) should select one min value in array', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
      { name: 'Overmars', age: 35 },
    ];
    const result = minBy(people, person => person.age);
    expect(result).toEqual({ name: 'Nunu', age: 20 });
  });

  it('(curried) should select one min value in array', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
      { name: 'Overmars', age: 35 },
    ];
    const result = minBy<Person[]>(person => person.age)(people);
    expect(result).toEqual({ name: 'Nunu', age: 20 });
  });

  it('(non-curried) if there are two min values, first one is selected', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
      { name: 'Overmars', age: 20 },
    ];
    const result = minBy(people, person => person.age);
    expect(result).toEqual({ name: 'Nunu', age: 20 });
  });

  it('(curried) if there are two min values, first one is selected', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
      { name: 'Overmars', age: 20 },
    ];
    const result = minBy<Person[]>(person => person.age)(people);
    expect(result).toEqual({ name: 'Nunu', age: 20 });
  });

  it('(non-curried) if array is single-element, return unique element of array', () => {
    const people = [{ name: 'Mark', age: 25 }];
    const result = minBy(people, person => person.age);
    expect(result).toEqual({ name: 'Mark', age: 25 });
  });

  it('(curried) if array is single-element, return unique element of array', () => {
    const people = [{ name: 'Mark', age: 25 }];
    const result = minBy<Person[]>(person => person.age)(people);
    expect(result).toEqual({ name: 'Mark', age: 25 });
  });

  it('(non-curried) if array is empty, return undefined', () => {
    const people: Person[] = [];
    const result = minBy<Person[]>(person => person.age)(people);
    expect(result).toBeUndefined();
  });

  it('(curried) if array is empty, return undefined', () => {
    const people: Person[] = [];
    const result = minBy<Person[]>(person => person.age)(people);
    expect(result).toBeUndefined();
  });

  it('(non-curried) should not modify original array', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
    ];
    const original = [...people];
    minBy(people, person => person.age);
    expect(people).toEqual(original);
  });

  it('(curried) should not modify original array', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
    ];
    const original = [...people];
    minBy<Person[]>(person => person.age)(people);
    expect(people).toEqual(original);
  });
});
