import { describe, expect, expectTypeOf, it } from 'vitest';
import { omitBy } from './omitBy';

describe('omitBy', () => {
  it('should omit properties based on the predicate function', () => {
    const obj = { a: 1, b: 'omit', c: 3 };
    const shouldOmit = (value: number | string) => typeof value === 'string';
    const result = omitBy(obj, shouldOmit);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should return an empty object if all properties are omitted', () => {
    const obj = { a: 'omit', b: 'omit' };
    const shouldOmit = (value: string) => typeof value === 'string';
    const result = omitBy(obj, shouldOmit);
    expect(result).toEqual({});
  });

  it('should return the same object if no properties are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const shouldOmit = (value: number) => typeof value === 'string';
    const result = omitBy(obj, shouldOmit);
    expect(result).toEqual(obj);
  });

  it('should work with an empty object', () => {
    const obj = {};
    const shouldOmit = (value: never) => value;
    const result = omitBy(obj, shouldOmit);
    expect(result).toEqual({});
  });

  it('should work with nested objects', () => {
    const obj = { a: 1, b: { nested: 'omit' }, c: 3 };
    const shouldOmit = (_: number | { nested: string }, key: string) => key === 'b';
    const result = omitBy(obj, shouldOmit);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should pass numeric keys as strings', () => {
    const obj = { 1: 'keep', 2: 'omit' };
    const keys: string[] = [];

    const result = omitBy(obj, (value, key) => {
      expectTypeOf(key).toEqualTypeOf<'1' | '2'>();
      keys.push(key);
      return value === 'omit';
    });

    expect(keys).toEqual(['1', '2']);
    expect(result).toEqual({ 1: 'keep' });
  });

  it('should type number index signature keys as numeric strings', () => {
    const obj: Record<number, string> = { 1: 'keep', 2: 'omit' };

    const result = omitBy(obj, (_value, key) => {
      expectTypeOf(key).toEqualTypeOf<`${number}`>();
      return key === '2';
    });

    expectTypeOf(result).toEqualTypeOf<Record<number, string>>();
  });

  it('should preserve string index signatures', () => {
    const obj: Record<string, number> = { a: 1, b: 2 };
    const result = omitBy(obj, value => value === 2);

    expectTypeOf(result).toEqualTypeOf<Record<string, number>>();
  });

  it('should not preserve required properties alongside an index signature', () => {
    const obj: Record<string, number> & { required: number } = { required: 1, other: 2 };
    const result = omitBy(obj, (_value, key) => key === 'required');

    expectTypeOf(result).toEqualTypeOf<Record<string, number>>();
    expect(result).toEqual({ other: 2 });
  });

  it('should preserve string literal key types', () => {
    const result = omitBy({ a: 1, b: 2 }, (_value, key) => {
      expectTypeOf(key).toEqualTypeOf<'a' | 'b'>();
      return false;
    });

    expectTypeOf(result).toEqualTypeOf<Partial<{ a: number; b: number }>>();
  });
});
