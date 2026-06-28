import { describe, expect, it } from 'vitest';
import { omit } from './omit.ts';
import { pipe } from '../pipe.ts';

describe('omit', () => {
  it('removes the omitted keys', () => {
    expect(pipe({ a: 1, b: 2, c: 3 }, omit(['b', 'c']))).toEqual({ a: 1 });
  });

  it('returns a shallow copy when no keys are omitted', () => {
    const input = { a: 1, b: 2 };
    const result = pipe(input, omit([] as Array<'a' | 'b'>));

    expect(result).toEqual({ a: 1, b: 2 });
    expect(result).not.toBe(input);
  });
});
