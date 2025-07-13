import { describe, expect, expectTypeOf, it } from 'vitest';
import { forOwn } from 'es-toolkit/compat';
import type { forOwn as forOwnLodash } from 'lodash';

/**
 * @see https://github.com/lodash/lodash/blob/afcd5bc1e8801867c31a17566e0e0edebb083d0e/test/forOwn-methods.spec.js#L1
 */
describe('forOwn', () => {
  it('should iterate over `length` properties', () => {
    const object = { 0: 'zero', 1: 'one', length: 2 };
    const props: string[] = [];

    forOwn(object, (_, prop) => {
      props.push(prop);
    });

    expect(props.sort()).toEqual(['0', '1', 'length']);
  });

  it('should return `object` itself', () => {
    expect(forOwn(null)).toBe(null);
    expect(forOwn(undefined)).toBe(undefined);
    expect(forOwn([])).toEqual([]);
    expect(forOwn([1])).toEqual([1]);
    expect(forOwn({ 0: 1, length: 1 })).toEqual({ 0: 1, length: 1 });
    expect(forOwn({})).toEqual({});
    expect(forOwn({ a: 1 })).toEqual({ a: 1 });
  });

  it(`should provide correct iteratee arguments`, () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let args: any;
    const object = {
      a: 1,
    };

    forOwn(object, function (value, key, collection) {
      args = [value, key, collection];
    });

    expect(args).toEqual([1, 'a', { a: 1 }]);
  });

  it(`should exit iteration when iteratee returns false`, () => {
    const object = {
      a: 1,
      b: 2,
    };
    const keys: string[] = [];

    forOwn(object, (_, key) => {
      keys.push(key);
      if (keys.length === 1) {
        return false;
      }
    });

    expect(keys).toEqual(['a']);
  });

  it('should not iterate inherited properties', () => {
    class Foo {
      a: number;
      b: number;

      constructor() {
        this.a = 1;
        this.b = 2;
      }
    }
    // @ts-expect-error - testing inherited properties
    Foo.prototype.c = 3;

    expect(getOwnEnumerableStringKeys(new Foo())).toEqual(['a', 'b']);
  });

  it('should not iterate non-enumerable properties', () => {
    const foo = {
      a: 1,
      b: 2,
    };
    Object.defineProperty(foo, 'c', {
      value: 3,
      enumerable: false,
    });

    expect(getOwnEnumerableStringKeys(foo)).toEqual(['a', 'b']);
  });

  it('should not iterate symbol properties', () => {
    const foo = {
      a: 1,
      b: 2,
      [Symbol()]: 3,
    };

    expect(getOwnEnumerableStringKeys(foo)).toEqual(['a', 'b']);
  });

  it('should iterate over empty slots in sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    const a = [1, , , 4];

    expect(getOwnEnumerableStringKeys(a)).toEqual(['0', '1', '2', '3']);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(forOwn).toEqualTypeOf<typeof forOwnLodash>();
  });
});

function getOwnEnumerableStringKeys(object: object) {
  const keys: string[] = [];

  forOwn(object, (_, key) => {
    keys.push(key);
  });

  return keys;
}
