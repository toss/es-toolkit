import { describe, expect, it } from 'vitest';
import { unzipWith } from './unzipWith';
import { zip } from '../../array/zip';

describe('unzipWith', () => {
  it("(non-curried) should unzip arrays correctly with an iteratee", () => {
    const zipped = zip([10, 20, 30], [40, 50, 60], [70, 80, 90]);
    const result = unzipWith(zipped, (item, item2, item3) => item + item2 + item3);

    expect(result).toEqual([60, 150, 240]);
  });

  it("(curried) should unzip arrays correctly with an iteratee", () => {
    const zipped = zip([10, 20, 30], [40, 50, 60], [70, 80, 90]);
    const result = unzipWith<number, number>((item, item2, item3) => item + item2 + item3)(zipped);

    expect(result).toEqual([60, 150, 240]);
  });

  it("(non-curried) should handle arrays of different lengths", () => {
    const zipped = zip([1, 20, 300, 4000], [100, 200, 300]);
    const result = unzipWith(zipped, (item, item2, item3, item4) => item + item2 + item3 + item4);

    expect(result).toEqual([4321, NaN]);
  });

  it("(curried) should handle arrays of different lengths", () => {
    const zipped = zip([1, 20, 300, 4000], [100, 200, 300]);
    const result = unzipWith<number, number>((item, item2, item3, item4) => item + item2 + item3 + item4)(zipped);

    expect(result).toEqual([4321, NaN]);
  });
});
