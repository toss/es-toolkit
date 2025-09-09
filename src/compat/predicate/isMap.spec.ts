import { describe, expect, expectTypeOf, it } from 'vitest';
import type { isMap as isMapLodash } from 'lodash';
import { isMap } from './isMap';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';
import { symbol } from '../_internal/symbol';
import { weakMap } from '../_internal/weakMap';
import { stubFalse } from '../util/stubFalse';

describe('isMap', () => {
  it('should return `true` for maps', () => {
    expect(isMap(new Map())).toBe(true);
  });

  it('returns false if the value is not a Map', () => {
    const expected = falsey.map(() => stubFalse());

    const actual = falsey.map((value, index) => (index ? isMap(value) : isMap()));

    expect(actual).toEqual(expected);

    expect(isMap(args)).toBe(false);
    expect(isMap([1, 2, 3])).toBe(false);
    expect(isMap(true)).toBe(false);
    expect(isMap(new Date())).toBe(false);
    expect(isMap(new Error())).toBe(false);
    expect(isMap(slice)).toBe(false);
    expect(isMap({ a: 1 })).toBe(false);
    expect(isMap(1)).toBe(false);
    expect(isMap(/x/)).toBe(false);
    expect(isMap('a')).toBe(false);
    expect(isMap(symbol)).toBe(false);
    expect(isMap(weakMap)).toBe(false);
  });

  it('should work for objects with a non-function `constructor` (test in IE 11)', () => {
    const expected = falsey.map(() => stubFalse());

    const actual = falsey.map(value => isMap({ constructor: value }));

    expect(actual).toEqual(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isMap).toEqualTypeOf<typeof isMapLodash>();
  });
});
