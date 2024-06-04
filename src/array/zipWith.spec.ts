import { describe, expect, it } from 'vitest';
import { zipWith } from './zipWith';

describe('zipWith', () => {
  it('zips multiple arrays with the given combine function', () => {
    expect(zipWith([1, 2, 3], x => x)).toEqual([1, 2, 3]);

    expect(zipWith([1, 2, 3], ['a', 'b', 'c'], (x, y) => `${x}${y}`)).toEqual(['1a', '2b', '3c']);
    expect(zipWith([1, 2, 3], ['a', 'b'], (x, y) => `${x}${y}`)).toEqual(['1a', '2b', '3undefined']);

    expect(zipWith([1, 2, 3], ['a', 'b', 'c'], [true, true, false], (x, y, z) => `${x}-${y}-${z}`)).toEqual([
      `1-a-true`,
      `2-b-true`,
      `3-c-false`,
    ]);
  });
});
