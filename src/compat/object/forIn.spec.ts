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
  it('should resolve a non-function `iteratee` like lodash instead of throwing', () => {
    const object = { a: { a: 1 }, b: { a: 2 } };

    // @ts-expect-error - lodash accepts a nullish iteratee
    expect(forIn(object, null)).toBe(object);
    // @ts-expect-error - lodash accepts iteratee shorthands
    expect(forIn(object, 'a')).toBe(object);
    // @ts-expect-error - lodash accepts iteratee shorthands
    expect(forIn(object, { a: 1 })).toBe(object);
    // @ts-expect-error - lodash accepts iteratee shorthands
    expect(forIn(object, ['a', 1])).toBe(object);
  });

  it('should stop when a property shorthand returns `false` like lodash', () => {
    let visited = 0;
    const object = {
      x: { a: false },
      y: {
        get a() {
          visited++;
          return true;
        },
      },
    };

    // @ts-expect-error - lodash accepts iteratee shorthands
    forIn(object, 'a');

    expect(visited).toBe(0);
  });
});
