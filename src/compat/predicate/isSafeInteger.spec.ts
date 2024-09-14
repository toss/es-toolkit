import { describe, expect, it } from 'vitest';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { stubFalse } from '../_internal/stubFalse';
import { stubTrue } from '../_internal/stubTrue';
import { symbol } from '../_internal/symbol';
import { isSafeInteger } from './isSafeInteger.ts';

const MAX_INTEGER = 1.7976931348623157e308;

describe('isSafeInteger function', () => {
  it('checks if an int is an integer', () => {
    const result = isSafeInteger(1);
    expect(result).toBe(true);
  });

  it('checks if a float is not an integer', () => {
    const result = isSafeInteger(1.1);
    expect(result).toBe(false);
  });

  it('checks if a BigInt is not an integer', () => {
    const result = isSafeInteger(1n);
    expect(result).toBe(false);
  });

  it('checks if a string is not an integer', () => {
    const result = isSafeInteger('1');
    expect(result).toBe(false);
  });

  it('checks if an array is not an integer', () => {
    const result = isSafeInteger([]);
    expect(result).toBe(false);
  });

  it('checks if a NaN is not an integer', () => {
    const result = isSafeInteger(NaN);
    expect(result).toBe(false);
  });

  it('checks if a Infinity is not an integer', () => {
    const result = isSafeInteger(Infinity);
    expect(result).toBe(false);
  });

  it('checks if a value less than -(253 – 1) is not a safe integer', () => {
    const result = isSafeInteger(Number.MIN_SAFE_INTEGER - 2);
    expect(result).toBe(false);
  });

  it('checks if a value greater than (253 – 1) is not a safe integer', () => {
    const result = isSafeInteger(Number.MAX_SAFE_INTEGER + 2);
    expect(result).toBe(false);
  });

  const func = isSafeInteger;
  const isSafe = true;

  it(`\`isSafeInteger\` should return \`true\` for integer values`, () => {
    const values = [-1, 0, 1];
    const expected = values.map(stubTrue);

    const actual = values.map(value => func(value));

    expect(actual).toEqual(expected);
    expect(func(MAX_INTEGER)).toBe(!isSafe);
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
