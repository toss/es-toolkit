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

  it('should handle the case where a is not a number and b is a number', () => {
    const a = ['a', [32, 12], { a: 1 }];

    const actualAsc = a.map((_, index) => compareValues(a[index], 1, 'asc'));
    const actualDesc = a.map((_, index) => compareValues(a[index], 1, 'desc'));
    const expectedAsc = a.map(() => -1);
    const expectedDesc = a.map(() => 1);

    expect(actualAsc).toEqual(expectedAsc);
    expect(actualDesc).toEqual(expectedDesc);
  });

  it('should handle the case where a is a number and b is not a number', () => {
    const b = ['a', [32, 12], { a: 1 }];

    const actualAsc = b.map((_, index) => compareValues(1, b[index], 'asc'));
    const actualDesc = b.map((_, index) => compareValues(1, b[index], 'desc'));
    const expectedAsc = b.map(() => 1);
    const expectedDesc = b.map(() => -1);

    expect(actualAsc).toEqual(expectedAsc);
    expect(actualDesc).toEqual(expectedDesc);
  });
});
