import { describe, expect, expectTypeOf, it } from 'vitest';
import { pickBy } from './pickBy';

describe('pickBy', () => {
  it('should pick properties based on the predicate function', () => {
    const obj = { a: 1, b: 'pick', c: 3 };
    const shouldPick = (value: string | number) => typeof value === 'string';
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({ b: 'pick' });
  });

  it('should return an empty object if no properties satisfy the predicate', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const shouldPick = (value: number) => typeof value === 'string';
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({});
  });

  it('should return the same object if all properties satisfy the predicate', () => {
    const obj = { a: 'pick', b: 'pick', c: 'pick' };
    const shouldPick = (value: string) => typeof value === 'string';
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual(obj);
  });

  it('should work with an empty object', () => {
    const obj = {};
    const shouldPick = (value: never) => value;
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({});
  });

  it('should work with nested objects', () => {
    const obj = { a: 1, b: { nested: 'pick' }, c: 3 };
    const shouldPick = (value: number | { nested: string }, key: string) => key === 'b';
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({ b: { nested: 'pick' } });
  });

  it('should pass numeric keys as strings', () => {
    const obj = { 1: 'skip', 2: 'pick' };
    const keys: string[] = [];

    const result = pickBy(obj, (value, key) => {
      expectTypeOf(key).toEqualTypeOf<'1' | '2'>();
      keys.push(key);
      return value === 'pick';
    });

    expect(keys).toEqual(['1', '2']);
    expect(result).toEqual({ 2: 'pick' });
  });

  it('should type number index signature keys as numeric strings', () => {
    const obj: Record<number, string> = { 1: 'skip', 2: 'pick' };

    const result = pickBy(obj, (_value, key) => {
      expectTypeOf(key).toEqualTypeOf<`${number}`>();
      return key === '2';
    });

    expectTypeOf(result).toEqualTypeOf<Record<number, string>>();
  });

  it('should preserve string index signatures', () => {
    const obj: Record<string, number> = { a: 1, b: 2 };
    const result = pickBy(obj, value => value === 2);

    expectTypeOf(result).toEqualTypeOf<Record<string, number>>();
  });

  it('should not preserve required properties alongside an index signature', () => {
    const obj: Record<string, number> & { required: number } = { required: 1, other: 2 };
    const result = pickBy(obj, (_value, key) => key !== 'required');

    expectTypeOf(result).toEqualTypeOf<Record<string, number>>();
    expect(result).toEqual({ other: 2 });
  });

  it('should preserve string literal key types', () => {
    const result = pickBy({ a: 1, b: 2 }, (_value, key) => {
      expectTypeOf(key).toEqualTypeOf<'a' | 'b'>();
      return true;
    });

    expectTypeOf(result).toEqualTypeOf<Partial<{ a: number; b: number }>>();
  });
});
