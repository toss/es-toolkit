import { stubTrue } from '../_internal/stubTrue';
import { args } from '../_internal/args';
import { symbol } from '../_internal/symbol';
import { falsey } from '../_internal/falsey';
import { stubFalse } from '../_internal/stubFalse';
import { describe, expect, it } from 'vitest';
import { isInteger } from './isInteger';

const MAX_INTEGER = 1.7976931348623157e308;

describe('isInteger function', () => {
  it('checks if an int is an integer', () => {
    const result = isInteger(1);
    expect(result).toBe(true);
  });

  it('checks if a float is not an integer', () => {
    const result = isInteger(1.1);
    expect(result).toBe(false);
  });

  it('checks if a BigInt is not an integer', () => {
    const result = isInteger(1n);
    expect(result).toBe(false);
  });

  it('checks if a string is not an integer', () => {
    const result = isInteger('1');
    expect(result).toBe(false);
  });

  it('checks if an array is not an integer', () => {
    const result = isInteger([]);
    expect(result).toBe(false);
  });

  it('checks if a NaN is not an integer', () => {
    const result = isInteger(NaN);
    expect(result).toBe(false);
  });

  it('checks if a Infinity is not an integer', () => {
    const result = isInteger(Infinity);
    expect(result).toBe(false);
  });

  const func = isInteger;

  it(`\`isInteger\` should return \`true\` for integer values`, () => {
    const values = [-1, 0, 1];
    const expected = values.map(stubTrue);

    const actual = values.map(value => func(value));

    expect(actual).toEqual(expected);
    expect(func(MAX_INTEGER)).toBe(true);
  });

  it('should return `false` for non-integer number values', () => {
    const values = [NaN, Infinity, -Infinity, Object(1), 3.14];
    const expected = values.map(stubFalse);

    const actual = values.map(value => func(value));

    expect(actual).toEqual(expected);
  });

  it('should return `false` for non-numeric values', () => {
    const expected = falsey.map(value => value === 0);

    const actual = falsey.map((value, index) => (index ? func(value) : func()));

    expect(actual).toEqual(expected);

    expect(func(args)).toBe(false);
    expect(func([1, 2, 3])).toBe(false);
    expect(func(true)).toBe(false);
    expect(func(new Date())).toBe(false);
    expect(func(new Error())).toBe(false);
    expect(func({ a: 1 })).toBe(false);
    expect(func(/x/)).toBe(false);
    expect(func('a')).toBe(false);
    expect(func(symbol)).toBe(false);
  });
});
