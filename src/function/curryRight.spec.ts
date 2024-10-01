import { describe, expect, expectTypeOf, it } from 'vitest';
import { curryRight } from './curryRight';

describe('curryRight', () => {
  it('should return original type of function when function without any arguments received', () => {
    const fn = () => 'test';
    const curried = curryRight(fn);

    expect(curried()).toBe('test');
  });

  it('should curry based on the number of arguments given', () => {
    const fn = (a: number, b: number, c: number, d: number) => [a, b, c, d];
    const curried = curryRight(fn);
    const expected = [4, 3, 2, 1];

    expect(curried(1)(2)(3)(4)).toEqual(expected);
  });

  it('should inference type correctly', () => {
    const fn = (a: number, b: string, c: boolean) => ({ a, b, c });
    const curried = curryRight(fn);

    expectTypeOf(curried).parameters.toEqualTypeOf<[boolean]>();
    expectTypeOf(curried(true)).parameters.toEqualTypeOf<[string]>();
    expectTypeOf(curried(true)).not.toEqualTypeOf<{ a: number; b: string; c: boolean }>();
    expectTypeOf(curried(true)('a')).parameters.toEqualTypeOf<[number]>();
    expectTypeOf(curried(true)('a')).not.toEqualTypeOf<{ a: number; b: string; c: boolean }>();
    expectTypeOf(curried(true)('a')(1)).toEqualTypeOf<{ a: number; b: string; c: boolean }>();
  });
});
