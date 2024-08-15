import { describe, expect, it, vi } from 'vitest';
import { memoize } from './memoize';

describe('memoize', () => {
  it('should memoize results of an unary function', () => {
    const add10 = vi.fn((x: number) => x + 10);

    const memoizedAdd10 = memoize(add10);
    expect(memoizedAdd10(5)).toBe(15);
    expect(memoizedAdd10(5)).toBe(15);

    expect(add10).toBeCalledTimes(1);

    const now = () => Date.now();
    const memoizedNow = memoize(now);

    expect(memoizedNow()).toBe(memoizedNow());
  });

  it('should memoize results using a custom resolver function', () => {
    const sum = vi.fn(function sum(arr: number[]) {
      return arr.reduce((x, y) => x + y, 0);
    });

    const memoizedSum = memoize(sum, {
      getCacheKey: x => x.join(','),
    });

    expect(memoizedSum([1, 2, 3])).toBe(6);
    expect(memoizedSum([1, 2, 3])).toBe(6);

    expect(sum).toBeCalledTimes(1);
  });

  it('should use `this` context for resolver function', () => {
    const fn = function (a: number) {
      // @ts-expect-error: this is not defined
      return (a + this.b + this.c) as number;
    };
    const memoized = memoize(fn);
    const object = { memoized: memoized, b: 2, c: 3 };
    expect(object.memoized(1)).toBe(6); // {1: 6}
    object.b = 3;
    object.c = 5;
    expect(object.memoized(1)).toBe(6); // {1: 6}
  });

  it('should check cache for built-in properties', () => {
    const props = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf',
    ];
    const fn = (value: string) => value;
    const memoized = memoize(fn);
    const actual = props.map(value => memoized(value));
    expect(actual).toEqual(props);
  });

  it('should allow custom cache implementation', () => {
    class CustomCache {
      private __data__: Map<object, string> = new Map();
      get(key: object): string | undefined {
        return this.__data__.get(key);
      }
      set(key: object, value: string): void {
        this.__data__.set(key, value);
      }
      has(key: object): boolean {
        return this.__data__.has(key);
      }
      delete(key: object): boolean | void {
        return this.__data__.delete(key);
      }
      clear(): void {
        this.__data__.clear();
      }
      get size(): number {
        return this.__data__.size;
      }
    }

    const fn = (object: { id: string }) => object.id;
    const memoized = memoize(fn, { cache: new CustomCache() });

    const cache = memoized.cache;
    const key1 = { id: 'a' };
    const key2 = { id: 'b' };

    expect(memoized(key1)).toBe('a');
    expect(cache.has(key1)).toBe(true);
    expect(memoized(key2)).toBe('b');
    expect(cache.has(key2)).toBe(true);
  });

  it('should work with an immutable cache implementation', () => {
    class ImmutableCache<T> {
      private __data__: Map<T, string> = new Map();

      clear(): ImmutableCache<T> {
        return new ImmutableCache<T>();
      }

      get(key: T): string | undefined {
        return this.__data__.get(key);
      }
      has(key: T): boolean {
        return this.__data__.has(key);
      }

      set(key: T, value: string): ImmutableCache<T> {
        this.__data__.set(key, value);
        return this;
      }

      delete(key: T): boolean | void {
        return this.__data__.delete(key);
      }

      get size(): number {
        return this.__data__.size;
      }
    }
    const fn = (object: { id: string }) => object.id;
    const cache = new ImmutableCache<{ id: string }>();
    const memoized = memoize(fn, { cache });
    const key1 = { id: 'a' };
    const key2 = { id: 'b' };

    memoized(key1);
    memoized(key2);
    expect(cache.has(key1)).toBe(true);
    expect(cache.has(key2)).toBe(true);
  });
});
