import { describe, expect, it } from 'vitest';
import { isTypedArray } from './isTypedArray';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { stubFalse } from '../_internal/stubFalse';
import { typedArrays } from '../_internal/typedArrays';

/**
 * @see https://github.com/lodash/lodash/blob/main/test/isTypedArray.spec.js
 */
describe('isTypedArray', () => {
  it('should return `true` for typed arrays', () => {
    const actual = typedArrays.map(type => {
      const Ctor = (globalThis as any)[type];
      return Ctor ? isTypedArray(new Ctor(new ArrayBuffer(8))) : false;
    });

    expect(actual).toEqual([true, true, true, true, true, true, true, true, true]);
  });

  it('should return `false` for non typed arrays', () => {
    const expected = falsey.map(stubFalse);

    const actual = falsey.map((value, index) => (index ? isTypedArray(value) : isTypedArray()));

    expect(actual).toEqual(expected);

    expect(isTypedArray(args)).toBe(false);
    expect(isTypedArray([1, 2, 3])).toBe(false);
    expect(isTypedArray(true)).toBe(false);
    expect(isTypedArray(new Date())).toBe(false);
    expect(isTypedArray(new Error())).toBe(false);
    expect(isTypedArray(Array.prototype.slice)).toBe(false);
    expect(isTypedArray({ a: 1 })).toBe(false);
    expect(isTypedArray(1)).toBe(false);
    expect(isTypedArray(/x/)).toBe(false);
    expect(isTypedArray('a')).toBe(false);
    expect(isTypedArray(Symbol('a'))).toBe(false);
  });
});
