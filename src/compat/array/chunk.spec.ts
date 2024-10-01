import { describe, expect, it } from 'vitest';
import { chunk } from './chunk.ts';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/chunk.spec.js#L1
 */
describe('chunk', () => {
  const array = [0, 1, 2, 3, 4, 5];

  it('should return chunked arrays', () => {
    const actual = chunk(array, 3);
    expect(actual).toEqual([
      [0, 1, 2],
      [3, 4, 5],
    ]);
  });

  it('should return the last chunk as remaining elements', () => {
    const actual = chunk(array, 4);
    expect(actual).toEqual([
      [0, 1, 2, 3],
      [4, 5],
    ]);
  });

  it('has default size of 1', () => {
    const actual = chunk(array);
    expect(actual).toEqual([[0], [1], [2], [3], [4], [5]]);
  });

  it('should ensure the minimum `size` is `0`', () => {
    expect(chunk([1, 2, 3], -1)).toEqual([]);
    expect(chunk([1, 2, 3], -2)).toEqual([]);
    expect(chunk([1, 2, 3], -Infinity)).toEqual([]);
  });

  it('should coerce `size` to an integer', () => {
    expect(chunk(array, array.length / 4)).toEqual([[0], [1], [2], [3], [4], [5]]);
  });

  /** We intentionally do not support cases like chunk([1, 2, 3], false) */
});
