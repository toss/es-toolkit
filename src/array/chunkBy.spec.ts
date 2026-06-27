import { describe, expect, it } from 'vitest';
import { chunkBy } from './chunkBy.ts';

describe('chunkBy', () => {
  it('returns an empty array for an empty input', () => {
    expect(chunkBy([], value => value)).toEqual([]);
  });

  it('groups consecutive elements that share the same key', () => {
    expect(chunkBy([1, 1, 2, 3, 3, 3], value => value)).toEqual([[1, 1], [2], [3, 3, 3]]);
  });

  it('starts a new chunk whenever the key changes, even if the key reappears later', () => {
    expect(chunkBy([1, 1, 2, 1, 1], value => value)).toEqual([[1, 1], [2], [1, 1]]);
  });

  it('derives the key from the iteratee', () => {
    expect(chunkBy(['a', 'b', 'cd', 'ef', 'g'], word => word.length)).toEqual([['a', 'b'], ['cd', 'ef'], ['g']]);
  });

  it('puts every element in its own chunk when all keys differ', () => {
    expect(chunkBy([1, 2, 3], value => value)).toEqual([[1], [2], [3]]);
  });

  it('keeps everything in a single chunk when all keys match', () => {
    expect(chunkBy([1, 2, 3], () => 'same')).toEqual([[1, 2, 3]]);
  });

  it('groups by a boolean key', () => {
    expect(chunkBy([1, 3, 2, 4, 5], value => value % 2 === 0)).toEqual([[1, 3], [2, 4], [5]]);
  });

  it('does not mutate the input array', () => {
    const input = [1, 1, 2];
    chunkBy(input, value => value);
    expect(input).toEqual([1, 1, 2]);
  });
});
