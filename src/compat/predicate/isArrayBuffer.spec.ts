import { describe, expect, expectTypeOf, it } from 'vitest';
import { isArrayBuffer } from 'es-toolkit/compat';
import { stubFalse } from 'es-toolkit/compat';
import type { isArrayBuffer as isArrayBufferLodash } from 'lodash';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';
import { symbol } from '../_internal/symbol';

describe('isArrayBuffer', () => {
  it('should return `true` for array buffers', () => {
    expect(isArrayBuffer(new ArrayBuffer(8))).toBe(true);
  });

  it('should return `false` for non array buffers', () => {
    const expected = falsey.map(() => stubFalse());

    const actual = falsey.map((value, index) => (index ? isArrayBuffer(value) : isArrayBuffer()));

    expect(actual).toEqual(expected);

    expect(isArrayBuffer(args)).toBe(false);
    expect(isArrayBuffer([1])).toBe(false);
    expect(isArrayBuffer(true)).toBe(false);
    expect(isArrayBuffer(new Date())).toBe(false);
    expect(isArrayBuffer(new Error())).toBe(false);
    expect(isArrayBuffer(slice)).toBe(false);
    expect(isArrayBuffer({ a: 1 })).toBe(false);
    expect(isArrayBuffer(1)).toBe(false);
    expect(isArrayBuffer(/x/)).toBe(false);
    expect(isArrayBuffer('a')).toBe(false);
    expect(isArrayBuffer(symbol)).toBe(false);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isArrayBuffer).toEqualTypeOf<typeof isArrayBufferLodash>();
  });
});
