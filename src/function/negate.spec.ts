import { describe, it, expect } from 'vitest';
import { negate } from './negate';

describe('negate', () => {
  it('should negate the given predicate function', () => {
    expect(typeof negate(() => true)).toBe('function');
    expect(negate(() => true)()).toBe(false);
    expect(negate(() => false)()).toBe(true);
  });
});
