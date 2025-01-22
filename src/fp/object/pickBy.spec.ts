import { describe, expect, it } from 'vitest';
import { pickBy } from './pickBy';

describe('pickBy', () => {
  it(
    "(non-curried) should pick properties based on the predicate function",
    () => {
      const obj = { a: 1, b: 'pick', c: 3 };
      const shouldPick = (value: string | number) => typeof value === 'string';
      const result = pickBy(obj, shouldPick);
      expect(result).toEqual({ b: 'pick' });
    }
  );

  it("(curried) should pick properties based on the predicate function", () => {
    const obj = { a: 1, b: 'pick', c: 3 };
    const shouldPick = (value: string | number) => typeof value === 'string';
    const result = pickBy(shouldPick)(obj);
    expect(result).toEqual({ b: 'pick' });
  });

  it(
    "(non-curried) should return an empty object if no properties satisfy the predicate",
    () => {
      const obj = { a: 1, b: 2, c: 3 };
      const shouldPick = (value: number) => typeof value === 'string';
      const result = pickBy(obj, shouldPick);
      expect(result).toEqual({});
    }
  );

  it("(curried) should return an empty object if no properties satisfy the predicate", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const shouldPick = (value: number) => typeof value === 'string';
    const result = pickBy(shouldPick)(obj);
    expect(result).toEqual({});
  });

  it(
    "(non-curried) should return the same object if all properties satisfy the predicate",
    () => {
      const obj = { a: 'pick', b: 'pick', c: 'pick' };
      const shouldPick = (value: string) => typeof value === 'string';
      const result = pickBy(obj, shouldPick);
      expect(result).toEqual(obj);
    }
  );

  it("(curried) should return the same object if all properties satisfy the predicate", () => {
    const obj = { a: 'pick', b: 'pick', c: 'pick' };
    const shouldPick = (value: string) => typeof value === 'string';
    const result = pickBy(shouldPick)(obj);
    expect(result).toEqual(obj);
  });

  it("(non-curried) should work with an empty object", () => {
    const obj = {};
    const shouldPick = (value: never) => value;
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({});
  });

  it("(curried) should work with an empty object", () => {
    const obj = {};
    const shouldPick = (value: never) => value;
    const result = pickBy(shouldPick)(obj);
    expect(result).toEqual({});
  });

  it("(non-curried) should work with nested objects", () => {
    const obj = { a: 1, b: { nested: 'pick' }, c: 3 };
    const shouldPick = (value: number | { nested: string }, key: string) => key === 'b';
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({ b: { nested: 'pick' } });
  });

  it("(curried) should work with nested objects", () => {
    const obj = { a: 1, b: { nested: 'pick' }, c: 3 };
    const shouldPick = (value: number | { nested: string }, key: string) => key === 'b';
    const result = pickBy(shouldPick)(obj);
    expect(result).toEqual({ b: { nested: 'pick' } });
  });
});
