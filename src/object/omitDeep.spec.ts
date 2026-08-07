import { describe, expect, expectTypeOf, it } from 'vitest';
import { omitDeep } from './omitDeep';

describe('omitDeep', () => {
  it('should omit top-level properties from an object', () => {
    const object = { foo: 1, bar: 2, baz: 3 };
    const result = omitDeep(object, ['foo', 'bar']);
    expect(result).toEqual({ baz: 3 });
  });

  it('should omit nested properties using dot-separated paths', () => {
    const object = { a: 1, b: { x: 2, y: 3 }, c: 4 };
    const result = omitDeep(object, ['b.x']);
    expect(result).toEqual({ a: 1, b: { y: 3 }, c: 4 });
  });

  it('should omit deeply nested properties', () => {
    const object = {
      user: {
        id: 1,
        profile: {
          name: 'John',
          email: 'john@example.com',
        },
      },
    };
    const result = omitDeep(object, ['user.profile.email']);
    expect(result).toEqual({
      user: {
        id: 1,
        profile: {
          name: 'John',
        },
      },
    });
  });

  it('should omit multiple paths at once', () => {
    const object = {
      a: 1,
      b: { x: 2, y: 3 },
      c: { p: 4, q: 5 },
    };
    const result = omitDeep(object, ['b.x', 'c.q']);
    expect(result).toEqual({
      a: 1,
      b: { y: 3 },
      c: { p: 4 },
    });
  });

  it('should omit an entire nested object', () => {
    const object = {
      a: 1,
      b: {
        x: 2,
        y: 3,
      },
      c: 4,
    };
    const result = omitDeep(object, ['b']);
    expect(result).toEqual({ a: 1, c: 4 });
  });

  it('should omit an entire inner object while keeping siblings', () => {
    const object = {
      user: {
        id: 1,
        profile: {
          name: 'John',
          email: 'john@example.com',
        },
        settings: {
          theme: 'dark',
        },
      },
    };
    const result = omitDeep(object, ['user.profile']);
    expect(result).toEqual({
      user: {
        id: 1,
        settings: {
          theme: 'dark',
        },
      },
    });
  });

  it('should omit a property from objects inside an array', () => {
    const object = {
      users: [
        { id: 1, secret: 'abc' },
        { id: 2, secret: 'def' },
      ],
    };
    const result = omitDeep(object, ['users.secret']);
    expect(result).toEqual({
      users: [{ id: 1 }, { id: 2 }],
    });
  });

  it('should omit an entire array field', () => {
    const object = {
      users: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ],
      total: 2,
    };
    const result = omitDeep(object, ['users']);
    expect(result).toEqual({ total: 2 });
  });

  it('should omit properties from objects in nested arrays', () => {
    const object = {
      items: [[{ x: 1, y: 2 }], [{ x: 3, y: 4 }]],
    };
    const result = omitDeep(object, ['items.y']);
    expect(result).toEqual({
      items: [[{ x: 1 }], [{ x: 3 }]],
    });
  });

  it('should return an empty object if all keys are omitted', () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = omitDeep(object, ['a', 'b', 'c']);
    expect(result).toEqual({});
  });

  it('should return the same structure if no paths are omitted', () => {
    const object = { a: 1, b: { x: 2, y: 3 }, c: 4 };
    const result = omitDeep(object, []);
    expect(result).toEqual({ a: 1, b: { x: 2, y: 3 }, c: 4 });
  });

  it('should not affect the original object', () => {
    const object = { a: 1, b: { x: 2, y: 3 }, c: 4 };
    const result = omitDeep(object, ['b.x']);
    expect(result).toEqual({ a: 1, b: { y: 3 }, c: 4 });
    expect(object).toEqual({ a: 1, b: { x: 2, y: 3 }, c: 4 });
  });

  it('should handle empty objects and arrays', () => {
    expect(omitDeep({}, [])).toEqual({});
    expect(omitDeep({ a: {} }, [])).toEqual({ a: {} });
    expect(omitDeep({ a: [] }, [])).toEqual({ a: [] });

    const emptyObject = { a: {} };
    const emptyArray = { a: [] as [] };

    // Runtime: omitting a non-existent nested path is a no-op.
    // TypeScript: 'a.b' is not a valid path when `a` is an empty object.
    // @ts-expect-error - 'a.b' does not exist on an empty object
    expect(omitDeep(emptyObject, ['a.b'])).toEqual({ a: {} });

    // Runtime: omitting a non-existent nested path is a no-op.
    // TypeScript: 'a.b' is not a valid path when `a` is an empty array.
    // @ts-expect-error - 'a.b' does not exist on an empty array
    expect(omitDeep(emptyArray, ['a.b'])).toEqual({ a: [] });
  });

  it('should not modify primitive values', () => {
    expect(omitDeep(123, [])).toBe(123);
    expect(omitDeep('string', [])).toBe('string');
    expect(omitDeep(null, [])).toBe(null);
    expect(omitDeep(undefined, [])).toBe(undefined);
    expect(omitDeep(true, [])).toBe(true);
  });

  it('should properly type nested objects', () => {
    const object = {
      user: {
        id: 1,
        profile: {
          name: 'John',
          email: 'john@example.com',
        },
      },
    };
    const result = omitDeep(object, ['user.profile.email']);

    expectTypeOf(result).toExtend<{
      user: {
        id: number;
        profile: {
          name: string;
        };
      };
    }>();
  });

  it('should properly type arrays of objects', () => {
    const object = {
      users: [
        { id: 1, secret: 'abc' },
        { id: 2, secret: 'def' },
      ],
    };
    const result = omitDeep(object, ['users.secret']);

    expectTypeOf(result).toExtend<{
      users: Array<{
        id: number;
      }>;
    }>();
  });

  it('should properly type omitted nested objects', () => {
    const object = {
      user: {
        id: 1,
        profile: {
          name: 'John',
        },
      },
    };
    const result = omitDeep(object, ['user.profile']);

    expectTypeOf(result).toExtend<{
      user: {
        id: number;
      };
    }>();
  });
});
