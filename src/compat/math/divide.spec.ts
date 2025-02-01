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
