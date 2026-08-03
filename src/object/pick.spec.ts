import { describe, expect, expectTypeOf, it } from 'vitest';
import { pick } from './pick';

describe('pick', () => {
  it('should pick properties from an object', () => {
    const object = { foo: 1, bar: 2, baz: 3 };
    const result = pick(object, ['foo', 'bar']);
    expect(result).toEqual({ foo: 1, bar: 2 });
  });

  it('should return the same object if all keys are picked', () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = pick(object, ['a', 'b', 'c']);
    expect(result).toEqual(object);
  });

  it('should return an empty object if the key array is empty', () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = pick(object, []);
    expect(result).toEqual({});
  });

  it('should work with nested objects', () => {
    const object = { a: 1, b: { nested: 'pick' }, c: 3 };
    const result = pick(object, ['a', 'b', 'c']);
    expect(result).toEqual({ a: 1, b: { nested: 'pick' }, c: 3 });
  });

  it('should not pick from nonexistent keys', () => {
    const obj: { a?: unknown } = {};
    const result = pick(obj, ['a']);

    expect(Reflect.ownKeys(result)).toEqual([]);
  });

  it('should work with type unions', () => {
    type A = { type: 'a'; a: number };
    type B = { type: 'b'; b: string };
    type Union = A | B;

    const obj = { type: 'a', a: 1 } as Union;
    const result = pick(obj, ['b']);

    expectTypeOf(result).toEqualTypeOf<Pick<A, never> | Pick<B, 'b'>>();
    expect(result).toEqual({});
  });

  it('should pick each member of a type union separately', () => {
    type A = { type: 'a'; a: number };
    type B = { type: 'b'; b: string };
    type Union = A | B;

    const obj = { type: 'b', b: 'hello' } as Union;
    const result = pick(obj, ['type', 'b']);

    expectTypeOf(result).toEqualTypeOf<Pick<A, 'type'> | Pick<B, 'type' | 'b'>>();
    expect(result).toEqual({ type: 'b', b: 'hello' });
  });
});
