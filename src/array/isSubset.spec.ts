import { describe, expect, it } from 'vitest';
import { isSubset } from './isSubset';

describe('isSubset', () => {
  it('should correctly determine if the subset arrays are subsets of the superset array', () => {
    const superset = [1, 2, 3, 4];
    const subset1 = [1, 3];
    const subset2 = [1, 5];
    const subset3 = [1, '3'];

    expect(isSubset(superset, subset1)).toBeTruthy();

    expect(isSubset(superset, subset2)).toBeFalsy();
    expect(isSubset(superset, subset3)).toBeFalsy();
  });
});
