import { describe, expect, expectTypeOf, it } from 'vitest';
import type { isPlainObject as isPlainObjectLodash } from 'lodash';
import { isPlainObject } from './isPlainObject';
import { falsey } from '../_internal/falsey';

describe('isPlainObject', () => {
  it('should detect plain objects', () => {
    class Foo {
      a: number;
      b: number;

      constructor(b: number) {
        this.a = 1;
        this.b = b;
      }
    }

    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
    expect(isPlainObject({ constructor: Foo })).toBe(true);
    expect(isPlainObject([1, 2, 3])).toBe(false);
    expect(isPlainObject(new Foo(1))).toBe(false);
  });

  it('should return `true` for objects with a `[[Prototype]]` of `null`', () => {
    const object = Object.create(null);
    expect(isPlainObject(object)).toBe(true);

    object.constructor = Object.prototype.constructor;
    expect(isPlainObject(object)).toBe(true);
  });

  it('should return `true` for objects with a `valueOf` property', () => {
    expect(isPlainObject({ valueOf: 0 })).toBe(true);
  });

  it('should return `true` for objects with a writable `Symbol.toStringTag` property', () => {
    if (Symbol && Symbol.toStringTag) {
      const object = {};
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      object[Symbol.toStringTag] = 'X';

      expect(isPlainObject(object)).toEqual(true);
    }
  });

  it('should return `false` for objects with a custom `[[Prototype]]`', () => {
    const object = Object.create({ a: 1 });
    expect(isPlainObject(object)).toBe(false);
  });

  it('should return `false` for non-Object objects', function () {
    // eslint-disable-next-line prefer-rest-params
    expect(isPlainObject(arguments)).toBe(false);
    expect(isPlainObject(Error)).toBe(false);
    expect(isPlainObject(Math)).toBe(false);
  });

  it('should return `false` for non-objects', () => {
    const expected = falsey.map(() => false);

    const actual = falsey.map((value, index) => (index ? isPlainObject(value) : isPlainObject()));

    expect(actual).toEqual(expected);

    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject('a')).toBe(false);
    expect(isPlainObject(Symbol('a'))).toBe(false);
  });

  it('should return `false` for objects with a read-only `Symbol.toStringTag` property', () => {
    if (Symbol && Symbol.toStringTag) {
      const object = {};
      Object.defineProperty(object, Symbol.toStringTag, {
        configurable: true,
        enumerable: false,
        writable: false,
        value: 'X',
      });

      expect(isPlainObject(object)).toEqual(false);
    }
  });

  it('should not mutate `value`', () => {
    if (Symbol && Symbol.toStringTag) {
      const proto = {};
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      proto[Symbol.toStringTag] = undefined;
      const object = Object.create(proto);

      expect(isPlainObject(object)).toBe(false);
      // eslint-disable-next-line no-prototype-builtins
      expect(object.hasOwnProperty(Symbol.toStringTag)).toBe(false);
    }
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isPlainObject).toEqualTypeOf<typeof isPlainObjectLodash>();
  });
});
