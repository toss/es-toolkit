import { describe, expect, expectTypeOf, it } from 'vitest';
import { add } from 'es-toolkit/compat';
import { map } from 'es-toolkit/compat';
import { times } from 'es-toolkit/compat';
import type { add as addLodash } from 'lodash';
import { symbol } from '../_internal/symbol';

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(6, 4)).toBe(10);
    expect(add(-6, 4)).toBe(-2);
    expect(add(-6, -4)).toBe(-10);
  });

  it('should not coerce arguments to numbers', () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(add('6', '4')).toBe('64');
    // eslint-disable-next-line
    // @ts-ignore
    expect(add('x', 'y')).toBe('xy');
  });

  it('should return the sum of two valid numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should return the sum of two valid numbers', () => {
    expect(add(-1, -5)).toBe(-6);
  });

  it('should return the sum of two valid numbers', () => {
    expect(add(-2, 3)).toBe(1);
  });

  it('should return NaN if the first value is NaN', () => {
    expect(add(NaN, 10)).toBe(NaN);
  });

  it('should return NaN if the second value is NaN', () => {
    expect(add(5, NaN)).toBe(NaN);
  });

  it('should return NaN if both values are NaN', () => {
    expect(add(NaN, NaN)).toBe(NaN);
  });

  it(`\`add\` should return \`0\` when no arguments are given`, () => {
    // @ts-expect-error - invalid arguments
    expect(add()).toBe(0);
  });

  it(`\`add\` should work with only one defined argument`, () => {
    // @ts-expect-error - invalid arguments
    expect(add(6)).toBe(6);
    // @ts-expect-error - invalid arguments
    expect(add(6, undefined)).toBe(6);
    // @ts-expect-error - invalid arguments
    expect(add(undefined, 4)).toBe(4);
  });

  it(`\`add\` should preserve the sign of \`0\``, () => {
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
        const result = index ? add(undefined, value) : add(value);
        return [result, 1 / result];
      });

      expect(actual).toEqual(expected);
    });
  });

  it(`\`add\` should convert objects to \`NaN\``, () => {
    // @ts-expect-error - invalid arguments
    expect(add(0, {})).toEqual(NaN);
    // @ts-expect-error - invalid arguments
    expect(add({}, 0)).toEqual(NaN);
  });

  it(`\`add\` should convert symbols to \`NaN\``, () => {
    // @ts-expect-error - invalid arguments
    expect(add(0, symbol)).toEqual(NaN);
    // @ts-expect-error - invalid arguments
    expect(add(symbol, 0)).toEqual(NaN);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(add).toEqualTypeOf<typeof addLodash>();
  });
});
