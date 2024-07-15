import { describe, expect, it } from 'vitest';
import { sumBy } from './sumBy.ts';

describe('sumBy function', () => {
  it('calculates the sum of values extracted from objects', () => {
    const result = sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a);
    expect(result).toBe(6);
  });

  it('returns 0 for empty arrays', () => {
    type Person = { name: string; age: number };
    const people: Person[] = [];

    expect(sumBy(people, x => x.age)).toEqual(0);
  });
});
