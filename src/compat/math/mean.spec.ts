import { describe, expect, expectTypeOf, it } from 'vitest';
import type { mean as meanLodash } from 'lodash';
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

  it('should match the type of lodash', () => {
    expectTypeOf(mean).toEqualTypeOf<typeof meanLodash>();
  });
});
