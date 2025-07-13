import { describe, expect, expectTypeOf, it } from 'vitest';
import { subtract } from 'es-toolkit/compat';
import { map } from 'es-toolkit/compat';
import { times } from 'es-toolkit/compat';
import type { subtract as subtractLodash } from 'lodash';
import { symbol } from '../_internal/symbol';

describe('subtract', () => {
  it('should subtract two numbers', () => {
    expect(subtract(6, 4)).toBe(2);
    expect(subtract(6, -4)).toBe(10);
    expect(subtract(-6, 4)).toBe(-10);
    expect(subtract(-6, -4)).toBe(-2);
  });

  it('should not coerce arguments to numbers', () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(subtract('6', '4')).toBe(2);
  });

  it('should return the difference of two positive numbers', () => {
    expect(subtract(1, 5)).toBe(-4);
    expect(subtract(5, 1)).toBe(4);
  });

  it('should return the difference when both numbers are negative', () => {
    expect(subtract(-1, -5)).toBe(4);
    expect(subtract(-5, -1)).toBe(-4);
  });

  it('should return the difference of a negative and a positive number', () => {
    expect(subtract(-1, 5)).toBe(-6);
    expect(subtract(5, -1)).toBe(6);
  });

  it('should return NaN if the first value is NaN', () => {
    expect(subtract(NaN, 10)).toBe(NaN);
  });

  it('should return NaN if the second value is NaN', () => {
    expect(subtract(10, NaN)).toBe(NaN);
  });

  it('should return NaN if both values are NaN', () => {
    expect(subtract(NaN, NaN)).toBe(NaN);
  });

  it(`\`subtract\` should return \`0\` when no arguments are given`, () => {
    // @ts-expect-error - invalid arguments
    expect(subtract()).toBe(0);
  });

  it(`\`subtract\` should work with only one defined argument`, () => {
    // @ts-expect-error - invalid arguments
    expect(subtract(6)).toBe(6);
    // @ts-expect-error - invalid arguments
    expect(subtract(6, undefined)).toBe(6);
    // @ts-expect-error - invalid arguments
    expect(subtract(undefined, 4)).toBe(4);
  });

  it(`\`subtract\` should preserve the sign of \`0\``, () => {
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
        const result = index ? subtract(undefined, value) : subtract(value);
        return [result, 1 / result];
      });

      expect(actual).toEqual(expected);
    });
  });

  it(`\`subtract\` should convert objects to \`NaN\``, () => {
    // @ts-expect-error - invalid arguments
    expect(subtract(0, {})).toEqual(NaN);
    // @ts-expect-error - invalid arguments
    expect(subtract({}, 0)).toEqual(NaN);
  });

  it(`\`subtract\` should convert symbols to \`NaN\``, () => {
    // @ts-expect-error - invalid arguments
    expect(subtract(0, symbol)).toEqual(NaN);
    // @ts-expect-error - invalid arguments
    expect(subtract(symbol, 0)).toEqual(NaN);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(subtract).toEqualTypeOf<typeof subtractLodash>();
  });
});
