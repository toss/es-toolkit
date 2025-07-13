import { describe, expect, expectTypeOf, it } from 'vitest';
import * as lodashStable from 'es-toolkit/compat';
import { memoize } from 'es-toolkit/compat';
import type { memoize as memoizeLodash } from 'lodash';
import { identity, isFunction, noop, stubTrue } from '../index';

describe('memoize', () => {
  class CustomCache {
    __data__: Array<{ key: any; value: any }>;

    constructor() {
      this.__data__ = [];
    }

    clear() {
      this.__data__ = [];
      return this;
    }
    get(key: any) {
      const entry = lodashStable.find(this.__data__, ['key', key]);
      return entry && entry.value;
    }

    has(key: any) {
      return lodashStable.some(this.__data__, ['key', key]);
    }

    set(key: any, value: any) {
      this.__data__.push({ key, value });
      return this;
    }

    delete(key: any): boolean {
      const index = this.__data__.findIndex(entry => entry.key === key);
      if (index >= 0) {
        this.__data__.splice(index, 1);
        return true;
      }
      return false;
    }
  }

  class ImmutableCache extends CustomCache {
    constructor() {
      super();
      this.__data__ = [];
    }

    override clear() {
      return new ImmutableCache() as this;
    }

    override set(key: any, value: any) {
      const result = new ImmutableCache();
      result.__data__ = [...this.__data__, { key, value }];
      return result as this;
    }
  }

  it('should memoize results based on the first argument given', () => {
    const memoized = memoize((a, b, c) => a + b + c);

    expect(memoized(1, 2, 3)).toBe(6);
    expect(memoized(1, 3, 5)).toBe(6);
  });

  it('should support a `resolver`', () => {
    const fn = function (a: number, b: number, c: number) {
      return a + b + c;
    };
    const memoized = memoize(fn, fn);

    expect(memoized(1, 2, 3)).toBe(6);
    expect(memoized(1, 3, 5)).toBe(9);
  });

  it('should use `this` binding of function for `resolver`', () => {
    const fn = function (this: { b: number; c: number }, a: number) {
      return a + this.b + this.c;
    };
    const memoized = memoize(fn, fn);

    const object = { memoized: memoized, b: 2, c: 3 };
    expect(object.memoized(1)).toBe(6);

    object.b = 3;
    object.c = 5;
    expect(object.memoized(1)).toBe(9);
  });

  it('should throw a TypeError if `resolve` is truthy and not a function', () => {
    expect(() => {
      // @ts-expect-error - Intentionally passing incorrect type to test runtime error
      memoize(noop, true);
    }).toThrow(TypeError);
  });

  it('should not error if `resolver` is nullish', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = lodashStable.map(values, stubTrue);

    const actual = lodashStable.map(values, (resolver, index) => {
      try {
        // @ts-expect-error - Intentionally bypassing type check for testing purposes
        return isFunction(index ? memoize(noop, resolver) : memoize(noop));
      } catch (e) {
        /* empty */
      }
    });

    expect(actual).toEqual(expected);
  });

  it('should check cache for own properties', () => {
    const props = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf',
    ];

    const memoized = memoize(identity);

    const actual = lodashStable.map(props, value => memoized(value));

    expect(actual).toEqual(props);
  });

  it('should cache the `__proto__` key', () => {
    const array: unknown[] = [];
    const key = '__proto__';

    lodashStable.times(2, index => {
      let count = 0;
      const resolver = index ? identity : undefined;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const memoized = memoize(function (_): unknown[] {
        count++;
        return array;
      }, resolver);

      const cache = memoized.cache;

      memoized(key);
      memoized(key);

      expect(count).toBe(1);
      expect(cache.get(key)).toBe(array);
      // eslint-disable-next-line
      // @ts-ignore
      expect(cache.__data__ instanceof Array).toBe(false);
      expect(cache.delete(key)).toBe(true);
    });
  });

  it('should allow `_.memoize.Cache` to be customized', () => {
    const oldCache = memoize.Cache;
    memoize.Cache = CustomCache;

    const memoized = memoize(object => object.id);

    const cache = memoized.cache;
    const key1 = { id: 'a' };
    const key2 = { id: 'b' };

    expect(memoized(key1)).toBe('a');
    expect(cache.has(key1)).toBe(true);

    expect(memoized(key2)).toBe('b');
    expect(cache.has(key2)).toBe(true);

    memoize.Cache = oldCache;
  });

  it('should works with an immutable `_.memoize.Cache` ', () => {
    const oldCache = memoize.Cache;
    memoize.Cache = ImmutableCache;

    const memoized = memoize(object => object.id);

    const key1 = { id: 'a' };
    const key2 = { id: 'b' };

    memoized(key1);
    memoized(key2);

    const cache = memoized.cache;
    expect(cache.has(key1)).toBe(true);
    expect(cache.has(key2)).toBe(true);

    memoize.Cache = oldCache;
  });

  it('should use Map as the default cache when memoize.Cache is not specified', () => {
    const oldCache = memoize.Cache;
    // @ts-expect-error - Intentionally setting to null to test default behavior
    memoize.Cache = null;

    const memoized = memoize(identity);

    expect(memoized.cache instanceof Map).toBe(true);

    const key = 'test-key';
    memoized(key);
    expect(memoized.cache.has(key)).toBe(true);
    expect(memoized.cache.get(key)).toBe(key);

    memoize.Cache = oldCache;
  });

  it('should handle cache.set() not returning a value', () => {
    class NonReturningCache {
      data: Record<string, any> = {};

      get(key: any) {
        return this.data[key];
      }

      has(key: any) {
        return key in this.data;
      }

      set(key: any, value: any) {
        this.data[key] = value;
        // Intentionally not returning anything
      }
    }

    const oldCache = memoize.Cache;
    memoize.Cache = NonReturningCache as any;

    const memoized = memoize(identity);
    const originalCache = memoized.cache;

    memoized('a');
    expect(memoized.cache).toBe(originalCache);
    expect(memoized.cache.has('a')).toBe(true);
    expect(memoized.cache.get('a')).toBe('a');

    memoize.Cache = oldCache;
  });

  it('should match the type of lodash', () => {
    expectTypeOf(memoize).toEqualTypeOf<typeof memoizeLodash>();
  });
});
