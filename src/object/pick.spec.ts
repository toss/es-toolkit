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

  it('should return Pick<T, K> when given a literal tuple (all keys guaranteed)', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ['a', 'b']);

    expectTypeOf(result).toEqualTypeOf<Pick<typeof obj, 'a' | 'b'>>();
  });

  it('should return Partial<Pick<T, K>> when given a non-tuple array (not all keys guaranteed)', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys: ('a' | 'b')[] = Math.random() > 0.5 ? ['a'] : ['b'];
    const result = pick(obj, keys);

    expectTypeOf(result).toEqualTypeOf<Partial<Pick<typeof obj, 'a' | 'b'>>>();
  });
});
