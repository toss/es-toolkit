import { describe, expect, expectTypeOf, it } from 'vitest';
import { defaults } from 'es-toolkit/compat';
import { defaults as defaultsLodash } from 'lodash';
import { objectProto } from '../_internal/objectProto';
import * as esToolkit from '../index';

describe('defaults', () => {
  it('should assign source properties if missing on `object`', () => {
    const actual = defaults({ a: 1 }, { a: 2, b: 2 });
    expect(actual).toEqual({ a: 1, b: 2 });
  });

  it('should accept multiple sources', () => {
    const expected = { a: 1, b: 2, c: 3 };
    let actual = defaults({ a: 1, b: 2 }, { b: 3 }, { c: 3 });

    expect(actual).toEqual(expected);

    actual = defaults({ a: 1, b: 2 }, { b: 3, c: 3 }, { c: 2 });
    expect(actual).toEqual(expected);
  });

  it('should not overwrite `null` values', () => {
    const actual = defaults({ a: null }, { a: 1 });
    expect((actual as any).a).toBe(null);
  });

  it('should overwrite `undefined` values', () => {
    const actual = defaults({ a: undefined }, { a: 1 });
    expect((actual as any).a).toBe(1);
  });

  it('should assign `undefined` values', () => {
    const source = { a: undefined, b: 1 };
    const actual = defaults({}, source);

    expect(actual).toEqual({ a: undefined, b: 1 });
  });

  it('should assign properties that shadow those on `Object.prototype`', () => {
    const object = {
      constructor: objectProto.constructor,
      hasOwnProperty: objectProto.hasOwnProperty,
      isPrototypeOf: objectProto.isPrototypeOf,
      propertyIsEnumerable: objectProto.propertyIsEnumerable,
      toLocaleString: objectProto.toLocaleString,
      toString: objectProto.toString,
      valueOf: objectProto.valueOf,
    };

    const source = {
      constructor: 1,
      hasOwnProperty: 2,
      isPrototypeOf: 3,
      propertyIsEnumerable: 4,
      toLocaleString: 5,
      toString: 6,
      valueOf: 7,
    };

    let expected = esToolkit.clone(source);
    expect(defaults({}, source)).toEqual(expected);

    expected = esToolkit.clone(object);
    expect(defaults({}, object, source)).toEqual(expected);
  });

  it('should be used as a iteratee', () => {
    const array = [{ b: 1 }, { c: 2 }, { d: 3 }];
    const source = { a: 4 };
    array.forEach((...args: any[]) => defaults(source, ...args));
    expect(source).toEqual({ a: 4, b: 1, c: 2, d: 3 });
  });

  it('should match the type of lodash', () => {
    expectTypeOf(defaults).toEqualTypeOf<typeof defaultsLodash>();
  });
});
