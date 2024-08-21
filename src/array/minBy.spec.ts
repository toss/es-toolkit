import { describe, expect, it } from 'vitest';
import { minBy } from './minBy';

describe('minBy', () => {
  it('minBy selects one min value in array', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
      { name: 'Overmars', age: 35 },
    ] as const;
    const result = minBy<{ name: string; age: number }>(people, person => person.age);
    expect(result).toEqual({ name: 'Nunu', age: 20 });
  });

  it('if there are two min values, first one is selected', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
      { name: 'Overmars', age: 20 },
    ] as const;
    const result = minBy<{ name: string; age: number }>(people, person => person.age);
    expect(result).toEqual({ name: 'Nunu', age: 20 });
  });

  it('if array is single-element, return unique element of array', () => {
    const people = [{ name: 'Mark', age: 25 }] as const;
    const result = minBy(people, person => person.age);
    expect(result).toEqual({ name: 'Mark', age: 25 });
  });
});
