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

  it('should not change original value', () => {
    const curriedMap = <T, R>(mapper: (value: T) => R) => {
      return (arr: T[]) => {
        for (let i = 0; i < arr.length; i++) {
          (arr as any)[i] = mapper(arr[i]);
        }

        return arr;
      };
    };

    const curriedMapValue = <T extends Record<string, unknown>, R>(mapper: (value: T[keyof T]) => R) => {
      return (obj: T) => {
        for (const key of Object.keys(obj)) {
          (obj as any)[key] = mapper(obj[key] as any);
        }

        return obj;
      };
    };

    const originArr = [1, 2, 3];

    pipe(originArr, curriedMap(toString));

    expect(originArr).toEqual([1, 2, 3]);

    const originObj = { a: 1, b: 2, c: 3 };

    pipe(
      originObj,
      curriedMapValue(value => value + 5)
    );

    expect(originObj).toEqual({ a: 1, b: 2, c: 3 });
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

describe('pipe.lazy', () => {
  const isString = (value: unknown): value is string => typeof value === 'string';
  const toString = (value: unknown) => `string:${value}`;
  const toStringAsync = (value: unknown) =>
    new Promise<string>(resolve => setTimeout(() => resolve(`string:${value}`), 100));
  const length = (value: string) => value.length;

  it('should return value of the last function should be returned', () => {
    expect(pipe.lazy(toString)(1)).toBe('string:1');
    expect(pipe.lazy(toString)(true)).toBe('string:true');
    expect(pipe.lazy(toString, isString)(true)).toBe(true);

    expect(pipe.lazy(toString, length)(1)).toBe(8);
    expect(pipe.lazy(toString, length)(true)).toBe(11);
    expect(pipe.lazy(toString, length, isString)(true)).toBe(false);
  });

  it('should return promise value if there is a function that returns a promise in the middle', async () => {
    const promiseString = pipe.lazy(toStringAsync)(1);
    expect(promiseString).toBeInstanceOf(Promise);
    expect(await promiseString).toBe('string:1');

    const promiseLength = pipe.lazy(toStringAsync, length)(1);
    expect(promiseLength).toBeInstanceOf(Promise);
    expect(await promiseLength).toBe(8);

    expectTypeOf(pipe.lazy(isString)(promiseString)).toMatchTypeOf<Promise<boolean>>();
    expectTypeOf(pipe.lazy(isString)(promiseLength)).toMatchTypeOf<Promise<boolean>>();
  });

  it('should not change original value', () => {
    const curriedMap = <T, R>(mapper: (value: T) => R) => {
      return (arr: T[]) => {
        for (let i = 0; i < arr.length; i++) {
          (arr as any)[i] = mapper(arr[i]);
        }

        return arr;
      };
    };

    const curriedMapValue = <T extends Record<string, any>, R>(mapper: (value: T[string]) => R) => {
      return (obj: T) => {
        for (const key of Object.keys(obj)) {
          (obj as any)[key] = mapper(obj[key]);
        }

        return obj;
      };
    };

    const originArr = [1, 2, 3];

    pipe.lazy(curriedMap(toString))(originArr);

    expect(originArr).toEqual([1, 2, 3]);

    const originObj = { a: 1, b: 2, c: 3 };

    pipe.lazy(curriedMapValue(value => value + 5))(originObj);

    expect(originObj).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should inference type correctly', () => {
    expectTypeOf(pipe.lazy(toString)(1)).toEqualTypeOf<string>();
    expectTypeOf(pipe.lazy(toString, isString)(1)).toEqualTypeOf<boolean>();
    expectTypeOf(pipe.lazy(toString, length)(1)).toEqualTypeOf<number>();
    expectTypeOf(pipe.lazy(toString, length, isString)(1)).toEqualTypeOf<boolean>();
    expectTypeOf(pipe.lazy(toStringAsync)(1)).toEqualTypeOf<Promise<string>>();
    expectTypeOf(pipe.lazy(toStringAsync, length)(1)).toEqualTypeOf<Promise<number>>();
    expectTypeOf(pipe.lazy(toStringAsync, isString)(1)).toMatchTypeOf<Promise<boolean>>();
    expectTypeOf(pipe.lazy(toStringAsync, length, isString)(1)).toMatchTypeOf<Promise<boolean>>();
  });
});
