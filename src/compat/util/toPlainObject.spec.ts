import { describe, expect, it } from 'vitest';
import { toPlainObject } from './toPlainObject';
import { args } from '../_internal/args';

describe('toPlainObject', () => {
  it('should flatten inherited string keyed properties', () => {
    function Foo(this: any) {
      this.b = 2;
    }
    Foo.prototype.c = 3;

    // @ts-expect-error - Foo is a constructor
    const actual = Object.assign({ a: 1 }, toPlainObject(new Foo()));
    expect(actual).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should convert `arguments` objects to plain objects', () => {
    const actual = toPlainObject(args);
    const expected = { 0: 1, 1: 2, 2: 3 };

    expect(actual).toEqual(expected);
  });

  it('should convert arrays to plain objects', () => {
    const actual = toPlainObject(['a', 'b', 'c']);
    const expected = { 0: 'a', 1: 'b', 2: 'c' };

    expect(actual).toEqual(expected);
  });

  it('should convert objects with an enumerable `__proto__` property to plain objects', () => {
    const object = {};
    Object.defineProperty(object, '__proto__', {
      value: { a: 1 },
      enumerable: true,
    });
    expect(toPlainObject(object)).toEqual({ ['__proto__']: { a: 1 } });
  });
});
