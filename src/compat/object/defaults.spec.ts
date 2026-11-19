import { describe, expect, it } from 'vitest';
import { defaults } from './defaults';
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

  it('should assign inherited source properties', () => {
    const source = Object.create({ inherited: 1 });

    expect(defaults({}, source)).toEqual({ inherited: 1 });
    expect(defaults({ inherited: undefined }, source)).toEqual({ inherited: 1 });
  });

  it('should not assign an inherited `constructor` property', () => {
    const source = Object.create({ constructor: 1, inherited: 2 });

    expect(defaults({}, source)).toEqual({ inherited: 2 });
  });

  it('should treat sparse array sources as dense', () => {
    const source = [1, 2, 3];
    delete source[1];

    expect(defaults({}, source)).toEqual({ 0: 1, 1: undefined, 2: 3 });
  });

  it('should assign inherited array-like properties', () => {
    const source: any = Object.create({ 0: 'a', constructor: 1, inherited: 2 });
    source.length = 1;

    expect(defaults({}, source)).toEqual({ 0: 'a', length: 1, constructor: 1, inherited: 2 });
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

  it('should not throw an error when a source is `undefined`', () => {
    const source = undefined;
    const actual = defaults({ a: 1 }, source);
    expect(actual).toEqual({ a: 1 });
  });

  it('should not throw an error when a source is `null`', () => {
    const source = null;
    const actual = defaults({ a: 1 }, source);
    expect(actual).toEqual({ a: 1 });
  });
});
