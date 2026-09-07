import { describe, expect, it } from 'vitest';
import * as lodashStable from 'es-toolkit/compat';
import { divide } from './divide';
import { symbol } from '../_internal/symbol';

describe('divide', () => {
  it('should divide two numbers', () => {
    expect(divide(6, 4)).toBe(1.5);
    expect(divide(-6, 4)).toBe(-1.5);
    expect(divide(-6, -4)).toBe(1.5);
  });

  it('should coerce arguments to numbers', () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(divide('6', '4')).toBe(1.5);
    // eslint-disable-next-line
    // @ts-ignore
    expect(divide('x', 'y')).toEqual(NaN);
  });

  it(`should return 1 when no arguments are given`, () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(divide()).toBe(1);
  });

  it(`should work with only one defined argument`, () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(divide(6)).toBe(6);
    // eslint-disable-next-line
    // @ts-ignore
    expect(divide(6, undefined)).toBe(6);
    // eslint-disable-next-line
    // @ts-ignore
    expect(divide(undefined, 4)).toBe(4);
  });

  it(`should treat \`null\` operands like Lodash`, () => {
    // A `null` operand next to a string is stringified as `'null'`, so the
    // division yields `NaN` (not `0`/`Infinity` from an empty-string coercion).
    // @ts-expect-error - invalid arguments
    expect(divide(null, '1')).toBe(NaN);
    // @ts-expect-error - invalid arguments
    expect(divide('1', null)).toBe(NaN);
    // A present `null` must win over a missing `undefined`.
    // @ts-expect-error - invalid arguments
    expect(divide(null, undefined)).toBe(null);
    // @ts-expect-error - invalid arguments
    expect(divide(undefined, null)).toBe(null);
    // A `null` operand coerces to `0` in the numeric path.
    // @ts-expect-error - invalid arguments
    expect(divide(null, 3)).toBe(0);
  });

  it(`should preserve the sign of \`0\``, () => {
    const values = [0, '0', -0, '-0'];
    const expected = [
      [0, Infinity],
      ['0', Infinity],
      [-0, -Infinity],
      ['-0', -Infinity],
    ];

    lodashStable.times(2, index => {
      const actual = lodashStable.map(values, value => {
        // eslint-disable-next-line
        // @ts-ignore
        const result = index ? divide(undefined, value) : divide(value);
        return [result, 1 / result];
      });

      expect(actual).toEqual(expected);
    });
  });

  it(`should convert objects to \`NaN\``, () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(divide(0, {})).toEqual(NaN);
    // eslint-disable-next-line
    // @ts-ignore
    expect(divide({}, 0)).toEqual(NaN);
  });

  it(`should convert symbols to \`NaN\``, () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(divide(0, symbol)).toEqual(NaN);
    // eslint-disable-next-line
    // @ts-ignore
    expect(divide(symbol, 0)).toEqual(NaN);
  });
});
