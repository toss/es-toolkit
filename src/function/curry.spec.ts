import { describe, expect, expectTypeOf, it } from 'vitest';
import { curry } from './curry';

describe('curry', () => {
  it('should return original type of function when function without any arguments received', () => {
    const fn = () => 'test';
    const curried = curry(fn);

    expect(curried()).toBe('test');
  });

  it('should curry based on the number of arguments given', () => {
    const fn = (a: number, b: number, c: number, d: number) => [a, b, c, d];
    const curried = curry(fn);
    const expected = [1, 2, 3, 4];

    expect(curried(1)(2)(3)(4)).toEqual(expected);
  });

  it('should correctly curry with optional arguments', () => {
    const fn = (a: number, b: number, c?: number, d?: number) => [a, b, c, d];
    const curried = curry(fn);
    const expected = [1, 2, undefined, undefined];

    expect(curried(1)(2)()()).toEqual(expected);
  });

  it('should receive the arguments by specified arity', () => {
    const fn = (a: number, b: number, c?: number, d?: number) => [a, b, c, d];
    const curried = curry(fn, 2);
    const expected = [1, 2, undefined, undefined];

    expect(curried(1)(2)).toEqual(expected);
  });

  it('should ignore rest parameters', () => {
    const fn = (a: number, b: number, ...rest: number[]) => [a, b, ...rest];
    const curried = curry(fn, 2);
    const expected = [1, 2];

    expect(curried(1)(2)).toEqual(expected);
  });

  it('should inference type correctly', () => {
    const fn = (a: number, b: string, c: boolean) => ({ a, b, c });
    const curried = curry(fn);

    expectTypeOf(curried).parameters.toEqualTypeOf<[number]>();
    expectTypeOf(curried(1)).parameters.toEqualTypeOf<[string]>();
    expectTypeOf(curried(1)).not.toEqualTypeOf<{ a: number; b: string; c: boolean }>();
    expectTypeOf(curried(1)('a')).parameters.toEqualTypeOf<[boolean]>();
    expectTypeOf(curried(1)('a')).not.toEqualTypeOf<{ a: number; b: string; c: boolean }>();
    expectTypeOf(curried(1)('a')(true)).toEqualTypeOf<{ a: number; b: string; c: boolean }>();

    const optionalFn = (a: number, b: number, c?: number, d?: number) => [a, b, c, d];

    expectTypeOf(curry(optionalFn)(1)(2)).parameters.toEqualTypeOf<[arg?: number | void]>();
    expectTypeOf(curry(optionalFn, 2)(1)(2)).toEqualTypeOf<Array<number | undefined>>();
  });
});
