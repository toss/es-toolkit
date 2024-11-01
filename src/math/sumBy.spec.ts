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

  it('ensures that adding the sums of two arrays equals the sum of their concatenation.', () => {
    const array1: { a: number }[] = [];
    const array2 = [{ a: 1 }, { a: 2 }, { a: 3 }];

    expect(sumBy(array1, x => x.a) + sumBy(array2, x => x.a)).toBe(sumBy([...array1, ...array2], x => x.a));
  });
});
