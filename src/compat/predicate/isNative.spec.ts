import { describe, expect, expectTypeOf, it } from 'vitest';
import { isNative } from 'es-toolkit/compat';
import { noop } from 'es-toolkit/compat';
import { stubFalse } from 'es-toolkit/compat';
import type { isNative as isNativeLodash } from 'lodash';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { symbol } from '../_internal/symbol';

/**
 * @see https://github.com/lodash/lodash/blob/main/test/isNative.spec.js
 */

describe('isNative', () => {
  it('should return `true` for native methods', () => {
    const values = [Array, Object.create, encodeURI, Promise, Array.prototype.slice, Uint8Array];
    const expected = values.map(() => true);
    const actual = values.map(isNative);

    expect(actual).toEqual(expected);

    const nativeFunctions = [
      Array,
      Promise,
      Uint8Array,
      Object.keys,
      Array.prototype.push,
      Function.prototype.bind,
      String.prototype.charAt,
      Number.prototype.toFixed,
      Math.max,
    ];

    nativeFunctions.forEach(func => {
      expect(isNative(func)).toBe(true);
    });
  });

  it('should return `false` for non-native methods', () => {
    const expected = falsey.map(stubFalse);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const actual = falsey.map((value, index) => (index ? isNative(value) : isNative()));

    expect(actual).toEqual(expected);

    expect(isNative(args)).toBe(false);
    expect(isNative([1, 2, 3])).toBe(false);
    expect(isNative(true)).toBe(false);
    expect(isNative(new Date())).toBe(false);
    expect(isNative(new Error())).toBe(false);
    expect(isNative({ a: 1 })).toBe(false);
    expect(isNative(1)).toBe(false);
    expect(isNative(/x/)).toBe(false);
    expect(isNative('a')).toBe(false);
    expect(isNative(symbol)).toBe(false);

    const nonNativeValues = [
      undefined,
      null,
      true,
      false,
      0,
      1,
      'string',
      {},
      [],
      () => {},
      function () {},
      new Date(),
      new Error(),
      /regex/,
      Symbol('test'),
      new Map(),
      new Set(),
      new WeakMap(),
      new WeakSet(),
      new ArrayBuffer(8),
      new DataView(new ArrayBuffer(8)),
    ];

    nonNativeValues.forEach(value => {
      expect(isNative(value)).toBe(false);
    });
  });

  it('should throw an error if core-js is detected', () => {
    (global as any)['__core-js_shared__'] = {};

    try {
      expect(() => {
        isNative(noop);
      }).toThrow();
    } finally {
      delete (global as any)['__core-js_shared__'];
    }
  });

  it('should detect methods masquerading as native', () => {
    // Create a fake native function
    const fakeNative = () => {};
    Object.defineProperty(fakeNative, 'toString', {
      value: () => 'function () { [native code] }',
    });

    expect(isNative(fakeNative)).toBe(false);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isNative).toEqualTypeOf<typeof isNativeLodash>();
  });
});
