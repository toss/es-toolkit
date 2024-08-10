import { describe, it, expect } from 'vitest';
import { compareValues } from './compareValues';

describe('compareValues', () => {
  it('should return -1 if a < b', () => {
    expect(compareValues(1, 2, 'asc')).toBe(-1);
  });

  it('should return 1 if a > b', () => {
    expect(compareValues(2, 1, 'asc')).toBe(1);
  });

  it('should return 0 if a === b', () => {
    expect(compareValues(1, 1, 'asc')).toBe(0);
  });

  it('should return 1 if a < b and order is desc', () => {
    expect(compareValues(1, 2, 'desc')).toBe(1);
  });

  it('should return -1 if a > b and order is desc', () => {
    expect(compareValues(2, 1, 'desc')).toBe(-1);
  });

  it('should return 0 if a === b and order is desc', () => {
    expect(compareValues(1, 1, 'desc')).toBe(0);
  });

  it('should handle the case where a is string and b is number', () => {
    expect(compareValues('0', 1, 'asc')).toBe(-1);
    expect(compareValues('a', 1, 'asc')).toBe(1);
    expect(compareValues('1b', 1, 'asc')).toBe(1);
    expect(compareValues('3', 1, 'asc')).toBe(1);
    expect(compareValues('2', 1, 'asc')).toBe(1);
  });

  it('should handle the case where a is number and b is string', () => {
    expect(compareValues(1, '0', 'asc')).toBe(1);
    expect(compareValues(1, 'a', 'asc')).toBe(-1);
    expect(compareValues(1, '1b', 'asc')).toBe(-1);
    expect(compareValues(1, '3', 'asc')).toBe(-1);
    expect(compareValues(1, '2', 'asc')).toBe(-1);
  });

  it('should return 0 if a and b are not comparable', () => {
    expect(compareValues({ a: 'number' }, 1, 'asc')).toBe(0);
  });
});
