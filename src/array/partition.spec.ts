import { describe, expect, it } from 'vitest';
import { partition } from './partition';

describe('partition', () => {
  it('creates two arrays: the first array includes items for which isInTruthy returns true, and the second array includes items for which isInTruthy returns false.', () => {
    expect(partition([true, true, false], x => x)).toEqual([[true, true], [false]]);
    expect(
      partition(
        [
          { id: 1, enabled: true },
          { id: 2, enabled: false },
          { id: 3, enabled: false },
          { id: 4, enabled: true },
        ],
        x => x.enabled
      )
    ).toEqual([
      [
        { id: 1, enabled: true },
        { id: 4, enabled: true },
      ],
      [
        { id: 2, enabled: false },
        { id: 3, enabled: false },
      ],
    ]);
  });
});
