import { describe, it, expect } from 'vitest';
import { compareValues } from './compareValues';

describe('compareValues', () => {
  it('should return -1', () => {
    expect(compareValues(1, 2, 'asc')).toBe(-1);
    expect(compareValues(2, 1, 'desc')).toBe(-1);
    expect(compareValues(null, 1, 'asc')).toBe(-1);
    expect(compareValues(1, null, 'asc')).toBe(-1);
  });

  it('should return 1', () => {
    expect(compareValues(2, 1, 'asc')).toBe(1);
    expect(compareValues(1, 2, 'desc')).toBe(1);
    expect(compareValues(1, null, 'desc')).toBe(1);
    expect(compareValues(null, 1, 'desc')).toBe(1);
  });

  it('should return 0', () => {
    expect(compareValues(1, 1, 'asc')).toBe(0);
    expect(compareValues(1, 1, 'desc')).toBe(0);
    expect(compareValues(null, null, 'asc')).toBe(0);
    expect(compareValues(null, null, 'desc')).toBe(0);
  });
});
