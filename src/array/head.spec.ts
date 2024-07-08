import { describe, expect, it } from 'vitest';
import { head } from './head';

describe('head', () => {
  it('returns the first element of an array or undefined for empty arrays', () => {
    expect(head([1, 2, 3])).toBe(1);

    expect(head(['a', 'b', 'c'])).toBe('a');

    expect(head([true, false, true])).toBe(true);

    expect(head([])).toBeUndefined();
  });
});
