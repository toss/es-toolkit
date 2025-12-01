import { describe, expect, expectTypeOf, it } from 'vitest';
import { pipe } from './pipe';

const double = function (n: number) {
  return n * 2;
};

const square = function (n: number) {
  return n * n;
};

const numToStr = function (n: number) {
  return String(n);
};

const strToBool = function (s: string) {
  return Boolean(s);
};

const boolToNum = function (b: boolean) {
  return Number(b);
};

describe('pipe', () => {
  it('`pipe` should supply the first function with the base value and all others with the return value of the previous', () => {
    expect(pipe(5, double)).toBe(10);
    expect(pipe(5, double, square)).toBe(100);
  });

  it('`pipe` should return the base value when no function is passed', () => {
    expect(pipe(5)).toBe(5);
  });

  it('`pipe` should preserve `this` context', () => {
    const obj = {
      multiplier: 42,
      multiply: function (n: number) {
        return n * this.multiplier;
      },
    };

    expect(pipe.call(obj, 5, obj.multiply)).toBe(210);
  });

  // This is a type-level only test
  // eslint-disable-next-line vitest/expect-expect
  it('`pipe` should support typed overloads for invocations with up to 8 functions', () => {
    const base = 5;

    const first = pipe(base, numToStr);
    expectTypeOf(first).toEqualTypeOf<string>();

    const second = pipe(base, numToStr, strToBool);
    expectTypeOf(second).toEqualTypeOf<boolean>();

    const third = pipe(base, numToStr, strToBool, boolToNum);
    expectTypeOf(third).toEqualTypeOf<number>();

    const fourth = pipe(base, numToStr, strToBool, boolToNum, numToStr);
    expectTypeOf(fourth).toEqualTypeOf<string>();

    const fifth = pipe(base, numToStr, strToBool, boolToNum, numToStr, strToBool);
    expectTypeOf(fifth).toEqualTypeOf<boolean>();

    const sixth = pipe(base, numToStr, strToBool, boolToNum, numToStr, strToBool, boolToNum);
    expectTypeOf(sixth).toEqualTypeOf<number>();

    const seventh = pipe(base, numToStr, strToBool, boolToNum, numToStr, strToBool, boolToNum, numToStr);
    expectTypeOf(seventh).toEqualTypeOf<string>();

    const eighth = pipe(base, numToStr, strToBool, boolToNum, numToStr, strToBool, boolToNum, numToStr, strToBool);
    expectTypeOf(eighth).toEqualTypeOf<boolean>();
  });
});
