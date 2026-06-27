import { describe, expect, it } from 'vitest';
import { pick } from './pick.ts';
import { pipe } from '../pipe.ts';

describe('pick', () => {
  it('keeps only the picked keys', () => {
    expect(pipe({ a: 1, b: 2, c: 3 }, pick(['a', 'c']))).toEqual({ a: 1, c: 3 });
  });

  it('ignores keys that are not present on the object', () => {
    expect(pipe({ a: 1, b: 2 } as { a: number; b: number; c?: number }, pick(['a', 'c']))).toEqual({ a: 1 });
  });

  it('returns an empty object when no keys are picked', () => {
    expect(pipe({ a: 1, b: 2 }, pick([] as Array<'a' | 'b'>))).toEqual({});
  });
});
