import { describe, expect, expectTypeOf, it } from 'vitest';
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

  it('should correctly infer the type of a narrow array', () => {
    const arr = [1, 2, 3, 4, 5] as const;
    const [evens, odds] = partition(arr, num => num % 2 === 0);

    expect(evens).toEqual([2, 4]);
    expect(odds).toEqual([1, 3, 5]);

    expectTypeOf(evens).toEqualTypeOf<Array<1 | 2 | 3 | 4 | 5>>();
    expectTypeOf(odds).toEqualTypeOf<Array<1 | 2 | 3 | 4 | 5>>();
  });
});
