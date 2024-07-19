import { describe, expect, it } from "vitest";
import { isPlainObject } from "./isPlainObject";
import { falsey } from "../_internal/falsey";

describe('isPlainObject', () => {
  it('should detect plain objects', () => {
    class Foo {
      a: number;
      b: number;

      constructor(b: number) {
        this.a = 1;
        this.b = b
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
    expect(isPlainObject(arguments)).toBe(false);
    expect(isPlainObject(Error)).toBe(false);
    expect(isPlainObject(Math)).toBe(false);
  });

  it('should return `false` for non-objects', () => {
    const expected = falsey.map(() => false);

    const actual = falsey.map((value, index) =>
      index ? isPlainObject(value) : isPlainObject(),
    );

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
      // @ts-ignore
      proto[Symbol.toStringTag] = undefined;
      const object = Object.create(proto);

      expect(isPlainObject(object)).toBe(false);
      expect(object.hasOwnProperty(Symbol.toStringTag)).toBe(false);
    }
  });
});
