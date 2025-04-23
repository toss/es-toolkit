import { describe, expect, it } from 'vitest';
import { isNative } from './isNative';

/**
 * @see https://github.com/lodash/lodash/blob/main/test/isNative.spec.js
 */

describe('isNative', () => {
  it('should return `true` for native methods', () => {
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

  it('should detect methods masquerading as native', () => {
    // Create a fake native function
    const fakeNative = () => {};
    Object.defineProperty(fakeNative, 'toString', {
      value: () => 'function () { [native code] }',
    });

    expect(isNative(fakeNative)).toBe(false);
  });
});
