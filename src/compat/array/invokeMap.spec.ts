import { describe, expect, expectTypeOf, it } from 'vitest';
import type { invokeMap as invokeMapLodash } from 'lodash';
import { invokeMap } from './invokeMap';
import { stubOne } from '../_internal/stubOne';

describe('invokeMap', () => {
  it('should invoke a methods on each element of `collection`', () => {
    const array = ['a', 'b', 'c'];
    const actual = invokeMap(array, 'toUpperCase');

    expect(actual).toEqual(['A', 'B', 'C']);
  });

  it('should support invoking with arguments', () => {
    const array = [
      function () {
        // eslint-disable-next-line prefer-rest-params
        return Array.from(arguments);
      },
    ];
    const actual = invokeMap(array, 'call', null, 'a', 'b', 'c');

    expect(actual).toEqual([['a', 'b', 'c']]);
  });

  it('should work with a function for `methodName`', () => {
    const array = ['a', 'b', 'c'];

    const actual = invokeMap(
      array,
      function (this: any, left: string, right: string) {
        return left + this.toUpperCase() + right;
      },
      '(',
      ')'
    );

    expect(actual).toEqual(['(A)', '(B)', '(C)']);
  });

  it('should work with an object for `collection`', () => {
    const object = { a: 1, b: 2, c: 3 };
    const actual = invokeMap(object, 'toFixed', 1);

    expect(actual).toEqual(['1.0', '2.0', '3.0']);
  });

  it('should treat number, null, or undefined for `collection` as empty', () => {
    // @ts-expect-error - `path` parameter is not optional
    expect(invokeMap(1)).toEqual([]);
    // @ts-expect-error - `path` parameter is not optional
    expect(invokeMap(null)).toEqual([]);
    // @ts-expect-error - `path` parameter is not optional
    expect(invokeMap(undefined)).toEqual([]);
  });

  it('should not error on nullish elements', () => {
    const array = ['a', null, undefined, 'd'];
    const actual = invokeMap(array, 'toUpperCase');

    expect(actual).toEqual(['A', undefined, undefined, 'D']);
  });

  it('should not error on elements with missing properties', () => {
    const objects = [null, undefined, stubOne].map(value => ({ a: value }));
    const expected = objects.map(object => (object.a ? object.a() : undefined));
    const actual = invokeMap(objects, 'a');

    expect(actual).toEqual(expected);
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

    const paths = ['a.b', ['a', 'b']];

    paths.forEach(path => {
      expect(invokeMap([object], path)).toEqual([1]);
    });
  });

  it('should bind `this` correctly for array path', () => {
    const singlePropObject = {
      value: function () {
        return this;
      },
    };
    expect(invokeMap([singlePropObject], ['value'])[0]).toBe(singlePropObject);

    const emptyPathObject = {
      '': function () {
        return this;
      },
    };
    expect(invokeMap([emptyPathObject], []).length).toBe(1);
    expect(invokeMap([emptyPathObject], [])[0]).toBeUndefined();

    const nestedObject = {
      a: {
        b: {
          c: function () {
            return this;
          },
        },
      },
    };
    expect(invokeMap([nestedObject], ['a', 'b', 'c'])[0]).toBe(nestedObject.a.b);
  });

  it('should bind `this` correctly for string path', () => {
    const singlePropObject = {
      value: function () {
        return this;
      },
    };
    expect(invokeMap([singlePropObject], 'value')[0]).toBe(singlePropObject);

    const emptyPathObject = {
      '': function () {
        return this;
      },
    };
    const result = invokeMap([emptyPathObject], '');
    expect(result[0]).toBe(emptyPathObject);

    const nestedObject = {
      a: {
        b: {
          c: function () {
            return this;
          },
        },
      },
    };
    expect(invokeMap([nestedObject], 'a.b.c')[0]).toBe(nestedObject.a.b);

    const objectWithEmptyPart = {
      a: {
        '': {
          c: function () {
            return this;
          },
        },
      },
    };

    const aEmptyDotC = invokeMap([objectWithEmptyPart], 'a..c');
    expect(aEmptyDotC[0]).toBeUndefined();
  });

  it('should match the type of lodash', () => {
    expectTypeOf(invokeMap).toEqualTypeOf<typeof invokeMapLodash>();
  });
});
