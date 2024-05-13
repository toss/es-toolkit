import { describe, expect, it } from 'vitest';
import { drop } from './drop';

describe('drop', () => {
  it('should drop `itemsCount` elements from an array from the beginning', () => {
    expect(drop([1.2, 2.3, 3.4], 1)).toEqual([2.3, 3.4]);
    expect(drop(['a', 'b', 'c', 'd'], 2)).toEqual(['c', 'd']);
  });
});
