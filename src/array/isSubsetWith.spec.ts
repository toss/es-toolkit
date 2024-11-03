import { describe, expect, it } from 'vitest';
import { isSubsetWith } from './isSubsetWith';

describe('isSubsetWith', () => {
  it('should return true if the subset is entirely contained within the superset using the `areItemsEqual` function', () => {
    const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const subset = [{ id: 2 }, { id: 1 }];
    const areItemsEqual = (x: { id: number }, y: { id: number }) => x.id === y.id;

    expect(isSubsetWith(superset, subset, areItemsEqual)).toBeTruthy();
  });

  it('should return false if the subset is not entirely contained within the superset', () => {
    const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const subset = [{ id: 4 }];
    const areItemsEqual = (x: { id: number }, y: { id: number }) => x.id === y.id;

    expect(isSubsetWith(superset, subset, areItemsEqual)).toBeFalsy();
  });

  it('should handle empty arrays correctly', () => {
    const superset = [1, 2, 3];
    const emptySubset: number[] = [];
    const areItemsEqual = (x: number, y: number) => x === y;

    expect(isSubsetWith(superset, emptySubset, areItemsEqual)).toBeTruthy();

    const emptySuperset: number[] = [];
    const subset = [1];
    expect(isSubsetWith(emptySuperset, subset, areItemsEqual)).toBeFalsy();
  });

  it('should handle duplicates correctly', () => {
    const superset = [1, 2, 2, 3];
    const subset = [2, 2];
    const areItemsEqual = (x: number, y: number) => x === y;

    expect(isSubsetWith(superset, subset, areItemsEqual)).toBeTruthy();

    const subsetWithExtra = [2, 2, 4];
    expect(isSubsetWith(superset, subsetWithExtra, areItemsEqual)).toBeFalsy();
  });
});
