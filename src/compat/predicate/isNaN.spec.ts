import { describe, expect, it, expectTypeOf } from 'vitest';
import type { isNaN as isNaNLodash } from 'lodash';
import { isNaN } from './isNaN';

describe('isNaN', () => {
  it('should return `true` for NaN', () => {
    expect(isNaN(NaN)).toBe(true);
  });

  it('should return `false` for non-NaN numbers', () => {
    expect(isNaN(0)).toBe(false);
  });

  it('should return `false` for non-numbers', () => {
    expect(isNaN('NaN')).toBe(false);
    expect(isNaN(true)).toBe(false);
    expect(isNaN(null)).toBe(false);
    expect(isNaN(undefined)).toBe(false);
    expect(isNaN({})).toBe(false);
    expect(isNaN([])).toBe(false);
    expect(isNaN(() => {})).toBe(false);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isNaN).toEqualTypeOf<typeof isNaNLodash>();
  });
});
