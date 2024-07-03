import { describe, expect, it } from 'vitest';
import { unzipWith } from './unzipWith';
import { zip } from './zip';

describe('unzipWith', () => {
  it('should unzip arrays correctly without iteratee', () => {
    const zipped = zip(['2', '20', '200'], [1, 10, 100]);
    const result = unzipWith(zipped);

    expect(result).toEqual([
      ['2', '20', '200'],
      [1, 10, 100],
    ]);
  });

  it('should unzip arrays correctly with an iteratee', () => {
    const zipped = zip([10, 20, 30], [40, 50, 60], [70, 80, 90]);
    const result = unzipWith(zipped, (item, item2, item3) => item + item2 + item3);

    expect(result).toEqual([60, 150, 240]);
  });

  it('should handle arrays of different lengths', () => {
    const zipped = zip([1, 20, 300, 4000], [100, 200, 300]);
    const result = unzipWith(zipped, (item, item2, item3, item4) => item + item2 + item3 + item4);

    expect(result).toEqual([4321, NaN]);
  });
});
