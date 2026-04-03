import { describe, expect, it } from 'vitest';
import { medianBy } from './medianBy';

describe('medianBy', () => {
  it('calculates the median of values extracted from objects with odd number of elements', () => {
    const result = medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], x => x.a);
    expect(result).toEqual(3);
  });

  it('calculates the median of values extracted from objects with even number of elements', () => {
    const result = medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }], x => x.a);
    expect(result).toEqual(2.5);
  });

  it('returns the correct median for unsorted values', () => {
    const result = medianBy([{ a: 5 }, { a: 2 }, { a: 1 }, { a: 4 }, { a: 3 }], x => x.a);
    expect(result).toEqual(3);
  });

  it('returns NaN for empty arrays', () => {
    type Person = { name: string; age: number };
    const people: Person[] = [];
    expect(medianBy(people, x => x.age)).toEqual(NaN);
  });

  it('returns the single element for arrays with one element', () => {
    expect(medianBy([{ a: 42 }], x => x.a)).toEqual(42);
  });

  it('calculates the median of bigint values extracted from objects with odd number of elements', () => {
    const result = medianBy([{ a: 1n }, { a: 2n }, { a: 3n }, { a: 4n }, { a: 5n }], x => x.a);
    expect(result).toEqual(3n);
  });

  it('calculates the median of bigint values extracted from objects with even number of elements', () => {
    const result = medianBy([{ a: 1n }, { a: 2n }, { a: 3n }, { a: 4n }], x => x.a);
    expect(result).toEqual(2n);
  });

  it('returns NaN for empty bigint arrays', () => {
    type Item = { a: bigint };
    const items: Item[] = [];
    expect(medianBy(items, x => x.a)).toEqual(NaN);
  });
});
