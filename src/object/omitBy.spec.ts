import { describe, expect, expectTypeOf, it } from 'vitest';
import { omitBy } from './omitBy';

interface Item {
  name: string;
}

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

  it('should keep the original type for objects with a string index signature', () => {
    const obj: Record<string, Item> = { a: { name: 'a' }, b: { name: 'b' } };
    const result = omitBy(obj, item => item.name.startsWith('a'));
    expectTypeOf(result).toEqualTypeOf<Record<string, Item>>();
  });

  it('should keep the original type for objects with a number index signature', () => {
    const obj: Record<number, Item> = { 1: { name: 'a' }, 2: { name: 'b' } };
    const result = omitBy(obj, item => item.name.startsWith('a'));
    expectTypeOf(result).toEqualTypeOf<Record<number, Item>>();

    // The result can be passed back to anything accepting the original type.
    const processItems = (items: Record<number, Item>) => items;
    expect(processItems(result)).toEqual({ 2: { name: 'b' } });
  });

  it('should return a partial type for objects with known keys', () => {
    const obj = { a: 1, b: 'omit' };
    const result = omitBy(obj, value => typeof value === 'string');
    expectTypeOf(result).toEqualTypeOf<Partial<{ a: number; b: string }>>();
  });
});
