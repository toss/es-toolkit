import { describe, expect, it } from 'vitest';
import { omitBy } from './omitBy';
import { symbol } from '../_internal/symbol';
import { castArray } from '../array/castArray';
import { map } from '../array/map';
import { some } from '../array/some';
import { isSymbol } from '../predicate/isSymbol';
import { toString } from '../util/toString';

describe('omitBy', () => {
  const object = { a: 1, b: 2, c: 3, d: 4 };
  const expected = { b: 2, d: 4 };
  const resolve = function (object: any, props: any) {
    props = castArray(props);
    return function (value: any) {
      return some(props, (key: any) => {
        key = isSymbol(key) ? key : toString(key);
        return object[key] === value;
      });
    };
  };

  it('should create an object with omitted string keyed properties', () => {
    expect(omitBy(object, resolve(object, 'a'))).toEqual({ b: 2, c: 3, d: 4 });
    expect(omitBy(object, resolve(object, ['a', 'c']))).toEqual(expected);
  });

  it('should include inherited string keyed properties', () => {
    function Foo() {}
    Foo.prototype = object;

    // @ts-expect-error - Foo is a constructor
    const foo = new Foo();
    expect(omitBy(foo, resolve(object, ['a', 'c']))).toEqual(expected);
  });

  it('omitBy should preserve the sign of 0', () => {
    const object = { '-0': 'a', 0: 'b' };
    const props = [-0, Object(-0), 0, Object(0)];
    const expected = [{ 0: 'b' }, { 0: 'b' }, { '-0': 'a' }, { '-0': 'a' }];

    const actual = map(props, (key: any) => omitBy(object, resolve(object, key)));

    expect(actual).toEqual(expected);
  });

  it('should include symbols', () => {
    function Foo(this: any) {
      this.a = 0;
      this[symbol] = 1;
    }

    if (Symbol) {
      const symbol2 = Symbol('b');
      Foo.prototype[symbol2] = 2;

      const symbol3 = Symbol('c');
      Object.defineProperty(Foo.prototype, symbol3, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: 3,
      });

      // @ts-expect-error - Foo is a constructor
      const foo = new Foo();
      const actual = omitBy(foo, resolve(foo, 'a'));

      expect(actual[symbol as any]).toBe(1);
      expect(actual[symbol2 as any]).toBe(2);
      expect(symbol3 in actual).toBeFalsy();
    }
  });

  it('should create an object with omitted symbols', () => {
    function Foo(this: any) {
      this.a = 0;
      this[symbol] = 1;
    }

    if (Symbol) {
      const symbol2 = Symbol('b');
      Foo.prototype[symbol2] = 2;

      const symbol3 = Symbol('c');
      Object.defineProperty(Foo.prototype, symbol3, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: 3,
      });

      // @ts-expect-error - Foo is a constructor
      const foo = new Foo();
      let actual = omitBy(foo, resolve(foo, symbol));

      expect(actual.a).toBe(0);
      expect(symbol in actual).toBeFalsy();
      expect(actual[symbol2 as any]).toBe(2);
      expect(symbol3 in actual).toBeFalsy();

      actual = omitBy(foo, resolve(foo, symbol2));

      expect(actual.a).toBe(0);
      expect(actual[symbol as any]).toBe(1);
      expect(symbol2 in actual).toBeFalsy();
      expect(symbol3 in actual).toBeFalsy();
    }
  });

  it('should work with an array object', () => {
    const array = [1, 2, 3];
    expect(omitBy(array, resolve(array, ['0', '2']))).toEqual({ 1: 2 });
  });

  it('should return an empty object if shouldOmit is null', () => {
    const obj = { a: 1, b: 'omit', c: 3 };
    const result = omitBy(obj, null as any);
    expect(result).toEqual({});
  });

  it('should return an empty object if the object is null', () => {
    const obj = null;
    const shouldOmit = (value: string) => typeof value === 'string';
    const result = omitBy(obj as unknown as object, shouldOmit);
    expect(result).toEqual({});
  });
});
