import { describe, expect, expectTypeOf, it } from 'vitest';
import { min } from 'es-toolkit/compat';
import type { min as minLodash } from 'lodash';

describe('min', () => {
  it('should return the largest value from a collection', () => {
    expect(min([1, 2, 3])).toBe(1);
  });

  it('should return `undefined` for empty collections', () => {
    expect(min([])).toBe(undefined);
    // eslint-disable-next-line
    // @ts-ignore
    expect(min()).toBe(undefined);
  });

  it('should work with non-numeric collection values', () => {
    expect(min(['a', 'b'])).toBe('a');
  });

  it('should work with Date objects', () => {
    const curr = new Date();
    const past = new Date(0);

    expect(min([curr, past])).toBe(past);
  });

  it('should work with extremely large arrays', () => {
    const array = Array.from({ length: 5e5 }, (_, i) => i);
    expect(min(array)).toBe(0);
  });

  it('should work when chaining on an array with only one value', () => {
    const array = [40];
    expect(min(array)).toBe(40);
  });

  it('should skip NaN values', () => {
    expect(min([1, NaN, 2])).toBe(1);
    expect(min([NaN, 1, 2])).toBe(1);
  });

  it('should skip symbol values', () => {
    expect(min([1, Symbol('a'), 2])).toBe(1);
    expect(min([Symbol('a'), 1, 2])).toBe(1);
    expect(min([Symbol('a'), Symbol('b'), 1])).toBe(1);
  });

  it('should skip null values', () => {
    expect(min([1, null, 2])).toBe(1);
    expect(min([null, 1, 2])).toBe(1);
  });

  it('should return undefined when skipping all values', () => {
    expect(min([Symbol('a'), null, NaN])).toBe(undefined);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(min).toEqualTypeOf<typeof minLodash>();
  });
});
