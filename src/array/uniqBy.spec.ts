import { describe, expect, it } from 'vitest';
import { uniqBy } from './uniqBy';

describe('uniqBy', () => {
  it('should work with a `mapper`', () => {
    expect(uniqBy([2.1, 1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
    expect(uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor)).toEqual([1.2, 2.1, 3.2, 5.7, 7.19]);
  });
});
