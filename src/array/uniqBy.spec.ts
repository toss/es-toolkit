import { describe, expect, it } from 'vitest';
import { uniqBy } from './uniqBy';

describe('uniqBy', () => {
  it('should work with a `mapper`', () => {
    expect(uniqBy([2.1, 1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
  });
});
