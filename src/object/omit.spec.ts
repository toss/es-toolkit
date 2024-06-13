import { describe, expect, it } from 'vitest';
import { omit } from './omit';

describe('omit', () => {
  it('should omit properties from an object', () => {
    const object = { foo: 1, bar: 2, baz: 3 };

    expect(omit(object, ['foo', 'bar'])).toEqual({ baz: 3 });
  });

  it('should return an empty object if all keys are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['a', 'b', 'c']);
    expect(result).toEqual({});
  });

  it('should return the same object if no keys are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, []);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should not affect the original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['b']);
    expect(result).toEqual({ a: 1, c: 3 });
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });
});
