import { describe, it, expect } from 'vitest';
import { parseInt } from './parseInt';

describe('parseInt', () => {
  it('should accept a `radix`', () => {
    const expected = [
      2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      32, 33, 34, 35, 36,
    ];

    const actual = expected.map(radix => parseInt('10', radix));

    expect(actual).toEqual(expected);
  });

  it('should use a radix of `10`, for non-hexadecimals, if `radix` is `undefined` or `0`', () => {
    expect(parseInt('10')).toBe(10);
    expect(parseInt('10', 0)).toBe(10);
    expect(parseInt('10', 10)).toBe(10);
    expect(parseInt('10', undefined)).toBe(10);
  });

  it('should use a radix of `16`, for hexadecimals, if `radix` is `undefined` or `0`', () => {
    ['0x20', '0X20'].forEach(string => {
      expect(parseInt(string)).toBe(32);
      expect(parseInt(string, 0)).toBe(32);
      expect(parseInt(string, 16)).toBe(32);
      expect(parseInt(string, undefined)).toBe(32);
    });
  });

  it('should use a radix of `10` for string with leading zeros', () => {
    expect(parseInt('08')).toBe(8);
    expect(parseInt('08', 10)).toBe(8);
  });

  it('should parse strings with leading whitespace', () => {
    const expected = [8, 8, 10, 10, 32, 32, 32, 32];

    const actual: number[] = [];
    ['08', '10'].forEach(string => {
      actual.push(parseInt(` ${string}`, 10), parseInt(` ${string}`));
    });

    ['0x20', '0X20'].forEach(string => {
      actual.push(parseInt(` ${string}`), parseInt(` ${string}`, 16));
    });

    expect(actual).toEqual(expected);
  });

  it('should coerce `radix` to a number', () => {
    const object = { valueOf: () => 0 };
    // @ts-expect-error - unusual usage
    expect(parseInt('08', object)).toBe(8);
    // @ts-expect-error - unusual usage
    expect(parseInt('0x20', object)).toBe(32);
  });

  it('should work as an iteratee for methods like `map`', () => {
    const strings = ['6', '08', '10'].map(Object);
    let actual = strings.map(parseInt);

    expect(actual).toEqual([6, 8, 10]);

    actual = ['1', '2', '3'].map(parseInt);
    expect(actual).toEqual([1, 2, 3]);
  });
});
