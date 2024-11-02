import { describe, expect, expectTypeOf, it } from 'vitest';
import { pipe } from './pipe';

describe('pipe', () => {
  const isString = (value: unknown): value is string => typeof value === 'string';
  const toString = (value: unknown) => `string:${value}`;
  const toStringAsync = (value: unknown) =>
    new Promise<string>(resolve => setTimeout(() => resolve(`string:${value}`), 100));
  const length = (value: string) => value.length;

  it('should return value of the last function should be returned', () => {
    expect(pipe(1, toString)).toBe('string:1');
    expect(pipe(true, toString)).toBe('string:true');
    expect(pipe(true, toString, isString)).toBe(true);

    expect(pipe(1, toString, length)).toBe(8);
    expect(pipe(true, toString, length)).toBe(11);
    expect(pipe(true, toString, length, isString)).toBe(false);
  });

  it('should return promise value if there is a function that returns a promise in the middle', async () => {
    const promiseString = pipe(1, toStringAsync);
    expect(promiseString).toBeInstanceOf(Promise);
    expect(await promiseString).toBe('string:1');

    const promiseLength = pipe(1, toStringAsync, length);
    expect(promiseLength).toBeInstanceOf(Promise);
    expect(await promiseLength).toBe(8);

    expectTypeOf(pipe(promiseString, isString)).toMatchTypeOf<Promise<boolean>>();
    expectTypeOf(pipe(promiseLength, isString)).toMatchTypeOf<Promise<boolean>>();
  });

  it('should inference type correctly', () => {
    expectTypeOf(pipe(1, toString)).toEqualTypeOf<string>();
    expectTypeOf(pipe(1, toString, isString)).toEqualTypeOf<boolean>();
    expectTypeOf(pipe(1, toString, length)).toEqualTypeOf<number>();
    expectTypeOf(pipe(1, toString, length, isString)).toEqualTypeOf<boolean>();
    expectTypeOf(pipe(1, toStringAsync)).toEqualTypeOf<Promise<string>>();
    expectTypeOf(pipe(1, toStringAsync, length)).toEqualTypeOf<Promise<number>>();
    expectTypeOf(pipe(1, toStringAsync, isString)).toMatchTypeOf<Promise<boolean>>();
    expectTypeOf(pipe(1, toStringAsync, length, isString)).toMatchTypeOf<Promise<boolean>>();
  });
});
