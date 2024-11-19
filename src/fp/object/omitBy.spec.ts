import { describe, expect, it } from 'vitest';
import { omitBy } from './omitBy';

describe('omitBy/fp', () => {
  it('(non-curried) should omit properties based on the predicate function', () => {
    const obj = { a: 1, b: 'omit', c: 3 };
    const shouldOmit = (value: number | string) => typeof value === 'string';
    const result = omitBy(obj, shouldOmit);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('(curried) should omit properties based on the predicate function', () => {
    const obj = { a: 1, b: 'omit', c: 3 };
    const shouldOmit = (value: number | string) => typeof value === 'string';
    const result = omitBy(shouldOmit)(obj);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('(non-curried) should return an empty object if all properties are omitted', () => {
    const obj = { a: 'omit', b: 'omit' };
    const shouldOmit = (value: string) => typeof value === 'string';
    const result = omitBy(obj, shouldOmit);
    expect(result).toEqual({});
  });

  it('(curried) should return an empty object if all properties are omitted', () => {
    const obj = { a: 'omit', b: 'omit' };
    const shouldOmit = (value: string) => typeof value === 'string';
    const result = omitBy(shouldOmit)(obj);
    expect(result).toEqual({});
  });

  it('(non-curried) should return the same object if no properties are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const shouldOmit = (value: number) => typeof value === 'string';
    const result = omitBy(obj, shouldOmit);
    expect(result).toEqual(obj);
  });

  it('(curried) should return the same object if no properties are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const shouldOmit = (value: number) => typeof value === 'string';
    const result = omitBy(shouldOmit)(obj);
    expect(result).toEqual(obj);
  });

  it('(non-curried) should work with an empty object', () => {
    const obj = {};
    const shouldOmit = (value: never) => value;
    const result = omitBy(obj, shouldOmit);
    expect(result).toEqual({});
  });

  it('(curried) should work with an empty object', () => {
    const obj = {};
    const shouldOmit = (value: never) => value;
    const result = omitBy(shouldOmit)(obj);
    expect(result).toEqual({});
  });

  it('(non-curried) should work with nested objects', () => {
    const obj = { a: 1, b: { nested: 'omit' }, c: 3 };
    const shouldOmit = (_: number | { nested: string }, key: string) => key === 'b';
    const result = omitBy(obj, shouldOmit);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('(curried) should work with nested objects', () => {
    const obj = { a: 1, b: { nested: 'omit' }, c: 3 };
    const shouldOmit = (_: number | { nested: string }, key: string) => key === 'b';
    const result = omitBy(shouldOmit)(obj);
    expect(result).toEqual({ a: 1, c: 3 });
  });
});
