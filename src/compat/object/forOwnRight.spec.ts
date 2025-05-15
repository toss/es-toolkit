import { describe, expect, it } from 'vitest';
import { forOwnRight } from './forOwnRight';

/**
 * x@see https://github.com/lodash/lodash/blob/v5-wip/test/forOwn-methods.spec.js#L1
 */
describe('forOwnRight', () => {
  it('should iterate over `length` properties in reverse order', () => {
    const object = { 0: 'zero', 1: 'one', length: 2 };
    const props: string[] = [];

    forOwnRight(object, (_, prop) => {
      props.push(prop);
    });

    expect(props).toEqual(['length', '1', '0']);
  });

  it('should return `object` itself', () => {
    expect(forOwnRight(null)).toBe(null);
    expect(forOwnRight(undefined)).toBe(undefined);
    expect(forOwnRight([])).toEqual([]);
    expect(forOwnRight([1])).toEqual([1]);
    expect(forOwnRight({ 0: 1, length: 1 })).toEqual({ 0: 1, length: 1 });
    expect(forOwnRight({})).toEqual({});
    expect(forOwnRight({ a: 1 })).toEqual({ a: 1 });
  });

  it(`should provide correct iteratee arguments`, () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let args: any;
    const object = {
      a: 1,
      b: 2,
    };

    forOwnRight(object, function (value, key, collection) {
      args = [value, key, collection];
    });

    expect(args).toEqual([1, 'a', { a: 1, b: 2 }]);
  });

  it(`should exit iteration when iteratee returns false`, () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
    };
    const keys: string[] = [];

    forOwnRight(object, (_, key) => {
      keys.push(key);
      if (keys.length === 1) {
        return false;
      }
    });

    expect(keys).toEqual(['c']);
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

    const keys: string[] = [];
    forOwnRight(new Foo(), (_, key) => {
      keys.push(key);
    });

    expect(keys).toEqual(['b', 'a']);
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

    const keys: string[] = [];
    forOwnRight(foo, (_, key) => {
      keys.push(key);
    });

    expect(keys).toEqual(['b', 'a']);
  });

  it('should not iterate symbol properties', () => {
    const foo = {
      a: 1,
      b: 2,
      [Symbol()]: 3,
    };

    const keys: string[] = [];
    forOwnRight(foo, (_, key) => {
      keys.push(key);
    });

    expect(keys).toEqual(['b', 'a']);
  });

  it('should iterate over empty slots in sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays
    const a = [1, , , 4];

    const keys: string[] = [];
    forOwnRight(a, (_, key) => {
      keys.push(key);
    });

    expect(keys).toEqual(['3', '2', '1', '0']);
  });
});
