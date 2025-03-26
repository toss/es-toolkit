import { describe, expect, it } from 'vitest';
import { multiply } from './multiply';
import { symbol } from '../_internal/symbol';
import { map } from '../array/map';
import { times } from '../util/times';

describe('multiply', () => {
  it('should return the product of two positive numbers', () => {
    expect(multiply(2, 4)).toBe(8);
    expect(multiply(3, 4)).toBe(12);
  });

  it('should return the product when both numbers are negative', () => {
    expect(multiply(-2, -4)).toBe(8);
    expect(multiply(-3, -4)).toBe(12);
  });

  it('should return the product of a negative and a positive number', () => {
    expect(multiply(-1, 5)).toBe(-5);
    expect(multiply(5, -1)).toBe(-5);
  });

  it('should return NaN if the first value is NaN', () => {
    expect(multiply(NaN, 3)).toBe(NaN);
  });

  it('should return NaN if the second value is NaN', () => {
    expect(multiply(3, NaN)).toBe(NaN);
  });

  it('should return NaN if both values are NaN', () => {
    expect(multiply(NaN, NaN)).toBe(NaN);
  });

  it('should multiply two numbers', () => {
    expect(multiply(6, 4)).toBe(24);
    expect(multiply(-6, 4)).toBe(-24);
    expect(multiply(6, -4)).toBe(-24);
    expect(multiply(-6, -4)).toBe(24);
  });

  it('should coerce arguments to numbers', () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(multiply('6', '4')).toBe(24);
    // eslint-disable-next-line
    // @ts-ignore
    expect(multiply('x', 'y')).toEqual(NaN);
  });

  it(`\`multiply\` should return \`1\` when no arguments are given`, () => {
    // @ts-expect-error - invalid arguments
    expect(multiply()).toBe(1);
  });

  it(`\`multiply\` should work with only one defined argument`, () => {
    // @ts-expect-error - invalid arguments
    expect(multiply(6)).toBe(6);
    // @ts-expect-error - invalid arguments
    expect(multiply(6, undefined)).toBe(6);
    // @ts-expect-error - invalid arguments
    expect(multiply(undefined, 4)).toBe(4);
  });

  it(`\`multiply\` should preserve the sign of \`0\``, () => {
    const values = [0, '0', -0, '-0'];
    const expected = [
      [0, Infinity],
      ['0', Infinity],
      [-0, -Infinity],
      ['-0', -Infinity],
    ];

    times(2, index => {
      const actual = map(values, value => {
        // @ts-expect-error - invalid arguments
        const result = index ? multiply(undefined, value) : multiply(value);
        return [result, 1 / result];
      });

      expect(actual).toEqual(expected);
    });
  });

  it(`\`multiply\` should convert objects to \`NaN\``, () => {
    // @ts-expect-error - invalid arguments
    expect(multiply(0, {})).toEqual(NaN);
    // @ts-expect-error - invalid arguments
    expect(multiply({}, 0)).toEqual(NaN);
  });

  it(`\`multiply\` should convert symbols to \`NaN\``, () => {
    // @ts-expect-error - invalid arguments
    expect(multiply(0, symbol)).toEqual(NaN);
    // @ts-expect-error - invalid arguments
    expect(multiply(symbol, 0)).toEqual(NaN);
  });
});
