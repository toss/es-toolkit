import { describe, expect, it } from 'vitest';
import { filter } from './filter';

function isEven(n: number) {
  return n % 2 === 0;
}

describe('filter', () => {
  it('It should return an empty array when no predicate is provided.', () => {
    const arr = [1, 2, 3];

    expect(filter(arr)).toEqual([1, 2, 3]);
  });

  it('should return an array of elements from the array', () => {
    const arr = [1, 2, 3];

    expect(filter(arr, isEven)).toEqual([2]);
  });

  it(`filter should work with \`matches\` shorthands`, () => {
    const arr = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    expect(filter(arr, { name: 'Bob' })).toEqual([{ id: 2, name: 'Bob' }]);
  });

  it(`filter should work with \`matchesProperty\` shorthands`, () => {
    const arr = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];

    expect(filter(arr, ['name', 'Alice'])).toEqual([{ id: 1, name: 'Alice' }]);

    const users = [
      { user: 'barney', age: 36, active: true },
      { user: 'fred', age: 40, active: false },
    ];

    expect(filter(users, ['active', false])).toEqual([{ user: 'fred', age: 40, active: false }]);
  });

  it(`filter should work with \`property\` shorthands`, () => {
    const arr = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, age: 28 },
    ];

    expect(filter(arr, 'name')).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });

  it(`should return an array of elements from the object`, () => {
    const obj: { [key: string]: number } = {
      a: 1,
      b: 2,
      c: 3,
    };

    expect(filter(obj, (value, key) => value >= 2 && key === 'b')).toEqual([2]);
  });

  it(`filter should work with \`matches\` shorthands for objects.`, () => {
    const obj = {
      item1: { a: 0 },
      item2: { a: 1 },
      item3: { a: 2 },
    };

    expect(filter(obj, { a: 1 })).toEqual([{ a: 1 }]);
  });

  it(`filter should work with \`matches\` shorthands for nested objects.`, () => {
    const obj = {
      item1: { a: 0, b: { c: 1 } },
      item2: { a: 1, b: { c: 2 } },
      item3: { a: 0, b: { c: 1 } },
    };

    expect(filter(obj, { b: { c: 1 } })).toEqual([
      { a: 0, b: { c: 1 } },
      { a: 0, b: { c: 1 } },
    ]);
  });

  it(`filter should work when looking for values inside nested objects`, () => {
    const obj: Record<string, unknown> = {
      item1: { a: 0, b: { c: 1 } },
      item2: { a: 1, b: { c: 2 } },
      item3: { a: 0, b: { c: 1 } },
    };

    expect(filter(obj, ['b.c', 2])).toEqual([{ a: 1, b: { c: 2 } }]);
  });

  it('filter should match nested object properties using key-value pair shorthand.', () => {
    const obj: { [key: string]: { [key: string]: unknown } } = {
      alice: { id: 1, name: 'Alice' },
      bob: { id: 2, name: 'Bob' },
    };

    expect(filter(obj, ['name', 'Alice'])).toEqual([{ id: 1, name: 'Alice' }]);
  });

  it('filter should return objects that have the specified key.', () => {
    const obj: { [key: string]: { [key: string]: unknown } } = {
      a: { id: 1, name: 'Alice' },
      b: { id: 2, name: 'Bob' },
      c: { id: 3, age: 28 },
    };

    expect(filter(obj, 'name')).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });
});
