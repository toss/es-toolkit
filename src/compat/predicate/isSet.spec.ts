import { describe, expect, it } from 'vitest';
import { isSet } from './isSet';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';
import { symbol } from '../_internal/symbol';
import { weakSet } from '../_internal/weakSet';
import { stubFalse } from '../util/stubFalse';

describe('isSet', () => {
  it('should return `true` for sets', () => {
    expect(isSet(new Set())).toBe(true);
  });

  it('should return `false` for non-sets', () => {
    const expected = falsey.map(() => stubFalse());

    const actual = falsey.map((value, index) => (index ? isSet(value) : isSet()));

    expect(actual).toEqual(expected);

    expect(isSet(args)).toBe(false);
    expect(isSet([1, 2, 3])).toBe(false);
    expect(isSet(true)).toBe(false);
    expect(isSet(new Date())).toBe(false);
    expect(isSet(new Error())).toBe(false);
    expect(isSet(slice)).toBe(false);
    expect(isSet({ a: 1 })).toBe(false);
    expect(isSet(1)).toBe(false);
    expect(isSet(/x/)).toBe(false);
    expect(isSet('a')).toBe(false);
    expect(isSet(symbol)).toBe(false);
    expect(isSet(weakSet)).toBe(false);
  });

  it('should work for objects with a non-function `constructor` (test in IE 11)', () => {
    const expected = falsey.map(() => stubFalse());

    const actual = falsey.map(value => isSet({ constructor: value }));

    expect(actual).toEqual(expected);
  });
});
