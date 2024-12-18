import { describe, expect, it } from 'vitest';
import { constant, each, map, noop } from '..';
import { methodOf as methodOfToolkit } from './methodOf';
import { times } from './times';
import { stubFour } from '../_internal/stubFour';
import { stubOne } from '../_internal/stubOne';
import { stubThree } from '../_internal/stubThree';
import { stubTwo } from '../_internal/stubTwo';

describe('methodOf', () => {
  it('should create a function that calls a method of a given key', () => {
    const object = { a: stubOne };

    each(['a', ['a']], path => {
      const methodOf = methodOfToolkit(object);
      expect(methodOf.length).toBe(1);
      expect(methodOf(path)).toBe(1);
    });
  });

  it('should work with deep property values', () => {
    const object = { a: { b: stubTwo } };

    each(['a.b', ['a', 'b']], path => {
      const methodOf = methodOfToolkit(object);
      expect(methodOf(path)).toBe(2);
    });
  });

  it('should work with a non-string `path`', () => {
    const array = times(3, constant);

    each([1, [1]], path => {
      const methodOf = methodOfToolkit(array);
      expect(methodOf(path)).toBe(1);
    });
  });

  it('should coerce `path` to a string', () => {
    function fn() {}
    fn.toString = constant('fn');

    const expected = [1, 2, 3, 4];
    const object = {
      null: stubOne,
      undefined: stubTwo,
      fn: stubThree,
      '[object Object]': stubFour,
    };
    const paths = [null, undefined, fn, {}];

    times(2, index => {
      const actual = map(paths, path => {
        const methodOf = methodOfToolkit(object);
        // @ts-expect-error - methodOf should handle nullish values
        return methodOf(index ? [path] : path);
      });

      expect(actual).toEqual(expected);
    });
  });

  it('should work with inherited property values', () => {
    function Foo() {}
    Foo.prototype.a = stubOne;

    each(['a', ['a']], path => {
      // @ts-expect-error - Foo is a constructor
      const methodOf = methodOfToolkit(new Foo());
      expect(methodOf(path)).toBe(1);
    });
  });

  it('should use a key over a path', () => {
    const object = { 'a.b': stubOne, a: { b: stubTwo } };

    each(['a.b', ['a.b']], path => {
      const methodOf = methodOfToolkit(object);
      expect(methodOf(path)).toBe(1);
    });
  });

  it('should return `undefined` when `object` is nullish', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = map(values, noop);

    each(['constructor', ['constructor']], path => {
      const actual = map(values, (value, index) => {
        // @ts-expect-error - methodOf should handle nullish values
        const methodOf = index ? methodOfToolkit() : methodOfToolkit(value);
        return methodOf(path);
      });

      expect(actual).toEqual(expected);
    });
  });

  it('should return `undefined` for deep paths when `object` is nullish', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = map(values, noop);

    each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], path => {
      const actual = map(values, (value, index) => {
        // @ts-expect-error - methodOf should handle nullish values
        const methodOf = index ? methodOfToolkit() : methodOfToolkit(value);
        return methodOf(path);
      });

      expect(actual).toEqual(expected);
    });
  });

  it('should return `undefined` if parts of `path` are missing', () => {
    const object = {};
    const methodOf = methodOfToolkit(object);

    each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], path => {
      expect(methodOf(path)).toBe(undefined);
    });
  });

  it('should apply partial arguments to function', () => {
    const object = {
      fn: function () {
        // eslint-disable-next-line prefer-rest-params
        return Array.prototype.slice.call(arguments);
      },
    };

    const methodOf = methodOfToolkit(object, 1, 2, 3);

    each(['fn', ['fn']], path => {
      expect(methodOf(path)).toEqual([1, 2, 3]);
    });
  });

  it('should invoke deep property methods with the correct `this` binding', () => {
    const object = {
      a: {
        b: function () {
          return this.c;
        },
        c: 1,
      },
    };
    const methodOf = methodOfToolkit(object);

    each(['a.b', ['a', 'b']], path => {
      expect(methodOf(path)).toBe(1);
    });
  });
});
