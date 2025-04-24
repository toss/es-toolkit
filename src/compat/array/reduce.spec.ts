import { describe, expect, it } from 'vitest';
import * as lodashStable from 'es-toolkit/compat';
import { head } from './head';
import { reduce } from './reduce';
import { empties } from '../_internal/empties';
import { MAX_SAFE_INTEGER } from '../_internal/MAX_SAFE_INTEGER';
import { keys } from '../object/keys';

describe('reduce', () => {
  const array = [1, 2, 3];

  it(`should reduce a collection to a single value`, () => {
    const actual = reduce(['a', 'b', 'c'], (accumulator, value) => accumulator + value, '');

    expect(actual).toBe('abc');
  });

  it(`should support empty collections without an initial \`accumulator\` value`, () => {
    const actual: any[] = [];
    const expected = lodashStable.map(empties, lodashStable.noop);

    lodashStable.each(empties, value => {
      try {
        // eslint-disable-next-line
        // @ts-ignore
        actual.push(reduce(value, lodashStable.noop));
      } catch (e) {
        //
      }
    });

    expect(actual).toEqual(expected);
  });

  it(`should support empty collections with an initial \`accumulator\` value`, () => {
    const expected = lodashStable.map(empties, lodashStable.constant('x'));

    const actual = lodashStable.map(empties, value => {
      try {
        // eslint-disable-next-line
        // @ts-ignore
        return reduce(value, lodashStable.noop, 'x');
      } catch (e) {
        //
      }
    });

    expect(actual).toEqual(expected);
  });

  it(`should handle an initial \`accumulator\` value of \`undefined\``, () => {
    const actual = reduce([], lodashStable.noop, undefined);
    expect(actual).toBe(undefined);
  });

  it(`should return \`undefined\` for empty collections when no \`accumulator\` is given (test in IE > 9 and modern browsers)`, () => {
    const array: any[] = [];
    const object = { 0: 1, length: 0 };

    if ('__proto__' in array) {
      array.__proto__ = object;
      expect(reduce(array, lodashStable.noop)).toBe(undefined);
    }
    // eslint-disable-next-line
    // @ts-ignore
    expect(reduce(object, lodashStable.noop)).toBe(undefined);
  });

  it('should use the first element of a collection as the default `accumulator`', () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(reduce(array)).toBe(1);
  });

  it('should provide correct `iteratee` arguments when iterating an array', () => {
    let args: any;

    reduce(
      array,
      function () {
        // eslint-disable-next-line
        args || (args = Array.prototype.slice.call(arguments));
      },
      // eslint-disable-next-line
      // @ts-ignore
      0
    );

    expect(args).toEqual([0, 1, 0, array]);

    args = undefined;
    // eslint-disable-next-line
    // @ts-ignore
    reduce(array, function () {
      // eslint-disable-next-line
      args || (args = Array.prototype.slice.call(arguments));
    });

    expect(args).toEqual([1, 2, 1, array]);
  });

  it('should provide correct `iteratee` arguments when iterating an object', () => {
    let args: any;
    const object = { a: 1, b: 2 };
    const firstKey = head(keys(object));

    let expected = firstKey === 'a' ? [0, 1, 'a', object] : [0, 2, 'b', object];

    // eslint-disable-next-line
    // @ts-ignore
    reduce(
      object,
      function () {
        // eslint-disable-next-line
        args || (args = Array.prototype.slice.call(arguments));
      },
      0
    );

    expect(args).toEqual(expected);

    args = undefined;
    expected = firstKey === 'a' ? [1, 2, 'b', object] : [2, 1, 'a', object];

    // eslint-disable-next-line
    // @ts-ignore
    reduce(object, function () {
      // eslint-disable-next-line
      args || (args = Array.prototype.slice.call(arguments));
    });

    expect(args).toEqual(expected);
  });

  it(`should use \`isArrayLike\` to determine whether a value is array-like`, () => {
    const isIteratedAsObject = function (object: any) {
      let result = false;

      reduce(
        object,
        () => {
          result = true;
        },
        0 as any
      );
      return result;
    };

    const values = [-1, '1', 1.1, Object(1), MAX_SAFE_INTEGER + 1];
    const expected = lodashStable.map(values, lodashStable.stubTrue);

    const actual = lodashStable.map(values, length => isIteratedAsObject({ length: length }));

    // eslint-disable-next-line
    const Foo = function (a: any) {};
    Foo.a = 1;

    expect(actual).toEqual(expected);
    expect(isIteratedAsObject(Foo)).toBeTruthy();
    expect(isIteratedAsObject({ length: 0 })).toBeFalsy();
  });

  it(`should ignore added \`object\` properties`, () => {
    let count = 0;
    const object: any = { a: 1 };

    reduce(
      object,
      () => {
        if (++count === 1) {
          object.b = 2;
        }
        return true;
      },
      object
    );

    expect(count).toBe(1);
  });
});
