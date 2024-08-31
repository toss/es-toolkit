import { describe, expect, it } from 'vitest';
import { at } from './at';

describe('at', () => {
  it('should return the elements corresponding to the specified keys', () => {
    expect(at(['a', 'b', 'c'], [0, 2])).toEqual(['a', 'c']);
    expect(at(['a', 'b', 'c'], [2, 0])).toEqual(['c', 'a']);
  });

  it('should return `undefined` for nonexistent keys', () => {
    expect(at(['a', 'b', 'c'], [2, 4, 0])).toEqual(['c', undefined, 'a']);
  });

  it('should return an empty array when no keys are given', () => {
    expect(at(['a', 'b', 'c'], [])).toEqual([]);
  });
});
