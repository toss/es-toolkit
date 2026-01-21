import { describe, expect, expectTypeOf, it } from 'vitest';
import { merge, type MergeDeep } from './merge';

describe('merge', () => {
  it('should merge properties from source object into target object', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = merge(target, source);

    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('should deeply merge nested objects', () => {
    const target = { a: { x: 1, y: 2 }, b: 2 };
    const source = { a: { y: 3, z: 4 }, c: 5 };
    const result = merge(target, source);

    expect(result).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 2, c: 5 });

    const names = {
      characters: [{ name: 'barney' }, { name: 'fred' }],
    };

    const ages = {
      characters: [{ age: 36 }, { age: 40 }],
    };

    const heights = {
      characters: [{ height: '5\'4"' }, { height: '5\'5"' }],
    };

    const expected = {
      characters: [
        { name: 'barney', age: 36, height: '5\'4"' },
        { name: 'fred', age: 40, height: '5\'5"' },
      ],
    };

    expect(merge(merge(names, ages), heights)).toEqual(expected);

    const target2 = { a: [1, 2], b: { x: 1 } };
    const source2 = { a: [3], b: { y: 2 } };
    expect(merge(target2, source2)).toEqual({ a: [3, 2], b: { x: 1, y: 2 } });
  });

  it('should merge arrays deeply', () => {
    const target = { a: [1, 2] };
    const source = { a: [3, 4] };
    const result = merge(target, source);

    expect(result).toEqual({ a: [3, 4] });
  });

  it('should handle merging with null values', () => {
    const target = { a: null };
    const source = { a: [1, 2, 3] };
    const result = merge(target, source);

    expect(result).toEqual({ a: [1, 2, 3] });
  });

  it('should handle merging arrays into non-array target values', () => {
    const numbers = [1, 2, 3];

    const target = { a: 1, b: {} };
    const source = { b: numbers, c: 4 };
    const result = merge(target, source);

    expect(result).toEqual({ a: 1, b: { '0': 1, '1': 2, '2': 3 }, c: 4 });
    expect(result.b).not.toBe(numbers);
  });

  it('should create new plain object when merged', () => {
    const plainObject = { b: 2 } as const;

    const target = {};
    const source = { a: plainObject };
    const result = merge(target, source);

    expect(result).toEqual({ a: plainObject });
    expect(result.a).not.toBe(plainObject);
  });

  it('should handle merging values that are neither arrays nor plain objects', () => {
    const date = new Date();
    const target = {};
    const source = { a: date };
    const result = merge(target, source);

    expect(result).toEqual({ a: date });
    // unlike arrays and plain objects, the original value is used.
    expect(result.a).toBe(date);
  });

  it('should not overwrite existing values with undefined from source', () => {
    const target = { a: 1, b: 2 };
    const source = { b: undefined, c: 3 };
    const result = merge(target, source);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should handle merging of deeply nested objects with arrays and objects', () => {
    const target = { a: { b: { c: [1] } } };
    const source = { a: { b: { c: [2], d: 3 }, e: [4] } };
    const result = merge(target, source);

    expect(result).toEqual({ a: { b: { c: [2], d: 3 }, e: [4] } });
  });

  it('should skip unsafe properties like __proto__', () => {
    const target = { a: 1 };
    const source = Object.create(null);
    source.__proto__ = { b: 2 };
    source.a = 2;
    const result = merge(target, source);

    expect(result).toEqual({ a: 2 });
    expect(result.__proto__).toBe(Object.prototype);
  });

  it('should behave like recursive Object.assign, applying the same logic to nested properties', () => {
    const topLevelArray = merge(['1'], { a: 2 });
    const topLevelObject = merge({ a: 2 }, ['1']);

    const nestedArray = merge({ x: ['1'] }, { x: { a: 2 } });
    const nestedObject = merge({ x: { a: 2 } }, { x: ['1'] });

    expect(Array.isArray(topLevelArray)).toBe(true);
    expect((topLevelArray as any)[0]).toBe('1');
    expect((topLevelArray as any).a).toBe(2);

    expect(typeof topLevelObject).toBe('object');
    expect(topLevelObject).toEqual({ a: 2, 0: '1' });

    expect(typeof nestedObject.x).toBe('object');
    expect(nestedObject.x).toEqual({ a: 2, 0: '1' });
    expect((nestedObject.x as any)[0]).toBe('1');

    expect(Array.isArray(nestedArray.x)).toBe(true);
    expect((nestedArray.x as any)[0]).toBe('1');
    expect((nestedArray.x as any).a).toBe(2);
  });
});

