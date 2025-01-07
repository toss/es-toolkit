import { describe, expect, it } from 'vitest';
import { isFiniteNumber } from './isFiniteNumber';

describe('isFiniteNumber', () => {
  it('should return `true` for finite numbers', () => {
    const values = [0, 42, -1, 3.14, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
    const expected = values.map(() => true);
    const actual = values.map(isFiniteNumber);

    expect(actual).toEqual(expected);
  });

  it('should return `false` for non-finite numbers and other types', () => {
    const values = [Infinity, -Infinity, NaN, '42', null, undefined, {}, [], true, false];
    const expected = values.map(() => false);
    const actual = values.map(isFiniteNumber);

    expect(actual).toEqual(expected);
  });
});
