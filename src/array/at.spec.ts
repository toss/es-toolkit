import { describe, expect, it } from 'vitest';
import { at } from './at';

describe('at', () => {
  it('should return the elements corresponding to the specified keys', () => {
    expect(at(['a', 'b', 'c'], [0, 2])).toEqual(['a', 'c']);
    expect(at(['a', 'b', 'c'], [2, 0])).toEqual(['c', 'a']);
  });

  it('should support negative indices', () => {
    expect(at(['a', 'b', 'c'], [-1, -2])).toEqual(['c', 'b']);
    expect(at(['a', 'b', 'c'], [-2, -1])).toEqual(['b', 'c']);
  });

  it('should return `undefined` for nonexistent keys', () => {
    expect(at(['a', 'b', 'c'], [2, 4, 0, -4])).toEqual(['c', undefined, 'a', undefined]);
  });

  it('should return an empty array when no keys are given', () => {
    expect(at(['a', 'b', 'c'], [])).toEqual([]);
  });

  it('should return undefined for non-integer indices', () => {
    const data = ['a', 'b', 'c'];
    const indices = [1.5, -1.5, NaN, Infinity, -Infinity];

    expect(at(data, indices)).toEqual(indices.map(i => data.at(i)));
  });
});
