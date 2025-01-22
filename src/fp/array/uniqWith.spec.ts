import { describe, expect, it } from 'vitest';
import { uniqWith } from './uniqWith';

describe('uniqWith', () => {
  it("(non-curried) should work with a `comparator`", () => {
    expect(
      uniqWith(
        [
          { x: 1, y: 2 },
          { x: 1, y: 3 },
        ],
        (a, b) => a.x === b.x
      )
    ).toEqual([{ x: 1, y: 2 }]);
    expect(uniqWith([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], (a, b) => Math.abs(a - b) < 1)).toEqual([
      1.2, 3.2, 5.7, 7.19,
    ]);
  });

  it("(curried) should work with a `comparator`", () => {
    expect(
      uniqWith((a, b) => a.x === b.x)([
        { x: 1, y: 2 },
        { x: 1, y: 3 },
      ])
    ).toEqual([{ x: 1, y: 2 }]);
    expect(uniqWith((a, b) => Math.abs(a - b) < 1)([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19])).toEqual([
      1.2, 3.2, 5.7, 7.19,
    ]);
  });
});
