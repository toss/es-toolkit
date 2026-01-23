import { assert, describe, expect, it } from 'vitest';
import { sample } from './sample';

describe('sample', () => {
  it('selects a random element from an array', () => {
    const arr = [1, 2, 3, 4, 5];

    const randomElement = sample(arr);

    assert(randomElement !== undefined);
    expect(arr.includes(randomElement)).toBe(true);
  });

  it('returns undefined when given array is empty', () => {
    const arr: number[] = [];

    expect(sample(arr)).toBe(undefined);
  });
});
