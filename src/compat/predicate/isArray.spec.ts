import { describe, expect, expectTypeOf, it } from 'vitest';
import { isArray } from '../compat/predicate/isArray';

describe('isArray', function () {
  it('returns true if value is an array', () => {
    expect(isArray([])).toBe(true);
  });

  it('returns false if value is not an array', () => {
    expect(isArray('abc')).toBe(false);
    expect(isArray(() => {})).toBe(false);
  });

  it('can be used with TypeScript as a type predicate', () => {
    const arr1 = ['abc', () => {}, [1, 2, 3]];
    const result1 = arr1.filter(isArray);
    expect(result1).toStrictEqual([[1, 2, 3]]);
    expectTypeOf(result1).toEqualTypeOf<number[][]>();

    const arr2 = ['abc', () => {}, [1, 2, 3] as const];
    const result2 = arr2.filter(isArray);
    expect(result2).toStrictEqual([[1, 2, 3]]);
    expectTypeOf(result2).toEqualTypeOf<Array<readonly [1, 2, 3]>>();
  });
});
