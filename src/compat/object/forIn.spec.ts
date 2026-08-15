import { describe, expect, it } from 'vitest';
import { forIn } from './forIn';

describe('forIn', () => {
  it('iterates over inherited string keyed properties', () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const keys: string[] = [];

    // @ts-expect-error - This is a test
    forIn(new Foo(), (_, key) => {
      keys.push(key);
    });
    expect(keys.sort()).toEqual(['a', 'b']);
  });

  it('returns `null` if `object` is `null`', () => {
    expect(forIn(null)).toBeNull();
  });

  it('returns `undefined` if `object` is `undefined`', () => {
    expect(forIn(undefined)).toBeUndefined();
  });

  it('early returns if `iteratee` returns `false`', () => {
    const obj = { a: 1, b: 2 };

    forIn(obj, (_, key, collection) => {
      collection[key as keyof typeof obj] = 3;

      return false;
    });

    expect(obj).toEqual({ a: 3, b: 2 });
  });
});
