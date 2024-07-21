import { describe, expect, it } from 'vitest';
import { isArrayMatch } from './isArrayMatch';

describe('isArrayMatch', () => {
  it('can match arrays', () => {
    expect(isArrayMatch([1, 2, 3], [2, 3])).toBe(true);
    expect(isArrayMatch([1, 2, 3, 4, 5], [1, 3, 5])).toBe(true);
    expect(isArrayMatch([1, 2, 3, 4, 5], [0, 1])).toBe(false);
  });

  it('can match arrays with duplicated values', () => {
    expect(isArrayMatch([2, 2], [2, 2])).toEqual(true);
    expect(isArrayMatch([1, 2], [2, 2])).toEqual(false);
  });

  it('returns true if source is empty', () => {
    expect(isArrayMatch([1, 2, 3], [])).toBe(true);
    expect(isArrayMatch(1, [])).toBe(false);
    expect(isArrayMatch(new Map(), [])).toBe(false);
    expect(isArrayMatch(new Set(), [])).toBe(false);
  });

  it('can match non-arrays', () => {
    expect(isArrayMatch(1, [2, 3])).toBe(false);
    expect(isArrayMatch(new Map(), [2, 3])).toBe(false);
    expect(isArrayMatch(new Set(), [2, 3])).toBe(false);
  });
});
