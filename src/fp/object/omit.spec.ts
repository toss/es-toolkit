import { describe, expect, it } from 'vitest';
import { omit } from './omit';

describe('omit', () => {
  it('(non-curried) should omit properties from an object', () => {
    const object = { foo: 1, bar: 2, baz: 3 };
    const result = omit(object, ['foo', 'bar']);
    expect(result).toEqual({ baz: 3 });
  });

  it('(curried) should omit properties from an object', () => {
    const object = { foo: 1, bar: 2, baz: 3 };
    const result = omit(['foo', 'bar'])(object);
    expect(result).toEqual({ baz: 3 });
  });

  it('(non-curried) should return an empty object if all keys are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['a', 'b', 'c']);
    expect(result).toEqual({});
  });

  it('(curried) should return an empty object if all keys are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(['a', 'b', 'c'])(obj);
    expect(result).toEqual({});
  });

  it('(non-curried) should return the same object if no keys are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, []);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('(curried) should return the same object if no keys are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit([])(obj);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('(non-curried) should not affect the original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['b']);
    expect(result).toEqual({ a: 1, c: 3 });
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('(curried) should not affect the original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(['b'])(obj);
    expect(result).toEqual({ a: 1, c: 3 });
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });
});
