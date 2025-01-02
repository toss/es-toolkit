import { describe, expect, it } from 'vitest';
import { constant } from './constant';
import { method as methodToolkit } from './method';
import { times } from './times';
import { noop } from '../../function/noop';
import { stubOne } from '../_internal/stubOne';
import { forEach } from '../array/forEach';
import { map } from '../array/map';

describe('method', () => {
  it('should create a function that calls a method of a given object', () => {
    const object = { a: stubOne };

    forEach(['a', ['a']], path => {
      const method = methodToolkit(path);
      expect(method.length).toBe(1);
      expect(method(object)).toBe(1);
    });
  });

  it('should work with deep property values', () => {
    const object = { a: { b: () => 2 } };

    forEach(['a.b', ['a', 'b']], path => {
      const method = methodToolkit(path);
      expect(method(object)).toBe(2);
    });
  });

  it('should work with a non-string `path`', () => {
    const array = times(3, constant);

    forEach([1, [1]], path => {
      const method = methodToolkit(path);
      expect(method(array)).toBe(1);
    });
  });

  it('should coerce `path` to a string', () => {
    function fn() {}
    fn.toString = constant('fn');

    const expected = [1, 2, 3, 4];
    const object = {
      null: stubOne,
      undefined: () => 2,
      fn: () => 3,
      '[object Object]': () => 4,
    };
    const paths = [null, undefined, fn, {}];

    times(2, index => {
      const actual = map(paths, path => {
        const method = methodToolkit(index ? [path] : (path as any));
        return method(object);
      });

      expect(actual).toEqual(expected);
    });
  });

  it('should work with inherited property values', () => {
    function Foo() {}
    Foo.prototype.a = stubOne;

    forEach(['a', ['a']], path => {
      const method = methodToolkit(path);
      // eslint-disable-next-line
      // @ts-ignore
      expect(method(new Foo())).toBe(1);
    });
  });

  it('should use a key over a path', () => {
    const object = { 'a.b': stubOne, a: { b: () => 2 } };

    forEach(['a.b', ['a.b']], path => {
      const method = methodToolkit(path);
      expect(method(object)).toBe(1);
    });
  });

  it('should return `undefined` when `object` is nullish', () => {
    const values = [, null, undefined];
    const expected = map(values, noop);

    forEach(['constructor', ['constructor']], path => {
      const method = methodToolkit(path);

      const actual = map(values, (value, index) => (index ? method(value) : method()));

      expect(actual).toEqual(expected);
    });
  });

  it('should return `undefined` for deep paths when `object` is nullish', () => {
    const values = [, null, undefined];
    const expected = map(values, noop);

    forEach(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], path => {
      const method = methodToolkit(path);

      const actual = map(values, (value, index) => (index ? method(value) : method()));

      expect(actual).toEqual(expected);
    });
  });

  it('should return `undefined` if parts of `path` are missing', () => {
    const object = {};

    forEach(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], path => {
      const method = methodToolkit(path);
      expect(method(object)).toBe(undefined);
    });
  });

  it('should apply partial arguments to function', () => {
    const object = {
      fn: function () {
        return Array.prototype.slice.call(arguments);
      },
    };

    forEach(['fn', ['fn']], path => {
      const method = methodToolkit(path, 1, 2, 3);
      expect(method(object)).toEqual([1, 2, 3]);
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

    forEach(['a.b', ['a', 'b']], path => {
      const method = methodToolkit(path);
      expect(method(object)).toBe(1);
    });
  });
});
