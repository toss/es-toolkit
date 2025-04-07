import { describe, expect, it } from 'vitest';
import { pickBy } from './pickBy';
import { isString } from '../predicate/isString.ts';

describe('pickBy', () => {
  it('should pick properties based on the predicate function', () => {
    const obj = { a: 1, b: 'pick', c: 3 };
    const shouldPick = (value: string | number) => isString(value);
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({ b: 'pick' });
  });

  it('should return an empty object if no properties satisfy the predicate', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const shouldPick = (value: number) => isString(value);
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({});
  });

  it('should return the same object if all properties satisfy the predicate', () => {
    const obj = { a: 'pick', b: 'pick', c: 'pick' };
    const shouldPick = (value: string) => isString(value);
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
});
