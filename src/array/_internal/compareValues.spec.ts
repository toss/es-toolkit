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
    const a = ['a', '1b', '3', '2'];
    const actual = a.map(value => compareValues(value, 1, 'asc'));
    const expected = a.map(() => 1);

    expect(actual).toEqual(expected);
  });

  it('should handle the case where a is number and b is string', () => {
    const b = ['a', '1b', '3', '2'];
    const actual = b.map(value => compareValues(1, value, 'asc'));
    const expected = b.map(() => -1);

    expect(actual).toEqual(expected);
  });

  it('should return 0 if a and b are not comparable', () => {
    expect(compareValues({ a: 'number' }, 1, 'asc')).toBe(0);
  });
});
