import { describe, expect, it } from 'vitest';
import { memoize } from './memoize';

describe('memoize', () => {
  it('should memoize results based on the first argument', () => {
    const fn = (a: number, b: number, c: number) => a + b + c;
    const memoized = memoize(fn);
    expect(memoized(1, 2, 3)).toBe(6); // {1: 6}
    expect(memoized(1, 3, 5)).toBe(6); // {1: 6}
  });

  it('should memoize results using a custom resolver function', () => {
    const fn = function (a: number, b: number, c: number) {
      return a + b + c;
    };
    const resolver = (...args: number[]) => args.join('-');
    const memoized = memoize(fn, { resolver });

    expect(memoized(1, 2, 3)).toBe(6); // {1-2-3: 6}
    expect(memoized(1, 3, 5)).toBe(9); // {1-2-3: 6, 1-3-5: 6}
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

  it('should throw TypeError if resolver is not a function', () => {
    expect(() => {
      // @ts-expect-error: resolver is not a function
      memoize(() => {}, { resolver: true });
    }).toThrowError(TypeError);
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
