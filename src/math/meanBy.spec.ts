import { describe, expect, it } from 'vitest';
import { meanBy } from './meanBy';

describe('meanBy', () => {
  it('calculates the mean of values extracted from objects', () => {
    const result = meanBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a);

    expect(result).toEqual(2);
  });

  it('returns NaN for empty arrays', () => {
    type Person = { name: string; age: number };
    const people: Person[] = [];

    expect(meanBy(people, x => x.age)).toEqual(NaN);
  });
});
