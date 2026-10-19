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

  it('merges tuples index by index', () => {
    expectTypeOf<Merge<[1, 2, 3], ['a']>>().toEqualTypeOf<['a', 2, 3]>();
    expectTypeOf<Merge<{ a: [1, 2] }, { a: [3] }>>().toEqualTypeOf<{ a: [3, 2] }>();
  });

  it('merges non-tuple arrays into an array of both element types', () => {
    expectTypeOf<Merge<number[], string[]>>().toEqualTypeOf<Array<number | string>>();
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
});
