import { describe, expect, expectTypeOf, it } from 'vitest';
import { isBuffer } from 'es-toolkit/compat';
import { map } from 'es-toolkit/compat';
import { slice } from 'es-toolkit/compat';
import { stubFalse } from 'es-toolkit/compat';
import type { isBuffer as isBufferLodash } from 'lodash';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { symbol } from '../_internal/symbol';

describe('isBuffer', () => {
  it('should return `true` for buffers', () => {
    if (Buffer) {
      expect(isBuffer(Buffer.alloc(2))).toBe(true);
    }
  });

  it('should return `false` for non-buffers', () => {
    const expected = map(falsey, stubFalse);

    const actual = map(falsey, (value, index) => (index ? isBuffer(value) : isBuffer()));

    expect(actual).toEqual(expected);

    expect(isBuffer(args)).toBe(false);
    expect(isBuffer([1])).toBe(false);
    expect(isBuffer(true)).toBe(false);
    expect(isBuffer(new Date())).toBe(false);
    expect(isBuffer(new Error())).toBe(false);
    expect(isBuffer(slice)).toBe(false);
    expect(isBuffer({ a: 1 })).toBe(false);
    expect(isBuffer(1)).toBe(false);
    expect(isBuffer(/x/)).toBe(false);
    expect(isBuffer('a')).toBe(false);
    expect(isBuffer(symbol)).toBe(false);
  });

  it('should return `false` if `Buffer` is not defined', () => {
    const originalBuffer = global.Buffer;
    // eslint-disable-next-line
    // @ts-ignore
    delete global.Buffer;

    expect(isBuffer(new Uint8Array())).toBe(false);

    global.Buffer = originalBuffer; // Restore Buffer
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isBuffer).toEqualTypeOf<typeof isBufferLodash>();
  });
});
