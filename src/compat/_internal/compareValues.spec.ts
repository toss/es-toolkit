import { describe, it, expect } from 'vitest';
import { compareValues } from './compareValues';

describe('compareValues', () => {
  it('should return negative number', () => {
    expect(compareValues(1, 2, 'asc')).toBeLessThan(0);
    expect(compareValues(2, 1, 'desc')).toBeLessThan(0);
    expect(compareValues(1, null, 'asc')).toBeLessThan(0);
  });

  it('should return positive number', () => {
    expect(compareValues(2, 1, 'asc')).toBeGreaterThan(0);
    expect(compareValues(1, 2, 'desc')).toBeGreaterThan(0);
    expect(compareValues(1, null, 'desc')).toBeGreaterThan(0);
  });

  it('should return 0', () => {
    expect(compareValues(1, 1, 'asc')).toBe(0);
    expect(compareValues(1, 1, 'desc')).toBe(0);
    expect(compareValues(null, null, 'asc')).toBe(0);
    expect(compareValues(null, null, 'desc')).toBe(0);
  });
});
