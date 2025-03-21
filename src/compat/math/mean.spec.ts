import { describe, expect, it } from 'vitest';
import { mean } from './mean';
import { empties } from '../_internal/empties';
import { stubNaN } from '../_internal/stubNaN';
import { map } from '../array/map';

describe('mean', () => {
  it('should return the mean of an array of numbers', () => {
    const array = [4, 2, 8, 6];
    expect(mean(array)).toBe(5);
  });

  it('should return `NaN` when passing empty `array` values', () => {
    const expected = map(empties, stubNaN);
    const actual = map(empties, mean);

    expect(actual).toEqual(expected);
  });
});
