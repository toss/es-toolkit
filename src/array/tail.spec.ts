import { describe, expect, it } from 'vitest';
import { tail } from './tail';

describe('tail', () => {
  it('returns all elements except the first', () => {
    expect(tail([1, 2, 3])).toEqual([2, 3]);

    expect(tail([true, false, true])).toEqual([false, true]);

    expect(tail([1])).toEqual([]);

    expect(tail([])).toEqual([]);
  });
});
