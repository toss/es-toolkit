import { describe, expect, it } from 'vitest';
import { uniqBy } from './uniqBy';

describe('uniqBy', () => {
  it("(non-curried) should work with a `mapper`", () => {
    expect(uniqBy([2.1, 1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
    expect(uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor)).toEqual([1.2, 2.1, 3.2, 5.7, 7.19]);
  });

  it("(curried) should work with a `mapper`", () => {
    expect(uniqBy(Math.floor)([2.1, 1.2, 2.3])).toEqual([2.1, 1.2]);
    expect(uniqBy(Math.floor)([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19])).toEqual([1.2, 2.1, 3.2, 5.7, 7.19]);
  });
});
