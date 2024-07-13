import { describe, it, expect, expectTypeOf } from 'vitest';
import { flexibleCurry } from './curry';

describe('curry', () => {
  it('should throw an error when a function that has no parameters is received', () => {
    const fn = () => 'test';

    expect(flexibleCurry(fn)).toThrowError(`'func' must have at least one argument that is not a rest parameter.`);
  });

  it('should throw an error when a function that only has `rest parameters` is received', () => {
    const fn = (...rest: unknown[]) => rest;

    expect(flexibleCurry(fn)).toThrowError('`func` must have at least one argument that is not a rest parameter.');
  });

  it('should curry based on the number of arguments given', () => {
    const fn = (a: number, b: number, c: number, d?: number) => [a, b, c, d];
    const curried = flexibleCurry(fn);
    const expected = [1, 2, 3, 4];

    expect(curried(1)(2)(3)(4)).toEqual(expected);
    expect(curried(1)(2, 3, 4)).toEqual(expected);
    expect(curried(1, 2)(3, 4)).toEqual(expected);
    expect(curried(1, 2, 3, 4)).toEqual(expected);
  });

  it('should inference type correctly', () => {
    const fn = (a: number, b: string, c: boolean) => ({ a, b, c });
    const curried = flexibleCurry(fn);

    expectTypeOf(curried).parameters.toEqualTypeOf<[number] | [number, string] | [number, string, boolean]>();
    expectTypeOf(curried(1)).parameters.toEqualTypeOf<[string] | [string, boolean]>();
    expectTypeOf(curried(1)).not.toEqualTypeOf<{ a: number; b: string; c: boolean }>();
    expectTypeOf(curried(1, 'a')).parameters.toEqualTypeOf<[boolean]>();
    expectTypeOf(curried(1, 'a')).not.toEqualTypeOf<{ a: number; b: string; c: boolean }>();
    expectTypeOf(curried(1)('a')).parameters.toEqualTypeOf<[boolean]>();
    expectTypeOf(curried(1)('a')).not.toEqualTypeOf<{ a: number; b: string; c: boolean }>();
    expectTypeOf(curried(1)('a')(true)).toEqualTypeOf<{ a: number; b: string; c: boolean }>();
    expectTypeOf(curried(1, 'a')(true)).toEqualTypeOf<{ a: number; b: string; c: boolean }>();
    expectTypeOf(curried(1)('a', true)).toEqualTypeOf<{ a: number; b: string; c: boolean }>();
    expectTypeOf(curried(1, 'a', true)).toEqualTypeOf<{ a: number; b: string; c: boolean }>();
  });
});
