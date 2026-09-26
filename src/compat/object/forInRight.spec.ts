import { describe, expect, it } from 'vitest';
import { forInRight } from './forInRight';

describe('forInRight', () => {
  it('iterates over inherited string keyed properties', () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const keys: string[] = [];

    // @ts-expect-error - This is a test
    forInRight(new Foo(), (_, key) => {
      keys.push(key);
    });

    expect(keys).toEqual(['b', 'a']);
  });

  it('returns `null` if `object` is `null`', () => {
    expect(forInRight(null)).toBeNull();
  });

  it('returns `undefined` if `object` is `undefined`', () => {
    expect(forInRight(undefined)).toBeUndefined();
  });

  it('early returns if `iteratee` returns `false`', () => {
    const obj = { a: 1, b: 2 };

    forInRight(obj, (_, key, collection) => {
      collection[key as keyof typeof obj] = 3;

      return false;
    });

    expect(obj).toEqual({ a: 1, b: 3 });
  });
  it('should resolve a non-function `iteratee` like lodash instead of throwing', () => {
    const object = { a: { a: 1 }, b: { a: 2 } };

    // @ts-expect-error - lodash accepts a nullish iteratee
    expect(forInRight(object, null)).toBe(object);
    // @ts-expect-error - lodash accepts iteratee shorthands
    expect(forInRight(object, 'a')).toBe(object);
    // @ts-expect-error - lodash accepts iteratee shorthands
    expect(forInRight(object, { a: 1 })).toBe(object);
    // @ts-expect-error - lodash accepts iteratee shorthands
    expect(forInRight(object, ['a', 1])).toBe(object);
  });

  it('should stop when a property shorthand returns `false` like lodash', () => {
    let visited = 0;
    const object = {
      y: {
        get a() {
          visited++;
          return true;
        },
      },
      x: { a: false },
    };

    // @ts-expect-error - lodash accepts iteratee shorthands
    forInRight(object, 'a');

    expect(visited).toBe(0);
  });
});
