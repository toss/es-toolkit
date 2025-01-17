import { describe, expect, it } from 'vitest';
import { drop } from './drop';

describe('drop', () => {
  it(
    "(non-curried) should drop `itemsCount` elements from an array from the beginning",
    () => {
      expect(drop([1.2, 2.3, 3.4], 1)).toEqual([2.3, 3.4]);
      expect(drop(['a', 'b', 'c', 'd'], 2)).toEqual(['c', 'd']);
    }
  );

  it("(curried) should drop `itemsCount` elements from an array from the beginning", () => {
    expect(drop(1)([1.2, 2.3, 3.4])).toEqual([2.3, 3.4]);
    expect(drop(2)(['a', 'b', 'c', 'd'])).toEqual(['c', 'd']);
  });

  it("(non-curried) should return all elements if itemsCount < 1", () => {
    expect(drop([1.2, 2.3, 3.4], 0)).toEqual([1.2, 2.3, 3.4]);
    expect(drop([1.2, 2.3, 3.4], -1)).toEqual([1.2, 2.3, 3.4]);
  });

  it("(curried) should return all elements if itemsCount < 1", () => {
    expect(drop(0)([1.2, 2.3, 3.4])).toEqual([1.2, 2.3, 3.4]);
    expect(drop(-1)([1.2, 2.3, 3.4])).toEqual([1.2, 2.3, 3.4]);
  });

  it("(non-curried) should coerce itemsCount to an integer", () => {
    expect(drop([1.2, 2.3, 3.4], 1.5)).toEqual([2.3, 3.4]);
  });

  it("(curried) should coerce itemsCount to an integer", () => {
    expect(drop(1.5)([1.2, 2.3, 3.4])).toEqual([2.3, 3.4]);
  });

  it(
    "(non-curried) should return empty array if itemsCount >= arr.length",
    () => {
      expect(drop([1.2, 2.3, 3.4], 4)).toEqual([]);
    }
  );

  it("(curried) should return empty array if itemsCount >= arr.length", () => {
    expect(drop(4)([1.2, 2.3, 3.4])).toEqual([]);
  });
});
