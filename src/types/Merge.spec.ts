import { describe, expectTypeOf, it } from 'vitest';
import type { Merge } from './Merge';

describe('Merge', () => {
  it('merges nested objects instead of collapsing to never', () => {
    type Target = { a: number; b: { x: number; y: number } };
    type Source = { b: { y: string; z: boolean }; c: string };

    expectTypeOf<Merge<Target, Source>>().toEqualTypeOf<{
      a: number;
      b: { x: number; y: string; z: boolean };
      c: string;
    }>();
  });

  it('uses the source type when a defined source property overwrites the target', () => {
    expectTypeOf<Merge<{ a: 1 }, { a: 2 }>>().toEqualTypeOf<{ a: 2 }>();
  });

  it('keeps the target type when the source property can be undefined', () => {
    type Result = Merge<{ b: string | undefined }, { b?: string }>;
    expectTypeOf<Result['b']>().toEqualTypeOf<string | undefined>();

    expectTypeOf<Merge<{ a: number }, { a: undefined }>>().toEqualTypeOf<{ a: number }>();
  });

  it('keeps keys present on only one side, preserving optionality', () => {
    expectTypeOf<Merge<{ a: number }, { b: string }>>().toEqualTypeOf<{ a: number; b: string }>();
    expectTypeOf<Merge<{ a: number }, { b?: string }>>().toEqualTypeOf<{ a: number; b?: string }>();
  });

  it('merges arrays index by index', () => {
    expectTypeOf<Merge<[1, 2, 3], ['a']>>().toEqualTypeOf<['a', 2, 3]>();
    expectTypeOf<Merge<{ a: [1, 2] }, { a: [3] }>>().toEqualTypeOf<{ a: [3, 2] }>();
    expectTypeOf<Merge<number[], string[]>>().toEqualTypeOf<Array<string | number>>();
    expectTypeOf<Merge<number[], Array<1 | 2>>>().toEqualTypeOf<number[]>();
    expectTypeOf<Merge<number[], [3]>>().toEqualTypeOf<number[]>();
    expectTypeOf<Merge<[1, 2], number[]>>().toEqualTypeOf<number[]>();
  });

  it('replaces the target when the source is not a plain object', () => {
    expectTypeOf<Merge<{ a: { x: number } }, { a: Date }>>().toEqualTypeOf<{ a: Date }>();
    expectTypeOf<Merge<{ a: { x: number } }, { a: () => void }>>().toEqualTypeOf<{ a: () => void }>();
    expectTypeOf<Merge<{ a: { x: number } }, { a: Map<string, number> }>>().toEqualTypeOf<{
      a: Map<string, number>;
    }>();
  });

  it('replaces a non-mergeable target with a plain object source', () => {
    expectTypeOf<Merge<{ a: Date }, { a: { x: number } }>>().toEqualTypeOf<{ a: { x: number } }>();
    expectTypeOf<Merge<{ a: null }, { a: { x: number } }>>().toEqualTypeOf<{ a: { x: number } }>();
  });

  it('keeps both property sets when an array meets a plain object', () => {
    expectTypeOf<Merge<string[], { a: number }>>().toEqualTypeOf<string[] & { a: number }>();
    expectTypeOf<Merge<{ a: number }, string[]>>().toEqualTypeOf<{ a: number } & string[]>();
  });

  it('returns the same type when merging a type with itself', () => {
    type Branded = { value: string & {} };
    type ArrayUnion = { value: string[] | string[][] };
    type LiteralUnion = { value: 'a' | 'b' | (string & {}) };
    type Nested = { color: string | number | string[] | string[][]; axis: { title: 'x' | 'y' | (string & {}) } };

    expectTypeOf<Merge<Branded, Branded>>().toEqualTypeOf<Branded>();
    expectTypeOf<Merge<ArrayUnion, ArrayUnion>>().toEqualTypeOf<ArrayUnion>();
    expectTypeOf<Merge<LiteralUnion, LiteralUnion>>().toEqualTypeOf<LiteralUnion>();
    expectTypeOf<Merge<Nested, Nested>>().toEqualTypeOf<Nested>();
  });

  it('keeps keys present only on the source even when the source is a subtype of the target', () => {
    expectTypeOf<Merge<{ a: number }, { a: number; b: string }>>().toEqualTypeOf<{ a: number; b: string }>();
    expectTypeOf<Merge<{ a: number; b: string }, { a: number }>>().toEqualTypeOf<{ a: number; b: string }>();
    expectTypeOf<Merge<{ a: number }, { a: number; b?: string }>>().toEqualTypeOf<{ a: number; b?: string }>();
    expectTypeOf<Merge<{ a: { x: number } }, { a: { x: number; y: string } }>>().toEqualTypeOf<{
      a: { x: number; y: string };
    }>();
  });

  it('merges each array member of a union target with the source array', () => {
    type Color = string | number | string[] | string[][];

    expectTypeOf<Merge<Color, string[]>>().toEqualTypeOf<string[] | Array<string | string[]>>();
    expectTypeOf<Merge<string[], Color>>().toEqualTypeOf<string | number | string[] | Array<string | string[]>>();
    expectTypeOf<Merge<string[] | string[][], string[]>>().toEqualTypeOf<string[] | Array<string | string[]>>();
    expectTypeOf<Merge<Color, string | string[]>>().toEqualTypeOf<string | string[] | Array<string | string[]>>();
  });

  it('uses the source type when the source replaces the target value', () => {
    type Color = string | number | string[] | string[][];
    type LiteralUnion = 'a' | 'b' | (string & {});

    expectTypeOf<Merge<{ a: number }, { a: 2 }>>().toEqualTypeOf<{ a: 2 }>();
    expectTypeOf<Merge<{ a: string | null }, { a: string }>>().toEqualTypeOf<{ a: string }>();
    expectTypeOf<Merge<{ a: Date | null }, { a: Date }>>().toEqualTypeOf<{ a: Date }>();
    expectTypeOf<Merge<Color, 'red'>>().toEqualTypeOf<'red'>();
    expectTypeOf<Merge<LiteralUnion, string>>().toEqualTypeOf<string>();
    expectTypeOf<Merge<string, LiteralUnion>>().toEqualTypeOf<LiteralUnion>();
  });

  it('keeps the target type when the source is a partial of the same type', () => {
    type Options = { value: string[] | string[][]; label: 'a' | 'b' | (string & {}); nested: { flag: boolean } };

    expectTypeOf<Merge<Options, Partial<Options>>>().toMatchTypeOf<Options>();
    expectTypeOf<Merge<Options, { value: string[] }>>().toEqualTypeOf<{
      value: string[] | Array<string | string[]>;
      label: 'a' | 'b' | (string & {});
      nested: { flag: boolean };
    }>();
    expectTypeOf<Merge<Options, { nested: { flag: boolean } }>>().toEqualTypeOf<Options>();
  });

  it('treats branded primitives as primitives, not as objects', () => {
    expectTypeOf<Merge<string & {}, string & {}>>().toEqualTypeOf<string & {}>();
    expectTypeOf<Merge<{ a: string & {} }, { a: { x: number } }>>().toEqualTypeOf<{ a: { x: number } }>();
    expectTypeOf<Merge<{ a: { x: number } }, { a: string & {} }>>().toEqualTypeOf<{ a: string & {} }>();
    expectTypeOf<Merge<{ a: string & {} }, { a: number[] }>>().toEqualTypeOf<{ a: number[] }>();
    expectTypeOf<Merge<{ a: number[] }, { a: string & {} }>>().toEqualTypeOf<{ a: string & {} }>();
  });

  it('drops null and undefined from the target when the source is defined', () => {
    expectTypeOf<Merge<{ count: number } | undefined, { count: number }>>().toEqualTypeOf<{ count: number }>();
    expectTypeOf<Merge<{ count: number } | null, { count: number }>>().toEqualTypeOf<{ count: number }>();
    expectTypeOf<Merge<number[] | undefined, number[]>>().toEqualTypeOf<number[]>();
    expectTypeOf<Merge<number[] | null, Array<1 | 2>>>().toEqualTypeOf<Array<1 | 2> | number[]>();
    expectTypeOf<Merge<string[] | string[][] | undefined, string[]>>().toEqualTypeOf<
      string[] | Array<string | string[]>
    >();
    expectTypeOf<Merge<undefined, { a: number }>>().toEqualTypeOf<{ a: number }>();

    type Options = { retry?: { count: number }; list: number[] | null };
    type Overrides = { retry: { count: number }; list: number[] };
    expectTypeOf<Merge<Options, Overrides>>().toEqualTypeOf<{ retry: { count: number }; list: number[] }>();
  });

  it('replaces non-object target members with a plain object source', () => {
    expectTypeOf<Merge<{ x: number } | string, { x: number }>>().toEqualTypeOf<{ x: number }>();
    expectTypeOf<Merge<{ x: number } | Date, { x: number; y: string }>>().toEqualTypeOf<{ x: number; y: string }>();
    expectTypeOf<Merge<{ a: number } | undefined, { b: string }>>().toEqualTypeOf<
      { a: number; b: string } | { b: string }
    >();
    expectTypeOf<Merge<{ a: number } | { b: string }, { c: boolean }>>().toEqualTypeOf<
      { a: number; c: boolean } | { b: string; c: boolean }
    >();
  });

  it('handles any, unknown, and never', () => {
    expectTypeOf<Merge<any, { a: 1 }>>().toBeAny();
    expectTypeOf<Merge<{ a: 1 }, any>>().toBeAny();
    expectTypeOf<Merge<{ a: any }, { a: 1 }>>().toEqualTypeOf<{ a: any }>();
    expectTypeOf<Merge<unknown, { a: 1 }>>().toEqualTypeOf<{ a: 1 }>();
    expectTypeOf<Merge<{ a: unknown }, { a: 1 }>>().toEqualTypeOf<{ a: 1 }>();
    expectTypeOf<Merge<{ a: string }, { a: never }>>().toEqualTypeOf<{ a: string }>();
    expectTypeOf<Merge<{ a: never }, { a: string }>>().toEqualTypeOf<{ a: string }>();
  });
});
