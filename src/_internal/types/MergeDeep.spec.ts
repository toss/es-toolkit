import { describe, expectTypeOf, it } from 'vitest';
import type { MergeDeep } from './MergeDeep';

describe('MergeDeep', () => {
  it('should deeply merge plain objects', () => {
    type Target = { a: { x: number; y: string } };
    type Source = { a: { y: boolean; z: string } };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toEqualTypeOf<{ a: { x: number; y: boolean; z: string } }>();
  });

  it('should add new keys from source', () => {
    type Target = { a: number };
    type Source = { b: string };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toEqualTypeOf<{ a: number; b: string }>();
  });

  it('should preserve target keys not in source', () => {
    type Target = { a: number; b: string };
    type Source = { b: boolean };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toEqualTypeOf<{ a: number; b: boolean }>();
  });

  it('should replace null target with source', () => {
    type Target = { a: null };
    type Source = { a: string[] };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toEqualTypeOf<{ a: string[] }>();
  });

  it('should preserve target when source property is undefined', () => {
    type Target = { a: number };
    type Source = { a: undefined };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toEqualTypeOf<{ a: number }>();
  });

  it('should replace non-plain objects like Date and RegExp', () => {
    type Target = { a: Date };
    type Source = { a: RegExp };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toEqualTypeOf<{ a: RegExp }>();
  });

  it('should merge non-tuple arrays element-wise', () => {
    type Target = { arr: number[] };
    type Source = { arr: string[] };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result['arr']>().toEqualTypeOf<Array<number | string>>();
  });

  it('should preserve source-only appended element types in non-tuple arrays', () => {
    type Target = { arr: Array<{ a: number }> };
    type Source = { arr: Array<{ b: string }> };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result['arr']>().toEqualTypeOf<Array<{ a: number } | { b: string } | { a: number; b: string }>>();
  });

  it('should merge tuple elements deeply', () => {
    type Target = { arr: [{ a: number }] };
    type Source = { arr: [{ b: string }] };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result['arr']>().toEqualTypeOf<[{ a: number; b: string }]>();
  });

  it('should preserve tuple length when merging tuples', () => {
    type Target = [{ a: 1 }, { b: 2 }];
    type Source = [{ c: 3 }, { d: 4 }];
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toEqualTypeOf<[{ a: 1; c: 3 }, { b: 2; d: 4 }]>();
  });

  it('should merge tuple with shorter tuple', () => {
    type Target = [{ a: 1 }, { b: 2 }, { c: 3 }];
    type Source = [{ x: 9 }];
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toEqualTypeOf<[{ a: 1; x: 9 }, { b: 2 }, { c: 3 }]>();
  });

  it('should merge tuple elements by replacement', () => {
    type Target = { arr: [1, 2, 3] };
    type Source = { arr: [4, 5] };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result['arr']>().toEqualTypeOf<[4, 5, 3]>();
  });

  it('should degrade tuple to array when merged with array', () => {
    type Target = { arr: [1, 2, 3] };
    type Source = { arr: number[] };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result['arr']>().toEqualTypeOf<Array<number>>();
  });

  it('should preserve optional properties from both sides', () => {
    type Target = { a?: number; b: string };
    type Source = { c?: boolean };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toEqualTypeOf<{ a?: number; b: string; c?: boolean }>();
  });

  it('should preserve optional properties in nested objects', () => {
    type Target = { nested: { a?: number } };
    type Source = { nested: { b?: string } };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toEqualTypeOf<{ nested: { a?: number; b?: string } }>();
  });

  it('should handle deeply nested types', () => {
    type Target = { l1: { l2: { l3: { a: 1 } } } };
    type Source = { l1: { l2: { l3: { b: 2 } } } };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result['l1']['l2']['l3']>().toEqualTypeOf<{ a: 1; b: 2 }>();
  });

  it('should handle merging into an empty object', () => {
    type Target = {};
    type Source = { a: number };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toEqualTypeOf<{ a: number }>();
  });

  it('should handle merging from an empty object', () => {
    type Target = { a: number };
    type Source = {};
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toEqualTypeOf<{ a: number }>();
  });

  it('should fallback to source for primitive target + object source', () => {
    type Target = { a: number };
    type Source = { a: { b: string } };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toEqualTypeOf<{ a: { b: string } }>();
  });

  it('should fallback to intersection for array + object merge', () => {
    type Target = { x: string[] };
    type Source = { x: { a: number } };
    type Result = MergeDeep<Target, Source>;

    // Runtime: array gets object properties merged in. Best type approximation is an intersection.
    expectTypeOf<Result['x']>().toMatchTypeOf<string[] & { a: number }>();
  });

  it('should handle functions as non-plain objects (replace)', () => {
    type Target = { fn: () => void };
    type Source = { fn: (x: number) => string };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result['fn']>().toEqualTypeOf<(x: number) => string>();
  });

  it('should handle string index signatures', () => {
    type Target = { [x: string]: number; a: 1 };
    type Source = { [x: string]: string; a: '1'; b: '2' };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toMatchTypeOf<{
      [x: string]: string;
      a: '1';
      b: '2';
    }>();
    expectTypeOf<{
      [x: string]: string;
      a: '1';
      b: '2';
    }>().toMatchTypeOf<Result>();
  });

  it('should deeply merge string index signature values', () => {
    type Target = Record<string, { a: number }>;
    type Source = Record<string, { b: string }>;
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result[string]>().toEqualTypeOf<{ a: number; b: string }>();
  });

  it('should handle number index signatures', () => {
    type Target = { [x: number]: boolean; 0: true };
    type Source = { [x: number]: string; 0: 'true'; 1: 'hello' };
    type Result = MergeDeep<Target, Source>;

    expectTypeOf<Result>().toMatchTypeOf<{
      [x: number]: string;
      0: 'true';
      1: 'hello';
    }>();
    expectTypeOf<{
      [x: number]: string;
      0: 'true';
      1: 'hello';
    }>().toMatchTypeOf<Result>();
  });
});
