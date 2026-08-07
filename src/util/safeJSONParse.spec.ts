import { describe, expect, expectTypeOf, it } from 'vitest';
import { safeJSONParse } from './safeJSONParse';

describe('safeJSONParse', () => {
  it('returns the parsed value when the input is a valid JSON string', () => {
    expect(safeJSONParse('{"name":"JinHo","age":29}')).toEqual({
      name: 'JinHo',
      age: 29,
    });

    expect(safeJSONParse('[1,2,3]')).toEqual([1, 2, 3]);

    expect(safeJSONParse('"string"')).toBe('string');
    expect(safeJSONParse('123')).toBe(123);
    expect(safeJSONParse('true')).toBe(true);
    expect(safeJSONParse('false')).toBe(false);
  });

  it('handles nested objects and arrays', () => {
    expect(safeJSONParse('{"user":{"name":"JinHo","age":29},"tags":["admin","user"]}')).toEqual({
      user: { name: 'JinHo', age: 29 },
      tags: ['admin', 'user'],
    });

    expect(safeJSONParse('[[1,2],[3,4]]')).toEqual([
      [1, 2],
      [3, 4],
    ]);

    expect(safeJSONParse('{"items":[{"id":1,"name":"dj"},{"id":2,"name":"producer"}]}')).toEqual({
      items: [
        { id: 1, name: 'dj' },
        { id: 2, name: 'producer' },
      ],
    });
  });

  it('handles empty objects and arrays', () => {
    expect(safeJSONParse('{}')).toEqual({});
    expect(safeJSONParse('[]')).toEqual([]);
    expect(safeJSONParse('{"empty":{}}')).toEqual({ empty: {} });
    expect(safeJSONParse('{"items":[]}')).toEqual({ items: [] });
  });

  it('handles large numbers', () => {
    expect(safeJSONParse(String(Number.MAX_SAFE_INTEGER))).toBe(Number.MAX_SAFE_INTEGER);
    expect(safeJSONParse(String(Number.MIN_SAFE_INTEGER))).toBe(Number.MIN_SAFE_INTEGER);
    expect(safeJSONParse('9007199254740991')).toBe(9007199254740991);
    expect(safeJSONParse('-9007199254740991')).toBe(-9007199254740991);
    expect(safeJSONParse('0')).toBe(0);
    expect(safeJSONParse('-0')).toBe(-0);
  });
  it('returns null when the input is "null" (valid JSON but parsed value is null)', () => {
    expect(safeJSONParse('null')).toBeNull();
  });

  it('returns null if the value is not a valid JSON string', () => {
    expect(safeJSONParse('invalid json')).toBeNull();
    expect(safeJSONParse('{"unclosed": "object"')).toBeNull();
    expect(safeJSONParse('[1,2,')).toBeNull();
    expect(safeJSONParse('undefined')).toBeNull();
    expect(safeJSONParse('')).toBeNull();
  });

  it('returns null if the value is not a string', () => {
    expect(safeJSONParse(null)).toBeNull();
    expect(safeJSONParse(undefined)).toBeNull();
    expect(safeJSONParse(123)).toBeNull();
    expect(safeJSONParse(true)).toBeNull();
    expect(safeJSONParse({})).toBeNull();
    expect(safeJSONParse([])).toBeNull();
    expect(safeJSONParse(new Date())).toBeNull();
    expect(safeJSONParse(() => {})).toBeNull();
  });

  // --- Type-level tests (TS inference) ---

  it('infers the generic type parameter', () => {
    const result = safeJSONParse<{ name: string }>('{"name":"JinHo"}');
    expectTypeOf(result).toEqualTypeOf<{ name: string } | null>();
  });

  it('narrows type after null check', () => {
    const result = safeJSONParse<{ name: string }>('{"name":"JinHo"}');

    if (result !== null) {
      expectTypeOf(result).toEqualTypeOf<{ name: string }>();
    }
  });

  it('uses the default generic when no type argument is provided', () => {
    const result = safeJSONParse('{"name": "JinHo"}');

    expectTypeOf(result).toEqualTypeOf<unknown | null>();
  });
});
