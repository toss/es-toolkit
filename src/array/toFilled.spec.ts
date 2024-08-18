import { describe, expect, it } from 'vitest';
import { toFilled } from './toFilled';

describe('toFilled', () => {
  it('fills empty array', () => {
    const result = toFilled([], '*');
    expect(result).toEqual([]);
  });

  it('fills middle values', () => {
    const result = toFilled([1, 2, 3, 4, 5], '*', 1, 4);
    expect(result).toEqual([1, '*', '*', '*', 5]);
  });

  it('fills entire array', () => {
    const result = toFilled([1, 2, 3, 4, 5], '*');
    expect(result).toEqual(['*', '*', '*', '*', '*']);
  });

  it('fills from specified start position', () => {
    const result = toFilled([1, 2, 3, 4, 5], '*', 2);
    expect(result).toEqual([1, 2, '*', '*', '*']);
  });

  it('fills with negative start position', () => {
    const result = toFilled([1, 2, 3, 4, 5], '*', -3);
    expect(result).toEqual([1, 2, '*', '*', '*']);
  });

  it('fills with positive start and negative end positions', () => {
    const result = toFilled([1, 2, 3, 4, 5], '*', 1, -1);
    expect(result).toEqual([1, '*', '*', '*', 5]);
  });

  it('fills with both negative start and end positions', () => {
    const result = toFilled([1, 2, 3, 4, 5], '*', -4, -1);
    expect(result).toEqual([1, '*', '*', '*', 5]);
  });
});
