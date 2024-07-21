import { describe, expect, it } from 'vitest';
import { uniq } from '../index';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/uniq.spec.js#L1
 */
describe('uniq', () => {
  it('should perform an unsorted uniq when used as an iteratee for methods like `map`', () => {
    const array = [
      [2, 1, 2],
      [1, 2, 1],
    ];
    const actual = array.map(uniq);

    expect(actual).toEqual([
      [2, 1],
      [1, 2],
    ]);
  });
});
