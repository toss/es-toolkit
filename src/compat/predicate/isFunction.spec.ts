import { describe, expect, it } from 'vitest';
import { isFunction } from '../../predicate/isFunction';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';

describe('isFunction', () => {
  it('should return `true` for functions', () => {
    const slice = Array.prototype.slice;
    expect(isFunction(slice)).toBe(true);
  });

  it('should return `true` for async functions', () => {
    const asyncFunc = async function () {};
    expect(isFunction(asyncFunc)).toBe(typeof asyncFunc === 'function');
  });

  it('should return `true` for generator functions', () => {
    const genFunc = function* () {};
    expect(isFunction(genFunc)).toBe(typeof genFunc === 'function');
  });

  it('should return `true` for the `Proxy` constructor', () => {
    if (Proxy) {
      expect(isFunction(Proxy)).toBe(true);
    }
  });

  it('should return `true` for array view constructors', () => {
    const arrayViews = [
      Int8Array,
      Uint8Array,
      Uint8ClampedArray,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float32Array,
      Float64Array,
      DataView,
    ];
    const funcTag = '[object Function]';

    const expected = arrayViews.map(type => Object.prototype.toString.call(type) === funcTag);
    const actual = arrayViews.map(isFunction);

    expect(actual).toEqual(expected);
  });

  it('should return `false` for non-functions', () => {
    const expected = falsey.map(() => false);

    const actual = falsey.map(isFunction);

    expect(actual).toEqual(expected);

    expect(isFunction(args)).toBe(false);
    expect(isFunction([1, 2, 3])).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction(new Date())).toBe(false);
    expect(isFunction(new Error())).toBe(false);
    expect(isFunction({ a: 1 })).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction(/x/)).toBe(false);
    expect(isFunction('a')).toBe(false);
    expect(isFunction(Symbol('a'))).toBe(false);
  });
});