describe('MergeDeep type', () => {
  it('should correctly type deep merged objects', () => {
    interface Target {
      a: { x: number; y: string };
    }
    interface Source {
      a: { y: number; z: boolean };
    }

    const target: Target = { a: { x: 1, y: 'hello' } };
    const source: Source = { a: { y: 42, z: true } };

    const result = merge(target, source);

    expectTypeOf(result.a.x).toEqualTypeOf<number>();
    expectTypeOf(result.a.y).toEqualTypeOf<number>();
    expectTypeOf(result.a.z).toEqualTypeOf<boolean>();

    expect(result.a).toEqual({ x: 1, y: 42, z: true });
  });

  it('should handle source undefined preserving target', () => {
    type Result = MergeDeep<{ a: number }, undefined>;
    expectTypeOf<Result>().toEqualTypeOf<{ a: number }>();
  });

  it('should handle non-plain objects by replacing with source', () => {
    type Result = MergeDeep<{ a: Date }, { a: RegExp }>;
    expectTypeOf<Result>().toEqualTypeOf<{ a: RegExp }>();
  });

  it('should handle array merge types', () => {
    const target = { arr: [{ a: 1 }] };
    const source = { arr: [{ b: 2 }] };
    const result = merge(target, source);

    expectTypeOf(result.arr).toMatchTypeOf<Array<{ a: number } | { b: number }>>();
  });

  it('should handle mixed nested types', () => {
    const target = { config: { debug: true, port: 3000 } };
    const source = { config: { port: 8080, host: 'localhost' } };
    const result = merge(target, source);

    expectTypeOf(result.config.debug).toEqualTypeOf<boolean>();
    expectTypeOf(result.config.port).toEqualTypeOf<number>();
    expectTypeOf(result.config.host).toEqualTypeOf<string>();
  });

  it('should handle null target values in type inference', () => {
    const result = merge({ a: null }, { a: [1, 2, 3] });
    expectTypeOf(result.a).toEqualTypeOf<number[]>();
  });

  it('should handle deeply nested types', () => {
    const target = { l1: { l2: { l3: { a: 1 } } } };
    const source = { l1: { l2: { l3: { b: 2 } } } };
    const result = merge(target, source);
    expectTypeOf(result.l1.l2.l3).toEqualTypeOf<{ a: number; b: number }>();
  });

  it('should preserve optional properties', () => {
    type Result = MergeDeep<{ a?: number; b: string }, { c?: boolean }>;
    type Expected = { a?: number; b: string; c?: boolean };
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  it('should preserve optional properties in nested objects', () => {
    type Result = MergeDeep<{ nested: { a?: number } }, { nested: { b?: string } }>;
    type Expected = { nested: { a?: number; b?: string } };
    expectTypeOf<Result>().toEqualTypeOf<Expected>();
  });

  it('should handle array + object merge (array as target)', () => {
    const result = merge(['1', '2'] as string[], { a: 2 });

    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toBe('1');
    expect(result.a).toBe(2);

    expectTypeOf(result[0]).toEqualTypeOf<string>();
    expectTypeOf(result.a).toEqualTypeOf<number>();
  });

  it('should handle object + array merge (object as target)', () => {
    const result = merge({ a: 2 }, ['1'] as const);

    expect(result).toEqual({ a: 2, 0: '1' });
    expect(result[0]).toBe('1');
    expect(result.a).toBe(2);

    expectTypeOf(result[0]).toEqualTypeOf<'1'>();
    expectTypeOf(result.a).toEqualTypeOf<number>();
  });

  it('should handle nested array + object merge', () => {
    const result = merge({ x: ['1'] as string[] }, { x: { a: 2 } });

    expect(Array.isArray(result.x)).toBe(true);
    expect(result.x[0]).toBe('1');
    expect(result.x.a).toBe(2);

    expectTypeOf(result.x[0]).toEqualTypeOf<string>();
    expectTypeOf(result.x.a).toEqualTypeOf<number>();
  });
});
