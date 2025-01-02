import { describe, expect, it } from 'vitest';
import { negate } from './negate';
import { stubTrue } from '../util/stubTrue';
import { times } from '../util/times';

describe('negate', () => {
  function isEven(n: number) {
    return n % 2 === 0;
  }
  it('should create a function that negates the result of `func`', () => {
    const negateFn = negate(isEven);

    expect(negateFn(1)).toBe(true);
    expect(negateFn(2)).toBe(false);
  });

  it('should create a function that negates the result of `func`', () => {
    const negateFn = negate(isEven);

    expect(negateFn(1)).toBe(true);
    expect(negateFn(2)).toBe(false);
  });

  it('should create a function that accepts multiple arguments', () => {
    let argCount: any;
    const count = 5;
    // @ts-expect-error - any
    const negateFn = negate((...args: any[]) => {
      argCount = args.length;
    });
    const expected = times(count, stubTrue);

    const actual = times(count, index => {
      switch (index) {
        case 0:
          negateFn();
          break;
        case 1:
          negateFn(1);
          break;
        case 2:
          negateFn(1, 2);
          break;
        case 3:
          negateFn(1, 2, 3);
          break;
        case 4:
          negateFn(1, 2, 3, 4);
      }
      return argCount === index;
    });

    expect(actual).toEqual(expected);
  });

  it('should throw an error if `func` is not a function', () => {
    expect(() => negate(1 as any)).toThrow(TypeError);
  });

  it('should invoke `func` with the correct `this` binding', () => {
    const object = { isEven };
    const negateFn = negate(function (this: any, n: number) {
      return this.isEven(n);
    });

    expect(negateFn.call(object, 1)).toBe(true);
    expect(negateFn.call(object, 2)).toBe(false);
  });
});
