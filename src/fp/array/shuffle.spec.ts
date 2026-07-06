import { describe, expect, it } from 'vitest';
import { shuffle } from './shuffle.ts';
import { pipe } from '../pipe.ts';

describe('shuffle', () => {
  it('returns a shuffled copy with the same values', () => {
    const input = [1, 2, 3, 4];
    const result = pipe(input, shuffle());

    expect(result).not.toBe(input);
    expect(result.toSorted()).toEqual(input);
  });
});
