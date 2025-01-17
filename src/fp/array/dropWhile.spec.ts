import { describe, expect, it } from 'vitest';
import { dropWhile } from './dropWhile';

describe('dropWhile', () => {
  it(
    "(non-curried) should drop elements from an array until `canContinueDropping` returns false, from the beginning",
    () => {
      expect(dropWhile([1.2, 2.3, 3.4], x => x < 2)).toEqual([2.3, 3.4]);

      const items = [
        { id: 1, enabled: false },
        { id: 2, enabled: true },
        { id: 3, enabled: false },
      ];

      expect(dropWhile(items, x => !x.enabled)).toEqual([
        {
          id: 2,
          enabled: true,
        },
        { id: 3, enabled: false },
      ]);

      expect(dropWhile([1, 2, 3], x => x < 4)).toEqual([]);
    }
  );

  it("(curried) should drop elements from an array until `canContinueDropping` returns false, from the beginning", () => {
    expect(dropWhile(x => x < 2)([1.2, 2.3, 3.4])).toEqual([2.3, 3.4]);

    const items = [
      { id: 1, enabled: false },
      { id: 2, enabled: true },
      { id: 3, enabled: false },
    ];

    expect(dropWhile(x => !x.enabled)(items)).toEqual([
      {
        id: 2,
        enabled: true,
      },
      { id: 3, enabled: false },
    ]);

    expect(dropWhile(x => x < 4)([1, 2, 3])).toEqual([]);
  });
});
