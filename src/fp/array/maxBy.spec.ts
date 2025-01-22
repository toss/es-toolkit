import { describe, expect, it } from 'vitest';
import { maxBy } from './maxBy';

describe('maxBy', () => {
  it("(non-curried) maxBy selects one max value in array", () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 20 },
    ];
    const result = maxBy(people, person => person.age);
    expect(result).toEqual({ name: 'Nunu', age: 30 });
  });

  it("(curried) maxBy selects one max value in array", () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 20 },
    ];
    const result = maxBy(person => person.age)(people);
    expect(result).toEqual({ name: 'Nunu', age: 30 });
  });

  it(
    "(non-curried) if there are two max values, first one is selected",
    () => {
      const people = [
        { name: 'Mark', age: 25 },
        { name: 'Nunu', age: 30 },
        { name: 'Overmars', age: 30 },
      ];
      const result = maxBy(people, person => person.age);
      expect(result).toEqual({ name: 'Nunu', age: 30 });
    }
  );

  it("(curried) if there are two max values, first one is selected", () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 30 },
    ];
    const result = maxBy(person => person.age)(people);
    expect(result).toEqual({ name: 'Nunu', age: 30 });
  });

  it(
    "(non-curried) if array is single-element, return unique element of array",
    () => {
      const people = [{ name: 'Mark', age: 25 }];
      const result = maxBy(people, person => person.age);
      expect(result).toEqual({ name: 'Mark', age: 25 });
    }
  );

  it("(curried) if array is single-element, return unique element of array", () => {
    const people = [{ name: 'Mark', age: 25 }];
    const result = maxBy(person => person.age)(people);
    expect(result).toEqual({ name: 'Mark', age: 25 });
  });

  it("(non-curried) if array is empty, return undefined", () => {
    type Person = { name: string; age: number };
    const people: Person[] = [];
    const result = maxBy(people, person => person.age);
    expect(result).toBeUndefined();
  });

  it("(curried) if array is empty, return undefined", () => {
    type Person = { name: string; age: number };
    const people: Person[] = [];
    const result = maxBy(person => person.age)(people);
    expect(result).toBeUndefined();
  });
});
