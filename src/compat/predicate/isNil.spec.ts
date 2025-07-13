import { describe, expect, expectTypeOf, it } from 'vitest';
import { isNil } from 'es-toolkit/compat';
import type { isNil as isNilLodash } from 'lodash';
import { args } from '../_internal/args.ts';
import { falsey } from '../_internal/falsey.ts';

/**
 * @see https://github.com/lodash/lodash/blob/main/test/isNil.spec.js
 */

describe('isNil', () => {
  it('should return `true` for nullish values', () => {
    expect(isNil(null)).toBe(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(isNil()).toBe(true);
    expect(isNil(undefined)).toBe(true);
  });

  it('should return `false` for non-nullish values', () => {
    const symbol = Symbol ? Symbol('a') : undefined;
    const slice = Array.prototype.slice;

    const expected = falsey.map(value => value == null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const actual = falsey.map((value, index) => (index ? isNil(value) : isNil()));

    expect(actual).toEqual(expected);

    expect(isNil(args)).toBe(false);
    expect(isNil([1, 2, 3])).toBe(false);
    expect(isNil(true)).toBe(false);
    expect(isNil(new Date())).toBe(false);
    expect(isNil(new Error())).toBe(false);
    expect(isNil(slice)).toBe(false);
    expect(isNil({ a: 1 })).toBe(false);
    expect(isNil(1)).toBe(false);
    expect(isNil(/x/)).toBe(false);
    expect(isNil('a')).toBe(false);
    expect(isNil(symbol)).toBe(false);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isNil).toEqualTypeOf<typeof isNilLodash>();
  });
});
