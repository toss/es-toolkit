import { describe, it, expect } from 'vitest';
import { negate } from './negate';

describe('negate', () => {
  it('should negate the given predicate function', () => {
    expect(typeof negate(() => true)).toBe('function');
    expect(negate(() => true)()).toBe(false);
    expect(negate(() => false)()).toBe(true);

    function isEven(n: number) {
      return n % 2 === 0;
    }
    expect([1, 2, 3, 4, 5, 6].filter(negate(isEven))).toEqual([1, 3, 5]);
  });
});
