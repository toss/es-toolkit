import { describe, expect, expectTypeOf, it } from 'vitest';
import { pickBy } from './pickBy';

interface Item {
  name: string;
}

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

  it('should keep the original type for objects with a string index signature', () => {
    const obj: Record<string, Item> = { a: { name: 'a' }, b: { name: 'b' } };
    const result = pickBy(obj, item => item.name.startsWith('a'));
    expectTypeOf(result).toEqualTypeOf<Record<string, Item>>();
  });

  it('should keep the original type for objects with a number index signature', () => {
    const obj: Record<number, Item> = { 1: { name: 'a' }, 2: { name: 'b' } };
    const result = pickBy(obj, item => item.name.startsWith('a'));
    expectTypeOf(result).toEqualTypeOf<Record<number, Item>>();

    // The result can be passed back to anything accepting the original type.
    const processItems = (items: Record<number, Item>) => items;
    expect(processItems(result)).toEqual({ 1: { name: 'a' } });
  });

  it('should return a partial type for objects with known keys', () => {
    const obj = { a: 1, b: 'pick' };
    const result = pickBy(obj, value => typeof value === 'string');
    expectTypeOf(result).toEqualTypeOf<Partial<{ a: number; b: string }>>();
  });
});
