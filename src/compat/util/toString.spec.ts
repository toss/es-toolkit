import { describe, expect, expectTypeOf, it } from 'vitest';
import type { toString as toStringLodash } from 'lodash';
import { stubString } from './stubString';
import { toString } from './toString';
import { symbol } from '../_internal/symbol';

describe('toString', () => {
  it('should treat nullish values as empty strings', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(stubString);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const actual = values.map((value, index) => (index ? toString(value) : toString()));

    expect(actual).toEqual(expected);
  });

  it('should preserve the sign of `0`', () => {
    const values = [-0, Object(-0), 0, Object(0)];
    const expected = ['-0', '-0', '0', '0'];
    const actual = values.map(toString);

    expect(actual).toEqual(expected);
  });

  it('should preserve the sign of `0` in an array', () => {
    const values = [-0, Object(-0), 0, Object(0)];
    expect(toString(values)).toEqual('-0,-0,0,0');
  });

  it('should handle symbols', () => {
    expect(toString(symbol)).toBe('Symbol(a)');
  });

  it('should handle an array of symbols', () => {
    expect(toString([symbol])).toBe('Symbol(a)');
  });

  it('should match the type of lodash', () => {
    expectTypeOf(toString).toEqualTypeOf<typeof toStringLodash>();
  });
});
