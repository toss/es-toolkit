import { describe, expect, expectTypeOf, it } from 'vitest';
import { repeat } from 'es-toolkit/compat';
import type { repeat as repeatLodash } from 'lodash';

describe('padStart', () => {
  it('repeat abc 0', () => {
    expect(repeat('abc', 0)).toBe('');
  });

  it('repeat abc 3', () => {
    expect(repeat('abc', 3)).toBe('abcabcabc');
  });

  it('should be used as a iteratee', () => {
    const array = ['a', 'b', 'c'];
    const actual = array.map(repeat);
    expect(actual).toEqual(['a', 'b', 'c']);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(repeat).toEqualTypeOf<typeof repeatLodash>();
  });
});
