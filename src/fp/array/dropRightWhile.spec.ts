import { describe, expect, it } from 'vitest';
import { dropRightWhile } from './dropRightWhile';

describe('dropRightWhile', () => {
  it(
    "(non-curried) should drop elements from an array until `canContinueDropping` returns false, from the end",
    () => {
      expect(dropRightWhile([1.2, 2.3, 3.4], x => x < 2)).toEqual([1.2, 2.3, 3.4]);

      const items = [
        { id: 1, enabled: false },
        { id: 2, enabled: true },
        { id: 3, enabled: false },
      ];

      expect(dropRightWhile(items, x => !x.enabled)).toEqual([
        {
          id: 1,
          enabled: false,
        },
        {
          id: 2,
          enabled: true,
        },
      ]);

      expect(dropRightWhile([1, 2, 3], x => x < 4)).toEqual([]);
    }
  );

  it("(curried) should drop elements from an array until `canContinueDropping` returns false, from the end", () => {
    expect(dropRightWhile<number>(x => x < 2)([1.2, 2.3, 3.4])).toEqual([1.2, 2.3, 3.4]);

    const items = [
      { id: 1, enabled: false },
      { id: 2, enabled: true },
      { id: 3, enabled: false },
    ];

    expect(dropRightWhile<{ id: number; enabled: boolean }>(x => !x.enabled)(items)).toEqual([
      {
        id: 1,
        enabled: false,
      },
      {
        id: 2,
        enabled: true,
      },
    ]);

    expect(dropRightWhile<number>(x => x < 4)([1, 2, 3])).toEqual([]);
  });
});
