import { describe, expect, expectTypeOf, it } from 'vitest';
import { omit } from './omit';

describe('omit', () => {
  it('should omit properties from an object', () => {
    const object = { foo: 1, bar: 2, baz: 3 };
    const result = omit(object, ['foo', 'bar']);
    expect(result).toEqual({ baz: 3 });
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

  it('should work with type unions', () => {
    type A = { type: 'a'; a: number };
    type B = { type: 'b'; b: string };
    type Union = A | B;

    const obj = { type: 'a', a: 1 } as Union;
    const result = omit(obj, ['b']);

    expectTypeOf(result).toEqualTypeOf<A | Omit<B, 'b'>>();
    expect(result).toEqual({ type: 'a', a: 1 });
  });

  it('should keep the discriminant of a type union', () => {
    type A = { type: 'a'; a: number };
    type B = { type: 'b'; b: string };
    type Union = A | B;

    const obj = { type: 'b', b: 'hello' } as Union;
    const result = omit(obj, ['a', 'b']);

    expectTypeOf(result).toEqualTypeOf<Omit<A, 'a' | 'b'> | Omit<B, 'a' | 'b'>>();
    expect(result).toEqual({ type: 'b' });
  });
});
