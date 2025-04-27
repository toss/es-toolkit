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
});
